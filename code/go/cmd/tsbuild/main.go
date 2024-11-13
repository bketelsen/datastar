package main

import (
	"compress/gzip"
	"errors"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/evanw/esbuild/pkg/api"
	"github.com/goccy/go-json"
	datastar "github.com/starfederation/datastar/code/go/sdk"
	"github.com/valyala/bytebufferpool"
	"github.com/valyala/fasttemplate"
)

const (
	DefaultSettleTime        = 300 * time.Millisecond
	DefaultSseSendRetry      = 1 * time.Second
	DefaultFragmentMergeMode = datastar.FragmentMergeModeMorph
)

func main() {
	start := time.Now()
	log.Print("Datastar built in TS compiler!")
	defer func() {
		log.Printf("Datastar built in %s", time.Since(start))
	}()

	if err := run(); err != nil {
		log.Fatal(err)
	}

}

func run() error {
	if err := errors.Join(
		// createPluginManifest(),
		createBundles(),
		writeOutConsts(),
	); err != nil {
		return fmt.Errorf("error creating bundles: %w", err)
	}

	return nil
}

func createBundles() error {
	log.Print("Creating bundles...")
	defer log.Print("Bundles created!")

	outDir := "./bundles"
	os.RemoveAll(outDir)

	result := api.Build(api.BuildOptions{
		EntryPoints: []string{
			"code/ts/library/src/bundles/datastar-core.ts",
			"code/ts/library/src/bundles/datastar.ts",
		},
		Outdir:            outDir,
		Bundle:            true,
		Write:             true,
		LogLevel:          api.LogLevelInfo,
		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		Sourcemap:         api.SourceMapLinked,
		Target:            api.ES2023,
	})

	if len(result.Errors) > 0 {
		errs := make([]error, len(result.Errors))
		for i, err := range result.Errors {
			errs[i] = errors.New(err.Text)
		}
		return errors.Join(errs...)
	}

	return nil
}

// func createPluginManifest() error {
// 	log.Print("Creating plugin manifest...")

// 	baseDir := "code/ts/library/src/plugins"

// 	codegenDir := "code/go/site/static/codegen"
// 	os.RemoveAll(codegenDir)
// 	if err := os.MkdirAll(codegenDir, 0755); err != nil {
// 		return fmt.Errorf("error creating codegen dir: %w", err)
// 	}

// 	type PluginManifestEntry struct {
// 		Source        string `json:"source"`
// 		SourceContent string `json:"sourceContent"`
// 	}

// 	type PluginManifest struct {
// 		Version string                 `json:"version"`
// 		Plugins []*PluginManifestEntry `json:"plugins"`
// 	}

// 	plugins := make([]*PluginManifestEntry, 0, 64)

// 	if err := filepath.WalkDir(baseDir, func(path string, d os.DirEntry, err error) error {
// 		if err != nil {
// 			return err
// 		}
// 		if d.IsDir() {
// 			return nil
// 		}

// 		dir := filepath.Dir(path)

// 		// Skip core plugins
// 		if strings.Contains(dir, "core") {
// 			return nil
// 		}

// 		relDir := strings.TrimPrefix(dir, baseDir)

// 		b, err := os.ReadFile(path)
// 		if err != nil {
// 			return fmt.Errorf("error reading plugin: %w", err)
// 		}

// 		pluginMeta := &PluginManifestEntry{
// 			Source:        filepath.Join(relDir, d.Name())[1:],
// 			SourceContent: string(b),
// 		}

// 		plugins = append(plugins, pluginMeta)
// 		return nil
// 	}); err != nil {
// 		return fmt.Errorf("error walking plugins: %w", err)
// 	}

// 	manifest := &PluginManifest{
// 		Version: datastar.Version,
// 		Plugins: plugins,
// 	}

// 	manifestJSON, err := json.MarshalIndent(manifest, "", "  ")
// 	if err != nil {
// 		return fmt.Errorf("error marshalling manifest: %w", err)
// 	}

// 	if err := os.WriteFile(filepath.Join(codegenDir, "manifest.json"), manifestJSON, 0644); err != nil {
// 		return fmt.Errorf("error writing manifest: %w", err)
// 	}

// 	return nil
// }

func writeOutConsts() error {
	log.Print("Extracting version...")

	packageJSONPath := "code/ts/library/package.json"
	packageJSON, err := os.ReadFile(packageJSONPath)
	if err != nil {
		return fmt.Errorf("error reading package.json: %w", err)
	}

	type PackageJSON struct {
		Version string `json:"version"`
	}
	pj := &PackageJSON{}
	if err := json.Unmarshal(packageJSON, pj); err != nil {
		return fmt.Errorf("error unmarshalling package.json: %w", err)
	}

	build, err := os.ReadFile("bundles/datastar.js")
	if err != nil {
		return fmt.Errorf("error reading datastar.js: %w", err)
	}
	datastarSize := len(build)

	buf := bytebufferpool.Get()
	defer bytebufferpool.Put(buf)

	w, err := gzip.NewWriterLevel(buf, gzip.BestCompression)
	if err != nil {
		panic(err)
	}
	if _, err := w.Write(build); err != nil {
		panic(err)
	}
	w.Close()
	datastarGzipSize := buf.Len()

	constsData := map[string]any{
		"version":                    pj.Version,
		"defaultSettleTimeMs":        strconv.Itoa(int(DefaultSettleTime.Milliseconds())),
		"defaultSSESendRetryMs":      strconv.Itoa(int(DefaultSseSendRetry.Milliseconds())),
		"defaultFragmentMergeMode":   string(DefaultFragmentMergeMode),
		"datastarSizeBytes":          strconv.Itoa(datastarSize),
		"datastarGzipSizeBytes":      strconv.Itoa(datastarGzipSize),
		"datastarGzipSizByteseHuman": humanize.IBytes(uint64(datastarGzipSize)),
	}

	for path, tmpl := range templates {
		t, err := fasttemplate.NewTemplate(strings.TrimSpace(tmpl), "{{", "}}")
		if err != nil {
			return fmt.Errorf("error creating template: %w", err)
		}
		s := t.ExecuteString(constsData)
		if err := os.WriteFile(path, []byte(s), 0644); err != nil {
			return fmt.Errorf("error writing version file: %w", err)
		}
	}

	return nil
}

var templates = map[string]string{
	"code/go/sdk/consts.go": `
package datastar

import "time"

const (
	Version                        = "{{version}}"
	VersionClientByteSize          = {{datastarSizeBytes}}
	VersionClientByteSizeGzip      = {{datastarGzipSizeBytes}}
	VersionClientByteSizeGzipHuman = "{{datastarGzipSizByteseHuman}}"

	DefaultSettleTime = {{defaultSettleTimeMs}} * time.Millisecond
	DefaultSseSendRetry = {{defaultSSESendRetryMs}} * time.Millisecond
	DefaultFragmentMergeMode = FragmentMergeMode("{{defaultFragmentMergeMode}}")
)
`,
	"code/php/sdk/src/Defaults.php": `
<?php
namespace starfederation\datastar;

use starfederation\datastar\enums\FragmentMergeMode;

class Defaults
{
    public const DEFAULT_SETTLE_DURATION = {{defaultSettleTimeMs}};
    public const DEFAULT_SSE_SEND_RETRY = {{defaultSSESendRetryMs}};
    public const DEFAULT_FRAGMENT_MERGE_MODE = FragmentMergeMode::Morph;
}
`,
}

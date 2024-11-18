package tsbuild

import (
	"time"

	"github.com/delaneyj/toolbelt"
)

type EnumValueDefinition struct {
	Name        toolbelt.CasedString
	Value       string
	Description string
}

type EnumDefinition struct {
	Name         toolbelt.CasedString
	Values       []*EnumValueDefinition
	DefaultIndex int
	Default      *EnumValueDefinition
}

type DefaultDuration struct {
	Name     toolbelt.CasedString
	Duration time.Duration
}

type DefaultBool struct {
	Name  toolbelt.CasedString
	Value bool
}

type DefaultString struct {
	Name  toolbelt.CasedString
	Value string
}

type ConstTemplateData struct {
	DoNotEdit                 string
	Version                   string
	VersionClientByteSize     int
	VersionClientByteSizeGzip int
	DatastarKey               string
	DatalineLiterals          []toolbelt.CasedString
	DefaultBools              []*DefaultBool
	DefaultDurations          []*DefaultDuration
	DefaultStrings            []*DefaultString
	Enums                     []*EnumDefinition
}

var ConstsData = &ConstTemplateData{
	DoNotEdit:   "This is auto-generated by Datastar. DO NOT EDIT.",
	DatastarKey: "datastar",
	DefaultBools: []*DefaultBool{
		{
			Name:  toolbelt.ToCasedString("fragmentsUseViewTransitions"),
			Value: false,
		},
		{
			Name:  toolbelt.ToCasedString("mergeSignalsOnlyIfMissing"),
			Value: false,
		},
		{
			Name:  toolbelt.ToCasedString("ExecuteJSAutoRemove"),
			Value: true,
		},
		{
			Name:  toolbelt.ToCasedString("customEventCancelable"),
			Value: true,
		},
		{
			Name:  toolbelt.ToCasedString("customEventComposed"),
			Value: true,
		},
		{
			Name:  toolbelt.ToCasedString("customEventBubbles"),
			Value: true,
		},
	},
	DefaultDurations: []*DefaultDuration{
		{
			Name:     toolbelt.ToCasedString("settleDuration"),
			Duration: 300 * time.Millisecond,
		},
		{
			Name:     toolbelt.ToCasedString("sseRetryDuration"),
			Duration: 1 * time.Second,
		},
	},
	DefaultStrings: []*DefaultString{
		{
			Name:  toolbelt.ToCasedString("ExecuteJSType"),
			Value: "module",
		},
		{
			Name:  toolbelt.ToCasedString("customEventSelector"),
			Value: "document",
		},
		{
			Name:  toolbelt.ToCasedString("customEventDetailJson"),
			Value: "{}",
		},
	},
	DatalineLiterals: []toolbelt.CasedString{
		// Shared
		toolbelt.ToCasedString("selector"),

		// MergeFragments
		toolbelt.ToCasedString("mergeMode"),
		toolbelt.ToCasedString("settleDuration"),
		toolbelt.ToCasedString("fragment"),
		toolbelt.ToCasedString("useViewTransition"),

		// MergeSignals
		toolbelt.ToCasedString("store"),
		toolbelt.ToCasedString("onlyIfMissing"),

		// RemoveSignals
		toolbelt.ToCasedString("paths"),

		// ExecuteJS
		toolbelt.ToCasedString("script"),
		toolbelt.ToCasedString("type"),
		toolbelt.ToCasedString("autoRemove"),
	},
	Enums: []*EnumDefinition{
		{
			Name:         toolbelt.ToCasedString("FragmentMergeMode"),
			DefaultIndex: 0,
			Values: []*EnumValueDefinition{
				{
					Value:       "morph",
					Description: "Morphs the fragment into the existing element using idiomorph.",
				},
				{
					Value:       "inner",
					Description: "Replaces the inner HTML of the existing element.",
				},
				{
					Value:       "outer",
					Description: "Replaces the outer HTML of the existing element.",
				},
				{
					Value:       "prepend",
					Description: "Prepends the fragment to the existing element.",
				},
				{
					Value:       "append",
					Description: "Appends the fragment to the existing element.",
				},
				{
					Value:       "before",
					Description: "Inserts the fragment before the existing element.",
				},
				{
					Value:       "after",
					Description: "Inserts the fragment after the existing element.",
				},
				{
					Value:       "upsertAttributes",
					Description: "Upserts the attributes of the existing element.",
				},
			},
		},

		{
			Name:         toolbelt.ToCasedString("EventType"),
			DefaultIndex: -1,
			Values: []*EnumValueDefinition{
				{
					Name:        toolbelt.ToCasedString("MergeFragments"),
					Value:       "datastar-merge-fragments",
					Description: "An event for merging HTML fragments into the DOM.",
				},
				{
					Name:        toolbelt.ToCasedString("MergeSignals"),
					Value:       "datastar-merge-signals",
					Description: "An event for merging signals into the store.",
				},
				{
					Name:        toolbelt.ToCasedString("RemoveFragments"),
					Value:       "datastar-remove-fragments",
					Description: "An event for removing HTML fragments from the DOM.",
				},
				{
					Name:        toolbelt.ToCasedString("RemoveSignals"),
					Value:       "datastar-remove-signals",
					Description: "An event for removing signals from the store.",
				},
				{
					Name:        toolbelt.ToCasedString("ExecuteJS"),
					Value:       "datastar-execute-js",
					Description: "An event for executing JavaScript in the browser.",
				},
			},
		},
	},
}

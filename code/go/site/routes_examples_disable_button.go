package site

import (
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	datastar "github.com/starfederation/datastar/code/go/sdk"
)

func setupExamplesDisableButton(examplesRouter chi.Router) error {
	examplesRouter.Get("/disable_button/data", func(w http.ResponseWriter, r *http.Request) {
		sse := datastar.NewSSE(w, r)

		fragment := fmt.Sprintf(`<div>The time is %s</div>`, time.Now().UTC().Format(time.RFC3339))
		sse.RenderFragment(fragment, datastar.WithMergeAppend())

		time.Sleep(1 * time.Second)
		sse.MarshalAndPatchStore(map[string]any{
			"shouldDisable": false,
		})
	})

	return nil
}

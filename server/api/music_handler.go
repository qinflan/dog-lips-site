package api

import (
	"encoding/json"
	"net/http"

	"github.com/qinflan/dog-lips-site/server/service"
)

var artistID = "1L23rbDqrblJpid1WJkBVE"

func MostRecentReleaseHandler(spotifyClient *service.SpotifyClient) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		release, err := service.GetMostRecentRelease(artistID, spotifyClient)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resp := struct {
			Release service.SpotifyRelease `json:"release"`
		}{
			Release: release,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

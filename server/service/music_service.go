package service

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

// Get releases from spotify/apple and map them togther to send to client

type SpotifyRelease struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	ReleaseDate string `json:"release_date"`
	Type        string `json:"album_type"`
	ExternalURL struct {
		Spotify string `json:"spotify"`
	} `json:"external_urls"` // fix field name
	Images []struct {
		URL string `json:"url"`
	} `json:"images"`
}

type SpotifyTrack struct {
	Name string `json:"name"`
	URL  string `json:"external_urls.spotify"`
}

func GetMostRecentRelease(artistID string, client *SpotifyClient) (SpotifyRelease, []SpotifyTrack, error) {
	token, err := client.GetToken()
	if err != nil {
		return SpotifyRelease{}, nil, err
	}

	// Get artist releases
	url := fmt.Sprintf("https://api.spotify.com/v1/artists/%s/albums?include_groups=album,single&limit=1&market=US", artistID)
	req, _ := http.NewRequestWithContext(context.Background(), "GET", url, nil)
	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return SpotifyRelease{}, nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return SpotifyRelease{}, nil, fmt.Errorf("spotify API failed: %s", resp.Status)
	}

	var result struct {
		Items []SpotifyRelease `json:"items"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return SpotifyRelease{}, nil, err
	}
	if len(result.Items) == 0 {
		return SpotifyRelease{}, nil, fmt.Errorf("no releases found for artist %s", artistID)
	}

	release := result.Items[0]

	// If it's an album, fetch tracks
	var tracks []SpotifyTrack
	if release.Type == "album" {
		trackURL := fmt.Sprintf("https://api.spotify.com/v1/albums/%s/tracks", release.ID)
		trackReq, _ := http.NewRequestWithContext(context.Background(), "GET", trackURL, nil)
		trackReq.Header.Set("Authorization", "Bearer "+token)

		trackResp, err := http.DefaultClient.Do(trackReq)
		if err != nil {
			return release, nil, err
		}
		defer trackResp.Body.Close()

		if trackResp.StatusCode != http.StatusOK {
			return release, nil, fmt.Errorf("spotify tracks API failed: %s", trackResp.Status)
		}

		var trackResult struct {
			Items []SpotifyTrack `json:"items"`
		}
		if err := json.NewDecoder(trackResp.Body).Decode(&trackResult); err != nil {
			return release, nil, err
		}
		tracks = trackResult.Items
	} else if release.Type == "single" {
		tracks = []SpotifyTrack{
			{
				Name: release.Name,
				URL:  release.ExternalURL.Spotify,
			},
		}
	}

	return release, tracks, nil
}

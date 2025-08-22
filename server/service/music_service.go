package service

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

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

func GetMostRecentRelease(artistID string, client *SpotifyClient) (SpotifyRelease, error) {
	token, err := client.GetToken()
	if err != nil {
		return SpotifyRelease{}, err
	}

	// Get artist releases
	url := fmt.Sprintf("https://api.spotify.com/v1/artists/%s/albums?include_groups=album,single&limit=1&market=US", artistID)
	req, _ := http.NewRequestWithContext(context.Background(), "GET", url, nil)
	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return SpotifyRelease{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return SpotifyRelease{}, fmt.Errorf("spotify API failed: %s", resp.Status)
	}

	var result struct {
		Items []SpotifyRelease `json:"items"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return SpotifyRelease{}, err
	}
	if len(result.Items) == 0 {
		return SpotifyRelease{}, fmt.Errorf("no releases found for artist %s", artistID)
	}

	release := result.Items[0]

	return release, nil
}

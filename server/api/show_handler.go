package api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/qinflan/dog-lips-site/server/service"
)

func PresignHandler(s3Client *service.S3Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		filename := r.URL.Query().Get("filename")
		if filename == "" {
			http.Error(w, "filename query parameter required", http.StatusBadRequest)
			return
		}

		url, err := s3Client.GetPresignedURL(filename, 15*time.Minute)
		if err != nil {
			http.Error(w, "Failed to get presigned URL: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(fmt.Sprintf(`{"url":"%s"}`, url)))
	}
}

// func GetAllShows(db *pgxpool.Pool) http.HandlerFunc {

// }

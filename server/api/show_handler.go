package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/qinflan/dog-lips-site/server/models"
	"github.com/qinflan/dog-lips-site/server/service"
	dto "github.com/qinflan/dog-lips-site/server/types"
)

const showDateLayout = "2006-01-02"

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

func ListShowsHandler(db *pgxpool.Pool, s3Client *service.S3Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		shows, err := service.ListShows(r.Context(), db)
		if err != nil {
			http.Error(w, "Failed to fetch shows: "+err.Error(), http.StatusInternalServerError)
			return
		}

		responses := make([]dto.ShowResponse, 0, len(shows))
		for _, show := range shows {
			resp, err := buildShowResponse(show, s3Client)
			if err != nil {
				http.Error(w, "Failed to sign flyer URL", http.StatusInternalServerError)
				return
			}
			responses = append(responses, resp)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(responses)
	}
}

func GetShowHandler(db *pgxpool.Pool, s3Client *service.S3Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := parseIDParam(mux.Vars(r)["id"])
		if err != nil {
			http.Error(w, "Invalid show ID", http.StatusBadRequest)
			return
		}

		show, err := service.GetShowByID(r.Context(), db, id)
		if err != nil {
			http.Error(w, "Show not found", http.StatusNotFound)
			return
		}

		resp, err := buildShowResponse(*show, s3Client)
		if err != nil {
			http.Error(w, "Failed to sign flyer URL", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

func CreateShowHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		show, err := parseShowRequest(r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		created, err := service.CreateShow(r.Context(), db, show)
		if err != nil {
			http.Error(w, "Failed to create show: "+err.Error(), http.StatusInternalServerError)
			return
		}

		resp := dto.ShowResponse{
			ID:         created.ID,
			Date:       created.Date.Format(showDateLayout),
			Venue:      created.Venue,
			City:       created.City,
			State:      created.State,
			Address:    created.Address,
			Time:       created.Time,
			Price:      created.Price,
			TicketsURL: created.TicketsURL,
			FlyerURL:   created.FlyerURL,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

func UpdateShowHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := parseIDParam(mux.Vars(r)["id"])
		if err != nil {
			http.Error(w, "Invalid show ID", http.StatusBadRequest)
			return
		}

		show, err := parseShowRequest(r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		updated, err := service.UpdateShow(r.Context(), db, id, show)
		if err != nil {
			http.Error(w, "Failed to update show: "+err.Error(), http.StatusInternalServerError)
			return
		}

		resp := dto.ShowResponse{
			ID:         updated.ID,
			Date:       updated.Date.Format(showDateLayout),
			Venue:      updated.Venue,
			City:       updated.City,
			State:      updated.State,
			Address:    updated.Address,
			Time:       updated.Time,
			Price:      updated.Price,
			TicketsURL: updated.TicketsURL,
			FlyerURL:   updated.FlyerURL,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

func DeleteShowHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := parseIDParam(mux.Vars(r)["id"])
		if err != nil {
			http.Error(w, "Invalid show ID", http.StatusBadRequest)
			return
		}

		if err := service.DeleteShow(r.Context(), db, id); err != nil {
			http.Error(w, "Failed to delete show: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func parseShowRequest(r *http.Request) (*models.Show, error) {
	var req dto.ShowRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return nil, fmt.Errorf("invalid request payload")
	}

	if req.Date == "" || req.Venue == "" || req.City == "" || req.State == "" || req.Address == "" || req.Time == "" {
		return nil, fmt.Errorf("missing required fields")
	}

	date, err := time.Parse(showDateLayout, req.Date)
	if err != nil {
		return nil, fmt.Errorf("invalid date format; expected YYYY-MM-DD")
	}

	return &models.Show{
		Date:       date,
		Venue:      req.Venue,
		City:       req.City,
		State:      req.State,
		Address:    req.Address,
		Time:       req.Time,
		Price:      req.Price,
		TicketsURL: req.TicketsURL,
		FlyerURL:   req.FlyerURL,
	}, nil
}

func buildShowResponse(show models.Show, s3Client *service.S3Client) (dto.ShowResponse, error) {
	flyerURL := show.FlyerURL
	if s3Client != nil && show.FlyerURL != nil && *show.FlyerURL != "" {
		signed, err := s3Client.GetPresignedGetURL(*show.FlyerURL, 15*time.Minute)
		if err != nil {
			return dto.ShowResponse{}, err
		}
		flyerURL = &signed
	}

	return dto.ShowResponse{
		ID:         show.ID,
		Date:       show.Date.Format(showDateLayout),
		Venue:      show.Venue,
		City:       show.City,
		State:      show.State,
		Address:    show.Address,
		Time:       show.Time,
		Price:      show.Price,
		TicketsURL: show.TicketsURL,
		FlyerURL:   flyerURL,
	}, nil
}

func parseIDParam(idParam string) (int64, error) {
	return strconv.ParseInt(idParam, 10, 64)
}

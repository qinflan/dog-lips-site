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

func ListMerchHandler(db *pgxpool.Pool, s3Client *service.S3Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := service.ListMerch(r.Context(), db)
		if err != nil {
			http.Error(w, "Failed to fetch merch", http.StatusInternalServerError)
			return
		}

		responses := make([]dto.MerchResponse, 0, len(items))
		for _, merch := range items {
			resp, err := buildMerchResponse(merch, s3Client)
			if err != nil {
				http.Error(w, "Failed to sign image URL", http.StatusInternalServerError)
				return
			}
			responses = append(responses, resp)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(responses)
	}
}

func GetMerchHandler(db *pgxpool.Pool, s3Client *service.S3Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := parseMerchID(mux.Vars(r)["id"])
		if err != nil {
			http.Error(w, "Invalid merch ID", http.StatusBadRequest)
			return
		}

		item, err := service.GetMerchByID(r.Context(), db, id)
		if err != nil {
			http.Error(w, "Merch not found", http.StatusNotFound)
			return
		}

		resp, err := buildMerchResponse(*item, s3Client)
		if err != nil {
			http.Error(w, "Failed to sign image URL", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

func CreateMerchHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		merch, err := parseMerchRequest(r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		created, err := service.CreateMerch(r.Context(), db, merch)
		if err != nil {
			http.Error(w, "Failed to create merch", http.StatusInternalServerError)
			return
		}

		resp := dto.MerchResponse{
			ID:          created.ID,
			Price:       created.Price,
			Description: created.Description,
			ImageURL:    created.ImageURL,
			BandcampURL: created.BandcampURL,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

func UpdateMerchHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := parseMerchID(mux.Vars(r)["id"])
		if err != nil {
			http.Error(w, "Invalid merch ID", http.StatusBadRequest)
			return
		}

		merch, err := parseMerchRequest(r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		updated, err := service.UpdateMerch(r.Context(), db, id, merch)
		if err != nil {
			http.Error(w, "Failed to update merch", http.StatusInternalServerError)
			return
		}

		resp := dto.MerchResponse{
			ID:          updated.ID,
			Price:       updated.Price,
			Description: updated.Description,
			ImageURL:    updated.ImageURL,
			BandcampURL: updated.BandcampURL,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

func DeleteMerchHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := parseMerchID(mux.Vars(r)["id"])
		if err != nil {
			http.Error(w, "Invalid merch ID", http.StatusBadRequest)
			return
		}

		if err := service.DeleteMerch(r.Context(), db, id); err != nil {
			http.Error(w, "Failed to delete merch", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func parseMerchRequest(r *http.Request) (*models.Merch, error) {
	var req dto.MerchRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return nil, fmt.Errorf("invalid request payload")
	}

	return &models.Merch{
		Price:       req.Price,
		Description: req.Description,
		ImageURL:    req.ImageURL,
		BandcampURL: req.BandcampURL,
	}, nil
}

func buildMerchResponse(merch models.Merch, s3Client *service.S3Client) (dto.MerchResponse, error) {
	imageURL := merch.ImageURL
	if s3Client != nil && merch.ImageURL != nil && *merch.ImageURL != "" {
		signed, err := s3Client.GetPresignedGetURL(*merch.ImageURL, 15*time.Minute)
		if err != nil {
			return dto.MerchResponse{}, err
		}
		imageURL = &signed
	}

	return dto.MerchResponse{
		ID:          merch.ID,
		Price:       merch.Price,
		Description: merch.Description,
		ImageURL:    imageURL,
		BandcampURL: merch.BandcampURL,
	}, nil
}

func parseMerchID(idParam string) (int64, error) {
	return strconv.ParseInt(idParam, 10, 64)
}

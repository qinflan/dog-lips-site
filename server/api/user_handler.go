package api

import (
	"encoding/json"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/qinflan/dog-lips-site/server/middleware"
	"github.com/qinflan/dog-lips-site/server/service"
	dto "github.com/qinflan/dog-lips-site/server/types"
)

func RegisterHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req dto.RegisterRequest

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request payload.", http.StatusBadRequest)
			return
		}

		user, err := service.CreateUser(r.Context(), db, req.Username, req.Password)
		if err != nil {
			http.Error(w, "Could not create user."+err.Error(), http.StatusBadRequest)
			return
		}

		res := dto.UserOutput{
			ID:       user.ID,
			Username: user.Username,
			Created:  user.CreatedAt,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(res)
	}
}

func LoginHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req dto.LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request payload.", http.StatusBadRequest)
			return
		}

		user, err := service.AuthenticateUser(r.Context(), db, req.Username, req.Password)
		if err != nil {
			http.Error(w, "Could not authenticate user.", http.StatusUnauthorized)
			return
		}

		token, err := middleware.GenerateJWT(user.ID)
		if err != nil {
			http.Error(w, "Could not generate token", http.StatusInternalServerError)
			return
		}

		res := dto.UserResponse{
			Token: token,
			User: dto.UserOutput{
				ID:       user.ID,
				Username: user.Username,
				Created:  user.CreatedAt,
			},
		}

		// return token to client
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(res)
	}
}

func UserHandler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		claims, ok := r.Context().Value("claims").(jwt.MapClaims)
		if !ok || claims == nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			return
		}
		userID := int64(userIDFloat)

		user, err := service.GetUserByID(r.Context(), db, userID)
		if err != nil {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}

		res := dto.UserOutput{
			ID:       user.ID,
			Username: user.Username,
			Created:  user.CreatedAt,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(res)
	}
}

package api

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/qinflan/dog-lips-site/server/middleware"
)

func NewRouter(db *pgxpool.Pool) *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}).Methods("GET")

	// auth routes
	r.Handle("/auth/register", RegisterHandler(db)).Methods("POST")
	r.Handle("/auth/login", LoginHandler(db)).Methods("POST")
	r.Handle("/auth/me", middleware.RequireAuth(UserHandler(db))).Methods("POST")

	// show routes

	// merch routes

	return r
}

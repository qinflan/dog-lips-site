package api

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
)

func NewRouter(db *pgxpool.Pool) *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}).Methods("GET")

	// auth routes
	r.HandleFunc("/auth/register", RegisterHandler(db)).Methods("POST")
	r.HandleFunc("/auth/login", LoginHandler(db)).Methods("POST")

	return r
}

package api

import (
	"net/http"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
)

func NewRouter(db *pgx.Conn) *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}).Methods("GET")
	return r
}
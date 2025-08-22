package api

import (
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/qinflan/dog-lips-site/server/middleware"
	"github.com/qinflan/dog-lips-site/server/service"
)

type App struct {
	DB            *pgxpool.Pool
	S3Client      *service.S3Client
	SpotifyClient *service.SpotifyClient
}

func NewRouter(app *App) *mux.Router {
	r := mux.NewRouter()

	// auth routes
	r.HandleFunc("/auth/register", RegisterHandler(app.DB)).Methods("POST")
	r.HandleFunc("/auth/login", LoginHandler(app.DB)).Methods("POST")
	r.HandleFunc("/auth/me", middleware.RequireAuth(UserHandler(app.DB))).Methods("POST")

	// show routes
	r.HandleFunc("/shows/presign", PresignHandler(app.S3Client)).Methods("POST")

	// music routes
	r.HandleFunc("/music/recent", MostRecentReleaseHandler(app.SpotifyClient)).Methods("GET")

	// contact route
	r.HandleFunc("/contact/request", ContactHandler).Methods("POST")

	return r
}

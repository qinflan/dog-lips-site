package api

import (
	"net/http"

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

	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	// auth routes
	r.HandleFunc("/auth/register", RegisterHandler(app.DB)).Methods("POST")
	r.HandleFunc("/auth/login", LoginHandler(app.DB)).Methods("POST")
	r.HandleFunc("/auth/me", middleware.RequireAuth(UserHandler(app.DB))).Methods("GET")

	// show routes
	r.HandleFunc("/shows", ListShowsHandler(app.DB, app.S3Client)).Methods("GET")
	r.HandleFunc("/shows/{id}", GetShowHandler(app.DB, app.S3Client)).Methods("GET")
	r.HandleFunc("/shows/presign", middleware.RequireAuth(PresignHandler(app.S3Client))).Methods("POST")
	r.HandleFunc("/admin/shows", middleware.RequireAuth(CreateShowHandler(app.DB))).Methods("POST")
	r.HandleFunc("/admin/shows/{id}", middleware.RequireAuth(UpdateShowHandler(app.DB))).Methods("PUT")
	r.HandleFunc("/admin/shows/{id}", middleware.RequireAuth(DeleteShowHandler(app.DB))).Methods("DELETE")

	// merch routes
	r.HandleFunc("/merch", ListMerchHandler(app.DB, app.S3Client)).Methods("GET")
	r.HandleFunc("/merch/{id}", GetMerchHandler(app.DB, app.S3Client)).Methods("GET")
	r.HandleFunc("/admin/merch", middleware.RequireAuth(CreateMerchHandler(app.DB))).Methods("POST")
	r.HandleFunc("/admin/merch/{id}", middleware.RequireAuth(UpdateMerchHandler(app.DB))).Methods("PUT")
	r.HandleFunc("/admin/merch/{id}", middleware.RequireAuth(DeleteMerchHandler(app.DB))).Methods("DELETE")

	// music routes
	r.HandleFunc("/music/recent", MostRecentReleaseHandler(app.SpotifyClient)).Methods("GET")

	// contact route
	r.HandleFunc("/contact/request", ContactHandler).Methods("POST")

	return r
}

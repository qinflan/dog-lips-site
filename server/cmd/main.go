package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/qinflan/dog-lips-site/server/api"
	"github.com/qinflan/dog-lips-site/server/service"
)

func main() {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Temporary router for health check to bind immediately
	router := http.NewServeMux()
	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	// Wrap in CORS
	corsRouter := handlers.CORS(
		handlers.AllowedOrigins([]string{os.Getenv("ALLOWED_ORIGIN_PROD")}),
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(router)

	// Start listening immediately
	go func() {
		log.Println("Starting server on 0.0.0.0:" + port)
		if err := http.ListenAndServe("0.0.0.0:"+port, corsRouter); err != nil {
			log.Fatalf("Failed to start server: %v\n", err)
		}
	}()

	// Initialize DB and services AFTER binding
	connStr := os.Getenv("DATABASE_URL")
	dbPool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer dbPool.Close()

	if err := dbPool.Ping(context.Background()); err != nil {
		log.Fatalf("Unable to ping database: %v\n", err)
	}
	log.Println("Connected to database successfully!")

	s3Client, err := service.NewS3Client()
	if err != nil {
		log.Fatalf("Failed to create S3 client: %v\n", err)
	}

	spotifyClient := service.NewSpotifyClient()

	// Replace router with full app routes now that services are ready
	app := &api.App{
		DB:            dbPool,
		S3Client:      s3Client,
		SpotifyClient: spotifyClient,
	}

	fullRouter := api.NewRouter(app)
	corsRouter = handlers.CORS(
		handlers.AllowedOrigins([]string{os.Getenv("ALLOWED_ORIGIN_PROD")}),
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(fullRouter)

	// Block forever to keep container alive
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, corsRouter))
}

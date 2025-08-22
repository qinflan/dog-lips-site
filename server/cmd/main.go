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
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	connStr := os.Getenv("DATABASE_URL")

	dbPool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer dbPool.Close()

	err = dbPool.Ping(context.Background())
	if err != nil {
		log.Fatalf("Unable to ping database: %v\n", err)
	}

	log.Println("Connected to database successfully!")

	s3Client, err := service.NewS3Client()
	if err != nil {
		log.Fatalf("failed to create S3 client: %v", err)
	}

	spotifyClient := service.NewSpotifyClient()

	app := &api.App{
		DB:            dbPool,
		S3Client:      s3Client,
		SpotifyClient: spotifyClient,
	}

	router := api.NewRouter(app)

	corsRouter := handlers.CORS(
		handlers.AllowedOrigins([]string{os.Getenv("ALLOWED_ORIGIN_DEV")}), // change to prod for deploy
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(router)

	log.Println("Starting server on :9090")
	if err := http.ListenAndServe(":9090", corsRouter); err != nil {
		log.Fatalf("Failed to start server: %v\n", err)
	}
}

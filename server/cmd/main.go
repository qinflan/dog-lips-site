package main

import (
	"context"
	"log"
	"os"
	"net/http"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/qinflan/dog-lips-site/server/cmd/api"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	
	connStr := os.Getenv("DATABASE_URL")
	conn, err := pgx.Connect(context.Background(), connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())

	if conn.Ping(context.Background()) == nil {
		log.Println("Connected to the database successfully!")
	}

	router := api.NewRouter(conn)

	log.Println("Starting server on :9090")
	if err := http.ListenAndServe(":9090", router); err != nil {
		log.Fatalf("Failed to start server: %v\n", err)
	}
}

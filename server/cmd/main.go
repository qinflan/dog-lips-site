package main

import (
	"log"
	"net/http"
	
	"github.com/qinflan/dog-lips-site/server/internal/api"
)

func main() {
	router := api.NewRouter()

	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
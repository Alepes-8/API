package main

import (
	"log"
	"net/http"
	"os"
)

//how to run this file:
// 1. go run main.go
// 2. then open http://localhost:8080/docs/ in your browser
// 3. This file serves the OpenAPI YAML file and Swagger UI for the Recipe Manager API

func runningInDocker() bool {
	if _, err := os.Stat("/.dockerenv"); err == nil {
		return true
	}
	return false
}

func main() {
	// Serve OpenAPI YAML file
	// The path to the OpenAPI YAML file is relative to the main.go file
	// If issues occur, it can bve with swagger-initializer.js in the swagger-ui/dist folder
	http.HandleFunc("/docs/combined.yaml", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")      // prevent browser caching
		http.ServeFile(w, r, "./openapis/combined.yaml") // path relative to main.go
	})

	var startPath string
	if runningInDocker() {
		startPath = "./"
	} else {
		startPath = "../"
	}

	http.HandleFunc("/docs/recipe_api.yaml", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		http.ServeFile(w, r, startPath+"smallProjects/recipe_manager_api/openapi.yaml")
	})

	http.HandleFunc("/docs/task_api.yaml", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		http.ServeFile(w, r, startPath+"smallProjects/task_tracker_api/openapi.yaml")
	})

	// Serve Swagger UI static files
	fs := http.FileServer(http.Dir(startPath + "swagger-ui/dist")) // relative to main.go
	http.Handle("/docs/", http.StripPrefix("/docs/", fs))

	log.Println("Server running at http://localhost:8080/docs/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

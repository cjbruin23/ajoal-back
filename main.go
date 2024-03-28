package main

import (
	"net/http"
	"periate-back/main/pkg/routes"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	r := chi.NewRouter()

	godotenv.Load()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	}))

	// Routes
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	r.Mount("/users", routes.UsersRoutes())

	// Serve
	http.ListenAndServe(":3000", r)
}

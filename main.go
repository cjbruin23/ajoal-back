package main

import (
	"net/http"
	"os"

	authMiddleware "periate-back/main/middleware"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	r := chi.NewRouter()

	godotenv.Load()

	audience := os.Getenv("AUTH0_AUDIENCE")
	domain := os.Getenv("AUTH0_DOMAIN")

	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	}))

	// https://developer.auth0.com/resources/code-samples/api/standard-library/basic-authorization

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	r.Group(func(r chi.Router) {
		r.Use(authMiddleware.ValidateJWT(audience, domain, http.HandlerFunc(middleware.ProtectedApiHandler)))
	})
	http.ListenAndServe(":3000", r)
}

package routes

import (
	"net/http"

	"github.com/go-chi/chi"
)

func UsersRoutes() chi.Router {
	router := chi.NewRouter()

	router.Get("/", func(writ http.ResponseWriter, req *http.Request) {

		return
	})
	return router
}

package routes

import (
	"github.com/go-chi/chi/v5"
	"net/http"
)

type UsersResource struct{}

func (rs UsersResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Post("/login", rs.Login)
	r.Post("/register", rs.Register)
	r.Post("/football", rs.Register)

	//Account specific endpoints
	r.Get("/coins", rs.Register)
	r.Post("/add-coins", rs.Register)
	r.Post("/remove-coins", rs.Register)

	return r
}

func (rs UsersResource) Login(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User has been logged in"))
}

func (rs UsersResource) Register(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User has signed up"))
}

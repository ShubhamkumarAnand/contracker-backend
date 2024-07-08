package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Building a REST API in GoLang!")

	mux := http.NewServeMux()

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "Welcome to contracker")
	})

	mux.HandleFunc("POST /labours/add-labour", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "Adding a new labour")
	})

	mux.HandleFunc("GET /labours", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "Getting details of all the labours present...")
	})

	mux.HandleFunc("GET /labours/{id}", func(w http.ResponseWriter, r *http.Request){
		id := r.PathValue("id")
		fmt.Fprintf(w, "Details of labour with id: %s", id)
	})

	if err := http.ListenAndServe(":8080", mux); err != nil {
		fmt.Println(err.Error())
	}
}

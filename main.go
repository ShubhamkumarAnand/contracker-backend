package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Builder")
}

func main() {
	http.HandleFunc("/builder", handler)
	http.ListenAndServe(":8080", nil)
}

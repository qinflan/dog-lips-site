package api

import (
	"encoding/json"
	"net/http"

	"github.com/qinflan/dog-lips-site/server/service"
)

type ContactFormRequest struct {
	Author      string `json:"author"`
	SenderEmail string `json:"senderEmail"`
	Subject     string `json:"subject"`
	Body        string `json:"body"`
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {

	var req ContactFormRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	smtpReq := &service.SendEmailRequest{
		Author:      req.Author,
		SenderEmail: req.SenderEmail,
		Subject:     req.Subject,
		Body:        req.Body,
	}

	if err := service.SendEmail(smtpReq); err != nil {
		http.Error(w, "Failed to send email: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"Email sent successfully"}`))
}

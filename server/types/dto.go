package dto

import (
	"time"
)

// User DTO
type RegisterRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type UserResponse struct {
	Token string     `json:"token"`
	User  UserOutput `json:"user"`
}
type UserOutput struct {
	ID       int64     `json:"id"`
	Username string    `json:"username"`
	Created  time.Time `json:"created"`
}

// Show DTO TODO: boiler; edit this
type ShowRequest struct {
	ID         int64   `json:"id"`
	Date       string  `json:"date"`
	Venue      string  `json:"venue"`
	City       string  `json:"city"`
	State      string  `json:"state"`
	Address    *string `json:"address"`
	Time       string  `json:"time"`
	Price      *string `json:"price"`
	TicketsURL *string `json:"tickets_url"`
	FlyerURL   *string `json:"flyer_url"`
}

type ShowResponse struct {
	ID         int64   `json:"id"`
	Date       string  `json:"date"`
	Venue      string  `json:"venue"`
	City       string  `json:"city"`
	State      string  `json:"state"`
	Address    *string `json:"address"`
	Time       string  `json:"time"`
	Price      *string `json:"price"`
	TicketsURL *string `json:"tickets_url"`
	FlyerURL   *string `json:"flyer_url"`
}

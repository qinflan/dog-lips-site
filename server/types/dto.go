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

type ShowRequest struct {
	ID         int64   `json:"id"`
	Date       string  `json:"date"`
	Venue      string  `json:"venue"`
	City       string  `json:"city"`
	State      string  `json:"state"`
	Address    *string `json:"address"`
	Time       string  `json:"time"`
	Price      *string `json:"price"`
	TicketsURL *string `json:"ticketsUrl"`
	Flyer      *string `json:"flyer"`
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
	TicketsURL *string `json:"ticketsUrl"`
	Flyer      *string `json:"flyer"`
	FlyerURL   *string `json:"flyerUrl"`
}

type MerchRequest struct {
	ID          int64   `json:"id"`
	Price       *string `json:"price"`
	Description *string `json:"description"`
	ImageURL    *string `json:"imageUrl"`
	BandcampURL *string `json:"bandcampUrl"`
}

type MerchResponse struct {
	ID          int64   `json:"id"`
	Price       *string `json:"price"`
	Description *string `json:"description"`
	ImageURL    *string `json:"imageUrl"`
	BandcampURL *string `json:"bandcampUrl"`
}

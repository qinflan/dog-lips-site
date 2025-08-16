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

// Merch DTO

// Show DTO

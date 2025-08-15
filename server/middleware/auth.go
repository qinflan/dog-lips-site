package middleware

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = os.Getenv("JWT_SECRET")

func GenerateJWT(userID int64) (string, error) {
	if jwtKey == "" {
		log.Fatal("JWT_SECRET env variable is not set.")
	}

	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtKey))
}

// func ValidateJWT(token string) (*jwt.Token, error) {

// }

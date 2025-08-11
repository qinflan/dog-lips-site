package models

import (
	"context"
	"errors"
	"time"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)


type User struct {
	ID        int64     `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"-"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}


func CreateUser(ctx context.Context, db *pgxpool.Pool, username, email, password string) (*User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)	
	if err != nil {
		return nil, err
	}
	var user User
	err = db.QueryRow(ctx, `
		INSERT INTO users (username, email, password_hash, created_at, updated_at)
		VALUES ($1, $2, $3, NOW(), NOW())
		RETURNING id, username, email, created_at, updated_at
	`, username, email, string(hashedPassword)).Scan(&user.ID, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}	
	return &user, nil
}


func GetUserByEmail(ctx context.Context, db *pgxpool.Pool, email string) (*User, error) {
    var user User
    err := db.QueryRow(ctx, "SELECT id, email, password FROM users WHERE email=$1", email).
        Scan(&user.ID, &user.Email, &user.Password)
    if err != nil {
        return nil, err
    }
    return &user, nil
}

func AuthenticateUser(ctx context.Context, db *pgxpool.Pool, email, password string) (*User, error) {
	user, err := GetUserByEmail(ctx, db, email)
	if err != nil {
		return nil, err
	}	
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return nil, errors.New("invalid credentials")
		}
		return nil, err
	}
	return user, nil
}
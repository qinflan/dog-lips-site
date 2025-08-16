package service

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/qinflan/dog-lips-site/server/models"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(ctx context.Context, db *pgxpool.Pool, username, password string) (*models.User, error) {
	var user models.User
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	err = db.QueryRow(ctx, `
		INSERT INTO users (username, password, created_at)
		VALUES ($1, $2, NOW())
		RETURNING id, username, created_at
	`, username, string(hashedPassword)).Scan(&user.ID, &user.Username, &user.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserByUsername(ctx context.Context, db *pgxpool.Pool, username string) (*models.User, error) {
	var user models.User
	err := db.QueryRow(ctx, "SELECT id, username, password, created_at FROM users WHERE username=$1", username).
		Scan(&user.ID, &user.Username, &user.Password, &user.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserByID(ctx context.Context, db *pgxpool.Pool, id int64) (*models.User, error) {
	var user models.User
	err := db.QueryRow(ctx, "SELECT id, username, created_at FROM users WHERE id=$1", id).
		Scan(&user.ID, &user.Username, &user.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func AuthenticateUser(ctx context.Context, db *pgxpool.Pool, username, password string) (*models.User, error) {
	user, err := GetUserByUsername(ctx, db, username)
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

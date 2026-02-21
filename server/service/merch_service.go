package service

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/qinflan/dog-lips-site/server/models"
)

func CreateMerch(ctx context.Context, db *pgxpool.Pool, merch *models.Merch) (*models.Merch, error) {
	var created models.Merch
	query := `
		INSERT INTO merch (price, description, imageurl, bandcampurl)
		VALUES ($1, $2, $3, $4)
		RETURNING id, price, description, imageurl, bandcampurl
	`

	err := db.QueryRow(ctx, query,
		merch.Price,
		merch.Description,
		merch.ImageURL,
		merch.BandcampURL,
	).Scan(
		&created.ID,
		&created.Price,
		&created.Description,
		&created.ImageURL,
		&created.BandcampURL,
	)
	if err != nil {
		return nil, err
	}

	return &created, nil
}

func UpdateMerch(ctx context.Context, db *pgxpool.Pool, id int64, merch *models.Merch) (*models.Merch, error) {
	var updated models.Merch
	query := `
		UPDATE merch
		SET price=$1, description=$2, imageurl=$3, bandcampurl=$4
		WHERE id=$5
		RETURNING id, price, description, imageurl, bandcampurl
	`

	err := db.QueryRow(ctx, query,
		merch.Price,
		merch.Description,
		merch.ImageURL,
		merch.BandcampURL,
		id,
	).Scan(
		&updated.ID,
		&updated.Price,
		&updated.Description,
		&updated.ImageURL,
		&updated.BandcampURL,
	)
	if err != nil {
		return nil, err
	}

	return &updated, nil
}

func DeleteMerch(ctx context.Context, db *pgxpool.Pool, id int64) error {
	_, err := db.Exec(ctx, "DELETE FROM merch WHERE id=$1", id)
	return err
}

func GetMerchByID(ctx context.Context, db *pgxpool.Pool, id int64) (*models.Merch, error) {
	var merch models.Merch
	query := `
		SELECT id, price, description, imageurl, bandcampurl
		FROM merch
		WHERE id=$1
	`

	err := db.QueryRow(ctx, query, id).Scan(
		&merch.ID,
		&merch.Price,
		&merch.Description,
		&merch.ImageURL,
		&merch.BandcampURL,
	)
	if err != nil {
		return nil, err
	}

	return &merch, nil
}

func ListMerch(ctx context.Context, db *pgxpool.Pool) ([]models.Merch, error) {
	query := `
		SELECT id, price, description, imageurl, bandcampurl
		FROM merch
		ORDER BY id ASC
	`

	rows, err := db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []models.Merch
	for rows.Next() {
		var merch models.Merch
		if err := rows.Scan(
			&merch.ID,
			&merch.Price,
			&merch.Description,
			&merch.ImageURL,
			&merch.BandcampURL,
		); err != nil {
			return nil, err
		}
		items = append(items, merch)
	}

	if rows.Err() != nil {
		return nil, rows.Err()
	}

	return items, nil
}

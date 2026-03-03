package service

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/qinflan/dog-lips-site/server/models"
)

func CreateShow(ctx context.Context, db *pgxpool.Pool, show *models.Show) (*models.Show, error) {
	var created models.Show
	query := `
		INSERT INTO shows (date, venue, city, state, address, time, price, ticketurl, flyer)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id, date, venue, city, state, address, time, price, ticketurl, flyer
	`

	err := db.QueryRow(ctx, query,
		show.Date,
		show.Venue,
		show.City,
		show.State,
		show.Address,
		show.Time,
		show.Price,
		show.TicketsURL,
		show.Flyer,
	).Scan(
		&created.ID,
		&created.Date,
		&created.Venue,
		&created.City,
		&created.State,
		&created.Address,
		&created.Time,
		&created.Price,
		&created.TicketsURL,
		&created.Flyer,
	)
	if err != nil {
		return nil, err
	}

	return &created, nil
}

func UpdateShow(ctx context.Context, db *pgxpool.Pool, id int64, show *models.Show) (*models.Show, error) {
	var updated models.Show
	query := `
		UPDATE shows
		SET date=$1, venue=$2, city=$3, state=$4, address=$5, time=$6, price=$7, ticketurl=$8, flyer=$9
		WHERE id=$10
		RETURNING id, date, venue, city, state, address, time, price, ticketurl, flyer
	`

	err := db.QueryRow(ctx, query,
		show.Date,
		show.Venue,
		show.City,
		show.State,
		show.Address,
		show.Time,
		show.Price,
		show.TicketsURL,
		show.Flyer,
		id,
	).Scan(
		&updated.ID,
		&updated.Date,
		&updated.Venue,
		&updated.City,
		&updated.State,
		&updated.Address,
		&updated.Time,
		&updated.Price,
		&updated.TicketsURL,
		&updated.Flyer,
	)
	if err != nil {
		return nil, err
	}

	return &updated, nil
}

func DeleteShow(ctx context.Context, db *pgxpool.Pool, id int64) error {
	_, err := db.Exec(ctx, "DELETE FROM shows WHERE id=$1", id)
	return err
}

func GetShowByID(ctx context.Context, db *pgxpool.Pool, id int64) (*models.Show, error) {
	var show models.Show
	query := `
		SELECT id, date, venue, city, state, address, time, price, ticketurl, flyer
		FROM shows
		WHERE id=$1
	`

	err := db.QueryRow(ctx, query, id).Scan(
		&show.ID,
		&show.Date,
		&show.Venue,
		&show.City,
		&show.State,
		&show.Address,
		&show.Time,
		&show.Price,
		&show.TicketsURL,
		&show.Flyer,
	)
	if err != nil {
		return nil, err
	}

	return &show, nil
}

func ListShows(ctx context.Context, db *pgxpool.Pool) ([]models.Show, error) {
	query := `
		SELECT id, date, venue, city, state, address, time, price, ticketurl, flyer
		FROM shows
		ORDER BY date ASC
	`

	rows, err := db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var shows []models.Show
	for rows.Next() {
		var show models.Show
		if err := rows.Scan(
			&show.ID,
			&show.Date,
			&show.Venue,
			&show.City,
			&show.State,
			&show.Address,
			&show.Time,
			&show.Price,
			&show.TicketsURL,
			&show.Flyer,
		); err != nil {
			return nil, err
		}
		shows = append(shows, show)
	}

	if rows.Err() != nil {
		return nil, rows.Err()
	}

	return shows, nil
}

package models

import "time"

type Show struct {
	ID         int64
	Date       time.Time
	Venue      string
	City       string
	State      string
	Address    string
	Time       string
	Price      *string
	TicketsURL *string
	FlyerURL   *string
}

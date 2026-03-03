-- +goose Up
-- Consolidated migration for production database
-- Combines all migrations from August 2025 through March 2026

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create shows table with all updates applied
CREATE TABLE IF NOT EXISTS shows (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    venue VARCHAR(250) NOT NULL,
    city VARCHAR(250) NOT NULL,
    state VARCHAR(100) NOT NULL,
    address VARCHAR(250),
    time VARCHAR(25) NOT NULL,
    price VARCHAR(10),
    ticketUrl VARCHAR(255),
    flyer VARCHAR(255)
);

-- Create merch table
CREATE TABLE IF NOT EXISTS merch (
    id SERIAL PRIMARY KEY,
    price VARCHAR(10),
    description VARCHAR(100),
    imageUrl VARCHAR(255),
    bandcampUrl VARCHAR(255)
);

-- +goose Down
-- Rollback all tables
DROP TABLE IF EXISTS merch;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS users;

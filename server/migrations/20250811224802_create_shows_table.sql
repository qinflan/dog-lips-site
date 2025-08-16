-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS shows (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    city VARCHAR(250) NOT NULL,
    state VARCHAR(2) NOT NULL,
    address VARCHAR(250) NOT NULL,
    time VARCHAR(25) NOT NULL,
    price VARCHAR(10),
    ticketUrl VARCHAR(255),
    flyerUrl VARCHAR(255)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE shows;
-- +goose StatementEnd

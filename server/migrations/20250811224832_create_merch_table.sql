-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS merch (
    id SERIAL PRIMARY KEY,
    price VARCHAR(10),
    description VARCHAR(100),
    imageUrl VARCHAR(255),
    bandcampUrl VARCHAR(255)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE merch;
-- +goose StatementEnd

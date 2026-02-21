-- +goose Up
-- +goose StatementBegin
ALTER TABLE shows
    ADD COLUMN IF NOT EXISTS venue VARCHAR(250) NOT NULL DEFAULT '';

ALTER TABLE shows
    ALTER COLUMN state TYPE VARCHAR(100);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE shows
    ALTER COLUMN state TYPE VARCHAR(2);

ALTER TABLE shows
    DROP COLUMN IF EXISTS venue;
-- +goose StatementEnd

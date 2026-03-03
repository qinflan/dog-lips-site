-- +goose Up
-- Rename flyerurl column to flyer and make address optional
ALTER TABLE shows RENAME COLUMN flyerurl TO flyer;
ALTER TABLE shows ALTER COLUMN address DROP NOT NULL;

-- +goose Down
-- Revert the changes
ALTER TABLE shows RENAME COLUMN flyer TO flyerurl;
ALTER TABLE shows ALTER COLUMN address SET NOT NULL;

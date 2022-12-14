CREATE TABLE IF NOT EXISTS reservations(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    unit_id BIGINT REFERENCES units(id) ON DELETE CASCADE NOT NULL,
    guest_name TEXT NOT NULL,
    check_in TIMESTAMP NOT NULL,
    check_out TIMESTAMP NOT NULL,
    is_cancelled BOOLEAN DEFAULT False NOT NULL
);

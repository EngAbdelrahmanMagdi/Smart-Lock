CREATE TABLE IF NOT EXISTS access_code(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    lock_id BIGINT REFERENCES locks(id) ON DELETE CASCADE NOT NULL,
    reservation_id BIGINT REFERENCES reservations(id) ON DELETE CASCADE NOT NULL,
    access_code TEXT UNIQUE NOT NULL,
    passcode TEXT UNIQUE NOT NULL,
    access_code_id TEXT UNIQUE NOT NULL,
    remote_passcode_id TEXT UNIQUE NOT NULL
);
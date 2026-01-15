CREATE TABLE IF NOT EXISTS predictions (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255),
    label VARCHAR(50),
    confidence FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
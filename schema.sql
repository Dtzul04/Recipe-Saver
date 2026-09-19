CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  prep_time_minutes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

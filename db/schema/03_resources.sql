DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  media_url TEXT NOT NULL,
  is_video BOOLEAN,
  thumbnail VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

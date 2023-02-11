DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(255) NOT NULL,
  media_url VARCHAR(255) NOT NULL,
  is_video BOOLEAN NOT NULL,
  is_private BOOLEAN NOT NULL,
  thumbnail VARCHAR(255),
  created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

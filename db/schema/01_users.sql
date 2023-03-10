DROP TABLE IF EXISTS widgets CASCADE; -- Gets rid of the widgets table that was given at the beginning
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255),
  bio VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

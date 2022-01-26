-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
-- Your tables should contain at least three fields (including id). Try experimenting with different field types in Postgres.

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL, 
  company TEXT NOT NULL
);

DROP TABLE IF EXISTS funkos;

CREATE TABLE funkos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL, 
  association TEXT NOT NULL, 
  hair TEXT NOT NULL
);


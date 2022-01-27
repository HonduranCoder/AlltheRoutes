-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
-- Your tables should contain at least three fields (including id). 

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

DROP TABLE IF EXISTS dogs;

CREATE TABLE dogs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL, 
  breed TEXT NOT NULL, 
  coat TEXT NOT NULL
);

DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL, 
  author TEXT NOT NULL, 
  cover TEXT NOT NULL
);

DROP TABLE IF EXISTS flowers;

CREATE TABLE flowers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  center TEXT NOT NULL,
  petals TEXT NOT NULL
);
CREATE DATABASE foodfy;

CREATE TABLE chefs (
  id INTEGER PRIMARY KEY UNIQUE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP
);

CREATE TABLE recipes (
  id INTEGER PRIMARY KEY UNIQUE,
  chef_id INTEGER,
  image TEXT,
  title TEXT,
  ingredients TEXT[],
  preparation TEXT[],
  information TEXT,
  created_at TIMESTAMP,
  FOREIGN KEY(chef_id) REFERENCES chefs(id)
);
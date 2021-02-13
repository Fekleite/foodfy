CREATE DATABASE foodfy;

CREATE TABLE chefs (
  id INTEGER PRIMARY KEY UNIQUE,
  name TEXT,
  file_id INTEGER,
  created_at TIMESTAMP DEFAULT (now()),
  FOREIGN KEY(id) REFERENCES files(id)
);

CREATE TABLE recipes (
  id INTEGER PRIMARY KEY UNIQUE,
  chef_id INTEGER,
  title TEXT,
  ingredients TEXT[],
  preparation TEXT[],
  information TEXT,
  created_at TIMESTAMP DEFAULT (now()),
  FOREIGN KEY(chef_id) REFERENCES chefs(id)
);

CREATE TABLE recipe_files (
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT NOT NULL,
  recipe_id INTEGER,
  FOREIGN KEY(recipe_id) REFERENCES recipes(id),
);

CREATE TABLE chef_files (
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT NOT NULL,
  chef_id INTEGER,
  FOREIGN KEY(chef_id) REFERENCES chefs(id),
);

-- initialise sh-todo-pern database

CREATE DATABASE sh_todo_pern;

\c sh_todo_pern;

CREATE TABLE IF NOT EXISTS todos(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL ,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

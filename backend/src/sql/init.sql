-- initialise sh-todo-pern database
-- this sql is not necessary
-- as sequelize will create the tables

CREATE DATABASE sh_todo_pern;

\c sh_todo_pern;

CREATE TABLE IF NOT EXISTS public."Todos" (
	"id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "Todos_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Users"(
  "id" uuid NOT NULL,
  "username" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  CONSTRAINT "Users_pkey" PRIMARY KEY (id)
);

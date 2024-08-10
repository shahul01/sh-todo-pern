"use strict";
// /model: model + associations from index → /controller → /routes → /backend

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import UserModel from './user.model.js';
import TodoModel from './todo.model.js';

dotenv.config();


// db connection
const sequelize =  new Sequelize({
  dialect: 'postgres',
  database: 'sh_todo_pern',
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  host: 'localhost',
  port: 5432
});

// Model connections to db / sequelize sessions
const models = {
  User: UserModel(sequelize),
  Todo: TodoModel(sequelize)
};
const { User, Todo } = models;

// apply associations in model definition
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) models[modelName].associate(models);
});


// export sequelize session and connected models
export {
  sequelize,
  User,
  Todo
};

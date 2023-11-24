"use strict";

import { Sequelize } from 'sequelize';
import UserModel from './user.model.js';
import TodoModel from './todo.model.js';

// /model: model + associations from index → /controller → /routes → /backend

// db connection
const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'sh_todo_pern',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432
});

// Model connections to db / sequelize sessions
const User = UserModel(sequelize);
const Todo = TodoModel(sequelize);


// export sequelize session and connected models
export {
  sequelize,
  User,
  Todo
};

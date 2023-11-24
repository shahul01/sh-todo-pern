"use strict";

import { Sequelize } from 'sequelize';
// import Todo from './todo.model.js';

// /model: index → todo → /controller → /routes → /backend

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'sh_todo_pern',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432
});

// initialize models with sequelize session
// Todo(sequelize, Sequelize.DataTypes);


// add associations here


// export sequelize session
export {
  sequelize
};

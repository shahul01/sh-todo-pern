import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initRoutes } from './routes/index.js';
import { sequelize } from './models/index.js';

dotenv.config();
const app = express();
const port = 8000;

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


initRoutes(app);

// {force: true} will drop all tables and recreate them everytime the server starts
// refer - gpt, https://sebhastian.com/sequelize-create-table/
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  // return
});

import express from 'express';
import cors from 'cors';
import { initRoutes } from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));





initRoutes(app);


sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

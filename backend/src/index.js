import express from 'express';
import { initRoutes } from './routes/index.js';


const app = express();
const port = 8000;


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

initRoutes(app);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

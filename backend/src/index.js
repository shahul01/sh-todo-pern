import express from 'express';
import cors from 'cors';
import { initRoutes } from './routes/index.js';


const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

initRoutes(app);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

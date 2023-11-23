import express from 'express';


const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  console.log('Home page')
  res.status(200).send('Home page');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

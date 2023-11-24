import { simpleUUID } from '../utils/index.js';


// app.get('/', (req, res) => {
//   console.log('Home page')
//   res.status(200).send('Server is up and running.');
// });


const todoData = [
  { id: simpleUUID(), title: 'hello', description: 'there' },
  { id: simpleUUID(), title: 'goodbye', description: 'then' },
];

export const getTodos = (req, res) => {
  try {
    res.status(200).json(todoData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message});
  };

};

export default {
  getTodos,
}

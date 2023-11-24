import { simpleUUID } from '../utils/index.js';


// app.get('/', (req, res) => {
//   console.log('Home page')
//   res.status(200).send('Server is up and running.');
// });


let todoData = [
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

export const addTodo = (req, res) => {
  try {

    const { body } = req;
    todoData.push(body);

    res.status(200).json({ message: `Todo added successfully with title ${body?.title}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message });
  }
}

export const deleteTodo = (req, res) => {
  try {
    const reqId = req.params.id;

    todoData = todoData.filter((todo) => {
      return todo.id !== reqId;
    })

    res.status(200).json({ message: `Todo deleted successfully of id ${reqId}`});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message });
  }
}

export default {
  getTodos,
  addTodo,
  deleteTodo
}

import { Todo } from '../models/index.js';


// app.get('/', (req, res) => {
//   console.log('Home page')
//   res.status(200).send('Server is up and running.');
// });

// let todoData = [
//   { id: simpleUUID(), title: 'hello', description: 'there' },
//   { id: simpleUUID(), title: 'goodbye', description: 'then' },
// ];

// router.get('/')
const getTodos = async (req, res) => {
  try {

    const todos = await Todo.findAll();
    res.status(200).json(todos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message });
  };

};

// router.post('/')
const addTodo = async (req, res) => {
  try {

    const { body } = req;
    await Todo.create(body);

    res.status(200).json({ message: `Todo added successfully with title ${body?.title}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message });
  };
};

// router.delete('/:id')
const deleteTodo = async (req, res) => {
  try {

    const reqId = req.params.id;
    await Todo.destroy({
      where: {
        id: reqId
      }
    })

    res.status(200).json({ message: `Todo deleted successfully of id ${reqId}`});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message });
  };
};

export default {
  getTodos,
  addTodo,
  deleteTodo
};

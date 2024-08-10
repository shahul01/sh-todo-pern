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
    const { decodedUserId } = req;

    const todos = await Todo.findAll({
      where: { userId: decodedUserId },
    });

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
    const todoWithUser = { ...body, userId: req.decodedUserId };
    const { dataValue: { title: createdTodoTitle } } = await Todo.create(todoWithUser);

    res
      .status(200)
      .json({ message: `Todo added successfully with title ${createdTodoTitle}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error. ' + error.message });
  };
};

// router.delete('/:id')
const deleteTodo = async (req, res) => {
  try {
    const { params: { id: reqId }, decodedUserId } = req;

    const {dataValue: { id: deletedTodoId }} = await Todo.destroy({
      where: {
        userId: decodedUserId,
        id: reqId,
      }
    });

    res.status(200).json({ message: `Todo deleted successfully. Id - ${deletedTodoId}`});

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

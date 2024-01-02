"use client";

import { useCallback, useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { backendBase } from '@/app/utils/constant';
import toast, { toastConfig } from 'react-simple-toasts';
import styles from './todos.module.css';

type TodosProps = {

};

type Todo = {
  id?: string;
  title: string;
  description: string;
}


const Todos:TodosProps = (props:any) => {
  const {  } = props;

  const [ todoAnimRef ] = useAutoAnimate({
    disrespectUserMotionPreference: true
  });
  toastConfig({
    position: 'top-center',
    duration: 3000,
    className: 'custom-toast'
  });

  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ newTodoTitle, setNewTodoTitle ] = useState('');

  function errorChecker(res:Response) {
    if (res.status.toString().startsWith('4'||'5')) {
      throw new Error(res.statusText);
    };
  };

  async function fetchTodos() {

    const getTodos = await fetch(`${backendBase}/todos`, {
      method: 'GET',
      credentials: 'include'
    });
    // console.log(`getTodos: `, getTodos);
    errorChecker(getTodos);
    const resGet = await getTodos.json();
    return resGet;
  };

  async function addTodos(addTodoData:Todo) {
    const addTodo = await fetch(`${backendBase}/todos`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addTodoData)
    });
    errorChecker(addTodo);
    const resAdd = await addTodo.json();

    return resAdd;
  }

  async function deleteTodos(id:string) {
    const deleteTodos = await fetch(`${backendBase}/todos/${id}`, {
      method: "DELETE",
      credentials: 'include'
    });
    errorChecker(deleteTodos);
    const resDelete = await deleteTodos.json();

    return resDelete;
  };

  const fetchTodosToState = useCallback(async () => {
    let fetchedTodos = [];

    try {
      fetchedTodos = await fetchTodos();
    } catch ( error ) {
      toast(`Error when fetching todos. ${error}`);
    };


    if (fetchedTodos.length) {
      setTodos(fetchedTodos);
    };
  }, []);

  async function handleAdd() {
    const newTodo = {
      // id: simpleUUID(),
      title: newTodoTitle,
      description: '',
    };

    try {
      const addedTodos = await addTodos(newTodo);
      console.log(`addedTodos: `, addedTodos);
      setNewTodoTitle('');

    } catch (error) {
      console.error(`sh-error: `, error);
      toast(`Error when adding todo. Try again later. ${error}`);
    }

    return fetchTodosToState();

  };

  async function handleDelete(id:string) {
    try {
      await deleteTodos(id);
    } catch(error) {
      console.error(error);
      toast(`Error when deleting todo. Try again later. ${error}`);
    }

    return fetchTodosToState();
  };


  useEffect(() => {
    fetchTodosToState();

  }, [fetchTodosToState]);


  return (
    <div className={styles['todos']}>
    <div className={styles['todo-app']}>
      <div className={styles['input-btn']}>
        <input type='text' value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} />
        <button type='button' onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className={styles['todos-container']} ref={todoAnimRef}>
        {
          todos.map(todo => (
            <div key={todo.id} className={styles['todo']}>
              <div key={todo.id} className={styles['todo-title']}>
                <span>{todo.title}</span>
              </div>

              <div className={styles['action-btns']}>
                <button type='button' onClick={() => handleDelete(todo?.id||'')}>
                  Delete
                </button>
              </div>
            </div>
          ))
        }
      </div>

    </div>


    </div>
  )
};


export default Todos;

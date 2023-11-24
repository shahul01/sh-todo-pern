"use client";

import { useCallback, useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import toast from 'react-simple-toasts';
import styles from './page.module.css';

type Todo = {
  id?: string;
  title: string;
  description: string;
}

export default function Home() {

  const [ todoAnimRef ] = useAutoAnimate({
    disrespectUserMotionPreference: true
  });

  function simpleUUID():string {
    return Math.random().toString().split('.')[1];
  };

  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ newTodoTitle, setNewTodoTitle ] = useState('');

  async function fetchTodos() {
    const getTodos = await fetch('http://localhost:8000/todos');
    const resGet = await getTodos.json();

    return resGet;
  };

  async function addTodos(addTodoData:Todo) {
    const addTodo = await fetch('http://localhost:8000/todos', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addTodoData)
    });
    const resAdd = await addTodo.json();

    return resAdd;
  }

  async function deleteTodos(id:string) {
    const deleteTodos = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE"
    });
    const resDelete = await deleteTodos.json();

    return resDelete;
  };

  const fetchTodosToState = useCallback(async () => {
    let fetchedTodos = [];

    try {
      fetchedTodos = await fetchTodos();
    } catch ( error ) {
      console.error(error);
      toast('Error when fetching todos. Try again later.');
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
      // console.log(`addedTodos: `, addedTodos);

    } catch (error) {
      console.error(`sh-error: `, error);
      toast('Error when adding todo. Try again later.');
    }

    return fetchTodosToState();

  };

  async function handleDelete(id:string) {
    try {
      await deleteTodos(id);
    } catch(error) {
      console.error(error);
      toast('Error when deleting todo. Try again later.');
    }

    return fetchTodosToState();
  };


  useEffect(() => {
    fetchTodosToState();
    console.log('runs');
  }, [fetchTodosToState]);


  return (
    <main className={styles['main']}>
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
                  <button type='button' onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </main>
  )
}

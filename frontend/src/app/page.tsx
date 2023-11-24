"use client";

import { useCallback, useEffect, useState } from 'react';
import styles from './page.module.css';

type Todo = {
  id: string;
  title: string;
  description: string;
}

export default function Home() {

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

  async function deleteTodos(id:string) {
    const deleteTodos = await fetch(`http://localhost:8000/todos/${id}`, {
      method: 'DELETE'
    });
    const resDelete = await deleteTodos.json();

    return resDelete;
  };

  const fetchTodosToState = useCallback(async () => {
    const fetchedTodos = await fetchTodos();
    setTodos(fetchedTodos);
  }, []);

  function handleAdd() {
    const newTodo = {
      id: simpleUUID(),
      title: newTodoTitle,
      description: '',
    };

    setTodos(prev => [...prev, newTodo]);
  };

  async function handleDelete(id:string) {
    const removeTodos =  await deleteTodos(id);

    return fetchTodosToState();
  };


  useEffect(() => {
    fetchTodosToState();

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

        <div className={styles['todos-container']}>
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

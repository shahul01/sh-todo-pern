'use client';

import { useState } from 'react';
import styles from './page.module.css';

type Todo = {
  id: string;
  title: string;
  description: string;
}

export default function Home() {

  function simpleUUID():string {
    return Math.random().toString().split('.')[1];

  }

  const [ todos, setTodos ] = useState<Todo[]>([
    { id: simpleUUID(), title: 'hello', description: 'there' },
    { id: simpleUUID(), title: 'goodbye', description: 'then' },
  ]);
  const [ newTodoTitle, setNewTodoTitle ] = useState('');

  function handleAdd() {
    const newTodo = {
      id: simpleUUID(),
      title: newTodoTitle,
      description: '',
    };

    setTodos(prev => [...prev, newTodo]);
  };

  function handleDelete(id:string) {
    setTodos(prevTodos => (
      prevTodos.filter(todo => todo.id !== id)
    ));
  };


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

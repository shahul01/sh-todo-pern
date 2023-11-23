import styles from './page.module.css';

type Todo = {
  id: string;
  title: string;
  description: string;
}

export default function Home() {

  const datas = [
    { id: '1', title: 'hello', description: 'there' },
    { id: '2', title: 'goodbye', description: 'then' },
  ];


  return (
    <main className={styles['main']}>
      <div className={styles['todo-app']}>
        <div className={styles['input-btn']}>
          <input type='text' />
          <button type='button'>Add</button>
        </div>

        <div className={styles['todos-container']}>
          {
            datas.map(todo => (
              <div key={todo.id} className={styles['todo']}>
                <div className={styles['todo-title']}>
                  <span>{todo.title}</span>
                </div>

                <div className={styles['action-btns']}>
                  <button type='button'>Delete</button>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </main>
  )
}

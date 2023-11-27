"use client";

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { useCookies } from 'react-cookie';
import Navbar from '@/app/_components/LayoutUI/Navbar/Navbar';
import { Providers } from '@/lib/providers';
import {
  authSlice,
  useDispatch,
  reduxStore,
} from '@/lib/redux';
import styles from './layout.module.css';
import './globals.css';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'sh-todo-pern',
//   description: 'Todo project with MERN and NextJS',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const dispatch = useDispatch();
  const [cookies] = useCookies(['token']);
  const {setIsAuth} = authSlice.actions;

  function checkAuth() {
    if (cookies.token) {
      console.log('cookie', cookies.token);
      // normal method of updating state doesnt work.
      // dispatch(authSlice.actions.setIsAuth(false));
    };

    reduxStore.dispatch(setIsAuth(true));

  };


  useEffect(() => {
    checkAuth();

  }, [cookies.token]);

  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className={styles['navbar-container']}>
            <Navbar />
          </div>
          <div className={styles['children-container']}>
            {children}
          </div>
        </body>
      </html>
    </Providers>
  )
};

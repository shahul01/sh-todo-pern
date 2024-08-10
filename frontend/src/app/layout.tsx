"use client";

import { Inter } from 'next/font/google';
// import type { Metadata } from 'next';
import { useCookies } from 'react-cookie';
import { useCallback, useEffect } from 'react';
import Navbar from '@/app/_components/LayoutUI/Navbar/Navbar';
import { Providers } from '@/lib/providers';
import {
  authSlice,
  reduxStore,
} from '@/lib/redux';
import styles from './layout.module.css';
import './globals.css';

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
  const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME || 'token';
  const [ cookies, ..._rest ] = useCookies([tokenName]);
  const {setIsAuth} = authSlice.actions;

  const checkAuth = useCallback(() => {
    if (cookies[tokenName]) reduxStore.dispatch(setIsAuth(true));

  }, [cookies, setIsAuth, tokenName]);

  useEffect(() => {
    checkAuth();

  }, [checkAuth, cookies]);


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

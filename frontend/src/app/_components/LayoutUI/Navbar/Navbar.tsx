import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  useSelector,
  selectIsAuth
} from '@/lib/redux';
import SignOut from '../../Auth/SignOut/SignOut';
import styles from './navbar.module.css';


type NavbarProps = {

};


const Navbar:NavbarProps = (props:{}) => {
  const {  } = props;
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className={styles['navbar']}>
      <div className={styles['logo']}>
        <h2><Link href='/'>Todo</Link></h2>
      </div>
      <div className={styles['links']}>
        <Link href='/'>Home</Link>
        <Link href='/todos'>Todos</Link>
        {
          isAuth
          ? <SignOut />
          : <Link href='/auth/sign-in'>Sign In</Link>
        }
      </div>

    </div>
  )
};


export default Navbar;

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './navbar.module.css';


type NavbarProps = {

};


const Navbar:NavbarProps = (props) => {
  const {  } = props;

  return (
    <div className={styles['navbar']}>
      <div className={styles['logo']}>
        <h2><Link href='/'>Todo</Link></h2>
      </div>
      <div className={styles['links']}>
        <Link href='/'>Home</Link>
        <Link href='/todos'>Todos</Link>
        <Link href='/auth/sign-in'>SignIn</Link>
      </div>

    </div>
  )
};


export default Navbar;

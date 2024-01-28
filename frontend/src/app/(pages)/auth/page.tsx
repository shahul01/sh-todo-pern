"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


type AuthProps = {

};


const Auth:AuthProps = (props:{}) => {
  const {  } = props;
  const router = useRouter();

  // redirect
  (() => {
    setTimeout(() => {
      router.push('/auth/sign-in');
    }, 800);
  })();

  return (
    <div className='auth'>
      <p>Redirecting to sign in...</p>

    </div>
  )
};


export default Auth;

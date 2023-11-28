import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


type AuthProps = {

};


const Auth:AuthProps = (props:{}) => {
  const {  } = props;
  const router = useRouter();

  router.push('/auth/sign-in');

  return (
    <div className='auth'>
      <p>Redirecting...</p>

    </div>
  )
};


export default Auth;

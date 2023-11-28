import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import toast, { toastConfig } from 'react-simple-toasts';
import { useEffect, useState } from 'react';
import {
  authSlice,
  useDispatch,
} from '@/lib/redux';


type SignOutProps = {

};


const SignOut:SignOutProps = (props:{}) => {
  const {  } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const [ cookies, setCookie, removeCookie ] = useCookies(['token']);

  toastConfig({
    position: 'top-center',
    duration: 3000,
    className: 'custom-toast'
  });

  async function postForm():Promise<Record<string,string>> {
    const postReq = await fetch('/api/auth/sign-out');
    const postJson = await postReq.json();
    const resPost = postJson.data;
    return resPost;
  };

  async function handleSignOut() {
    const resPost = await postForm();

    if (resPost) {
      dispatch(authSlice.actions.setIsAuth(false));
      console.log('Auth: Removing Token');

      // TODO: check if it automatically removes token for production
      if (process.env.NODE_ENV === 'development') {
        const tokenR = removeCookie('token', {path: '/'});
      };

      // TODO: check if cookies removed properly
      toast('Signed out successfully. Redirecting...');
      setTimeout(() => {
        router.push('/auth/sign-in')
      }, 800);

    };
  };


  return (
    <div className='sign-out'>
      <p
        style={{
          textDecoration: 'underline',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={handleSignOut}
      >
      Sign Out
      </p>

    </div>
  )
};


export default SignOut;

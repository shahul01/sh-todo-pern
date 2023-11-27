import { useEffect, useState } from 'react';
import {
  authSlice,
  useDispatch,
} from '@/lib/redux';
import { useCookies } from 'react-cookie';
import toast, { toastConfig } from 'react-simple-toasts';


type SignOutProps = {

};


const SignOut:SignOutProps = (props:{}) => {
  const {  } = props;

  const [ cookies, setCookie, removeCookie ] = useCookies('token');
  const dispatch = useDispatch();

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

    console.log(`resPost: `, resPost);
    if (resPost) {
      dispatch(authSlice.actions.setIsAuth(false));

      // TODO: check if it automatically removes token for production
      if (process.env.NODE_ENV === 'development') {
        const tokenR = removeCookie('token');

      };

      toast('Signed out successfully.');

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

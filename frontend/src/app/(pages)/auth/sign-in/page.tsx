"use client";

import Link from 'next/link';
import { useCookies } from 'react-cookie';
import toast, { toastConfig } from 'react-simple-toasts';
import { useEffect, useState } from 'react';
import {
  authSlice,
  useDispatch,
  useSelector,
  selectIsAuth
} from '@/lib/redux';
import styles from './signIn.module.css';

type ModelUser = {
  username: string;
  password: string;
};

type SignInProps = {

};


const SignIn:SignInProps = (props:{}) => {
  const {  } = props;

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [ cookies, setCookie, removeCookie ] = useCookies(['token']);
  toastConfig({
    position: 'top-center',
    duration: 3000,
    className: 'custom-toast'
  });

  const initialForm:ModelUser = {
    username: '',
    password: '',
  };

  const [ form, setForm ] = useState(initialForm);
  // {isValid: false, error: ''}
  const [ isValid, setIsValid ] = useState(true);

  function handleChangeForm(e:React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  function validate() {
    const { username, password  } = form;

    if (!username || !password) {
      return setIsValid(false);
    };

    // if (username.length <= 3 || password.length <= 3) {
    //   return false;
    // }

    return setIsValid(true);
  };

  // TODO: Make this a module
  async function postForm():Promise<Record<string, string>> {
    const postReq = await fetch('/api/auth/sign-in',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    });

    const postJson = await postReq.json();
    const resPost = postJson.data;

    return resPost;
  };

  async function handleSubmit() {
    validate();
    if (!isValid) return;

    const resPost = await postForm();

    if (resPost.token) {
      dispatch(authSlice.actions.setIsAuth(true));

      // manually set cookies for dev env as its not set by Chrome
      if (process.env.NODE_ENV === 'development') {
        setCookie('token', resPost.token);

        // check
        const tkn = cookies?.token;
        console.log(`tkn: `, tkn);
      };


      toast('Signed in successfully.');

    };

  };

  useEffect(() => {
    // console.log(`## cookies.token: `, cookies.token);
  }, [cookies]);

  useEffect(() => {
    // console.log(`isAuth: `, isAuth);

  }, [isAuth]);



  return (
    <div className={styles['sign-in']}>

      <h1>SignIn</h1>
      <h3 className={styles['error-text']}>
        {!isValid && 'Form has error'}
      </h3>
      <div className={styles['form-container']}>
        <div className={styles['inputs']}>
          <input
            type='text'
            placeholder='Username'
            required={true}
            name='username'
            value={form.username}
            onChange={handleChangeForm}
          />
          <input
            type='password'
            placeholder='Password'
            required={true}
            name='password'
            value={form.password}
            onChange={handleChangeForm}
          />

        </div>
        <div className={styles['buttons']}>
          <button type='submit' onClick={handleSubmit}>
            SignIn
          </button>
        </div>
        <div className={styles['helper']}>
          <span>New here? </span>
          <span>
            <Link
                href="/auth/sign-up"
                style={{textDecoration: 'underline'}}
              >
              SignUp
            </Link>
          </span>
        </div>

      </div>


    </div>
  )
};


export default SignIn;

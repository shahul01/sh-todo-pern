"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './signUp.module.css';


type ModelUser = {
  username: string;
  password: string;
};

type SignUpProps = {

};


const SignUp:SignUpProps = (props: {}) => {
  const {  } = props;

  const initialForm = {
    username: '',
    password: '',
    rePassword: ''
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
    const { username, password, rePassword  } = form;

    if (!username || !password || !rePassword) {
      return setIsValid(false);
    };

    // if (username.length <= 3 || password.length <= 3) {
    //   return false;
    // }

    if (password !== rePassword) {
      return setIsValid(false);
    };

    return setIsValid(true);
  };

  async function handleSubmit() {
    validate();
    if (!isValid) return;

    const postReq = await fetch('/api/auth/sign-up',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    });

    const resPost = await postReq.json();
    const resData = resPost.data;
    console.log(`submittedFormData: `, resData);

  };

  return (
    <div className={styles['sign-up']}>
      <h1>SignUp</h1>
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
          <input
            type='password'
            placeholder='Re-enter password'
            required={true}
            name='rePassword'
            value={form.rePassword}
            onChange={handleChangeForm}
          />

        </div>
        <div className={styles['buttons']}>
          <button type='submit' onClick={handleSubmit}>
            SignUp
          </button>
        </div>
        <div className={styles['helper']}>
          <span>Already have an account? </span>
          <span>
            <Link
                href="/auth/sign-in"
                style={{textDecoration: 'underline'}}
              >
              SignIn
            </Link>
          </span>
        </div>

      </div>

    </div>
  )
};


export default SignUp;

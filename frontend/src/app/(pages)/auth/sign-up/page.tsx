"use client";

import Link from 'next/link';
import { ChangeEventHandler, InputHTMLAttributes, SetStateAction, useState } from 'react';


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

    // if (username.length <= 3 || password.length <= 3) {
    //   return false;
    // }

    if (password !== rePassword) {
      return setIsValid(false);
    }

    return setIsValid(true);
  };

  async function handleSubmit() {
    validate();
    console.log(`formData: `, form);
    if (!isValid) return;
  };

  return (
    <div className='sign-up'>
      <h1>SignUp</h1>
      <h3>{!isValid && 'Form has error'}</h3>
      <div className='form-container'>
        <div className='inputs'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={form.username}
            onChange={handleChangeForm}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={form.password}
            onChange={handleChangeForm}
          />
          <input
            type='password'
            placeholder='Re-enter password'
            name='rePassword'
            value={form.rePassword}
            onChange={handleChangeForm}
          />

        </div>
        <div className='buttons'>
          <button type='submit' onClick={handleSubmit}>
            SignUp
          </button>
        </div>
        <div className='helper'>
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

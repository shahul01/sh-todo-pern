import Link from 'next/link';
import { useEffect, useState } from 'react';


type SignUpProps = {

};


const SignUp:SignUpProps = (props) => {
  const {  } = props;

  return (
    <div className='sign-up'>
      <h1>SignUp</h1>
      <div className="form-container">
        <div className="inputs">

        </div>
        <div className="buttons">

        </div>
        <div className="helper">
          <span>Already have an account? </span>
          <span>
            <Link href="/auth/sign-in">SignIn</Link>
          </span>
        </div>
      </div>

    </div>
  )
};


export default SignUp;

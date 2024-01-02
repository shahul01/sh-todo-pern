"use client";

import { useEffect, useState } from 'react';
import { backendBase } from '@/app/utils/constant';


const page = () => {
  const [ result, setResult ] = useState('');

  async function fetchBackendTest() {
    const getTest = await fetch(`${backendBase}/test`, {
      method: 'GET'
    });
    const resTest = await getTest.json();
    console.log(`resTest: `, resTest);
    return resTest;
  };

  async function updateResultState() {
    setResult(await fetchBackendTest());
  };

  useEffect(() => {
    updateResultState();
  }, []);


  return (
    <div className='page'>
      <p>Testing:</p>
      <p>{JSON.stringify(result)}</p>
    </div>
  )
};


export default page;

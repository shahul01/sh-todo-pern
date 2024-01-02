"use client";

import { useEffect, useState } from 'react';


const page = () => {
  const [ result, setResult ] = useState('');

  async function fetchBackendTest() {
    const getTest = await fetch('http://localhost:8000/test', {
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

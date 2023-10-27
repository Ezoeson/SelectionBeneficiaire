import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateAccountMutation } from '../../redux/slices/userApiSlice';
import Slide from '../Swiper/Slide';

const CheckCode = ({ pseudo, code: code_user, passowrd, email }) => {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [createAccount, { isError, isSuccess, isLoading }] =
    useCreateAccountMutation();
  const [code, setCode] = useState('');
  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      const clerkId = completeSignUp.createdUserId;

      const res = await createAccount({
        pseudo,
        code: code_user,
        password: passowrd,
        email,
        clerkId,
      }).unwrap();
      navigate('/');

      if (completeSignUp.status !== 'complete') {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <div className='col-[2]'>
      <h2 className='pl-4 mt-8 text-center font-bold text-3xl py-5 tracking-wide text-indigo-700'>
        <TypeAnimation
          sequence={['', 1000, 'Code email', 1000]}
          wrapper='span'
          speed={10}
          style={{
            fontSize: '',
            display: 'inline-block',
            text: 'white',
          }}
          repeat={Infinity}
        />
      </h2>
      <form onSubmit={onPressVerify} className='mt-10 mx-10 p-4'>
        <div className='sm:col-span-3'>
          <label className='block text-sm font-medium leading-6  text-gray-900'>
            Entrez votre code
          </label>
          <div className='mt-2'>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type='text'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <button className='bg-indigo-700 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default CheckCode;

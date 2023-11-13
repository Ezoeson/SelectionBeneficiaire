import React, { useState } from 'react';
import { useSignUp, useSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Slide from '../Swiper/Slide';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const ForgotCode = () => {
  const { register, handleSubmit } = useForm();

  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const create = async (data) => {
    console.log(data);

    await signIn
      .create({
        strategy: 'reset_password_email_code',
        identifier: data.email,
      })
      .then(() => {
        setSuccessfulCreation(true);
      })
      .catch((err) => console.error('error', err.errors[0].longMessage));
  };

  const reset = async (data) => {
    console.log(data);
    await signIn
      .attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: data.code,
        password: data.password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error('error', err.errors[0].longMessage));
  };

  const navigate = useNavigate();

  return (
    <motion.div
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   transition={{ delay: 0.5, ease: 'easeInOut', duration: 0.5 }}
      className=' dark:bg-slate-100  flex justify-center  items-center space-x-5 h-screen '
    >
      <div className='grid md:grid-cols-[700px,500px] grid-cols-[2px,1fr] border rounded-lg bg-transparent h-[500px] shadow-lg shadow-indigo-600'>
        <motion.div className=' h-full rounded-l-lg col-[1] md:block hidden'>
          <Slide />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: 'easeInOut', duration: 0.8 }}
          className='col-[2] '
        >
          <h2 className='text-center  font-bold text-2xl py-5 tracking-widest text-indigo-700'>
            <TypeAnimation
              sequence={['', 1000, 'Mot de passe oublie', 1000]}
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
          <form
            onSubmit={
              !successfulCreation ? handleSubmit(create) : handleSubmit(reset)
            }
            className='mt-10 mx-10 p-4'
          >
            {!successfulCreation && !complete && (
              <>
                <div className='sm:col-span-3'>
                  <label className='block text-sm font-medium leading-6  text-indigo-600'>
                    S'il vous plait entrer votre email
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      {...register('email')}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <button className='bg-gradient-to-r from-blue-700 via-purple-500 to-rose-600 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
                  Envoyer
                </button>
              </>
            )}
            {successfulCreation && !complete && (
              <>
                <div className='sm:col-span-3'>
                  <label className='block text-sm font-medium leading-6  text-indigo-500'>
                    entrez votre code
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      {...register('code')}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label className='block text-sm font-medium leading-6  text-indigo-500'>
                    Nouveau mot de passe
                  </label>
                  <div className='mt-2'>
                    <input
                      type='password'
                      {...register('password')}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <button className='bg-gradient-to-r from-blue-700 via-purple-500 to-rose-600 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
                  Reinitialiser
                </button>
              </>
            )}
          </form>
          {complete && navigate('/')}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotCode;

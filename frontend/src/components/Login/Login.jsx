import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';

import Slide from '../Swiper/Slide';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { clsx } from 'clsx';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    

    try {
      const result = await signIn.create({
        identifier: data.pseudo,
        password: data.password,
      });

      if (result.status === 'complete') {
        // setIsLoading(false);

        await setActive({ session: result.createdSessionId });
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err) {
      setIsLoading(false);
      if (
        err.errors[0].longMessage ===
        'Password is incorrect. Try again, or use another method.'
      ) {
        toast.error('Votre mot de passe est incorrect');
        console.error('error');
      } else {
        toast.error('Verifiez votre pseudo ou email,sinon creez un compte');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, ease: 'easeInOut', duration: 0.5 }}
      className='flex justify-center dark:bg-slate-100 items-center space-x-5 h-screen '
    >
      <div className='grid md:grid-cols-[700px,500px] grid-cols-[2px,1fr] border rounded-lg bg-transparent h-[500px] shadow-lg shadow-indigo-600'>
        <motion.div
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, ease: 'easeInOut', duration: 0.8 }}
          className=' h-full rounded-l-lg col-[1] md:block hidden'
        
        >
          <Slide />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, ease: 'easeInOut', duration: 0.8 }}
          className=' col-[2] '
        >
          <h2 className='text-center  font-bold text-2xl py-5 tracking-widest text-indigo-700'>
            <TypeAnimation
              sequence={['', 1000, 'Se Connecter ', 1000]}
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
          <div className='flex justify-center items-center'>
            <img
              src='fimisapng.png'
              alt=''
              className='w-[80px] h-10  md:w-[200px] md:h-[100px]'
            />
          </div>
        
          <form onSubmit={handleSubmit(onSubmit)} className=' mt-10 mx-10 p-4 relative '>
            <div className='sm:col-span-3'>
              <label className='block text-sm font-medium leading-6 text-indigo-700'>
                Pseudo ou Email
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  {...register('pseudo')}
                  className={clsx(
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  )}
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label className='block text-sm font-medium leading-6  text-indigo-700'>
                Mot de passe
              </label>
              <div className='mt-2'>
                <input
                  type='password'
                  {...register('password')}
                  className={clsx(
                    'block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  )}
                />
              </div>
            </div>

            <div className='absolute right-1'>
              <Link to={'/forgotCode'}>
                <p className='text-indigo-600  dark:text-slate-400 '>
                  Mot de passe oublie?
                </p>
              </Link>
            </div>

            <button className='bg-indigo-700 mt-8 text-white w-full  px-5 py-2 rounded-lg'>
              {isLoading ? 'connexion...' : 'se connecter'}
            </button>
          </form>
          <div className='text-indigo-500 ml-10 py-1  text-center text-sm  dark:text-slate-400'>
            Vous n'avez pas du compte?{' '}
            <Link to={'/register'}>
              <span className='text-indigo-900 dark:text-blue-500 border-b border-b-slate-900'>
                s'inscrire
              </span>{' '}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;

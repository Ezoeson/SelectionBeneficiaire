import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import VerifierCode from '../Code/VerifierCode';
import CheckCode from '../Code/CheckCode';
import Slide from '../Swiper/Slide';
import { useForm } from 'react-hook-form';
import { useSignUp } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
const Register = () => {
  const [pendingVerification, setPendingVerification] = useState(false);

  const [showCode, setShowCode] = useState(true);
  const [code, setCode] = useState('');
  const { isLoaded, signUp, setActive } = useSignUp();
  const { register, handleSubmit, getValues } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    if (!isLoaded) {
      // Handle loading state
      return null;
    }
    if (data.password !== data.confirmPassword) {
      toast.error('Verifiez votre mot de passe');
      return;
    } else {
      try {
        await signUp.create({
          emailAddress: data.email,
          password: data.password,
          username: data.pseudo,
        });

        // send the email.
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });

        // change the UI to our pending section.
        setPendingVerification(true);
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    }
  };

  return (
    <>
      <motion.div className='flex justify-center dark:bg-slate-100 items-center space-x-5 h-screen'>
        <div className='grid md:grid-cols-[700px,500px] grid-cols-[2px,1fr] border rounded-lg bg-transparent h-[500px] shadow-lg shadow-indigo-600'>
          <motion.div className='h-full rounded-l-lg col-[1] md:block hidden'>
            <Slide />
          </motion.div>
          {!pendingVerification && (
            <>
              {showCode && (
                <VerifierCode
                  setShowCode={setShowCode}
                  code={code}
                  setCode={setCode}
                />
              )}
              {!showCode && (
                <motion.div
                  initial={{ opacity: 0, y: -500 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, ease: 'easeInOut', duration: 0.8 }}
                  className=' col-[2]'
                >
                  <h2 className='text-center  font-bold text-2xl py-5 tracking-widest text-indigo-700'>
                    <TypeAnimation
                      sequence={['', 1000, 'Creez un compte ', 1000]}
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
                    onSubmit={handleSubmit(onSubmit)}
                    className=' mt-10 mx-10 p-4 relative'
                  >
                    <div className='sm:col-span-3'>
                      <label className='block text-sm font-medium leading-6  text-indigo-700'>
                        Pseudo
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('pseudo')}
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>
                    <div className='sm:col-span-3'>
                      <label className='block text-sm font-medium leading-6  text-indigo-700'>
                        Email
                      </label>
                      <div className='mt-2'>
                        <input
                          {...register('email', { required: true })}
                          type='email'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>
                    <div className='sm:col-span-3'>
                      <label className='block text-sm font-medium leading-6  text-indigo-700'>
                        Mot de passe
                      </label>
                      <div className='mt-2'>
                        <input
                          {...register('password', { required: true })}
                          type='password'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <label className='block text-sm font-medium leading-6  text-indigo-700'>
                        Confirmez votre mot de passe
                      </label>
                      <div className='mt-2'>
                        <input
                          {...register('confirmPassword', { required: true })}
                          type='password'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <button className='bg-gradient-to-r from-blue-700 via-purple-500 to-rose-600 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
                      Creer
                    </button>
                  </form>
                  <p className='text-black text-center dark:text-slate-400'>
                    Vous avez un compte?{' '}
                    <Link to={'/'}>
                      <span className='text-indigo-900'>Se connecter</span>{' '}
                    </Link>
                  </p>
                </motion.div>
              )}
            </>
          )}
          {pendingVerification && (
            <CheckCode
              code={code}
              email={getValues('email')}
              passowrd={getValues('password')}
              pseudo={getValues('pseudo')}
            />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Register;

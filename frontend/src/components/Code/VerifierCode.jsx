import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { useCheckcodeMutation } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';

const VerifierCode = ({ setShowCode, code, setCode }) => {
  const [checkcode, { isError, isLoading, isSuccess }] = useCheckcodeMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code === '') return;
    try {
      const res = await checkcode({ code }).unwrap();
      setShowCode(false);
      toast.success('Code verifié avec success');
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className='col-[2]'>
      <h2 className='pl-4 mt-8 text-center font-bold text-3xl py-5 tracking-wide text-indigo-700'>
        <TypeAnimation
          sequence={['', 1000, 'Verification du code ', 1000]}
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
      <form onSubmit={handleSubmit} className='mt-10 mx-10 p-4'>
        <div className='sm:col-span-3'>
          <label className='block text-sm font-medium leading-6 text-indigo-700'>
            Entrez votre code d'identification
          </label>
          <div className='mt-2'>
            <input
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 bg-slate-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <button className='bg-gradient-to-r from-blue-700 via-purple-500 to-rose-600 mt-4  text-white w-full  px-5 py-2 rounded-lg'>
          {isLoading ? (
            <div className='flex justify-center   items-center '>
              <MoonLoader color='white' size={30} />
            </div>
          ) : (
            'verifier'
          )}
        </button>
        <p className='text-black text-center dark:text-slate-400 pt-4'>
          Vous avez un compte?{' '}
          <Link to={'/'}>
            <span className='text-blue-500'>Se connecter</span>{' '}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default VerifierCode;

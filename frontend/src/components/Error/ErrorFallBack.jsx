import React from 'react';
import { FaRegFaceSadTear } from 'react-icons/fa6';

const ErrorFallBack = ({ error, resetBoundary }) => {
  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
      role='alert'
    >
      <p>Quelque chose s'est mal passé :</p>

      <div className='flex justify-center flex-col  items-center mt-[100px]'>
        <FaRegFaceSadTear className=' text-[100px] dark:text-white' />
      </div>
      <pre className='text-red-800'>{error.message}</pre>
      {/* <button
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        onClick={resetBoundary}
      >
        Réessayer
      </button> */}
    </div>
  );
};

export default ErrorFallBack;

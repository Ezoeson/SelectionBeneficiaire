import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center min-h-screen bg-gray-100'
    >
      <div className='text-4xl text-red-600'>
        <FaExclamationTriangle />
      </div>
      <h1 className='text-3xl font-semibold mt-4'>Erreur 404</h1>
      <p className='text-lg text-gray-700 mt-2 text-center'>
        La page que vous recherchez n'a pas été trouvée. Veuillez vérifier l'URL
        ou revenir à la <a href='/'>page d'accueil</a>.
      </p>
      <p className='text-lg text-gray-700 mt-2 text-center'>
        Si le problème persiste, contactez notre{' '}
        <a href='/support'>support technique</a>.
      </p>
      <div className='mt-4 space-x-4'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          onClick={() => window.history.back()}
        >
          Retour en arrière
        </button>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
          onClick={() => window.location.reload()}
        >
          Rafraîchir la page
        </button>
      </div>
    </motion.div>
  );
};

export default ErrorPage;

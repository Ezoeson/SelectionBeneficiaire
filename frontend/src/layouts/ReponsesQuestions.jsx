import React from 'react';
import { useGetOneBeneficiaireReponseQuery } from '../redux/slices/beneficiaireSlice';
import { useParams } from 'react-router-dom';
import LoadingForm from '../components/LoadingForm/LoadingForm';
import ClerkLoader from '../components/clerkLoader/ClerkLoader';
import { motion } from 'framer-motion';


function ReponsesQuestions() {
  const beneficiaireId = useParams();
  const { data, isLoading, isSuccess } = useGetOneBeneficiaireReponseQuery(
    beneficiaireId.id
  );
  console.log(data);
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <div className='mt-4 border mx-4 p-8  shadow-xl rounded-md shadow-blue-700'>
      {isLoading && (
        <div className='flex justify-center  items-center mt-[200px]'>
          <ClerkLoader />
        </div>
      )}
      {isSuccess && !isLoading && (
        <div>
          <div className='border '>
            <div className='text-center dark:text-slate-100  font-bold'>
              <img
                src={'/api' + data?.enqueteur?.image}
                className='w-20 h-20 rounded-full object-cover  mx-auto mt-5'
                alt=''
              />{' '}
              {/* {data?.enqueteur?.nom} */}
            </div>
            <div className='text-center dark:text-slate-100  font-bold'>
              Nom enqueteur: {data?.enqueteur?.nom}
            </div>
            <div className='text-center dark:text-slate-100 font-bold'>
              Code enqueteur: {data?.enqueteur?.code}
            </div>
            <div className='text-center dark:text-slate-100 font-bold'>
              Nom Beneficiaire: {data?.nomBeneficiaire}
            </div>
            <div className='text-center dark:text-slate-100 font-bold'>
              {' '}
              code fokontany : {data?.fokontany?.codeFokontany}
            </div>
            <div className='text-center dark:text-slate-100 font-bold'>
              {' '}
              Nom fokontany : {data?.fokontany?.nomFokontany}
            </div>
            <div className='text-center dark:text-slate-100 font-bold'>
              {' '}
              Note : {data?.note?.value}
            </div>
          </div>
          <div>
            {' '}
            {data?.personne?.map((personne) => (
              <div key={personne.id}>
                <div>
                  {personne?.reponse?.map((reponse) => (
                    <motion.div
                      variants={container}
                      initial='hidden'
                      animate='visible'
                      key={reponse.id}
                    >
                      <motion.div
                        variants={item}
                        className='mx-2 mt-5 flex justify-center dark:text-white gap-3 w-full '
                      >
                        <div className='grid grid-cols-5'>
                          <span>{reponse?.question?.question}</span> :{' '}
                          <span className='text-blue-800 font-bold'>
                            {reponse?.reponse}
                          </span>
                          <div className='flex flex-col text-center'>
                            <span>
                              Score non : {reponse?.question?.scoreNon}
                            </span>
                            <span>
                              Score oui : {reponse?.question?.scoreOui}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReponsesQuestions;

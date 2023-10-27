import React from 'react';

import { useGetQuestionQuery } from '../../redux/slices/questionApiSlice';
import { useForm, Controller, set } from 'react-hook-form';

import { useState } from 'react';
import { useCreateReponseMutation } from '../../redux/slices/reponseApiSlice';
import { useGetFormulaireQuery } from '../../redux/slices/formulaireApiSlice';
import { useGetCategorieQuery } from '../../redux/slices/categorieQuestionApiSlice';
import { useGetCompteByClerkQuery } from '../../redux/slices/compteApiSlice';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useUser, useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';
import { setReponse } from '../../redux/reponseSlice';
import { useDispatch, useSelector } from 'react-redux';
import Radio from './Radio';
import { ClipLoader } from 'react-spinners';
import clsx from 'clsx';
import { motion } from 'framer-motion';

function Reponse() {
  const { reponses } = useSelector((state) => state.reponse);
  const { userId } = useAuth();
  const { data: compte } = useGetCompteByClerkQuery(userId);
  console.log(compte?.enqueteur.id);
  const personneId = useParams();
  const idPersonne = personneId.id;
  const serch_value = '%20';

  const dispatch = useDispatch();

  const [
    createReponse,
    { isLoading: loadingCreate, isError, error, isSuccess },
  ] = useCreateReponseMutation();
  const { data: questions, isLoading } = useGetQuestionQuery(serch_value);
  const [responses, setresponses] = useState([]);
  console.log(responses);
  const {
    data: Formulaires,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetFormulaireQuery();

  const [formulaire, setFormulaire] = useState('');

  const [categorie, setCategorie] = useState('');
  const [selectedReponses, setSelectedReponses] = useState({});

  const handlereponseChange = (questionId, reponse) => {
    setSelectedReponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: reponse,
    }));
    // Mise à jour du tableau des réponses à chaque sélection d'option.
    const updatedresponses = [...responses];
    const existingreponseIndex = updatedresponses.findIndex(
      (item) => item.questionId === questionId
    );

    if (existingreponseIndex !== -1) {
      updatedresponses[existingreponseIndex].reponse = reponse;
    } else {
      updatedresponses.push({ questionId, reponse });
    }

    setresponses(updatedresponses);
    // dispatch(setReponse(updatedresponses));
  };

  const handleSendAnswers = async () => {
    // Incluez l'ID de la personne avec les réponses
    const responsesWithPersonId = responses.map((item) => ({
      ...item,
      personneId: idPersonne,
    }));
    console.log(responsesWithPersonId);

    try {
      const res = await createReponse({
        reponses: [...responsesWithPersonId],
      }).unwrap();
      setSelectedReponses([]);
      setresponses([]);
    } catch (err) {
      toast.error('Il y a deja repondu ');
    }
  };
  const onChange = (e) => {
    setFormulaire(e.target.value);
  };

  const {
    data: SelectCategories,
    isLoading: loadingSelectCategorie,
    isSuccess: successSelectCategorie,
  } = useGetCategorieQuery();

  const onChangeCategorie = (e) => {
    setCategorie(e.target.value);
  };
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
    <div className=' mt-4 border mx-4 p-8  shadow-xl rounded-md shadow-blue-700'>
      {isSuccess && <Confetti />}
      <form
        action=''
        onSubmit={handleSubmit(onSubmit)}
        className='flex  space-y-3  w-full'
      >
        <div className='flex flex-col w-full'>
          <div className='mt-2 flex items-center space-x-3 w-full'>
            <label
              htmlFor=''
              className='hidden md:block font-bold dark:text-white'
            >
              Choisir une formulaire d'enquete:
            </label>

            <select
              id='form'
              name='form'
              onChange={onChange}
              className='block  rounded-md border-0 py-1.5 dark:bg-slate-900 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option value=''>Sélectionnez un formulaire</option>
              {successClasse &&
                Formulaires.map((formulaire) => (
                  <option key={formulaire.id} value={formulaire.id}>
                    {formulaire.nomFormulaire}
                  </option>
                ))}
            </select>
          </div>
          {formulaire && (
            <div className='mt-2 flex items-center space-x-0 md:space-x-20 w-full'>
              <label
                htmlFor=''
                className='hidden md:block font-bold dark:text-white'
              >
                Choisir une Categorie :
              </label>
              <select
                id='form'
                name='form'
                onChange={onChangeCategorie}
                className='block  rounded-md border-0 py-1.5  dark:bg-slate-900 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value=''>Sélectionnez une categorie</option>
                {!loadingClasse &&
                  successClasse &&
                  SelectCategories?.filter(
                    (categorie) => categorie.formulaireId === formulaire
                  ).map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.categorieName}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
      </form>

      {categorie && formulaire && (
        <motion.div
          variants={container}
          initial='hidden'
          animate='visible'
          className={clsx(
            'mx-2 mt-5 grid md:grid-cols-4 grid-cols-2 dark:text-white gap-3'
          )}
        >
          {questions
            ?.filter((question) => question.categorieId === categorie)
            .map((question) => (
              <motion.div variants={item} key={question.id}>
                <p>{question.question}</p>
                <div className='flex justify-center  w-full items-center'>
                  <div className='w-full '>
                    <div className='flex items-center gap-x-3'>
                      <input
                        id='push-everything'
                        name={`question_${question.id}`}
                        value='oui'
                        onChange={() => handlereponseChange(question.id, 'oui')}
                        type='radio'
                        checked={selectedReponses[question.id] === 'oui'}
                        className='h-4 w-4 border-gray-300 text-indigo-600  cursor-pointer focus:ring-indigo-600'
                      />
                      <label
                        htmlFor='push-everything'
                        className='block text-sm font-medium  leading-6 dark:text-white text-gray-900'
                      >
                        Oui
                      </label>
                    </div>
                    <div className='flex items-center gap-x-3'>
                      <input
                        id='push-everything'
                        type='radio'
                        name={`question_${question.id}`}
                        value='non'
                        checked={selectedReponses[question.id] === 'non'}
                        onChange={() => handlereponseChange(question.id, 'non')}
                        className='h-4 w-4 border-gray-300 text-indigo-600  cursor-pointer cursor:pointer focus:ring-indigo-600'
                      />
                      <label
                        htmlFor='push-everything'
                        className='block text-sm font-medium leading-6 dark:text-white text-gray-900'
                      >
                        Non
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      )}
      {categorie && (
        <div className='flex justify-center mt-3 w-full'>
          <button
            onClick={handleSendAnswers}
            className='bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 px-3 p-2 w-40  text-white rounded-md'
          >
            {loadingCreate ? (
              <ClipLoader color='hsla(168, 67%, 53%, 1)' />
            ) : (
              <span>Envoyer</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default Reponse;

{
  // <div className='flex items-center gap-x-3'>
  //   <input
  //     id='push-everything'
  //     name='push-notifications'
  //     type='radio'
  //     className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
  //   />
  //   <label
  //     htmlFor='push-everything'
  //     className='block text-sm font-medium leading-6 text-gray-900'
  //   >
  //     Oui
  //   </label>
  // </div>;
  // <div className='flex items-center gap-x-3'>
  //   <input
  //     id='push-everything'
  //     name='push-notifications'
  //     type='radio'
  //     className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
  //   />
  //   <label
  //     htmlFor='push-everything'
  //     className='block text-sm font-medium leading-6 text-gray-900'
  //   >
  //     Non
  //   </label>
  // </div>;
}

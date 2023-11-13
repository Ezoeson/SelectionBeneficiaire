import React, { useEffect, useState } from 'react';
import TableHeader from '../../components/Tables/TableHeader';
import TableRow from '../../components/Tables/TableRow';

import { HiMiniTrash, HiMiniPencil, HiMiniUserCircle } from 'react-icons/hi2';
import { FcDeleteDatabase, FcCheckmark } from 'react-icons/fc';
import { FcFullTrash } from 'react-icons/fc';

import {
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
  useGetOneQuestionQuery,
} from '../../redux/slices/questionApiSlice';
import { useGetCategorieQuery } from '../../redux/slices/categorieSlice';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import Message from '../../components/Message/Message';
import SlideOver from '../../components/Modal/SlideOver';
import Input from '../../components/Input/Input';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/questionSlice';

import { useLocation } from 'react-router-dom';
const ListeQuestion = () => {
  const pathname = useLocation().pathname.split('/')[1];
  console.log(pathname);
  const dispatch = useDispatch();
  const { search_value } = useSelector((state) => state.question);
  const [value, setValue] = useState(
    search_value === '%20' ? '' : search_value
  );

  console.log(search_value);
  const {
    data: Question,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isFetching,
  } = useGetQuestionQuery(search_value);

  const [selectedId, setSelectedId] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [categorieId, setCategorieId] = useState('');

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!addModal);
  const {
    data: Categories,
    isLoading: loadingCategorie,
    isSuccess: successCategorie,
  } = useGetCategorieQuery();
  const idCategorie = Categories && Categories[0]?.id;
  console.log(idCategorie);
  console.log(categorieId);

  useEffect(() => {
    if (value === '') {
      dispatch(setSearchValue('%20'));
    } else {
      if (pathname === 'question') {
        dispatch(setSearchValue(value));
      }
    }
  }, [value]);
  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold dark:text-white '>
        Liste de tous les Questions
      </h2>
      <select
        id='classe'
        name='classe'
        onChange={(e) => {
          setCategorieId(e.target.value);
        }}
        className='block w-[230px] dark:bg-slate-900 dark:text-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
      >
        {!loadingCategorie &&
          successCategorie &&
          Categories?.map((categeorie) => (
            <option key={categeorie.id} value={categeorie.id}>
              {categeorie.categorieName}
            </option>
          ))}
      </select>
      <div className='flex items-center justify-between my-3'>
        <div className=' '>
          <input
            type='text'
            placeholder='Rechercher'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>

        <button
          onClick={toggleAddModal}
          className='bg-blue-600 text-white py-2 px-8 rounded cursor-pointer'
        >
          Ajouter Question
        </button>
      </div>
      <div className='w-full min-h-[150px] bg-slate-50  rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto '>
        <TableHeader col='md:grid-cols-[2fr,1fr,1fr,max-content]'>
          <div className='md:hidden'>Informations</div>

          <div className='hidden md:block'>Question</div>
          <div className='hidden md:block'>score oui</div>
          <div className='hidden md:block'>Score non</div>

          <div className='hidden md:block'>Actions</div>
        </TableHeader>
        <div className='flex flex-col'>
          {(isLoading || isFetching) && (
            <div className='flex items-center justify-center mt-12'>
              <Loader />
            </div>
          )}

          {(!isLoading || !isFetching) && isSuccess ? (
            <>
              {Question?.filter((item) =>
                categorieId === ''
                  ? item.categorieId === idCategorie
                  : item.categorieId === categorieId
              ).map((item) => (
                <TableRow
                  key={item.id}
                  col={'md:grid-cols-[2fr,1fr,1fr,max-content] items-center'}
                >
                  <div className='flex items-center space-x-2'>
                    <span className='md:hidden font-bold'>Question :</span>{' '}
                    <span>{item.question}</span>
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>Score oui</span>
                    {item.scoreOui}
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>Score non</span>
                    {item.scoreNon}
                  </div>

                  <Actions
                    id={item.id}
                    setSelectedId={setSelectedId}
                    toggleDeleteModal={toggleDeleteModal}
                    toggleUpdateModal={toggleUpdateModal}
                  />
                </TableRow>
              ))}
            </>
          ) : (
            isError && <ErrorPage refetch={refetch} />
          )}
        </div>
      </div>

      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        id={selectedId}
        refetch={refetch}
      />

      <AddModal open={addModal} setOpen={setAddModal} refetch={refetch} />
      <UpdateModal
        open={updateModal}
        setOpen={setUpdateModal}
        refetch={refetch}
        id={selectedId}
      />
    </div>
  );
};

const Actions = ({
  id,
  setSelectedId,
  toggleDeleteModal,
  toggleUpdateModal,
}) => {
  const deleteFunc = () => {
    setSelectedId(id);
    toggleDeleteModal();
  };

  const updateFunc = () => {
    setSelectedId(id);
    toggleUpdateModal();
  };

  return (
    <div className='flex items-center justify-center space-x-4'>
      <HiMiniTrash onClick={deleteFunc} className='text-xl' />
      <HiMiniPencil onClick={updateFunc} className='text-xl' />
    </div>
  );
};

const ErrorPage = ({ refetch }) => {
  return (
    <div className='w-full flex items-center flex-col justify-center h-60'>
      <FcDeleteDatabase className='text-[150px]' />
      <h2 className='text-xl text-center'>Une erreur s'est produite</h2>
      <button
        onClick={refetch}
        className='bg-slate-950 rounded text-white py-2 px-6 cursor-pointer mt-3'
      >
        Actualiser
      </button>
    </div>
  );
};

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deleteQuestion, { isLoading, isError, isSuccess }] =
    useDeleteQuestionMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteQuestion(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isSuccess, isError]);

  return (
    <Modal open={open} setOpen={setOpen}>
      {show ? (
        <>
          <div className='bg-white dark:bg-slate-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                <ExclamationTriangleIcon
                  className='h-6 w-6 text-red-600'
                  aria-hidden='true'
                />
              </div>
              <div className='mt-3 text-center w-full flex justify-center items-center sm:ml-4 sm:mt-0 sm:text-left'>
                <div className='mt-2 flex justify-center'>
                  <FcFullTrash className='text-[175px]' />
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse justify-center sm:px-6'>
            <button
              type='button'
              className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
              onClick={handleDelete}
            >
              Supprimez
            </button>
            <button
              type='button'
              className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
          </div>
        </>
      ) : isLoading ? (
        <Message title='Suppression en cours' icon={Loader} />
      ) : isSuccess ? (
        <Message title='Suppression success' icon={FcCheckmark} />
      ) : (
        isError && (
          <Message title='Something went wrong' icon={FcDeleteDatabase} />
        )
      )}
    </Modal>
  );
};

const AddModal = ({ open, setOpen, refetch }) => {
  const schema = yup.object().shape({
    question: yup.string().required('Ce champs est vide'),
    scoreOui: yup.number().required('Ce champs tes vide'),
    scoreNon: yup.number().required('Ce camps est vide '),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    data: Categories,
    isLoading: loadingCategorie,
    isSuccess: successCategorie,
  } = useGetCategorieQuery();

  const [show, setShow] = useState(true);
  const [createQuestion, { isLoading, isSuccess, isError }] =
    useCreateQuestionMutation();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);
  useEffect(() => {
    if (isError || isSuccess) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isError, isSuccess]);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setShow(false);
      const res = await createQuestion({
        ...data,
      }).unwrap();
      refetch();
    } catch (error) {}
  };
  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className='text-center font-bold text-xl'>Ajout Question</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              label={'Question'}
              type={'text'}
              state={{ ...register('question') }}
              error={errors?.question}
            />
            <p className='text-sm text-rose-500'>{errors?.question?.message}</p>
            <Input
              label={'Score oui'}
              type={'number'}
              state={{ ...register('scoreOui') }}
              error={errors?.scoreOui}
            />
            <p className='text-sm text-rose-500'>{errors?.scoreOui?.message}</p>
            <Input
              label={'Score non'}
              type={'number'}
              state={{ ...register('scoreNon') }}
              error={errors?.scoreNon}
            />
            <p className='text-sm text-rose-500'>{errors?.scoreNon?.message}</p>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Type question</label>
              <select
                id='form'
                name='form'
                {...register('type')}
                className='block w-full rounded-md border-0 py-1.5 dark:bg-slate-900 dark:text-slate-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value='BOOLEAN'>BOOLEAN</option>
                <option value='INPUT'>INPUT</option>
              </select>
            </div>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Categorie</label>
              <select
                id='form'
                name='form'
                {...register('categorieId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingCategorie &&
                  successCategorie &&
                  Categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.categorieName}
                    </option>
                  ))}
              </select>
            </div>
            <button className='mt-5 cursor:pointer py-2 px-8 bg-indigo-500 rounded text-white '>
              Ajouter
            </button>
          </form>
        </div>
      ) : isLoading ? (
        <div className='h-full flex justify-center items-center'>
          <Message message='Ajout en cours...' icon={Loader} />
        </div>
      ) : isSuccess ? (
        <div className='h-full flex justify-center items-center'>
          <Message message='Ajout reussie' icon={FcCheckmark} />
        </div>
      ) : (
        isError && (
          <div className='h-full flex justify-center items-center'>
            <Message message='Erreur' icon={FcDeleteDatabase} />
          </div>
        )
      )}{' '}
    </SlideOver>
  );
};

const UpdateModal = ({ open, setOpen, refetch, id }) => {
  const [updateQuestion, { isLoading, isError, isFetching, isSuccess }] =
    useUpdateQuestionMutation(id);

  const {
    data: Question,
    isSuccess: etudiantSuccess,
    status,
  } = useGetOneQuestionQuery(id, {
    skip: !open,
  });
  console.log(Question);

  const {
    data: Categories,
    isLoading: loadingCategorie,
    isSuccess: successCategorie,
  } = useGetCategorieQuery();

  // Create a schema
  const schema = yup.object().shape({
    question: yup.string().required('Entrez la question'),
    scoreOui: yup.number().required('ce champs doit est remplie'),
    scoreNon: yup.number().required('ce champs doit est remplie'),
  });

  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (status === 'fulfilled') {
      setValue('question', Question.question);
      setValue('scoreOui', Question.scoreOui);
      setValue('scoreNon', Question.scoreNon);
      setValue('categorieId', Question.categorieId);
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateQuestion({
        data: {
          ...data,
        },
        id,
      }).unwrap();
      refetch();
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isSuccess, isError]);

  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className='text-center font-bold text-xl'>Modifier Question</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              label={'Question'}
              type={'text'}
              state={{ ...register('question') }}
              error={errors?.question}
            />
            <p className='text-sm text-rose-500'>{errors?.question?.message}</p>
            <Input
              label={'Score oui'}
              type={'number'}
              state={{ ...register('scoreOui') }}
              error={errors?.scoreOui}
            />
            <p className='text-sm text-rose-500'>{errors?.scoreOui?.message}</p>
            <Input
              label={'Score non'}
              type={'number'}
              state={{ ...register('scoreNon') }}
              error={errors?.scoreNon}
            />
            <p className='text-sm text-rose-500'>{errors?.scoreNon?.message}</p>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Type question</label>
              <select
                id='form'
                name='form'
                {...register('type')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value='BOOLEAN'>BOOLEAN</option>
                <option value='INPUT'>INPUT</option>
              </select>
            </div>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Categorie</label>
              <select
                id='form'
                name='form'
                {...register('categorieId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingCategorie &&
                  successCategorie &&
                  Categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.categorieName}
                    </option>
                  ))}
              </select>
            </div>
            <button className='mt-5 cursor:pointer py-2 px-8 bg-indigo-500 rounded text-white '>
              Modifer
            </button>
          </form>
        </div>
      ) : isLoading ? (
        <div className='h-full w-full flex items-center justify-center'>
          <Message title='Mofication en cours' icon={Loader} />
        </div>
      ) : isSuccess ? (
        <div className='h-full w-full flex items-center justify-center'>
          <Message title='Modification success' icon={FcCheckmark} />
        </div>
      ) : (
        isError && (
          <div className='h-full w-full flex items-center justify-center'>
            <Message title='Something went wrong' icon={FcDeleteDatabase} />
          </div>
        )
      )}
    </SlideOver>
  );
};

export default ListeQuestion;

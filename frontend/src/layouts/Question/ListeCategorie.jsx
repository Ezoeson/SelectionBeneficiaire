import React, { useEffect, useState } from 'react';
import TableHeader from '../../components/Tables/TableHeader';
import TableRow from '../../components/Tables/TableRow';

import { HiMiniTrash, HiMiniPencil, HiMiniUserCircle } from 'react-icons/hi2';
import { FcDeleteDatabase, FcCheckmark } from 'react-icons/fc';
import { FcFullTrash } from 'react-icons/fc';

import {
  useGetCategorieQuery,
  useCreateCategorieMutation,
  useDeleteCategorieMutation,
  useGetOneCategorieQuery,
  useUpdateCategorieMutation,
} from '../../redux/slices/categorieSlice';
import { useGetFormulaireQuery } from '../../redux/slices/formulaireSlice';
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
import { useLocation } from 'react-router-dom';
import { setSearchValue } from '../../redux/categorieSlice';

const ListeCategorie = () => {
  const pathname = useLocation().pathname.split('/')[2];

  const dispatch = useDispatch();

  const {
    data: Categorie,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isFetching,
  } = useGetCategorieQuery();
  console.log(Categorie);

  const [selectedId, setSelectedId] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!addModal);
  const [formulaireId, setFormulaireId] = useState('');
  const {
    data: Formulaires,
    isLoading: loadingForm,
    isSuccess: successForm,
  } = useGetFormulaireQuery();
  const idFormulaire = Formulaires && Formulaires[0]?.id;

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold dark:text-white'>
        Liste de tous les Categories
      </h2>
      <select
        id='classe'
        name='classe'
        onChange={(e) => {
          setFormulaireId(e.target.value);
        }}
        className='block w-[230px] dark:bg-slate-900 dark:text-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
      >
        {!loadingForm &&
          successForm &&
          Formulaires?.map((form) => (
            <option key={form.id} value={form.id}>
              {form.nomFormulaire}
            </option>
          ))}
      </select>
      <div className='flex items-center  justify-between my-3'>
        <button
          onClick={toggleAddModal}
          className='bg-gradient-to-r from-cyan-400 to-indigo-600 text-white py-2 px-8 rounded cursor-pointer'
        >
          Ajouter Categorie
        </button>
      </div>
      <div className='w-full min-h-[150px] bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto '>
        <TableHeader col='md:grid-cols-[2fr,1fr,2fr,max-content]'>
          <div className='md:hidden'>Informations</div>

          <div className='hidden md:block'>Code Categorie</div>
          <div className='hidden md:block'>Nom de la Categorie</div>
          <div className='hidden md:block'>Description</div>

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
              {Categorie?.filter((item) =>
                formulaireId === ''
                  ? item.formulaireId === idFormulaire
                  : item.formulaireId === formulaireId
              ).map((item) => (
                <TableRow
                  key={item.id}
                  col={'md:grid-cols-[2fr,1fr,2fr,max-content] items-center'}
                >
                  <div className='flex items-center space-x-2'>
                    <span className='md:hidden font-bold'>code question :</span>{' '}
                    <span>{item.codeCategeorie}</span>
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>Nom</span>
                    {item.categorieName}
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>Description</span>
                    {item.description}
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
      <HiMiniTrash onClick={deleteFunc} className='text-xl cursor-pointer ' />
      <HiMiniPencil onClick={updateFunc} className='text-xl cursor-pointer ' />
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

  const [deleteCategorie, { isLoading, isError, isSuccess }] =
    useDeleteCategorieMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteCategorie(id).unwrap();
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
              Supprimer
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
    codeCategeorie: yup.string().required('Entrez le code'),
    categorieName: yup.string().required('entrez nom de la Categorie'),
    description: yup.string().required('Quelque description'),
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
    data: Formulaires,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetFormulaireQuery();

  const [show, setShow] = useState(true);
  const [createCategorie, { isLoading, isSuccess, isError }] =
    useCreateCategorieMutation();

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
      const res = await createCategorie({
        ...data,
      }).unwrap();
      refetch();
    } catch (error) {}
  };
  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className='text-center font-bold text-xl'>create Categorie</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              label={'Code'}
              type={'text'}
              state={{ ...register('codeCategeorie') }}
              error={errors?.codeCategeorie}
            />
            <p className='text-sm text-rose-500'>
              {errors?.codeCategeorie?.message}
            </p>
            <Input
              label={'Nom Categorie'}
              type={'text'}
              state={{ ...register('categorieName') }}
              error={errors?.categorieName}
            />
            <p className='text-sm text-rose-500'>
              {errors?.categorieName?.message}
            </p>
            <Input
              label={'Description'}
              type={'text'}
              state={{ ...register('description') }}
              error={errors?.description}
            />
            <p className='text-sm text-rose-500'>
              {errors?.description?.message}
            </p>
            <div className='mt-2 flex items-center space-x-3 '>
              <label htmlFor=''>Formulaire:</label>
              <select
                id='form'
                name='form'
                {...register('formulaireId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-slate-100 dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingClasse &&
                  successClasse &&
                  Formulaires.map((formulaire) => (
                    <option key={formulaire.id} value={formulaire.id}>
                      {formulaire.nomFormulaire}
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
  const [updateCategorie, { isLoading, isError, isFetching, isSuccess }] =
    useUpdateCategorieMutation(id);

  const {
    data: Categorie,
    isSuccess: etudiantSuccess,
    status,
  } = useGetOneCategorieQuery(id, {
    skip: !open,
  });
  console.log(Categorie);

  const {
    data: Formulaires,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetFormulaireQuery();
  console.log(Formulaires);

  // Create a schema
  const schema = yup.object().shape({
    codeCategeorie: yup.string().required('Entrez le code'),
    categorieName: yup.string().required('entrez nom de la Categorie'),
    description: yup.string().required('Quelque description'),
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
      setValue('codeCategeorie', Categorie.codeCategeorie);
      setValue('categorieName', Categorie.categorieName);
      setValue('description', Categorie.description);
      setValue('formulaireId', Categorie.formulaireId);
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateCategorie({
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
          <h1 className='text-center font-bold text-xl'>Modifer categorie</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              label={'Code'}
              type={'text'}
              state={{ ...register('codeCategeorie') }}
              error={errors?.codeCategeorie}
            />
            <p className='text-sm text-rose-500'>
              {errors?.codeCategeorie?.message}
            </p>
            <Input
              label={'Nom Categorie'}
              type={'text'}
              state={{ ...register('categorieName') }}
              error={errors?.categorieName}
            />
            <p className='text-sm text-rose-500'>
              {errors?.categorieName?.message}
            </p>
            <Input
              label={'Description'}
              type={'text'}
              state={{ ...register('description') }}
              error={errors?.description}
            />
            <p className='text-sm text-rose-500'>
              {errors?.description?.message}
            </p>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Formulaire:</label>
              <select
                id='form'
                name='form'
                {...register('formulaireId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingClasse &&
                  successClasse &&
                  Formulaires.map((formulaire) => (
                    <option key={formulaire.id} value={formulaire.id}>
                      {formulaire.nomFormulaire}
                    </option>
                  ))}
              </select>
            </div>
            <button className='mt-5 cursor:pointer py-2 px-8 bg-indigo-500 rounded text-white '>
              Modifier
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

export default ListeCategorie;

import React, { useEffect, useState } from 'react';
import TableHeader from '../../components/Tables/TableHeader';
import TableRow from '../../components/Tables/TableRow';

import { HiMiniTrash, HiMiniPencil, HiMiniUserCircle } from 'react-icons/hi2';
import { FcDeleteDatabase, FcCheckmark } from 'react-icons/fc';
import { FcFullTrash } from 'react-icons/fc';
import Pagination from '../../components/Pagination/Pagination';

import {
  useGetRegionQuery,
  useCreateRegionMutation,
  useDeleteRegionMutation,
  useGetOneRegionQuery,
  useUpdateRegionMutation,
} from '../../redux/slices/regionSlice';
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
import { RiSearchLine } from 'react-icons/ri';

import { FiPlus } from 'react-icons/fi';

const ListeRegion = () => {
  const {
    data: region,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isFetching,
  } = useGetRegionQuery();
  console.log(region)
  const [val, setVal] = useState('');
  const filteredRegions = region?.region.filter((item) =>
    val === '' ? true : item.nomRegion.toLowerCase().includes(val.toLowerCase())
  );

  const [selectedId, setSelectedId] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!addModal);

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold dark:text-slate-100'>
        Liste de tous les regions
      </h2>
      <div className='flex items-center justify-between my-3'>
        <div className='border border-slate-700 dark:border-slate-500 md:w-80 w-40  rounded-md flex  px-3 items-center space-x-2  dark:text-white'>
          <RiSearchLine size={'20px'} />
          <input
            onChange={(e) => setVal(e.target.value)}
            value={val}
            type='text'
            className='outline-none bg-transparent w-full border-none border-b-2 border-gray-400 focus:border-white focus:ring-0 '
          />
        </div>
        <div
          onClick={toggleAddModal}
          className='flex justify-center cursor-pointer rounded-md bg-gradient-to-r from-cyan-400 to-indigo-600 items-center px-2 md:w-max w-20'
        >
          <FiPlus size={'30px'} className='text-white' />
          <button className=' text-white py-2 px-4   hidden md:block'>
            Ajout region
          </button>
        </div>
      </div>
      <div className='w-full min-h-[150px] bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto '>
        <TableHeader col='md:grid-cols-[1fr,2fr,max-content]'>
          <div className='md:hidden'>Informations</div>
          <div className='hidden md:block'>Code region</div>
          <div className='hidden md:block'>Nom de la region</div>

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
              {filteredRegions.length === 0 && (
                <div className='flex items-center justify-center mt-12'>
                  <Message
                    title='Aucun enqueteur trouvé '
                    icon={ExclamationTriangleIcon}
                  />
                </div>
              )}
              {filteredRegions?.map((item) => (
                <TableRow
                  key={item.id}
                  col={'md:grid-cols-[1fr,2fr,max-content] items-center'}
                >
                  <div className='flex items-center space-x-2'>
                    <span className='md:hidden font-bold'>code region :</span>{' '}
                    <span>{item.codeRegion}</span>
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>Nom Region</span>
                    {item.nomRegion}
                  </div>

                  <Actions
                    id={item.id}
                    setSelectedId={setSelectedId}
                    toggleDeleteModal={toggleDeleteModal}
                    toggleUpdateModal={toggleUpdateModal}
                  />
                </TableRow>
              ))}
              <Pagination
                pages={region.pages}
                page={region.page}
                total={region.totalPage}
              />
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

  const [deleteRegion, { isLoading, isError, isSuccess }] =
    useDeleteRegionMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteRegion(id).unwrap();
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
    codeRegion: yup.string().required('Entrez le code'),
    nomRegion: yup.string().required('entrez nom de la region'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(true);
  const [createRegion, { isLoading, isSuccess, isError }] =
    useCreateRegionMutation();

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
      const res = await createRegion({
        nomRegion: data.nomRegion,
        codeRegion: data.codeRegion,
      }).unwrap();
      refetch();
    } catch (error) {}
  };
  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className='text-center font-bold text-xl'>create region</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              label={'Code'}
              type={'text'}
              state={{ ...register('codeRegion') }}
              error={errors?.codeRegion}
            />
            <p className='text-sm text-rose-500'>
              {errors?.codeRegion?.message}
            </p>
            <Input
              label={'Nom region'}
              type={'text'}
              state={{ ...register('nomRegion') }}
              error={errors?.nomRegion}
            />
            <p className='text-sm text-rose-500'>
              {errors?.nomRegion?.message}
            </p>
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
  const [updateRegion, { isLoading, isError, isFetching, isSuccess }] =
    useUpdateRegionMutation(id);
  console.log(id);
  const {
    data: region,
    isSuccess: etudiantSuccess,
    status,
  } = useGetOneRegionQuery(id, {
    skip: !open,
  });

  // Create a schema
  const schema = yup.object().shape({
    codeRegion: yup.string().required('Entrez le code'),
    nomRegion: yup.string().required('entrez nom de la region'),
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
      setValue('codeRegion', region.codeRegion);
      setValue('nomRegion', region.nomRegion);
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateRegion({
        data: {
          ...data,
        },
        id: id,
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
          <h1 className='text-center font-bold text-xl'>Modifier Region {id}</h1>

          <div className='flex items-center justify-center'></div>

          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              state={{ ...register('codeRegion') }}
              label={'Code region'}
              type={'text'}
              error={errors?.codeRegion}
            />
            <p className='text-sm text-rose-500'>{errors?.code?.message}</p>
            <Input
              state={{ ...register('nomRegion') }}
              label={'Nom region'}
              type={'text'}
              error={errors?.nomRegion}
            />

            <p className='text-sm text-rose-500'>
              {errors?.nomRegion?.message}
            </p>

            <button className=' mt-5 bg-blue-600 text-white py-2 px-8 rounded cursor-pointer'>
              Modifer region
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

export default ListeRegion;

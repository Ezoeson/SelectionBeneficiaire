import React, { useEffect, useState } from 'react';
import TableHeader from '../../components/Tables/TableHeader';
import TableRow from '../../components/Tables/TableRow';

import { HiMiniTrash, HiMiniPencil, HiMiniUserCircle } from 'react-icons/hi2';
import { FcDeleteDatabase, FcCheckmark } from 'react-icons/fc';
import { FcFullTrash } from 'react-icons/fc';

import {
  useGetCommuneQuery,
  useCreateCommuneMutation,
  useDeleteCommuneMutation,
  useGetOneCommuneQuery,
  useUpdateCommuneMutation,
} from '../../redux/slices/communeApiSlice';
import { useGetDistrictQuery } from '../../redux/slices/districtApiSlice';
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
import Pagination from '../../components/Pagination/Pagination';
import { RiSearchLine } from 'react-icons/ri';
import { FiPlus } from 'react-icons/fi';
import { ReactPaginatation } from '../../components/Pagination/ReactPagination';

const ListeCommune = () => {
  const { data, isLoading, isSuccess, isError, refetch, isFetching } =
    useGetCommuneQuery();

  const [val, setVal] = useState('');
  const filteredCommunes = data?.commune.filter((item) =>
    val === ''
      ? true
      : item.nomCommune.toLowerCase().includes(val.toLowerCase())
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
      <h2 className='text-xl font-semibold dark:text-white'>
        Liste de tous les Communes
      </h2>
      <div className='flex items-center justify-between my-3'>
        <div className='border border-slate-700 dark:border-slate-500 md:w-80 w-40 rounded-md flex  px-3 items-center space-x-2  dark:text-white'>
          <RiSearchLine size={'20px'} />
          <input
            onChange={(e) => setVal(e.target.value)}
            value={val}
            type='text'
            className='outline-none bg-transparent border-none border-b-2 border-gray-400 focus:border-white focus:ring-0 '
          />
        </div>
        <div
          onClick={toggleAddModal}
          className='flex justify-center cursor-pointer  rounded-md bg-gradient-to-r from-cyan-400 to-indigo-600 items-center px-2 md:w-max w-20'
        >
          <FiPlus size={'30px'} className='text-white' />
          <button className=' text-white py-2 px-4   hidden md:block'>
            Ajout commune
          </button>
        </div>
      </div>
      <div className='w-full min-h-[150px] bg-slate-50 dark:bg-slate-900  rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto '>
        <TableHeader col='md:grid-cols-[2fr,1fr,2fr,max-content]'>
          <div className='md:hidden'>Informations</div>
          <div className='hidden md:block'>Nom District</div>
          <div className='hidden md:block'>Code Commune</div>
          <div className='hidden md:block'>Nom de la Commune</div>

          <div className='hidden md:block'>Actions</div>
        </TableHeader>
        <div className='flex flex-col dark:bg-slate-900 '>
          {(isLoading || isFetching) && (
            <div className='flex items-center justify-center  mt-12'>
              <Loader />
            </div>
          )}

          {(!isLoading || !isFetching) && isSuccess ? (
            <>
              {/* {filteredCommunes.length === 0 && (
                <div className='flex items-center justify-center mt-12'>
                  <Message
                    Icon={ExclamationTriangleIcon}
                    message='Aucune commune trouvée'
                  />
                </div>
              )} */}
              {filteredCommunes?.map((item) => (
                <TableRow
                  key={item.id}
                  col={
                    'md:grid-cols-[2fr,1fr,2fr,max-content] items-center dark:bg-gray-950'
                  }
                >
                  <div className='flex items-center space-x-2'>
                    <span className='md:hidden font-bold'>Nom District :</span>{' '}
                    <span>{item.district.nomDistrict}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='md:hidden font-bold'>code Commune :</span>{' '}
                    <span>{item.codeCommune}</span>
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>Nom Commune</span>
                    {item.nomCommune}
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
                pages={data.pages}
                page={data.page}
                total={data.totalPage}
              />
            </>
          ) : (
            isError && <ErrorPage refetch={refetch} />
          )}
        </div>
        {/* <ReactPaginatation itemsPerPage={2} /> */}
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
      <h2 className='text-xl text-center dark:text-white'>
        Une erreur s'est produite
      </h2>
    </div>
  );
};

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deleteCommune, { isLoading, isError, isSuccess }] =
    useDeleteCommuneMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteCommune(id).unwrap();
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
    codeCommune: yup.string().required('Entrez le code'),
    nomCommune: yup.string().required('entrez nom de la Commune'),
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
    data: Districts,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetDistrictQuery();

  const [show, setShow] = useState(true);
  const [createCommune, { isLoading, isSuccess, isError }] =
    useCreateCommuneMutation();

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
      const res = await createCommune({
        ...data,
      }).unwrap();
      refetch();
    } catch (error) {}
  };
  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className='text-center font-bold text-xl'>create Commune</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              label={'Code'}
              type={'text'}
              state={{ ...register('codeCommune') }}
              error={errors?.codeCommune}
            />
            <p className='text-sm text-rose-500'>
              {errors?.codeCommune?.message}
            </p>
            <Input
              label={'Nom Commune'}
              type={'text'}
              state={{ ...register('nomCommune') }}
              error={errors?.nomCommune}
            />
            <p className='text-sm text-rose-500'>
              {errors?.nomCommune?.message}
            </p>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>district : </label>
              <select
                id='classe'
                name='classe'
                {...register('districtId')}
                className='block w-full rounded-md border-0 py-1.5 dark:bg-slate-900 dark:text-slate-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingClasse &&
                  successClasse &&
                  Districts?.district.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.nomDistrict}
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
  const [updateCommune, { isLoading, isError, isFetching, isSuccess }] =
    useUpdateCommuneMutation(id);

  const {
    data: Commune,
    isSuccess: etudiantSuccess,
    status,
  } = useGetOneCommuneQuery(id, {
    skip: !open,
  });
  const {
    data: districts,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetDistrictQuery();
  console.log(districts);

  // Create a schema
  const schema = yup.object().shape({
    codeCommune: yup.string().required('Entrez le code'),
    nomCommune: yup.string().required('entrez nom de la Commune'),
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
      setValue('codeCommune', Commune.codeCommune);
      setValue('nomCommune', Commune.nomCommune);
      setValue('districtId', Commune.districtId);
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateCommune({
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
          <h1 className='text-center font-bold text-xl'>
            Modifier commune {id}
          </h1>

          <div className='flex items-center justify-center'></div>

          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              state={{ ...register('codeCommune') }}
              label={'Code Commune'}
              type={'text'}
              error={errors?.codeCommune}
            />
            <p className='text-sm text-rose-500'>{errors?.code?.message}</p>
            <Input
              state={{ ...register('nomCommune') }}
              label={'Nom Commune'}
              type={'text'}
              error={errors?.nomCommune}
            />

            <p className='text-sm text-rose-500'>
              {errors?.nomCommune?.message}
            </p>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>District : </label>
              <select
                id='classe'
                name='classe'
                {...register('districtId')}
                className='block w-full rounded-md border-0 py-1.5 dark:bg-slate-900 dark:text-slate-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingClasse &&
                  successClasse &&
                  districts?.district.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.nomDistrict}
                    </option>
                  ))}
              </select>
            </div>

            <button className=' mt-5 bg-blue-600 text-white py-2 px-8 rounded cursor-pointer'>
              Modifer Commune
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

export default ListeCommune;

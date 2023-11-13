import React, { useEffect, useState } from 'react';
import TableHeader from '../../components/Tables/TableHeader';
import TableRow from '../../components/Tables/TableRow';

import { HiMiniTrash, HiMiniPencil, HiMiniUserCircle } from 'react-icons/hi2';
import { FcDeleteDatabase, FcCheckmark } from 'react-icons/fc';
import { FcFullTrash } from 'react-icons/fc';

import {
  useCreateFokontanyMutation,
  useDeleteFokontanyMutation,
  useGetFokontanyQuery,
  useGetOneFokontanyQuery,
  useUpdateFokontanyMutation,
} from '../../redux/slices/fokontanySlice';
import { useGetEnqueteurSelectQuery } from '../../redux/slices/enqueteurSlice';
import { useGetCommuneQuery } from '../../redux/slices/communeSlice';
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
import { setIdValue } from '../../redux/filitrageCommuneSlice';
import { useSelector, useDispatch } from 'react-redux';

const ListeFokontany = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, refetch, isFetching } =
    useGetFokontanyQuery();
  const [val, setVal] = useState('');
  const filteredFokontany = data?.filter((item) =>
    val === ''
      ? true
      : item.nomFokontany.toLowerCase().includes(val.toLowerCase())
  );

  const [selectedId, setSelectedId] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!addModal);


  const {
    data: commune,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetCommuneQuery();
  const communeid = commune?.commune[0].id;
  
  
  const { idCommune } = useSelector((state) => state.filtrageCommune);
  // const [i, setI] = useState(0);
  // const [communeId, setCommuneId] = useState(
  //   idCommune == '' ? commune?.commune[i].id : idCommune
  // );
  
 
  
 
  
  console.log(idCommune);
  return (
    <div className='p-4'>
      <div className='flex space-x-2 '>
        <h2 className='text-xl md:block hidden font-semibold dark:text-white'>
          Liste de tous les fokontany par commune:
        </h2>
        <select
          id='classe'
          name='classe'
          onChange={(e) => {
            dispatch(setIdValue(e.target.value));
          }}
          className='block w-[230px] dark:bg-slate-900 dark:text-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
        >
          {!loadingClasse &&
            successClasse &&
            commune?.commune.map((commune) => (
              <option key={commune.id} value={commune.id}>
                {commune.nomCommune}
              </option>
            ))}
        </select>
      </div>
      <div
        onClick={toggleAddModal}
        className='flex justify-end items-center my-2 '
      >
        <div className='flex   bg-indigo-500  rounded-md '>
          <FiPlus size={'30px'} className='text-white' />
          <button className=' text-white py-2 px-4    hidden md:block'>
            Ajout Fokontany
          </button>
        </div>
      </div>
      <div className=' flex  justify-end my-3 items-center'>
        <input
          onChange={(e) => setVal(e.target.value)}
          value={val}
          type='text'
          placeholder='Recherche fokontany'
          className='block w-[96] rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
      </div>

      <div className='w-full min-h-[150px] bg-slate-50 dark:bg-slate-900  rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto '>
        <TableHeader col='md:grid-cols-[1fr,1fr,1fr,2fr,max-content]'>
          <div className='md:hidden'>Informations</div>
          <div className='hidden md:block'>Nom Commune</div>
          <div className='hidden md:block'>Code Fokontany</div>
          <div className='hidden md:block'>Nom de la Fokontany</div>
          <div className='hidden md:block'>Enqueteur</div>

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
              {/* {filteredFokontanys.length === 0 && (
                <div className='flex items-center justify-center mt-12'>
                  <Message
                    Icon={ExclamationTriangleIcon}
                    message='Aucune Fokontany trouvée'
                  />
                </div>
              )} */}
              {filteredFokontany
                ?.filter((item) =>
                  idCommune === ''
                    ? communeid === item.communeId
                    : item.communeId === idCommune
                )
                .map((item) => (
                  <TableRow
                    key={item.id}
                    col={
                      'md:grid-cols-[1fr,1fr,1fr,2fr,max-content] items-center dark:bg-gray-950'
                    }
                  >
                    <div className='flex items-center space-x-2'>
                      <span className='md:hidden font-bold'>Nom Commune :</span>{' '}
                      <span>{item.commune.nomCommune}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='md:hidden font-bold'>
                        code Fokontany :
                      </span>{' '}
                      <span>{item.codeFokontany}</span>
                    </div>
                    <div className=''>
                      <span className='md:hidden font-bold'>Nom Fokontany</span>
                      {item.nomFokontany}
                    </div>
                    <div className=''>
                      <span className='md:hidden font-bold'>Enqueteur</span>{' '}
                      {item.enqueteur === null ? (
                        <span className='text-red-500'>pas d'enqueteur</span>
                      ) : (
                        item.enqueteur.nom
                      )}
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

  const [deleteFokontany, { isLoading, isError, isSuccess }] =
    useDeleteFokontanyMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteFokontany(id).unwrap();
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
    codeFokontany: yup.string().required('Entrez le code'),
    nomFokontany: yup.string().required('entrez nom de la Fokontany'),
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
    data: commune,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetCommuneQuery();

  const [show, setShow] = useState(true);
  const [createFokontany, { isLoading, isSuccess, isError }] =
    useCreateFokontanyMutation();

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
      const res = await createFokontany({
        ...data,
      }).unwrap();
      refetch();
    } catch (error) {}
  };
  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className='text-center font-bold text-xl'>create Fokontany</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              label={'Code'}
              type={'text'}
              state={{ ...register('codeFokontany') }}
              error={errors?.codeFokontany}
            />
            <p className='text-sm text-rose-500'>
              {errors?.codeFokontany?.message}
            </p>
            <Input
              label={'Nom Fokontany'}
              type={'text'}
              state={{ ...register('nomFokontany') }}
              error={errors?.nomFokontany}
            />
            <p className='text-sm text-rose-500'>
              {errors?.nomFokontany?.message}
            </p>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Commune</label>
              <select
                id='classe'
                name='classe'
                {...register('communeId')}
                className='block w-full rounded-md border-0 py-1.5 dark:bg-slate-900 dark:text-slate-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingClasse &&
                  successClasse &&
                  commune?.commune.map((commune) => (
                    <option key={commune.id} value={commune.id}>
                      {commune.nomCommune}
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
  const [updateFokontany, { isLoading, isError, isFetching, isSuccess }] =
    useUpdateFokontanyMutation(id);

  const {
    data: Fokontany,
    isSuccess: fokontanySuccess,
    status,
  } = useGetOneFokontanyQuery(id, {
    skip: !open,
  });
  const {
    data: commune,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetCommuneQuery();
  const {
    data,
    isLoading: loadingEnqueteur,
    isSuccess: successEnqueteur,
  } = useGetEnqueteurSelectQuery();
  console.log(data);

  // Create a schema
  const schema = yup.object().shape({
    codeFokontany: yup.string().required('Entrez le code'),
    nomFokontany: yup.string().required('entrez nom de la Fokontany'),
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
      setValue('codeFokontany', Fokontany.codeFokontany);
      setValue('nomFokontany', Fokontany.nomFokontany);
      setValue('communeId', Fokontany.communeId);
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateFokontany({
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
          <h1 className='text-center font-bold text-xl'>Modifier fokontany</h1>

          <div className='flex items-center justify-center'></div>

          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              state={{ ...register('codeFokontany') }}
              label={'Code Fokontany'}
              type={'text'}
              error={errors?.codeFokontany}
            />
            <p className='text-sm text-rose-500'>{errors?.code?.message}</p>
            <Input
              state={{ ...register('nomFokontany') }}
              label={'Nom Fokontany'}
              type={'text'}
              error={errors?.nomFokontany}
            />

            <p className='text-sm text-rose-500'>
              {errors?.nomFokontany?.message}
            </p>

            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Commune</label>
              <select
                id='classe'
                name='classe'
                {...register('communeId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingClasse &&
                  successClasse &&
                  commune?.commune.map((commune) => (
                    <option key={commune.id} value={commune.id}>
                      {commune.nomCommune}
                    </option>
                  ))}
              </select>
            </div>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Enqueteur</label>
              <select
                id='classe'
                name='classe'
                {...register('enqueteurId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingEnqueteur &&
                  successEnqueteur &&
                  data?.map((enqueteur) => (
                    <option key={enqueteur.id} value={enqueteur.id}>
                      {enqueteur.nom}
                    </option>
                  ))}
              </select>
            </div>

            <button className=' mt-5 bg-blue-600 text-white py-2 px-8 rounded cursor-pointer'>
              Modifer Fokontany
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

export default ListeFokontany;

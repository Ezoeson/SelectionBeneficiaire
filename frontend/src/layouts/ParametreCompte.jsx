import React, { useEffect, useState } from 'react';
import TableHeader from '../components/Tables/TableHeader';
import TableRow from '../components/Tables/TableRow';

import { HiMiniTrash, HiMiniPencil, HiMiniUserCircle } from 'react-icons/hi2';
import { FcDeleteDatabase, FcCheckmark } from 'react-icons/fc';
import { RiSearchLine } from 'react-icons/ri';
import { FcFullTrash } from 'react-icons/fc';

import {
  useCreateEnqueteurMutation,
  useDeleteEnqueteurMutation,
  useGetEnqueteurQuery,
  useGetOneEnqueteurQuery,
  useUpdateEnqueteurMutation,
} from '../redux/slices/enqueteurSlice';
import {
  useGetCompteEnqueteurQuery,
  useDeleteCompteMutation,
  useGetOneCompteQuery,
  useUpdateCompteMutation,
  useGetCompteByClerkQuery,
  useGetOneCompteByidQuery,
} from '../redux/slices/compteSlice';
import { useGetCommuneQuery } from '../redux/slices/communeSlice';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import Message from '../components/Message/Message';
import SlideOver from '../components/Modal/SlideOver';
import Input from '../components/Input/Input';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { BiSolidCameraPlus } from 'react-icons/bi';

import { useUploadImageMutation } from '../redux/slices/uploadSlice';

import { useParams, useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import { HiOutlineUserPlus } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';

const ParametreCompte = () => {
  const [val, setVal] = useState('');

  const { data, isLoading, isSuccess, isFetching, isError, refetch } =
    useGetCompteEnqueteurQuery();

  const [selectedId, setSelectedId] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!addModal);

  const compte = data?.filter((item) =>
    val === '' ? true : item.pseudo.toLowerCase().includes(val.toLowerCase())
  );

  return (
    <div className='p-4 '>
      <h2 className='text-xl font-semibold dark:text-white'>
        Liste de tous les comptes d'utilisateur
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
        {/* <div
          onClick={toggleAddModal}
          className='flex justify-center  rounded-md bg-gradient-to-r from-cyan-400 to-indigo-600 items-center px-2 md:w-max w-20'
        >
          <HiOutlineUserPlus size={'30px'} className='text-white' />
          <button className=' text-white py-2 px-4   hidden md:block'>
            Ajout enqueteur
          </button>
        </div> */}
      </div>
      <div className='w-full min-h-[150px] bg-slate-50  dark:bg-slate-900 rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto '>
        <TableHeader col='md:grid-cols-[1fr,2fr,2fr,1fr,max-content]'>
          <div className='md:hidden'>Informations</div>

          <div className='hidden md:block'>Pseudo</div>
          <div className='hidden md:block'>Email</div>
          <div className='hidden md:block'>clerkId</div>
          <div className='hidden md:block'>Compte</div>

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
              {compte.length === 0 && (
                <div className='flex items-center justify-center mt-12'>
                  <Message
                    title='Aucun enqueteur trouvé '
                    icon={ExclamationTriangleIcon}
                  />
                </div>
              )}
              {compte?.map((item) => (
                <TableRow
                  key={item.id}
                  col={
                    'md:grid-cols-[1fr,2fr,2fr,1fr,max-content] items-center'
                  }
                >
                  <div className='flex items-center space-x-2'>
                    {item.enqueteur?.image === null ? (
                      <img
                        src='avatar3.jpg'
                        alt=''
                        className='w-10 h-10 rounded-full object-cover'
                      />
                    ) : (
                      <img
                        src={'/api' + item.enqueteur?.image}
                        alt=''
                        className='w-10 h-10 rounded-full object-cover'
                      />
                    )}
                    <span className='md:hidden font-bold'>Pseudo: </span>{' '}
                    <span>{item.pseudo}</span>
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>Email:</span>
                    {item.email}
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>ClerkId : </span>{' '}
                    {item.clerkId}
                  </div>
                  <div className=''>
                    <span className='md:hidden font-bold'>Compte : </span>{' '}
                    {/* {item.active} */}
                    <span>
                      {item.active ? (
                        <div className='flex space-x-1'>
                          <div className='w-4 h-4 bg-green-500 rounded-full'></div>
                          <span>activé</span>
                        </div>
                      ) : (
                        <div className='flex space-x-1'>
                          <div className='w-4 h-4 bg-red-500 rounded-full'></div>
                          <span>Desactivé</span>
                        </div>
                      )}
                    </span>
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

      {/* <AddModal open={addModal} setOpen={setAddModal} refetch={refetch} />
      <UpdateModal
        open={updateModal}
        setOpen={setUpdateModal}
        refetch={refetch}
        id={selectedId}
      />  */}
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
      <HiMiniPencil onClick={deleteFunc} className='text-xl cursor-pointer' />
      {/* <HiMiniPencil onClick={updateFunc} className='text-xl cursor-pointer' /> */}
    </div>
  );
};

const ErrorPage = ({ refetch }) => {
  return (
    <div className='w-full flex items-center flex-col justify-center h-60'>
      <FcDeleteDatabase className='text-[150px]' />
      <h2 className='text-xl text-center'>Une erreur s'est produite</h2>
    </div>
  );
};

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  // const [deleteCompte, { isLoading, isError, isSuccess }] =
  //   useDeleteCompteMutation();
  const { data: compte, isLoading: loading } = useGetOneCompteByidQuery(id);
  console.log(compte);
  const [update, { isLoading, isError, isSuccess }] = useUpdateCompteMutation();
  //   const [actives, setActives] = useState(!compte?.active);
  //   const[active,setActive]= useState(!actives)
  // console.log(active)
  const initialActive = compte?.active ?? false; // Assurez-vous d'avoir une valeur par défaut au cas où compte ou compte.active serait undefined/null
  const [active, setActive] = useState(initialActive);

  console.log(initialActive);
  const handleUpdate = async () => {
    try {
      setShow(false);
      const res = await update({
        data: {
          active: !initialActive,
        },
        id,
      }).unwrap();
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
                  {/* <FcFullTrash className='text-[175px]' /> */}
                  {!loading && (
                    <div className='text-white'>
                      {initialActive
                        ? `Voulez-vous desactiver ce compte:? ${compte?.pseudo}`
                        : `Voulez-vous activer ce compte?`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse justify-center sm:px-6'>
            <button
              type='button'
              className='inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'
              onClick={handleUpdate}
            >
              oui
            </button>
            <button
              type='button'
              className='mt-3 inline-flex w-full justify-center rounded-md  bg-red-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              onClick={() => setOpen(false)}
            >
              non
            </button>
          </div>
        </>
      ) : isLoading ? (
        <Message title='Modification en cours' icon={Loader} />
      ) : isSuccess ? (
        <Message title='Modifcation success' icon={FcCheckmark} />
      ) : (
        isError && (
          <Message title='Something went wrong' icon={FcDeleteDatabase} />
        )
      )}
    </Modal>
  );
};

const AddModal = ({ open, setOpen, refetch }) => {
  // Create a schema
  const schema = yup.object().shape({
    nom: yup.string().required('veuillez entrer votre nom'),

    age: yup
      .number()
      .required(' veuillez entrer votre age ')
      .min(18, "L'âge doit être supérieur ou égal à 18")
      .max(60, "L'âge doit être inférieur ou égal à 60")
      .typeError('veuillez entrer un nombre'),
    code: yup.string().required('veuillez entrez votre code'),
  });

  const [uploadImage] = useUploadImageMutation();

  const [createEnqueteur, { isLoading, isSuccess, isError }] =
    useCreateEnqueteurMutation();

  const [image, setImage] = useState('');

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    data: communes,
    isLoading: loadingCommune,
    isSuccess: successCommune,
  } = useGetCommuneQuery();
  console.log(communes);

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await createEnqueteur({ ...data, image }).unwrap();
      refetch();
    } catch (error) {}
  };

  useEffect(() => {
    if (!open) {
      reset();
      setImage('');
    }
  }, [open]);

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
          <h1 className='text-center font-bold text-xl'>Ajout enqueteur</h1>

          <div className='flex items-center justify-center'>
            <div className='w-40 h-40 rounded-full border border-dashed border-slate-950 dark:border-slate-50 flex items-center justify-center relative'>
              {image === '' ? (
                <img
                  src='avatar3.jpg'
                  alt=''
                  className='w-full h-full rounded-full object-cover'
                />
              ) : (
                <img
                  src={'/api' + image}
                  alt=''
                  className='w-full h-full object-cover rounded-full'
                />
              )}
              <input
                type='file'
                onChange={handleUpload}
                name=''
                className='w-full h-full  absolute opacity-0'
                id=''
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              state={{ ...register('nom') }}
              label={'Nom'}
              type={'text'}
              error={errors?.nom}
            />
            <p className='text-sm text-rose-500'>{errors?.nom?.message}</p>
            <Input
              state={{ ...register('age') }}
              label={'age'}
              type={'number'}
              error={errors?.age}
            />

            <p className='text-sm text-rose-500'>{errors?.age?.message}</p>
            <Input
              state={{ ...register('code') }}
              label={'code enqueteur'}
              type={'text'}
              error={errors?.code}
            />
            <p className='text-sm dark:bg-slate-900 text-rose-500'>
              {errors?.code?.message}
            </p>

            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Commune : </label>
              <select
                id='classe'
                name='classe'
                {...register('communeId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingCommune &&
                  successCommune &&
                  communes?.commune?.map((commune) => (
                    <option key={commune.id} value={commune.id}>
                      {commune.nomCommune}
                    </option>
                  ))}
              </select>
            </div>

            <button className=' mt-5 bg-blue-600 text-white py-2 px-8 rounded cursor-pointer'>
              ajout enqueteur
            </button>
          </form>
        </div>
      ) : isLoading ? (
        <div className='h-full w-full flex items-center justify-center'>
          <Message title='Ajout en cours' icon={Loader} />
        </div>
      ) : isSuccess ? (
        <div className='h-full w-full flex items-center justify-center'>
          <Message title='Ajout success' icon={FcCheckmark} />
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

const UpdateModal = ({ open, setOpen, refetch, id }) => {
  const {
    data: enqueteur,
    isSuccess: EnqueteurSuccess,
    status,
  } = useGetOneEnqueteurQuery(id, {
    skip: !open,
  });
  console.log(enqueteur);

  // Create a schema

  const schema = yup.object().shape({
    nom: yup.string().required('veuillez entrer votre nom'),

    age: yup.number().required(' veuillez entrer votre age '),
    code: yup.string().required('veuillez entrez votre code'),
  });

  const [uploadImage] = useUploadImageMutation();

  const [updateEnqueteur, { isLoading, isError, isSuccess }] =
    useUpdateEnqueteurMutation();

  const [image, setImage] = useState('');

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      console.log(error);
    }
  };

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
      setValue('nom', enqueteur.nom);
      setValue('age', enqueteur.age);
      setValue('code', enqueteur.code);
      setValue('communeId', enqueteur.communeId);
      setImage(enqueteur.image);
    }
  }, [status]);

  const {
    data: communes,
    isLoading: loadingCommune,
    isSuccess: successCommune,
  } = useGetCommuneQuery();

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateEnqueteur({
        data: {
          ...data,
          image,
        },
        id,
      }).unwrap();
      refetch();
    } catch (error) {}
  };

  useEffect(() => {
    if (!open) {
      reset();
      setImage('');
    }
  }, [open]);

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
          <h1 className='text-center font-bold text-xl'>Ajout enqueteur</h1>

          <div className='flex items-center justify-center'>
            <div className='w-40 h-40 rounded-full border border-dashed border-slate-950 flex items-center justify-center relative'>
              {image === '' ? (
                <BiSolidCameraPlus className='text-[100px]' />
              ) : (
                <img
                  src={'/api' + image}
                  alt=''
                  className='w-full h-full object-cover rounded-full'
                />
              )}
              <input
                type='file'
                onChange={handleUpload}
                name=''
                className='w-full h-full absolute opacity-0'
                id=''
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <Input
              state={{ ...register('nom') }}
              label={'Nom'}
              type={'text'}
              error={errors?.nom}
            />
            <p className='text-sm text-rose-500'>{errors?.nom?.message}</p>
            <Input
              state={{ ...register('age') }}
              label={'age'}
              type={'number'}
              error={errors?.age}
            />

            <p className='text-sm text-rose-500'>{errors?.age?.message}</p>
            <Input
              state={{ ...register('code') }}
              label={'code enqueteur'}
              type={'text'}
              error={errors?.code}
            />
            <p className='text-sm text-rose-500'>{errors?.code?.message}</p>

            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Commune : </label>
              <select
                id='commune'
                name='commune'
                {...register('communeId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingCommune &&
                  successCommune &&
                  communes?.commune.map((commune) => (
                    <option key={commune.id} value={commune.id}>
                      {commune.nomCommune}
                    </option>
                  ))}
              </select>
            </div>

            <button className=' mt-5 bg-blue-600 text-white py-2 px-8 rounded cursor-pointer'>
              Modifer enqueteur
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

export default ParametreCompte;

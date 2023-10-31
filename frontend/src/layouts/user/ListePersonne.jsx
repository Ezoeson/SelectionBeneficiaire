import React, { useEffect, useState } from 'react';
import TableHeader from '../../components/Tables/TableHeader';
import TableRow from '../../components/Tables/TableRow';
import { useNavigate } from 'react-router-dom';
import { HiMiniTrash, HiMiniPencil, HiMiniUserCircle } from 'react-icons/hi2';
import { FcDeleteDatabase, FcCheckmark } from 'react-icons/fc';
import { BiSolidCameraPlus } from 'react-icons/bi';
import { useGetBeneficiaireQuery } from '../../redux/slices/beneficiaireApiSlice';
import { FcFullTrash } from 'react-icons/fc';
import { TbEyeQuestion } from 'react-icons/tb';
import Pagination from '../../components/Pagination/Pagination';

import {
  useGetPersonneQuery,
  useCreatePersonneMutation,
  useDeletePersonneMutation,
  useGetOnePersonneQuery,
  useUpdatePersonneMutation,
} from '../../redux/slices/personneApiSlice';

import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import {
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import Message from '../../components/Message/Message';
import SlideOver from '../../components/Modal/SlideOver';
import Input from '../../components/Input/Input';

import { TbMessageCircleQuestion } from 'react-icons/tb';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useUploadImageMutation } from '../../redux/slices/uploadSlice';
import { useAuth } from '@clerk/clerk-react';
import { useGetCompteByClerkQuery } from '../../redux/slices/compteApiSlice';

const ListePersonne = () => {
  const {
    data: personne,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isFetching,
  } = useGetPersonneQuery();

  const [selectedId, setSelectedId] = useState('');
  const [image, setImage] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!addModal);
  const toggleShowModal = () => setShowModal(!showModal);
  const { userId } = useAuth();
  const { data: compte } = useGetCompteByClerkQuery(userId);
  const enqueteurId = compte?.enqueteur.id;

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold dark:text-slate-100'>
        Liste de tous les Personnnes
      </h2>
      <div className='flex items-center justify-end my-3'>
        <button
          onClick={toggleAddModal}
          className='bg-blue-600 text-white py-2 px-8 rounded cursor-pointer'
        >
          Ajouter Personnne
        </button>
      </div>
      <div className='w-full min-h-[150px] bg-slate-50  dark:bg-slate-900 rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto '>
        <TableHeader col='md:grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,max-content]'>
          <div className='md:hidden'>Liste personne</div>
          <div className='hidden md:block'>Nom</div>
          <div className='hidden md:block'>Prenom</div>
          <div className='hidden md:block'>Age</div>
          <div className='hidden md:block'>Sexe</div>
          <div className='hidden md:block'>Cin</div>
          <div className='hidden md:block'>Type</div>

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
              {personne
                ?.filter(
                  (personne) =>
                    personne.beneficiaire.enqueteurId === enqueteurId
                )
                .map((item) => (
                  <TableRow
                    key={item.id}
                    col={
                      'md:grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,max-content] items-center'
                    }
                  >
                    <div className='flex items-center space-x-2'>
                      {item.image === null ? (
                        <HiMiniUserCircle className='w-10 h-10' />
                      ) : (
                        <img
                          src={'http://localhost:5000' + item.image}
                          alt=''
                          className='w-10 h-10 rounded-full object-cover'
                        />
                      )}
                      <span className='md:hidden font-bold'>Nom :</span>{' '}
                      <span>{item.nom}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='md:hidden font-bold'>Prenom :</span>{' '}
                      <span>{item.prenom}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='md:hidden font-bold'>Age :</span>{' '}
                      <span>{item.age}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='md:hidden font-bold'>Sexe :</span>{' '}
                      <span>{item.sexe}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='md:hidden font-bold'>Cin :</span>{' '}
                      <span>{item.cin}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='md:hidden font-bold'>Type :</span>{' '}
                      <span>{item.type}</span>
                    </div>

                    <Actions
                      id={item.id}
                      setSelectedId={setSelectedId}
                      toggleDeleteModal={toggleDeleteModal}
                      toggleUpdateModal={toggleUpdateModal}
                      toggleShowModal={toggleShowModal}
                      image={item.image}
                      setImage={setImage}
                    />
                  </TableRow>
                ))}
              {/* <Pagination /> */}
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

      <AddModal
        open={addModal}
        setOpen={setAddModal}
        refetch={refetch}
        enqueteurId={enqueteurId}
      />
      <ShowModal
        open={showModal}
        setOpen={setShowModal}
        id={selectedId}
        image={image}
      />
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
  toggleShowModal,
  image,
  setImage,
}) => {
  const deleteFunc = () => {
    setSelectedId(id);
    toggleDeleteModal();
  };

  const updateFunc = () => {
    setSelectedId(id);
    toggleUpdateModal();
  };
  const showFunc = () => {
    setSelectedId(id);
    setImage(image);
    toggleShowModal();
  };

  return (
    <div className='flex items-center justify-center space-x-4'>
      <TbMessageCircleQuestion
        onClick={showFunc}
        className='text-xl cursor-pointer '
      />
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

const ShowModal = ({ open, setOpen, id, image }) => {
  const navigate = useNavigate();
  const navigation = () => {
    navigate('/reponse/' + id);
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <>
        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
              <QuestionMarkCircleIcon
                className='h-6 w-6 text-indigo-500'
                aria-hidden='true'
              />
            </div>
            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
              <Dialog.Title
                as='h3'
                className='text-base font-semibold leading-6 text-gray-900'
              >
                Voulez-vous vraiment questionner cette personne?
              </Dialog.Title>
              <div className='mt-2 flex justify-center'>
                <div className='flex items-center space-x-2'>
                  <img
                    src={'http://localhost:5000' + image}
                    alt=''
                    className='w-[140px] h-[140px] rounded-full object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-center sm:px-6'>
          <button
            type='button'
            className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
          >
            Non
          </button>
          <button
            type='button'
            className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto'
            onClick={() => {
              setOpen(false);
              navigation();
            }}
          >
            oui
          </button>
        </div>
      </>
    </Modal>
  );
};

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deletePersonnne, { isLoading, isError, isSuccess }] =
    useDeletePersonneMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deletePersonnne(id).unwrap();
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
          <div className='bg-white dark:bg-slate-900 px-4 pb-4 pt-5 mb-10 sm:p-6 sm:pb-4'>
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

const AddModal = ({ open, setOpen, refetch, enqueteurId }) => {
  const schema = yup.object().shape({
    nom: yup.string().required('Entez le nom'),
    prenom: yup.string().required('Entez le prenom'),
    age: yup.number().required("Entez l'age"),
    sexe: yup.string().required('Entez le sexe'),
    cin: yup
      .string()
      .matches(/^\d{12}$/, 'Le CIN doit comporter exactement 12 chiffres')
      .required('Entez le CIN'),
    type: yup.string().required('Entez le type'),
  });
  const [image, setImage] = useState('');
  const [uploadImage] = useUploadImageMutation();
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
  // console.log(image);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    data,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetBeneficiaireQuery();

  const [show, setShow] = useState(true);
  const [createPersonnne, { isLoading, isSuccess, isError }] =
    useCreatePersonneMutation();

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
      const res = await createPersonnne({
        ...data,
        image,
      }).unwrap();
      refetch();
    } catch (error) {}
  };
  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className='text-center font-bold text-xl'>Ajout Personnne</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <div className='flex justify-center items-center'>
              <div className='w-40 h-40 rounded-full border border-dashed border-slate-950 flex items-center justify-center relative'>
                {image === '' ? (
                  <BiSolidCameraPlus className='text-[100px]' />
                ) : (
                  <img
                    src={'http://localhost:5000' + image}
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
            <Input
              label={'Nom'}
              type={'text'}
              state={{ ...register('nom') }}
              error={errors?.nom?.message}
            />
            <p className='text-sm text-rose-500'>{errors?.nom?.message}</p>
            <Input
              label={'Prenom'}
              type={'text'}
              state={{ ...register('prenom') }}
              error={errors?.prenom?.message}
            />
            <p className='text-sm text-rose-500'>{errors?.nom?.message}</p>
            <Input
              label={'Age'}
              type={'number'}
              state={{ ...register('age') }}
              error={errors?.age?.message}
            />
            <p className='text-sm text-rose-500'>{errors?.nom?.message}</p>
            <Input
              label={'Cin'}
              type={'text'}
              state={{ ...register('cin') }}
              error={errors?.cin?.message}
            />
            <p className='text-sm text-rose-500'>{errors?.cin?.message}</p>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Sexe</label>
              <select
                id='form'
                name='form'
                {...register('sexe')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value='Homme'>Homme</option>
                <option value='Femme'>Femme</option>
              </select>
            </div>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Type</label>
              <select
                id='form'
                name='form'
                {...register('type')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value='RECEPTEUR'>Recepteur</option>
                <option value='FAMILLE'>Famille</option>
                <option value='CHEF_MENAGE'> Chef_menage</option>
                <option value='ENFANT'>Enfant</option>
                <option value='CONJOINT'>Conjoint</option>
              </select>
            </div>

            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Beneficiaire: </label>
              <select
                id='classe'
                name='classe'
                {...register('beneficiaireId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingClasse &&
                  successClasse &&
                  data?.beneficiaire
                    .filter(
                      (beneficiaire) => beneficiaire.enqueteurId === enqueteurId
                    )
                    .map((beneficiaire) => (
                      <option key={beneficiaire.id} value={beneficiaire.id}>
                        {beneficiaire.nomBeneficiaire}
                      </option>
                    ))}
              </select>
            </div>
            <div className='flex justify-center items-center'>
              <button className='mt-5 cursor:pointer py-2 px-8 bg-indigo-500 rounded  text-white '>
                Ajouter
              </button>
            </div>
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
  const schema = yup.object().shape({
    nom: yup.string().required('Entez le nom'),
    prenom: yup.string().required('Entez le prenom'),
    age: yup.number().required("Entez l'age"),
    sexe: yup.string().required('Entez le sexe'),
    cin: yup
      .string()
      .matches(/^\d{12}$/, 'Le CIN doit comporter exactement 12 chiffres')
      .required('Entez le CIN'),
    type: yup.string().required('Entez le type'),
  });
  const [image, setImage] = useState('');
  const [uploadImage] = useUploadImageMutation();
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
  const {
    data,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetBeneficiaireQuery();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [updatePersonnne, { isLoading, isError, isFetching, isSuccess }] =
    useUpdatePersonneMutation(id);
  const [show, setShow] = useState(true);

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

  const {
    data: Personnne,
    isSuccess: etudiantSuccess,
    status,
  } = useGetOnePersonneQuery(id, {
    skip: !open,
  });

  // Create a schema

  useEffect(() => {
    if (status === 'fulfilled') {
      setValue('nom', Personnne.nom);
      setValue('prenom', Personnne.prenom);
      setValue('age', Personnne.age);
      setValue('sexe', Personnne.sexe);
      setValue('cin', Personnne.cin);
      setValue('type', Personnne.type);
      setImage(Personnne.image);
      setValue('beneficiaireId', Personnne.beneficiaireId);
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updatePersonnne({
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
          <h1 className='text-center font-bold text-xl'>Ajout Personnne</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
            <div className='flex justify-center items-center'>
              <div className='w-40 h-40 rounded-full border border-dashed border-slate-950 flex items-center justify-center relative'>
                {image === '' ? (
                  <BiSolidCameraPlus className='text-[100px]' />
                ) : (
                  <img
                    src={'http://localhost:5000' + image}
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
            <Input
              label={'Nom'}
              type={'text'}
              state={{ ...register('nom') }}
              error={errors?.nom?.message}
            />
            <p className='text-sm text-rose-500'>{errors?.nom?.message}</p>
            <Input
              label={'Prenom'}
              type={'text'}
              state={{ ...register('prenom') }}
              error={errors?.prenom?.message}
            />
            <p className='text-sm text-rose-500'>{errors?.nom?.message}</p>
            <Input
              label={'Age'}
              type={'number'}
              state={{ ...register('age') }}
              error={errors?.age?.message}
            />
            <p className='text-sm text-rose-500'>{errors?.nom?.message}</p>
            <Input
              label={'Cin'}
              type={'text'}
              state={{ ...register('cin') }}
              error={errors?.cin?.message}
            />
            <p className='text-sm text-rose-500'>{errors?.cin?.message}</p>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Sexe</label>
              <select
                id='form'
                name='form'
                {...register('sexe')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value='Homme'>Homme</option>
                <option value='Femme'>Femme</option>
              </select>
            </div>
            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Type</label>
              <select
                id='form'
                name='form'
                {...register('type')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value='RECEPTEUR'>Recepteur</option>
                <option value='FAMILLE'>Famille</option>
                <option value='CHEF_MENAGE'> Chef_menage</option>
                <option value='ENFANT'>Enfant</option>
                <option value='CONJOINT'>Conjoint</option>
              </select>
            </div>

            <div className='mt-2 flex items-center space-x-3'>
              <label htmlFor=''>Beneficiaire: </label>
              <select
                id='classe'
                name='classe'
                {...register('beneficiaireId')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {!loadingClasse &&
                  successClasse &&
                  data?.beneficiaire.map((beneficiaire) => (
                    <option key={beneficiaire.id} value={beneficiaire.id}>
                      {beneficiaire.nomBeneficiaire}
                    </option>
                  ))}
              </select>
            </div>
            <div className='flex justify-center items-center'>
              <button className='mt-5 cursor:pointer py-2 px-8 bg-indigo-500 rounded  text-white '>
                Modifier
              </button>
            </div>
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

export default ListePersonne;

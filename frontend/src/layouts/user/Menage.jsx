import React, { useEffect, useState } from 'react';
import TableHeader from '../../components/Tables/TableHeader';
import TableRow from '../../components/Tables/TableRow';

import { HiMiniTrash, HiMiniPencil } from 'react-icons/hi2';
import { FcDeleteDatabase, FcCheckmark } from 'react-icons/fc';
import CsvDownloader from 'react-csv-downloader';

import {
  useGetBeneficiaireQuery,
  useDeleteBeneficiaireMutation,
} from '../../redux/slices/beneficiaireSlice';
import { useGetEnqueteurQuery } from '../../redux/slices/enqueteurSlice';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import Message from '../../components/Message/Message';
import SlideOver from '../../components/Modal/SlideOver';
import Input from '../../components/Input/Input';
import { FcFullTrash } from 'react-icons/fc';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { RiSearchLine } from 'react-icons/ri';
import Pagination from '../../components/Pagination/Pagination';

import { FiPlus } from 'react-icons/fi';
import { useUser, useAuth } from '@clerk/clerk-react';
import {
  compteSlice,
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from '../../redux/slices/compteSlice';

const Menage = () => {
  const { userId } = useAuth();
  const { data: compte } = useGetCompteByClerkQuery(userId);
  const enqueteurId = compte?.enqueteur.id;
  const { data, isLoading, isSuccess, isError, refetch, isFetching } =
    useGetBeneficiaireQuery();

  const [selectedId, setSelectedId] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!addModal);
  const [val, setVal] = useState('');
  const filteredBeneficiaires = data?.beneficiaire.filter((item) =>
    val === ''
      ? true
      : item.nomBeneficiaire.toLowerCase().includes(val.toLowerCase())
  );
  const [selectedBeneficiaires, setSelectedBeneficiaires] = useState([]);

  const handleToggleSelection = (beneficiaire) => {
    if (selectedBeneficiaires.includes(beneficiaire)) {
      setSelectedBeneficiaires(
        selectedBeneficiaires.filter((b) => b !== beneficiaire)
      );
    } else {
      setSelectedBeneficiaires([...selectedBeneficiaires, beneficiaire]);
    }
  };

  const formattedData = selectedBeneficiaires.map((beneficiaire) => {
    const personneData = beneficiaire.personne.map((personne) => [
      personne.nom,
      personne.prenom,
      personne.cin,
      personne.age,
      personne.type,
    ]);

    return [
      beneficiaire.fokontany.codeFokontany,
      beneficiaire.fokontany.nomFokontany,
      beneficiaire.nomBeneficiaire,
      beneficiaire.note.value,
      ...personneData.flat(), // Use flat() to flatten the personneData array
    ];
  });
  const columns = [
    { id: 'codeFokontany', displayName: 'Code fokontany' },
    { id: 'nomFokontany', displayName: 'Fokontany' },
    { id: 'beneficiaire', displayName: 'Beneficiaire' },
    { id: 'note', displayName: 'Note' },
    { id: 'nom', displayName: 'Nom' },
    { id: 'prenom', displayName: 'Prenom' },
    { id: 'cin', displayName: 'Cin' },
    { id: 'age', displayName: 'Age' },
    {
      id: 'type',
      displayName: 'Type',
      transform: (value) => value.join(', '), // join array values with a comma
    },
  ];

  const [exportSuccess, setExportSuccess] = useState(false);
  const exportData = () => {
    // Code d'exportation de données avec CsvDownloader ici

    // Réinitialisez le tableau des bénéficiaires sélectionnés seulement si l'exportation réussit
    if (exportSucceeded) {
      setSelectedBeneficiaires([]);
    }
  };

  // Variable d'état pour indiquer si l'exportation a réussi
  const [exportSucceeded, setExportSucceeded] = useState(false);

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold dark:text-slate-100 '>
        Liste de tous les Beneficiaires
      </h2>
      <div className='flex items-center justify-between my-3'>
        <div className=' hover-bg-blue-700  w-[100px] text-white font-bold py-2 px-4  rounded'>
          <CsvDownloader
            columns={columns}
            filename={'beneficiaires.csv'}
            //
            datas={formattedData}
            meta='true'
            separator=';'
            onClick={exportData}
          >
            <img src='csv.png' alt='' className='rounded w-10 h-10' />
            <p className='dark:text-white text-slate-900'>Export</p>
          </CsvDownloader>
        </div>
        <div className='border border-slate-700 dark:border-slate-500 md:w-80 w-40 rounded-md flex  px-3 items-center space-x-2  dark:text-white'>
          <RiSearchLine size={'20px'} />
          <input
            onChange={(e) => setVal(e.target.value)}
            value={val}
            type='text'
            className='outline-none bg-transparent border-none border-b-2 border-gray-400 focus:border-white focus:ring-0 '
          />
        </div>
      </div>
      <div className='w-full min-h-[150px] bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto '>
        <TableHeader col='md:grid-cols-[1fr,2fr,1fr,2fr,max-content]'>
          <div className='md:hidden'>Informations</div>
          <div className='hidden md:block'>Code Beneficiaire</div>
          <div className='hidden md:block'>Adresse</div>
          <div className='hidden md:block'>Note</div>
          <div className='hidden md:block'>Recepteur</div>

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
              {filteredBeneficiaires?.length === 0 && (
                <div className='flex items-center justify-center mt-12'>
                  <Message
                    title='Aucun menage trouvé '
                    icon={ExclamationTriangleIcon}
                  />
                </div>
              )}

              {filteredBeneficiaires
                ?.filter(
                  (beneficiaire) => beneficiaire.enqueteurId === enqueteurId
                )
                .map((item) => (
                  <TableRow
                    key={item.id}
                    col={
                      'md:grid-cols-[1fr,2fr,1fr,2fr,max-content] items-center'
                    }
                  >
                    <div className='flex items-center space-x-2'>
                      <input
                        className='cursor-pointer'
                        type='checkbox'
                        onChange={() => handleToggleSelection(item)}
                        checked={selectedBeneficiaires.includes(item)}
                        disabled={exportSuccess}
                      />
                      <span className='md:hidden font-bold'>Nom :</span>{' '}
                      <span>{item.nomBeneficiaire}</span>
                    </div>
                    <div className=''>
                      <span className='md:hidden font-bold'>
                        Adresse Beneficiaire :
                      </span>{' '}
                      {item.fokontany.codeFokontany}{' '}
                      {item.fokontany.nomFokontany}
                    </div>
                    <div className=''>
                      <span className='md:hidden font-bold'>Note :</span>{' '}
                      {item.note === null ? (
                        <span className='text-red-500'>Pas de note</span>
                      ) : (
                        item.note.value
                      )}
                    </div>
                    {item.personne && item.personne.length > 0 ? (
                      item.personne?.map((personne) => (
                        <div className='flex items-center space-x-4'>
                          {personne.image === null ? (
                            <img
                              src='avatar3.jpg'
                              alt=''
                              className='w-10 h-10 rounded-full object-cover'
                            />
                          ) : (
                            <img
                              src={'/api' + personne.image}
                              alt=''
                              className='w-10 h-10 rounded-full object-cover'
                            />
                          )}
                          <span className='md:hidden font-bold'>Recepteur</span>

                          <span>{personne.nom}</span>
                        </div>
                      ))
                    ) : (
                      <div className='flex items-center space-x-4'>
                        <span className='md:hidden font-bold'>Recepteur</span>
                        <img
                          src='avatar3.jpg'
                          alt=''
                          className='w-10 h-10 rounded-full object-cover'
                        />
                        {/* <span className=''>Personne</span> */}
                      </div>
                    )}

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

  return (
    <div className='flex items-center justify-center space-x-4'>
      <HiMiniTrash onClick={deleteFunc} className='text-xl' />
    </div>
  );
};

const ErrorPage = ({ refetch }) => {
  return (
    <div className='w-full flex items-center flex-col justify-center h-60'>
      <FcDeleteDatabase className='text-[150px]' />
      <h2 className='text-xl text-center dark:text-slate-100'>
        Une erreur s'est produite
      </h2>
    </div>
  );
};

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deleteBeneficiaire, { isLoading, isError, isSuccess }] =
    useDeleteBeneficiaireMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteBeneficiaire(id).unwrap();
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

export default Menage;

import React from 'react';

import Confetti from 'react-confetti';

import CardUser from '../../components/CardUser/CardUser';
import ColoumnChart from '../../components/ApexChart/ColoumnChart';
import {
  useGetNoteByPersonneQuery,
  useGetBeneficiaireNombrePersonneQuery,
} from '../../redux/slices/beneficiaireSlice';
import { useGetPersonneNoteQuery } from '../../redux/slices/enqueteurSlice';
import {
  compteSlice,
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from '../../redux/slices/compteSlice';

import { useUser, useAuth } from '@clerk/clerk-react';
import BarChart from '../../components/BarChart/BarChart';
import LineChart from '../../components/BarChart/LineChart';
import Cards from '../../components/Card/Cards';
import {
  FcReading,
  FcBusinessman,
  FcConferenceCall,
  FcTodoList,
  FcViewDetails,
  FcCustomerSupport,
  FcBusinesswoman,
} from 'react-icons/fc';
import {
  useGetUserDasboardQuery,
  useGetDasboardQuery,
} from '../../redux/slices/dashboardApiSlice';
import { FaUserTie } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { ImUsers } from 'react-icons/im';
import { ImHome } from 'react-icons/im';
import { AiOutlineForm } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function UserDashboard() {
  const icons = [AiOutlineForm, AiOutlineForm, AiOutlineForm];
  const { userId } = useAuth();
  const { data: compte } = useGetCompteByClerkQuery(userId);
  const {
    data: stats,
    isLoading: loading,
    isSuccess: succes,
  } = useGetDasboardQuery();
  console.log(stats);

  const enqueteurId = compte?.enqueteur.id;
  console.log(enqueteurId);
  const {
    data: enqueteur,
    isSuccess: success,
    isLoading: loadingDashboard,
  } = useGetUserDasboardQuery(enqueteurId);
  console.log(enqueteur);

  // const { data: note, isSuccess } = useGetNoteByPersonneQuery();
  const {
    data: personneNote,
    isLoading,
    isError,
    isSuccess,
  } = useGetPersonneNoteQuery(enqueteurId);
  console.log(personneNote);

  {
    /* {isSuccess && (
    <ColoumnChart Note={personneNote.Note} Personne={personneNote.nomPersonne} />
  )} */
  }
  return (
    <section className='mt-10 px-8'>
      <div className=' ml-10 max-w[1280px] px-8 mt-4  mx-auto grid  gap-y-5 gap-x-10  min-[500px]:grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 '>
        {success &&
          !loadingDashboard &&
          enqueteur.statistic.map((stat, index) => (
            <Cards
              key={index}
              icon={icons[index]}
              label={stat.label}
              data={stat.data}
            />
          ))}
     
        {loadingDashboard && (
          <div className='flex space-x-3'>
            <div className='mt-2 py-5'>
              <Skeleton width={250} height={90} />
            </div>

            <div className='mt-2 py-5'>
              <Skeleton width={250} height={90} />
            </div>

            <div className='mt-2 py-5'>
              <Skeleton width={250} height={90} />
            </div>
            <div className='mt-2 py-5'>
              <Skeleton width={250} height={90} />
            </div>
          </div>
        )}
      </div>

      <div className='ml-10 px-8 mt-4 max-w[1280px] gap-y-4 gap-4 '>
        <div className='h-[450px] hidden md:block  bg-slate-100  dark:bg-slate-900 w-[800px]  rounded shadow-md shadow-blue-800'>
          <p className='p-3 font-semibold dark:text-slate-100'>
            Nombre de beneficiaire
          </p>
          <div className='h-[400px] w[1000px]'>
            {isSuccess && (
              <BarChart
                data={personneNote.Note}
                categories={personneNote.nomPersonne}
              />
            )}
          </div>
        </div>
        {/* <div className='h-[400px] bg-slate-200 rounded shadow-md'>
          <p className='p-3  font-semibold'>Nombre de beneficiaire</p>
          <div className='h-[400px]'>
            <LineChart
              name='Nombre de beneficiaire'
              data={[1, 2, 3, 5]}
              categories={['dimanche', 'Lunid', 'Mardi', 'Jeudi']}
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default UserDashboard;

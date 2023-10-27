import React from 'react';

import Confetti from 'react-confetti';
import { Cloudinary } from '@cloudinary/url-gen';
import CardUser from '../../components/CardUser/CardUser';
import ColoumnChart from '../../components/ApexChart/ColoumnChart';
import {
  useGetNoteByPersonneQuery,
  useGetBeneficiaireNombrePersonneQuery,
} from '../../redux/slices/beneficiaireApiSlice';
import { useGetPersonneNoteQuery } from '../../redux/slices/enqueteurApiSlice';
import {
  compteSlice,
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from '../../redux/slices/compteApiSlice';

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

function UserDashboard() {
  const { userId } = useAuth();
  const { data: compte } = useGetCompteByClerkQuery(userId);

  const enqueteurId = compte?.enqueteur.id;
  console.log(enqueteurId);
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
      <div className='max-w[1280px] px-8  mx-auto grid gap-x-10 min-[500px]:grid-cols-2 m sm:grid-cols-3 lg:grid-cols-4 '>
        <Cards icon={FcBusinessman} label='nombre total des menages' data='4' />
        <Cards icon={FcBusinessman} label='Beneficiaire' data='4' />
        <Cards icon={FcBusinessman} label='Beneficiaire' data='4' />
      </div>
      <div className='grid md:grid-cols-2 px-8 mt-4 max-w[1280px] gap-y-4 gap-4 mx-auto'>
        <div className='h-[400px] bg-slate-200 rounded shadow-md'>
          <p className='p-3 font-semibold'>Nombre de beneficiaire</p>
          <div className='h-[400px]'>
            {isSuccess && (
              <BarChart
                data={personneNote.Note}
                categories={personneNote.nomPersonne}
              />
            )}
          </div>
        </div>
        <div className='h-[400px] bg-slate-200 rounded shadow-md'>
          <p className='p-3  font-semibold'>Nombre de beneficiaire</p>
          <div className='h-[400px]'>
            <LineChart
              name='Nombre de beneficiaire'
              data={[1,2,3,5]}
              categories={['dimanche','Lunid','Mardi','Jeudi']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDashboard;

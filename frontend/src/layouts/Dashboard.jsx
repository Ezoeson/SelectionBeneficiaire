import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import CardInfo from '../components/Card/Card';
import { useCountBeneficiaireQuery } from '../redux/slices/beneficiaireSlice';
import { useCountEnqueteurQuery } from '../redux/slices/userSlice';
import PieCard from '../components/charts/PieCard';
// import PieChart from '../components/charts/PieChart';
import { pieChartOptions } from '../components/charts/data';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { v4 as uuidv4 } from 'uuid';
import ApexChart from '../components/ApexChart/ApexChart';
import { useGetCommuneChartQuery } from '../redux/slices/communeSlice';
import PieChart from '../components/ApexChart/Piechart';
import { useGetNombreQuestionQuery } from '../redux/slices/categorieSlice';
import BarChart from '../components/BarChart/BarChart';
import LineChart from '../components/BarChart/LineChart';
import Cards from '../components/Card/Cards';

import { AiOutlineForm } from 'react-icons/ai';

import { FaUserTie } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { ImUsers } from 'react-icons/im';
import { ImHome } from 'react-icons/im';
import { useGetDasboardQuery,useGetDasboardDateQuery } from '../redux/slices/dashboardApiSlice';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Dashboard = () => {
  // const [date,setDate]= useState(new Date())
  const date = new Date();

 
  const dateEnFrancais = format(date, 'EEEE d MMMM yyyy', { locale: fr });
  const {
    data: stats,
    isLoading: loadingDashboard,
    isSuccess: success,
  } = useGetDasboardQuery();
  console.log(stats);
  const {data:dates,isLoading}= useGetDasboardDateQuery()
  console.log(dates)
  const { data: commune, isSuccess } = useGetCommuneChartQuery();
  

  const icons = [
    ImHome,
    ImHome,
    ImHome,
    FiUsers,
    FaUserTie,
    AiOutlineForm,
    AiOutlineForm,
    AiOutlineForm,
  ];
 
  const tab = [1, 2, 3, 4];
  return (
    <section className='mt-10 px-5'>
      <div className='max-w[1280px] px-8 mt-4  mx-auto grid  gap-y-5  min-[500px]:grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 '>
        {success &&
          !loadingDashboard &&
          stats.statistic.map((stat, index) => (
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
      <div className='md:grid  hidden md:grid-cols-2 grid-rows-2 px-8 mt-4 max-w[1280px]   gap-y-4 gap-4 md:gap-x-10 mx-auto '>
        <div className='h-[450px]  bg-slate-100 dark:bg-slate-900 rounded shadow-md shadow-blue-800'>
          <p className='p-3 font-semibold dark:text-slate-300'>
            Les 10 meilleurs notes de Beneficiaire
          </p>
          <div className='h-[400px]'>
            {success && !loadingDashboard && (
              <BarChart
                name='Note'
                data={stats.Note}
                categories={stats.nomPersonne}
              />
            )}
            {loadingDashboard && <Skeleton width={450} height={400} />}
          </div>
        </div>
        <div className='h-[450px]  bg-slate-100 dark:bg-slate-900 rounded shadow-md shadow-blue-800'>
          <p className='p-3 dark:text-slate-300  font-semibold'>
            Nombre de beneficiaire datant {dateEnFrancais}
          </p>
          <div className='h-[400px] w-full ml-2'>
            {success && !loadingDashboard && dates &&  (
              <LineChart
                name='Nombre de beneficiaire'
                data={dates?.nombre}
                categories={dates?.date}
              />
            )}
            {loadingDashboard && <Skeleton width={450} height={400} />}
          </div>
        </div>
        <div className='h-[450px] hidden md:block  bg-slate-100  dark:bg-slate-900 w-[1000px]  rounded shadow-md shadow-blue-800'>
          <p className='p-3 dark:text-slate-300  font-semibold'>
            Nombre de beneficiaire datant {dateEnFrancais}
          </p>
          <div className='h-[400px] ml-2 w-[900px] '>
            {success &&
              !loadingDashboard &&
              commune &&
              commune.nom_commune &&
              commune.nombreTotal && (
                <ApexChart
                  categories={commune.nom_commune}
                  serie={commune.nombreBeneficiaire}
                />
              )}
            {loadingDashboard && <Skeleton width={950} height={400} />}
          </div>
        </div>
      </div>
    </section>
  
  );
};

export default Dashboard;

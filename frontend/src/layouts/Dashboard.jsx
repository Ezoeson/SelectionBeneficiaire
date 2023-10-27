import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import CardInfo from '../components/Card/Card';
import { useCountBeneficiaireQuery } from '../redux/slices/beneficiaireApiSlice';
import { useCountEnqueteurQuery } from '../redux/slices/userApiSlice';
import PieCard from '../components/charts/PieCard';
// import PieChart from '../components/charts/PieChart';
import { pieChartOptions } from '../components/charts/data';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { v4 as uuidv4 } from 'uuid';
import ApexChart from '../components/ApexChart/ApexChart';
import { useGetCommuneChartQuery } from '../redux/slices/communeApiSlice';
import PieChart from '../components/ApexChart/Piechart';
import { useGetNombreQuestionQuery } from '../redux/slices/categorieQuestionApiSlice';
import BarChart from '../components/BarChart/BarChart';
import LineChart from '../components/BarChart/LineChart';
import Cards from '../components/Card/Cards';

import { AiOutlineForm } from 'react-icons/ai';

import { FaUserTie } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { ImUsers } from 'react-icons/im';
import { ImHome } from 'react-icons/im';
import { useGetDasboardQuery } from '../redux/slices/dashboardApiSlice';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Dashboard = () => {
  // const [date,setDate]= useState(new Date())
  const date = new Date();

  console.log(date);
  const dateEnFrancais = format(date, 'EEEE d MMMM yyyy', { locale: fr });
  const {
    data: stats,
    isLoading: loadingDashboard,
    isSuccess: success,
  } = useGetDasboardQuery();
  console.log(stats);
  const { data: commune, isSuccess } = useGetCommuneChartQuery();
  

  const icons = [ImHome, FiUsers, FaUserTie, AiOutlineForm];
 
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
      <div className='grid  md:grid-cols-2 grid-rows-2 px-8 mt-4 max-w[1280px]   gap-y-4 gap-4 md:gap-x-10 mx-auto '>
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
          <div className='h-[400px] ml-2'>
            {success && !loadingDashboard && (
              <LineChart
                name='Nombre de beneficiaire'
                data={stats.nombreBeneficiaire}
                categories={stats.jours}
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
                  serie={commune.nombreTotal}
                />
              )}
            {loadingDashboard && <Skeleton width={950} height={400} />}
          </div>
        </div>
      </div>
    </section>
    // <div className='dark:bg-slate-900 w-full h-screen  bg-slate-200 mt-2 px-12'>
    //   {isLoading && (
    //     <div className='flex space-x-3'>
    //       <div className='mt-2 py-5'>
    //         <Skeleton width={200} height={80} />
    //       </div>
    //       <div className='mt-2 py-5'>
    //         <Skeleton width={200} height={80} />
    //       </div>
    //       <div className='mt-2 py-5'>
    //         <Skeleton width={200} height={80} />
    //       </div>
    //     </div>
    //   )}
    //   {!isLoading && (
    //     <div className=' mx-4 flex flex-wrap mt-2 py-5 '>
    //       <motion.div
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
    //       >
    //         <CardInfo
    //           title={'Nombre des enqueteurs'}
    //           number={enqueteurs}
    //           icon='enqueteur'
    //         />
    //       </motion.div>

    //       <motion.div
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
    //       >
    //         <CardInfo
    //           title={'Nombre des beneficiaires'}
    //           number={data}
    //           icon='beneficiaire'
    //         />
    //       </motion.div>
    //       <motion.div
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
    //       >
    //         <CardInfo
    //           title={'Nombre des enquetes'}
    //           number='1'
    //           icon='enquete'
    //         />
    //       </motion.div>
    //     </div>
    //   )}
    //   <div className='grid grid-cols-2 '>
    //     <div className='col-1'>
    //       <h1 className='text-xl font-bold  dark'>
    //         Nombre des beneficiaires pour chaque Commune
    //       </h1>
    //       <div className='md:flex flex-wrap w-max hidden '>
    //         {isSuccess &&
    //           commune &&
    //           commune.nom_commune &&
    //           commune.nombreBeneficiaire && (
    //             <ApexChart
    //               categories={commune.nom_commune}
    //               serie={commune.nombreBeneficiaire}
    //             />
    //           )}

    //         {/* <PieCard title='Enqueteur'>
    //       <PieChart options={pieChartOptions} series={pieChartData} />
    //     </PieCard>
    //     <PieCard title='Beneficiaire'>
    //       <PieChart options={pieChartOptions} series={pieChartData} />
    //     </PieCard>
    //     <PieCard title='Beneficiaire qualifie'>
    //       <PieChart options={pieChartOptions} series={pieChartData} />
    //     </PieCard> */}
    //       </div>
    //     </div>
    //     {successCatgeorie && (
    //       <div className='col-2'>
    //         <PieChart serie={categorie.nomCatgeorie} nombre={categorie.nombreQuestion} />
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Dashboard;
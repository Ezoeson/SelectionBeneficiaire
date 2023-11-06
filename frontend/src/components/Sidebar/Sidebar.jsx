import { AiOutlineLeft } from 'react-icons/ai';
import Navlink from '../Navlink/Navlink';
import useRoutes from '../../hooks/useRoutes';
import simpleRoute from '../../hooks/simpleRoute';

import { useContext } from 'react';
import { SidebarContext } from '../../contexts/SidebarContext';

import { motion } from 'framer-motion';

import Logo from '../../../public/fimisapng.png';
import { BiLogOut, BiLogOutCircle } from 'react-icons/bi';
import { MdSpaceDashboard, MdLightMode, MdDarkMode } from 'react-icons/md';
import { IoInvertModeOutline } from 'react-icons/io5';
import { AiFillSetting } from 'react-icons/ai';
import { CiMenuKebab } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { RiMoonFoggyLine } from 'react-icons/ri';
import {
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from '../../redux/slices/compteApiSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import clsx from 'clsx';
import { useState } from 'react';

import {
  SignUp,
  SignedIn,
  SignedOut,
  useClerk,
  useSignIn,
} from '@clerk/clerk-react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetDasboardQuery } from '../../redux/slices/dashboardApiSlice';

const Sidebar = () => {
  const {
    data: stats,
    isLoading: loadingDashboard,
    isSuccess: success,
  } = useGetDasboardQuery();
  const { userId } = useAuth();
  const { data: compte, isLoading } = useGetCompteByClerkQuery(userId);
  const isAdmin = compte?.isAdmin;

  const [image, setImage] = useState(isAdmin ? '' : compte?.enqueteur.image);

  const { signOut } = useClerk();
  const handleSignOut = () => {
    signOut();
  };
  const route = simpleRoute();

  const routes = useRoutes();
  const [show, setShow] = useState(false);

  const { full, toggleSidebar, dark, toggleTheme } = useContext(SidebarContext);
  const tab = [1, 2, 3, 4, 5, 6];

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      exit={{ width: 0 }}
      className={clsx(
        'bg-slate-100 dark:bg-gray-950 h-16 md:h-screen fixed row-[1] md:row-[1]  z-30 duration-500 ease-in-out',
        full ? 'w-full md:w-[250px] ' : 'w-full md:w-[60px]'
      )}
    >
      <div className='flex justify-center items-center relative'>
        <img
          src={Logo}
          alt=''
          className={clsx(
            'hidden md:block  w-1/2 duration-500 h-[105px] py-1 ease-in-out ',
            full ? 'opacity-100 ' : 'opacity-0 '
          )}
        />
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: full ? 0 : 180 }}
          transition={{ duration: 0.5 }}
          onClick={toggleSidebar}
          className='w-8 cursor-pointer h-8 rounded-full bg-white md:flex justify-center hidden items-center md:absolute -right-4 z-50'
        >
          <AiOutlineLeft className='text-slate-900 text-lg' />
        </motion.div>
      </div>
      <div
        className={clsx(
          ' flex  md:flex-col items-center md:items-stretch justify-between md:justify-start  h-full space-x-1 md:space-x-0 md:space-y-2',
          full ? 'px-4' : 'px-2.5'
        )}
      >
        {!isAdmin && (
          <div
            className={clsx(
              'flex justify-center items-center my-2',
              !full && 'hidden'
            )}
          >
            {isLoading ? (
              <Skeleton circle width={60} height={60} />
            ) : (
              <img
                src={'http://localhost:5000' + image}
                alt=''
                className=' hidden h-[60px] w-[60px] object-cover justify-center md:block rounded-full'
              />
            )}
          </div>
        )}
        <img src={Logo} alt='' className='md:hidden  h-[30px] rounded-md' />
        {!loadingDashboard &&
          isAdmin &&
          routes.map((route) => (
            <Navlink
              key={route.label}
              label={route.label}
              icon={route.icon}
              active={route.active}
              path={route.path}
            />
          ))}
        {!loadingDashboard &&
          !isAdmin &&
          route.map((route) => (
            <Navlink
              key={route.label}
              label={route.label}
              icon={route.icon}
              active={route.active}
              path={route.path}
            />
          ))}

        {loadingDashboard &&
          tab.map((index) => <Skeleton key={index} width={180} height={25} />)}
        {!loadingDashboard && (
          <>
            <div onClick={() => setShow(!show)}>
              <CiMenuKebab className='dark:text-blue-600 cursor-pointer md:hidden' />
            </div>
            <div className='absolute bottom-0 pb-5 hidden md:block'>
              <Navlink
                path={'/parametreCompte'}
                label='Parametre'
                icon={AiFillSetting}
              />

              <Navlink
                onClick={handleSignOut}
                label='Deconnecter'
                icon={BiLogOutCircle}
                path={'/'}
              />

              <div
                className={clsx(
                  'flex items-center space-x-2 pl-2 my-2',
                  !full && 'pl-[10px] '
                )}
              >
                <IoInvertModeOutline className='text-slate-500 dark:text-indigo-700 text-2xl' />
                {full && (
                  <>
                    <span className='text-slate-500 dark:text-slate-100'>
                      Theme
                    </span>
                    <div
                      onClick={toggleTheme}
                      className='w-24 z-20 cursor-pointer relative h-10 rounded-full bg-slate-200 dark:bg-slate-950 flex items-center space-x-2 px-3 '
                    >
                      <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                        <MdLightMode className='text-2xl text-yellow-500 dark:text-slate-200' />
                      </div>
                      <div className='w-8 h-8 rounded-full   flex items-center justify-center'>
                        <MdDarkMode className='text-2xl  dark:text-yellow-500 text-slate-400 ' />
                      </div>
                      <motion.div
                        initial={{ x: dark && 0 }}
                        animate={{ x: dark ? 39 : 0 }}
                        transition={{ duration: 0.5 }}
                        className='w-8 h-8 left-1 rounded-full flex items-center justify-center bg-slate-400 dark:bg-slate-900  absolute -z-10'
                      ></motion.div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {show && (
        <div className='absolute right-2 w-[150px] h-max px-4 py-2 cursor-pointer shadow-lg shadow-blue-500/50 bg-slate-200 dark:bg-slate-900 dark:text-white'>
          {!isAdmin && (
            <div className='flex justify-center'>
              <img
                src={'http://localhost:5000' + image}
                alt=''
                className='h-[60px] w-[60px] object-cover rounded-full'
              />
            </div>
          )}

          <div className='flex my-2 space-x-2'>
            <CgProfile className='text-xl' />
            <span className=' font-bold'>Profil</span>
          </div>

          <div onClick={toggleTheme} className='flex space-x-2'>
            <RiMoonFoggyLine className='text-xl' />
            <span className=' font-bold'>Sombre</span>
          </div>
          <Link to={'/'}>
            <div onClick={handleSignOut} className='flex space-x-2 mt-2'>
              <BiLogOutCircle className='text-xl' />
              <span className=' font-bold'>Deconnecter</span>
            </div>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;

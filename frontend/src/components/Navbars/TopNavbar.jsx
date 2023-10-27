import clsx from 'clsx';
import React from 'react';
import { useContext, useState } from 'react';

import { SidebarContext } from '../../contexts/SidebarContext';
import { AiOutlineLeft } from 'react-icons/ai';
import SlideOver from '../../components/Modal/SlideOver';

import Navlink from '../Navlink/Navlink';

import { motion } from 'framer-motion';

import Logo from '../../../public/logo.png';
import { BiLogOut, BiLogOutCircle } from 'react-icons/bi';
import { MdSpaceDashboard, MdLightMode, MdDarkMode } from 'react-icons/md';
import { IoInvertModeOutline } from 'react-icons/io5';
import { AiFillSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function TopNavbar() {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const { full, toggleSidebar, dark, toggleTheme } = useContext(SidebarContext);
  const [show, setShow] = useState(true);
  return (
    <div className='w-full h-[60px] mt-1 py-2 md:hidden z-50  '>
      <div className='flex items-center justify-between px-4 h-full'>
        <div className=''>
          <img src='vite.svg' alt='' className='h-14 w-14' />
        </div>
        <div className='flex justify-center '>
          <div className='px-2'>
            <img
              onClick={() => {
                toggleModal();
              }}
              src='photo-1508511267-5a04ee04ca95.jpeg'
              alt=''
              className='h-14 w-14 rounded-full'
            />
          </div>

          <div className='mt-2 pl-2 z-[1000] h-max'>
            <ShowModal
              open={showModal}
              full={full}
              toggleTheme={toggleTheme}
              dark={dark}
              setOpen={setShowModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const ShowModal = ({ open, setOpen, full, toggleTheme, dark }) => {
  return (
    <SlideOver open={open} setOpen={setOpen} width={'w-[100px]'}>
      <div className='flex flex-col px-8 '>
        <div className='flex items-center'>
          <img
            src='photo-1508511267-5a04ee04ca95.jpeg'
            alt=''
            className='h-20 w-20 rounded-full'
          />
          <div className='mt-2 px-6'>
            <h1 className='text-black '>Hasina</h1>
          </div>
        </div>

        <div className='mt-10'>
          <Link>
            <div className={clsx('p-2 rounded  flex  items-center space-x-4')}>
              <AiFillSetting />

              <span className=' text-black '>Paramettre</span>
            </div>
          </Link>
          <Link>
            <div className={clsx('p-2 rounded  flex  items-center space-x-4')}>
              <BiLogOut />

              <span className=' text-black '>Se deconnecter</span>
            </div>
          </Link>

          <div className={clsx('flex items-center space-x-2 pl-2 my-2')}>
            <IoInvertModeOutline className='text-slate-500 text-2xl' />

            <>
              <span className='text-slate-500 '>Theme</span>
              <div
                onClick={toggleTheme}
                className='w-24 z-20 relative h-10 rounded-full bg-slate-200 dark:bg-slate-950 flex items-center space-x-2 px-3 '
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
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default TopNavbar;

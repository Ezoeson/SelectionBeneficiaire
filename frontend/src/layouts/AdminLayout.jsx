import React from 'react';
import Sidebar from '../components/Sidebar/SIdebar';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

import { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';

import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SkeletonTheme } from 'react-loading-skeleton';

const AdminLayout = () => {
  const { full, baseColor, highLightColor } = useContext(SidebarContext);

  const pathname = useLocation().pathname;

  return (
    <div
      className={clsx(
        'grid duration-500 ease-in-out  ',
        full
          ? 'grid-rows-[60px,1fr] md:grid-rows-none md:grid-cols-[250px,1fr]'
          : 'grid-cols-[60px,1fr] md:grid-rows-[60px,1fr]'
      )}
    >
      <SkeletonTheme baseColor={baseColor} highlightColor={highLightColor}>
        <Sidebar />
      </SkeletonTheme>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
        className={clsx(
          'row-[2] md:row-[1]   md:col-[2] grid ',
          ['/', '/enqueteur'].includes(pathname)
            ? 'grid-rows-[60px,1fr]'
            : 'grid-rows-[60px,60px,1fr]'
        )}
      >
        <SkeletonTheme baseColor={baseColor} highlightColor={highLightColor}>
          <Outlet />
        </SkeletonTheme>
      </motion.div>
    </div>
  );
};

export default AdminLayout;

import React from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SidebarContext } from '../../contexts/SidebarContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navlink = ({ label, icon: Icon, active, path, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const { full } = useContext(SidebarContext);
  return (
    <Link to={path} onClick={handleClick}>
      <div
        className={clsx(
          'p-2 rounded  flex  items-center space-x-4',
          active
            ? 'bg-indigo-600 dark:bg-slate-900 text-slate-100 dark:text-slate-900 '
            : 'bg-transparent text-slate-600  dark:text-white',
          !full && 'justify-center'
        )}
      >
        <Icon className='text-xl dark:text-indigo-700' />
        {full && (
          <span className='hidden md:inline-block dark:text-white '>
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Navlink;

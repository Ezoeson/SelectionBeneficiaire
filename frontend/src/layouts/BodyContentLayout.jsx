import React from 'react';
import Navbar from '../components/Navbars/Navbar';
import SubNavbar from '../components/Navbars/SubNavbar';
import { Outlet } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

const BodyContentLayout = () => {
  const pathname = useLocation().pathname;

  return (
    <>
      <Navbar />
      {!['/', '/note', '/enqueteur'].includes(pathname) && <SubNavbar />}
      <div
        className={clsx(
          ['/', '/note','/enqueteur'].includes(pathname) ? 'row-[2] ' : 'row-[3] '
        )}
      >
        <Outlet />
      </div>
    </>
  );
};

export default BodyContentLayout;

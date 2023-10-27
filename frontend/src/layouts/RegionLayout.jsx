import React from 'react';
import { Outlet } from 'react-router-dom';

const RegionLayout = () => {
  return (
    <div className='dark:bg-gray-900'>
      <Outlet />;
    </div>
  ); 
};

export default RegionLayout;

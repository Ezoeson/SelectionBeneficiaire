import React from 'react'
import useTitle from '../../hooks/useTitle'
const Navbar = () => {

  const title = useTitle()

  return (
    <div className='fixed h-[60px] row-[2] md:row-[1]  w-full z-10 backdrop-filter backdrop-blur-lg bg-opacity-30   dark:text-white  ease-in-out duration-300  text-slate-950 p-2 flex items-center pl-5'>
      <h1 className='text-2xl font-bold'>{title}</h1>
    </div>
  );
}

export default Navbar
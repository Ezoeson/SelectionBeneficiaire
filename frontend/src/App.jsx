import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import RouterProvider from './RouterProvider';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotCode from './components/Code/ForgotCode';
import {
  SignUp,
  SignedIn,
  SignedOut,
  useClerk,
  useSignIn,
} from '@clerk/clerk-react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import { MoonLoader } from 'react-spinners';
import { SidebarContext } from './contexts/SidebarContext';
import ClerkLoader from './components/clerkLoader/ClerkLoader';

function App() {
  const { baseColor, highLightColor } = useContext(SidebarContext);

  return (
    <>
      <ClerkLoading>
        <SkeletonTheme color='#202020' highlightColor='#444'>
          <div className='flex justify-center  items-center mt-[300px]'>
            <ClerkLoader />
          </div>
        </SkeletonTheme>
      </ClerkLoading>
      <SignedIn>
        <RouterProvider />
      </SignedIn>
      <SignedOut>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgotCode' element={<ForgotCode />} />
        </Routes>
      </SignedOut>
    </>
  );
}

export default App;

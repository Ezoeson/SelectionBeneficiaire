import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SkeletonTheme } from 'react-loading-skeleton';
import './index.css';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import SidebarContextProvider from './contexts/SidebarContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallBack from './components/Error/ErrorFallBack.jsx';


const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorFallBack} >
    <SidebarContextProvider>
      <BrowserRouter>
        <ToastContainer />
        <ClerkProvider publishableKey={clerkFrontendApi}>
          <App />
        </ClerkProvider>
      </BrowserRouter>
    </SidebarContextProvider>

    </ErrorBoundary>
  </Provider>
);

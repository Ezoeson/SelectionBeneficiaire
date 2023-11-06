import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import SidebarContextProvider from './contexts/SidebarContext';
import AdminLayout from './layouts/AdminLayout.jsx';
import BodyContentLayout from './layouts/BodyContentLayout.jsx';

import ListeRegion from './layouts/Region/ListeRegion.jsx';
import ListeDistrict from './layouts/Region/ListeDistrict';
import ListeCommune from './layouts/Region/ListeCommune';
import ListeFokontany from './layouts/Region/ListeFokontany';
import RegionLayout from './layouts/RegionLayout';
import Dashboard from './layouts/Dashboard';
import QuestionLayout from './layouts/QuestionLayout';
import ListeFormulaire from './layouts/Question/ListeFormulaire';
import ListeCategorie from './layouts/Question/ListeCategorie';

import ListeQuestion from './layouts/Question/ListeQuestion';
import EnqueteurLayout from './layouts/EnqueteurLayout';
import BeneficiaireLayout from './layouts/user/BeneficiaireLayout';
import ListeBeneficiare from '../src/layouts/user/ListeBeneficiare';
import ListePersonne from '../src/layouts/user/ListePersonne';
import Beneficiaire from './layouts/Beneficiaire';
import UserDashboard from './layouts/user/UserDashboard';
import Reponse from './layouts/user/Reponse';
import Menage from './layouts/user/Menage';
import ErrorPage from './layouts/ErrorPage';
import ParametreCompte from './layouts/ParametreCompte';
import DeleteUser from './layouts/user/DeleteUser';

import {
  useGetCompteByClerkQuery,
  useGetCompteQuery,
} from './redux/slices/compteApiSlice';

import { useUser, useAuth } from '@clerk/clerk-react';
import NavLoader from './navLoader/NavLoader';

const RouterProvider = () => {
  const { userId } = useAuth();
  const { data: compte, isLoading } = useGetCompteByClerkQuery(userId);
  const isAdmin = compte?.isAdmin;

  return (
    <>
      {isLoading ? (
        <NavLoader />
      ) : (
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/' element={<AdminLayout />}>
            <Route path='/' element={<BodyContentLayout />}>
              {isAdmin && (
                <>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/delete' element={<DeleteUser />} />
                  <Route path='/endroit' element={<RegionLayout />}>
                    <Route path='/endroit' element={<ListeRegion />} />
                    <Route
                      path='/endroit/district'
                      element={<ListeDistrict />}
                    />
                    <Route path='/endroit/commune' element={<ListeCommune />} />
                    <Route
                      path='/endroit/fokontany'
                      element={<ListeFokontany />}
                    />
                  </Route>
                  <Route path='/enqueteur' element={<EnqueteurLayout />} />
                  <Route
                    path='/enqueteur/:pageNumber'
                    element={<EnqueteurLayout />}
                  />
                  <Route path='/beneficiaires' element={<Beneficiaire />} />
                  <Route
                    path='/parametreCompte'
                    element={<ParametreCompte />}
                  />

                  <Route path='/question' element={<QuestionLayout />}>
                    <Route path='/question' element={<ListeFormulaire />} />
                    <Route
                      path='/question/categorie'
                      element={<ListeCategorie />}
                    />
                    <Route
                      path='/question/questions'
                      element={<ListeQuestion />}
                    />
                  </Route>
                </>
              )}
              {!isAdmin && (
                <>
                  <Route path='/' element={<UserDashboard />} />
                  <Route path='/menage' element={<BeneficiaireLayout />}>
                    <Route
                      path='/menage'
                      element={<ListeBeneficiare />}
                    />
                    <Route
                      path='/menage/personne'
                      element={<ListePersonne />}
                    />
                  </Route>
                  <Route path='/reponse/:id' element={<Reponse />} />
                  {/* <Route path='/note' element={<Beneficiaire />} /> */}
                  <Route path='/beneficiaire' element={<Menage />} />
                </>
              )}
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};

export default RouterProvider;

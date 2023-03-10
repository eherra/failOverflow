import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import LoginPage from './pages/auth/pages/login/LoginPage';
import LandingPage from './pages/landing/LandingPage';
import RegisterPage from './pages/auth/pages/register/RegisterPage';
import AuthorizedRoute from './pages/auth/components/AuthorizedRoute';
import CenteredLoadingSpinner from './pages/common/CenteredLoadingSpinner';
import FaqPage from './pages/frequent-questions/FPage';

const ProfileOverviewPage = React.lazy(() => import('./pages/profile/pages/ProfileOverviewPage'));
const FailuresPage = React.lazy(() => import('./pages/failures/FailuresPage'));
const ProfileEditPage = React.lazy(() => import('./pages/profile/pages/ProfileEditPage'));

const App = () => {
  return (
    <Routes>
      <Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='landing' element={<LandingPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='faq' element={<FaqPage />} />
        <Route
          path='failures'
          element={
            <Suspense fallback={<CenteredLoadingSpinner />}>
              <FailuresPage />
            </Suspense>
          }
        />

        <Route element={<AuthorizedRoute />}>
          <Route index element={<HomePage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route
            path='profile/edit'
            element={
              <Suspense fallback={<CenteredLoadingSpinner />}>
                <ProfileEditPage />
              </Suspense>
            }
          />
          <Route
            path='profile/overview'
            element={
              <Suspense fallback={<CenteredLoadingSpinner />}>
                <ProfileOverviewPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

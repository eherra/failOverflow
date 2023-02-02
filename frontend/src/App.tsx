import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from 'grommet';

import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import LoginPage from './pages/auth/pages/login/LoginPage';
import LandingPage from './pages/landing/LandingPage';
import RegisterPage from './pages/auth/pages/register/RegisterPage';
import ProfileEditPage from './pages/profile/pages/ProfileEditPage';
import FaQPage from './pages/FAQ/FaQPage';

const ProfileOverviewPage = React.lazy(() => import('./pages/profile/pages/ProfileOverviewPage'));
const FailuresPage = React.lazy(() => import('./pages/failures/FailuresPage'));

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<HomePage />} />
        <Route path='failures' element={<FailuresPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='landing' element={<LandingPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='faq' element={<FaQPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='profile/edit' element={<ProfileEditPage />} />
        <Route
          path='profile/overview'
          element={
            <Suspense fallback={<Spinner size='large' alignSelf='center' />}>
              <ProfileOverviewPage />
            </Suspense>
          }
        />
        <Route
          path='failures'
          element={
            <Suspense fallback={<Spinner size='large' alignSelf='center' />}>
              <FailuresPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;

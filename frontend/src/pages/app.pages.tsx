import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../constants/router.constants.ts';
import { LoginPage } from './public/Login/login.page.tsx';
import { RegisterPage } from './public/Register/register.page.tsx';
import { useIsAuthorized } from '@context/AuthContext/useIsAuthorized.ts';
import { HomePage } from '@pages/private/Home/home.page.tsx';

const PublicRoutes = (
  <>
    <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
    <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
    <Route path="*" element={<Navigate to={AppRoutes.LOGIN} />} />
  </>
);

const PrivateRoutes = (
  <>
    <Route path={AppRoutes.HOME} element={<HomePage />} />
    <Route path="*" element={<Navigate to={AppRoutes.HOME} />} />
  </>
);

export const MainPages: React.FC = () => {
  const isAuthorized = useIsAuthorized();

  return (
    <Routes>
      {!isAuthorized && PublicRoutes}
      {isAuthorized && PrivateRoutes}
    </Routes>
  );
};

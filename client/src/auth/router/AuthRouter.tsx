import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { authRoutes } from './';
import { Login } from '../pages';


export const AuthRouter: FC = () => {
  return (
    <Routes>

      <Route path={authRoutes.LOGIN} element={<Login />} />

      <Route path={authRoutes.NOT_FOUND} element={<Navigate to={authRoutes.LOGIN} />} />

    </Routes>
  );
};
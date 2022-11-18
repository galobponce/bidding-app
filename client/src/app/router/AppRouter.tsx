import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { appRoutes } from '.';
import { Home } from '../pages';


export const AppRouter: FC = () => {
  return (
    <Routes>

      <Route path={appRoutes.HOME} element={<Home />} />

      <Route path={appRoutes.NOT_FOUND} element={<Navigate to={appRoutes.HOME} />} />

    </Routes>
  );
};
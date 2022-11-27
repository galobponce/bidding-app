import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { appRoutes } from '.';
import { Home, Settings } from '../pages';


export const AppRouter: FC = () => {
  return (
    <Routes>

      <Route path={appRoutes.HOME} element={<Home />} />

      <Route path={appRoutes.SETTINGS} element={<Settings />} />

      <Route path={appRoutes.NOT_FOUND} element={<Navigate to={appRoutes.HOME} />} />

    </Routes>
  );
};
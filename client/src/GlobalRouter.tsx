import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthRouter } from "./auth/router";


const GlobalRouter: FC = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/auth/*' element={<AuthRouter />} />

        <Route path='/*' element={<Navigate to={'/auth/login'} />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default GlobalRouter;
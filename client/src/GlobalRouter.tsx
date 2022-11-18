import { Center } from '@chakra-ui/react';
import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useAuthCheck } from './hooks';
import { AppRouter } from './app/router';
import { AuthRouter } from "./auth/router";
import { CircleLoader } from './common/components';


// Used to manage the routes of whole app
const GlobalRouter: FC = () => {


  const { status } = useAuthCheck();

  // Shows loader when checking auth
  if (status === 'checking') {
    return (
      <Center h='100vh'>
        <CircleLoader />
      </Center>
    );
  }

  
  return (
    <BrowserRouter>
      <Routes>

        { 
          // By this way, app routes are visible only if user is logged
          // and auth routes are visible only if user is not logged
          status === 'logged'
          ?
          <Route path='/*' element={<AppRouter />} />
          :
          <Route path='/auth/*' element={<AuthRouter />} />
        }

        <Route path='/*' element={<Navigate to={'/auth/login'} />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default GlobalRouter;
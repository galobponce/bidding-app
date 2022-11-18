import { useEffect } from 'react';

import { User } from '../common/types';
import { startLogIn } from '../store/auth';
import { useGlobalDispatch } from './useGlobalDispatch';
import { useGlobalSelector } from './useGlobalSelector';


/**
 * Used to know the current status of the authentication.
 */
export const useAuthCheck = () => {
  const dispatch = useGlobalDispatch();
  const { status } = useGlobalSelector(state => state.auth);


  // When loads, checks if there was an older authentication stored in localStorage
  // Logs with it if there was
  useEffect(() => {    

    const localUser = localStorage.getItem('user');

    if (localUser) {
      const user: User = JSON.parse(localUser);
      dispatch(startLogIn(user.username));
    }

  }, []);


  return { status };
}
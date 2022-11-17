import type { Dispatch } from '@reduxjs/toolkit';

import { User } from '../../common/types';
import { generateToast } from '../toast';
import { login, setStatusChecking, logout } from '.';


export const startLogIn = (username: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setStatusChecking());

    // Get users json from public folder
    const res = await fetch('../../users.json');


    if (!res.ok) {
      dispatch(logout());
      dispatch(generateToast({
        title: `There was an error logging in`,
        status: 'error' 
      }));
    }


    // Get users from success response
    const users: User[] = await res.json();
    

    // Search a user by username in users array
    const user = users.find(user => user.username === username);
    

    // If finds an user, logs in
    if (user) {

      dispatch(login({ ...user }));
  
      // Store the user in localStorage so user persists
      localStorage.setItem('user', JSON.stringify(user));
  
      dispatch(generateToast({
        title: `Logged in as '${username}'`,
        status: 'success'
      }));

    } else { // If not found, notify the user

      dispatch(logout());
      dispatch(generateToast({
        title: `User not found`,
        status: 'error'
      }));

    }
  }
};


export const startLogout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(logout());
    localStorage.clear();
  }
};
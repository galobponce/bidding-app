import { Dispatch } from '@reduxjs/toolkit'

import { setLoading, setSettings } from '.';
import { generateToast } from '../toast';
import { getUserSettings, saveUserSettings } from '../../api';
import { UserSettings } from '../../common/types';


export const startGetUserSettings = (uid: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const res = await getUserSettings(uid);

    if (!res.ok) {
      dispatch(generateToast({
        title: res.error,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(setSettings({ ...res.user_settings }));
    

    dispatch(setLoading(false));
  }
}


export const startSaveUserSettings = (userSettings: UserSettings) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const res = await saveUserSettings(userSettings);

    if (!res.ok) {
      dispatch(generateToast({
        title: res.error,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(setSettings({ ...userSettings }));

    dispatch(generateToast({
      title: `Changes saved successfully`,
      status: 'success' 
    }));
    

    dispatch(setLoading(false));
  }
};
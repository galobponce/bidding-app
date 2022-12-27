import { Dispatch } from '@reduxjs/toolkit'

import { generateToast } from '../toast';
import { UserSettings } from '../../common/types';
import { setLoading, setSettings, setItemsBidHistorically } from '.';
import { getItemsBidHistoricallyByUser, getUserSettings, saveUserSettings } from '../../api';


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


    const resItemsBidHistorically = await getItemsBidHistoricallyByUser(uid);

    if (!res.ok) {
      dispatch(generateToast({
        title: res.error,
        status: 'error' 
      }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(setItemsBidHistorically(resItemsBidHistorically.items));

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


export const startGetItemsBidHistorically = (uid: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    

    dispatch(setLoading(false));
  }
}
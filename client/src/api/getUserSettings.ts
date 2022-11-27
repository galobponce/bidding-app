import { API_URL } from './config';


export async function getUserSettings(uid: number) {
  try {

    const res = await fetch(`${API_URL}usersettings/?user=${uid}`);

    const resJSON = await res.json();    

    if (!res.ok) {
      Object.keys(resJSON).map(error => {
        throw Error(resJSON[error]);
      });
    };

    return {
      ok: true,
      user_settings: resJSON && resJSON[0],
    };
  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
import { API_URL } from './config';
import { UserSettings } from '../common/types';


export async function saveUserSettings({ id, auto_bid_alert, auto_bid_max_amount, email }: UserSettings) {
  try {

    const body = new FormData();
    body.append('auto_bid_alert', auto_bid_alert.toString());
    body.append('auto_bid_max_amount', auto_bid_max_amount.toString());
    body.append('email', email);

    const res = await fetch(`${API_URL}usersettings/${id}/`, {
      method: 'PATCH',
      body
    });

    const resJSON = await res.json();

    console.log(resJSON);
    

    if (!res.ok) {
      Object.keys(resJSON).map(error => {
        throw Error(resJSON[error]);
      });
    };

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
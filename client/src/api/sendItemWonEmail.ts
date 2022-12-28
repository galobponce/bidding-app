import { API_URL } from './config';


export async function sendItemWonEmail(itemId: number) {
  try {

    const url = `${API_URL}items/${itemId}/send_item_won_email/`;

    const res = await fetch(url);

    const resJSON = await res.json();

    if (!res.ok) {
      Object.keys(resJSON).map(error => {        
        throw Error(resJSON[error]);
      });
    };

    return {
      ok: true
    }

  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
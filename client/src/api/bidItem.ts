import { API_URL } from './config';


export async function bidItem(itemId: number, userId: number, price: number) {
  try {

    const body = new FormData();
    body.append('last_bid_user', userId.toString());
    body.append('last_bid_price', price.toString());

    const res = await fetch(`${API_URL}items/${itemId}/`, {
      method: 'PATCH',
      body
    });


    // Iterate throught keys of json looking for errors
    if (!res.ok) {
      const resJSON = await res.json();

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
};
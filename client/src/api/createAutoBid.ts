import { API_URL } from './config';

export async function createAutoBid(itemId: number, uid: number) {
  try {

    const body = new FormData();
    body.append('item', itemId.toString());
    body.append('user', uid.toString());

    const res = await fetch(`${API_URL}autobids/`, {
      method: 'POST',
      body
    });
    
    const resJSON = await res.json();

    if (!res.ok) {
      Object.keys(resJSON).map(error => {
        throw Error(resJSON[error]);
      });
    };

    return {
      ok: true
    };

  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
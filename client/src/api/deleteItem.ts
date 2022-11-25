import { API_URL } from './config';


export async function deleteItem(itemId: number) {
  try {

    const res = await fetch(`${API_URL}items/${itemId}/`, { 
      method: 'DELETE'
    });

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
}
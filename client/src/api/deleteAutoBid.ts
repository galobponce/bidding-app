import { API_URL } from './config';


export async function deleteAutoBid(autoBidId: number) {
  try {

    const res = await fetch(`${API_URL}autobids/${autoBidId}`, {
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
    };

  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
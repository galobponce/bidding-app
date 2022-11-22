import { API_URL } from './config';


export async function deleteAutoBid(autoBidId: number) {
  try {

    await fetch(`${API_URL}autobids/${autoBidId}`, {
      method: 'DELETE'
    });

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
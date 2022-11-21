import { API_URL } from './config';


export async function deleteItem(itemId: number) {
  try {

    await fetch(`${API_URL}items/${itemId}/`, { 
      method: 'DELETE'
    });

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
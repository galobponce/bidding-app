import { API_URL } from './config';

export async function getAutoBid(itemId: number, uid: number) {
  try {
    
    const res = await fetch(`${API_URL}autobids/?item=${itemId}&user=${uid}`);

    const resJSON = await res.json();    

    // Iterate throught keys of json looking for errors
    if (!res.ok) {
      Object.keys(resJSON).map(error => {
        throw Error(resJSON[error]);
      });
    };
    

    return {
      ok: true,
      auto_bid: resJSON && resJSON[0],
      using_auto_bid: !!resJSON.length
    };


  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
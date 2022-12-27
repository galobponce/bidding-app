import { API_URL } from './config';


export async function getItemsBidHistoricallyByUser(uid: number) {
  try {

    let url = `${API_URL}items?user=${uid}&history=1`;

    const res = await fetch(url);
    const resJSON = await res.json();

    if (!res.ok) {
      Object.keys(resJSON).map(error => {
        throw Error(resJSON[error]);
      });
    };    

    return {
      ok: true,
      items: resJSON && resJSON.results
    }
  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
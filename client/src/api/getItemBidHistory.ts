import { BidHistory } from '../common/types';
import { API_URL } from './config';


export async function getItemBidHistory(itemId: number) {
  try {
    
    const res = await fetch(`${API_URL}bidhistory/?item=${itemId}`);

    const resJSON = await res.json();    

    // Iterate throught keys of json looking for errors
    if (!res.ok) {
      Object.keys(resJSON).map(error => {
        throw Error(resJSON[error]);
      });
    };
    

    return {
      ok: true,
      bid_history: resJSON as BidHistory[],
    };


  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
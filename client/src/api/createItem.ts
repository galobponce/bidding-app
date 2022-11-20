import { API_URL } from './config';
import { Item } from '../common/types';


export async function createItem(item: Item) {
  try {

    const body = new FormData();
    body.append('title', item.title);
    body.append('description', item.description);
    body.append('last_bid_price', item.last_bid_price.toString());
    body.append('closes_at', item.closes_at);

    const res = await fetch(`${API_URL}items/`, { 
      method: 'POST',
      body
    });
    
    const newItem = await res.json();

    return {
      ok: true,
      newItem
    }

  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
}
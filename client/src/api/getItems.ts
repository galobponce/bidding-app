import { API_URL } from './config';
import { Response } from '../common/types';


export async function getItems(offset: number): Promise<Response> {
  try {
    const res = await fetch(`${API_URL}items/?offset=${offset}`);
    const items = await res.json();
    return {
      ok: true,
      ...items
    }
  } catch (error) {
    return {
      ok: false,
      error: (error as any).message
    };
  }
};
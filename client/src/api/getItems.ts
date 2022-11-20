import { API_URL } from './config';
import { Filters, Response } from '../common/types';


export async function getItems(offset: number, filters: Filters): Promise<Response> {
  try {

    let url = `${API_URL}items/?offset=${offset}`;

    if (filters) {
      // Append filters to url
      Object.keys(filters).map(filter => {
        if (filters[filter]) {
          url += `&${filter}=${filters[filter]}`
        }
      });
    }

    const res = await fetch(url);
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
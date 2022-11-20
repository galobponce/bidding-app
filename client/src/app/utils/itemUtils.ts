import { Item } from '../../common/types'


/**
 * Determinates wheter tw items are different or not based on editable values
 * @param item1 item
 * @param item2 item
 * @returns true if are different, false if not
 */
export function itemsAreDifferent(item1: Item, item2: Item): boolean {

  if (item1.title !== item2.title) return true;
  if (item1.description !== item2.description) return true;
  if (Date.parse(item1.closes_at) !== Date.parse(item2.closes_at)) return true;
  
  return false;
};
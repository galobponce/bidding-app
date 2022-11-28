import { BidHistory } from './BidHistory';

export interface Item {
  id: number;
  title: string;
  description: string;
  last_bid_user: number;
  last_bid_username: string; // Virtual Property
  last_bid_price: number;
  closes_at: string;
  closed: boolean; // Virtual Property

  // Virtual Property, it is used to know if current user 
  // is using the auto bid feature on the item
  using_auto_bid: boolean;

  // Virtual Property
  bid_history: BidHistory[];
};
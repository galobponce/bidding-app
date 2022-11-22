export interface Item {
  id: number;
  title: string;
  description: string;
  last_bid_user: number;
  last_bid_username: string; // Virtual Property
  last_bid_price: number;
  closes_at: string;
  closed: boolean; // Virtual Property
};
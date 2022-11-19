export interface Item {
  id: string;
  title: string;
  description: string;
  last_bid_user: number;
  last_bid_price: number;
  closes_at: Date;
};
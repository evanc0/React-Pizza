export type CartItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  types: string;
  sizes: number;
  count: number;
  rating: number;
};

export type CartSliseState = {
  totalPrice: number;
  items: CartItem[];
};

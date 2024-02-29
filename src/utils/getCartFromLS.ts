import { CartItem } from "../redux/cart/types";
import { getTotalPrice } from "./getTotalPrice";
import { safeJsonParse } from "./safeJsonParse";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart") || "[]";
  const items = safeJsonParse<CartItem[]>(data, []);
  const totalPrice = getTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};

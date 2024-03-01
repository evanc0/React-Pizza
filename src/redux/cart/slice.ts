import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartSliseState } from "./types";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { getTotalPrice } from "../../utils/getTotalPrice";

const initialState: CartSliseState = getCartFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = getTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<number>) {
      const findItems = state.items.find((obj) => obj.id === action.payload);
      if (findItems) {
        findItems.count--;
        state.totalPrice = state.totalPrice - findItems.price;
      }
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id != action.payload);

      state.totalPrice = getTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;

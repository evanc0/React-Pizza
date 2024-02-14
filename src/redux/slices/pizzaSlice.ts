import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sort, search, category, currentPage } = params;
    const { data } = await axios.get(
      `https://6d551e6e4aa49570.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}${search}`
    );
    return data;
  }
);

type Pizza = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

interface PizzaSliseState {
  items: Pizza[];
  status: "loading" | "success" | "error"; // loading | success | error
  paginationInfo: {}; // для пагинации
}

const initialState: PizzaSliseState = {
  items: [],
  status: "loading", // loading | success | error
  paginationInfo: {}, // для пагинации
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        console.log(state.status);
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.items = action.payload.items;
        state.paginationInfo = action.payload.meta;

        state.status = "success";
        console.log(state.status);
        if (action.payload.items.length === 0) {
          state.status = "error";
        }
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        console.log(action, "rejected");
        state.status = "error";
        console.log(state.status);
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

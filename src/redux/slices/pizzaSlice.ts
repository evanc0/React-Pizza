import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type FetchPizzasArgs = {
  sort: {
    name: string;
    sortBy: string;
  };
  search: string;
  category: string;
  currentPage: number;
};

// или сокращённая запись ниже, но это если все стринги
// type FetchPizzasArgs = Record<string, string>;

type PizzaItem = {
  category: number;
  id: number;
  imageUrl: string;
  name: string;
  parentId: number;
  price: number;
  rating: number;
  sizes: number[];
  types: number[];
};

type MyData = {
  items: PizzaItem[];
  meta: {
    current_page: number;
    per_page: number;
    remaining_count: number;
    total_items: number;
    total_pages: number;
  };
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type PizzaSliseState = {
  items: PizzaItem[];
  status: Status; // loading | success | error
  paginationInfo: {}; // для пагинации
};

const initialState: PizzaSliseState = {
  items: [],
  status: Status.LOADING, // loading | success | error
  paginationInfo: {}, // для пагинации
};

export type SearchPizzaParams = {
  sortBy: string;
  search: string;
  category: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk<MyData, SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    // console.log(params);
    const { sortBy, search, category, currentPage } = params;
    console.log(params);
    const { data } = await axios.get<MyData>(
      `https://6d551e6e4aa49570.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`
    );
    // console.log(data);
    return data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        // console.log(state.status);
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log(action, "fulfilled");
        state.items = action.payload.items;
        state.paginationInfo = action.payload.meta;

        state.status = Status.SUCCESS;
        // console.log(state.status);
        if (action.payload.items.length === 0) {
          state.status = Status.ERROR;
        }
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        // console.log(action, "rejected");
        state.status = Status.ERROR;
        console.log(state.status);
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

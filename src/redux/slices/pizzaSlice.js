import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

const initialState = {
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
  // extraReducers: {
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     console.log(state);
  //   },
  // },
  /////////////////////////////
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        console.log(state.status);
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.paginationInfo = action.payload.meta;
        console.log(action, 1233333333333333333333333333);

        state.status = "success";
        console.log(state.status);
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        console.log(state.status);
        state.items = [];
      });
  },
  ///////////////////////////////
  // extraReducers: (builder) => {
  //   builder.addCase(fetchPizzas.fulfilled, (state, action) => {
  //     console.log(state);
  //   });
  // },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

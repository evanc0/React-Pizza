import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, PizzaSliseState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliseState = {
  items: [],
  status: Status.LOADING, // loading | success | error
  paginationInfo: {}, // для пагинации
};

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
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.paginationInfo = action.payload.meta;

        state.status = Status.SUCCESS;
        if (action.payload.items.length === 0) {
          state.status = Status.ERROR;
        }
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

import axios from "axios";
import { MyData, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<MyData, SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, search, category, currentPage } = params;

    const { data } = await axios.get<MyData>(
      `https://6d551e6e4aa49570.mokky.dev/itemsv2?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`
    );

    return data;
  }
);

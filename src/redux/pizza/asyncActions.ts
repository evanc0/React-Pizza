import axios from "axios";
import { MyData, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

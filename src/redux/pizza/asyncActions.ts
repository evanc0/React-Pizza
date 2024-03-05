import axios from "axios";
import { MyData, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<MyData, SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, search, category, currentPage } = params;
    console.log(sortBy, search, category, currentPage);

    let query = `https://6d551e6e4aa49570.mokky.dev/itemsv2?page=${currentPage}&limit=4&sortBy=${sortBy}`;
    if (search) {
      query = query.concat(`&name=${search}`);
    }
    if (category && category.length) {
      query = query.concat(`&category=${category}`);
    }
    console.log(query);

    const { data } = await axios.get<MyData>(query);

    return data;
  }
);

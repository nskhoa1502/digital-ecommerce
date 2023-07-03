import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getCategories = createAsyncThunk(
  "app/categories",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apis.apiGetCategory(payload);
      //   console.log(response.data.response);
      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

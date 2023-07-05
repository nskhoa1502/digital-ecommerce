import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getNewProducts = createAsyncThunk(
  "product/newProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apis.apiGetProducts({ sort: "-createdAt" });
      console.log(response.data.response);
      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../thunks/productThunks";

const initialState = {
  newProducts: [],
  isLoading: false,
  errorMessage: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });
    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage =
        action.payload?.message || "Could not connect to server";
    });
  },
});

export default productSlice.reducer;

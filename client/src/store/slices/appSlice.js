import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../thunks/appThunks";

const initialState = {
  categories: [],
  //   isLoading: false,
  errorMessage: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage =
        action.payload?.message || "Could not connect to server";
    });
  },
});

export default appSlice.reducer;

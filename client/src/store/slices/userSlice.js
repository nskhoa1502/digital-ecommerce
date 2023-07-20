import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      //   console.log(action);
      state.isLoggedIn = action.payload.IsLoggedIn;
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
    },
    login: (state, action) => {
      //   console.log(action);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { register, login } = userSlice.actions;

export default userSlice.reducer;

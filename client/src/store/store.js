import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const commonConfig = {
  key: "shop/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "accessToken", "userData"],
};

export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    user: persistReducer(userConfig, userReducer),
  },
});

export const persistor = persistStore(store);

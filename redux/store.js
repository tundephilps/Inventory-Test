import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import inventoryReducer from "./inventorySlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"; // Example slice for cart

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Add more reducers here if needed
  },
});



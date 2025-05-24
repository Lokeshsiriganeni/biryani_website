import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
  items: [], // Array of items in the cart
  totalQuantity: 0, // Total number of items in the cart
  totalPrice: 0, // Total price of items in the cart
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload; // New item to add
      const existingItem = state.items.find((item) => item.id === newItem.id); // Check if item already exists

      if (existingItem) {
        // If item exists, increase its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If item doesn't exist, add it to the cart
        state.items.push(newItem);
      }

      // Update total quantity and price
      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
    },

    // Reducer to remove an item from the cart
    removeItem: (state, action) => {
      const id = action.payload; // ID of the item to remove
      const existingItem = state.items.find((item) => item.id === id); // Find the item

      if (existingItem) {
        // Update total quantity and price
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;

        // Remove the item from the cart
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    // Reducer to clear the cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Export the actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;

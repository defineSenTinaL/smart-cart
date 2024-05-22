"use client";

import { StateCreator, StoreApi } from "zustand";
import { CartSlice } from "../types/cart";

// Function to create the cart slice
export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/persist", unknown]]
> = (set: StoreApi<CartSlice>["setState"]): CartSlice => ({
  cartItems: [],
  buyNowItem: null,
  addToCart: (newItem) =>
    set((state) => {
      // Find the existing item in the cart
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        // Item already exists in the cart, update the quantity
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === newItem._id
              ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
              : item
          ),
        };
      } else {
        // Item is new to the cart
        return {
          cartItems: [
            ...state.cartItems,
            { ...newItem, quantity: newItem.quantity || 1 },
          ],
        };
      }
    }),
  updateCart: (_id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === _id ? { ...item, quantity } : item
      ),
    })),
  removeFromCart: (_id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== _id),
    })),
  clearCart: () => set({ cartItems: [] }),
  // New function to set a Buy Now item
  setBuyNowItem: (item) => set({ buyNowItem: item }),
  // Function to clear the Buy Now item after checkout or if the user decides to cancel
  clearBuyNowItem: () => set({ buyNowItem: null }),

});

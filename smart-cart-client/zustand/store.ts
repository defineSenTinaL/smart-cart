"use client";

import { createCartSlice } from "@/zustand/features/cartSlice";
import { create } from "zustand";
// mainStore.ts
import { createJSONStorage, persist } from "zustand/middleware";
import { createUserSlice } from "./features/userSlice";
import { UserSlice } from "./types/user";
import { CartSlice } from "./types/cart";


export const cartStore = create<CartSlice, [["zustand/persist", unknown]]>(
  persist(
      createCartSlice,
    {
      name: "cart-store", // Name of the storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const userStore = create<UserSlice, [["zustand/persist", unknown]]>(
  persist(
    createUserSlice,
    {
      name: "user-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
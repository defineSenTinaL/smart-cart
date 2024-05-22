"use client";

import { StateCreator, StoreApi } from 'zustand';
import { Address, UserSlice, User } from '../types/user';

export const createUserSlice: StateCreator<UserSlice, [["zustand/persist", unknown]]> = (set: StoreApi<UserSlice>['setState']): UserSlice => ({
  user: {
    _id: "",
    name: "",
    email: "",
    mobile: null,
    address: [],
    cart: [],
    wishlist: [],
  },
  setUser: (user: User) => set({ user }),
  updateUser: (updatedFields: Partial<User>) => set((state) => ({
    user: { ...state.user, ...updatedFields }
  })),
  addAddress: (address: Address) => set((state) => ({
    user: { ...state.user, address: [...state.user.address, address] }
  })),
  updateAddress: (addressId: string, updatedAddress: Partial<Address>) => set((state) => ({
    user: {
      ...state.user,
      address: state.user.address.map((address) =>
        address._id === addressId ? { ...address, ...updatedAddress } : address
      ),
    }
  })),
  // Similar methods for updating cart and wishlist
});

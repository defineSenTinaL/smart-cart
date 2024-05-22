"use client";

import React, { useEffect, useState } from "react";
import DesktopCard from "./DesktopCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileCard from "./MobileCard";
import { cartStore, userStore } from "@/zustand/store";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthProvider";
import { getUserCart } from "@/utils/cart/api";


const CartPage = () => {
  const { authUser } = useAuth();
  const { user } = userStore();
  const token = authUser?.authtoken;
  const [cartItems, setCartItems] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/cart/${user._id}`);
        const result = await response.json();
        if (result.statusCode === 200) {
          setCartItems(result.data);
        } else {
          toast.error("Failed to fetch cart items");
        }
      } catch (error) {
        toast.error("An error occurred while fetching cart items");
      }
    };

    fetchCartItems();

    const interval = setInterval(() => {
      fetchCartItems();
    }, 10000); // Fetch every 30 seconds

    return () => clearInterval(interval); 
  }, [user._id, token]);

  // Calculate the subtotal and total
  const subtotal = cartItems.reduce(
    (total: any, item: any) => total + item.productId.price * item.quantity,
    0
  );

  // You can add shipping, tax, or other costs here if needed
  const shippingCost = 0; // Adjust this as needed
  const tax = 0; // Adjust this as needed

  const total = subtotal + shippingCost + tax;

  const handleContinueShoppingClick = (e: any) => {
    e.preventDefault(); // Prevent the default link behavior

    // Use router.back() to go back to the previous page
    router.back();
  };

  const handleCheckoutClick = () => {
    if (user && user.email) {
      // If user is logged in, proceed to checkout
      router.push("/checkout");
    } else {
      // If user is not logged in, show toast and redirect to login
      toast.success("Please login to continue");
      setTimeout(() => {
        router.push("/login"); // Replace '/login' with your actual login route
      }, 3000); // Redirect after 3 seconds (or your preferred duration)
    }
  };

  return (
    <>
      {/* Desktop and Tablet Mode */}
      <section className="px-16 py-5 mx-auto bg-base-100 hidden md:block">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-base-100 px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            <div>
              {cartItems.map((item: any) => (
                <DesktopCard key={item._id} product={item} quantity={item.quantity} /> // Pass each item as a prop to DesktopCard
              ))}
              <p
                className="link link-hover flex font-semibold text-primary text-sm mt-10"
                onClick={(e) => handleContinueShoppingClick(e)}
              >
                <svg
                  className="fill-current mr-2 text-primary w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </p>
            </div>
          </div>
          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Sub Total</span>
              <span className="font-semibold text-sm">
                &#8377;{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>&#8377;{total.toFixed(2)}</span>
              </div>
              <Link href={"/checkout"}>
                <button
                  className="btn btn-primary md:w-48 xl:btn-wide"
                  onClick={handleCheckoutClick}
                  disabled={!user.email || !user}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Mode */}
      <section className="bg-base-100 pb-12 sm:py-16 lg:py-20 block md:hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-base-100">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
          </div>
          <div className="mx-auto mt-5 max-w-2xl md:mt-12">
            <div className="bg-base-100 shadow">
              <div className="px-4 sm:px-8 sm:py-10">
                <div className="flow-root">
                  {cartItems.map((item: any) => (
                    <MobileCard key={item._id} product={item} quantity={item.quantity}  /> // Pass each item as a prop to DesktopCard
                  ))}
                </div>
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-lg font-semibold">
                      &#8377;{subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Shipping</p>
                    <p className="text-lg font-semibold">&#8377;80</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-2xl font-semibold">
                    &#8377;{total.toFixed(2)}
                  </p>
                </div>
                <div className="mt-6 text-center pb-5">
                  <Link href={"/checkout"}>
                    <button
                      className="btn w-full btn-md btn-primary"
                      onClick={handleCheckoutClick}
                      disabled={!user.email || !user}
                    >
                      Checkout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;

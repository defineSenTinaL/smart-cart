"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Success = dynamic(() => import("@/components/animation/Success"), {
  ssr: false,
});


const SuccessPage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   // Check if the checkout was actually completed
  //   const checkoutCompleted = localStorage.getItem('checkoutCompleted');

  //   if (checkoutCompleted !== 'true') {
  //     // Redirect to home page if the checkout wasn't completed
  //     router.push('/');
  //   } else {
  //     // Clear the flag for future transactions
  //     localStorage.removeItem('checkoutCompleted');
  //   }
  // }, [router]);

  return (
    <div className="flex py-40 md:py-48 md:px-52 px-10 h-full w-full items-center justify-center bg-base-100">
      <div className="card card-bordered mx-auto flex flex-col items-center rounded-lg bg-base-100 p-8 shadow-lg">
        <div className="relative flex h-56 w-56 items-center justify-center rounded-full">
          <Success />
        </div>
        <h2 className="text-lg font-semibold">Thank you for ordering!</h2>
        <p className="my-6 text-center text-sm">
          Your order has been successfully placed. A confirmation email with
          your order details has been sent to your registered email address.
        </p>
        <div className="flex flex-col md:flex-row w-full my-5 justify-between gap-4">
          <button className="btn btn-outline md:btn-wide"onClick={() => router.push('/profile/order')}>VIEW ORDER</button>
          <button className="btn btn-accent md:btn-wide" onClick={() => router.push('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

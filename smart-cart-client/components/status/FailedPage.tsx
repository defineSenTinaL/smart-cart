"use client";

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Error = dynamic(() => import("@/components/animation/Error"), {
    ssr: false,
  });

const FailedPage = () => {
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
    <div className="flex my-40 md:my-52 px-10 h-full w-full items-center justify-center bg-base-100">
    <div className="card card-bordered mx-auto flex flex-col items-center rounded-lg bg-base-100 p-8 shadow-lg">
      <div className="relative flex h-56 w-56 items-center justify-center rounded-full">
        <Error />
      </div>
      <h2 className="text-lg font-semibold">Oops! Server Error!</h2>
      <p className="my-6 text-center text-sm">
        We&apos;re sorry, but we couldn&apos;t process your order. Please
        check your payment details and try again.
      </p>
      <div className="flex flex-col md:flex-row w-full my-5 justify-center gap-4">
        <button className="btn btn-outline md:btn-wide" onClick={() => router.push('/profile/order')}>VIEW ORDER</button>
      </div>
    </div>
  </div>
  )
}

export default FailedPage
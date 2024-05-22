"use client";
import dynamic from "next/dynamic";
import React from "react";

const Shipping = dynamic(() => import("@/components/animation/Shipping"), {
  ssr: false,
});

const Secure = dynamic(() => import("@/components/animation/Secure"), {
  ssr: false,
});

const Return = dynamic(() => import("@/components/animation/Return"), {
  ssr: false,
});

const Support = dynamic(() => import("@/components/animation/Support"), {
  ssr: false,
});

const ServiceSection = () => {
  return (
    <section className="mt-10 bg-base-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center flex flex-col justify-center items-center ">
            <div className="flex h-52 w-52">
              <Shipping />
            </div>
            <h2 className="text-xl font-bold">Nationwide Shipping</h2>
            <p className="mt-2">Reliable, all-India delivery with top-tier courier partners.</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center">
            <div className="flex h-52 w-52">
              <Secure />
            </div>
            <h2 className="text-xl font-bold">100% Secure Payments</h2>
            <p className="mt-2">Secure and swift transactions exclusively via PhonePe.</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center">
            <div className="flex h-52 w-52">
              <Return />
            </div>
            <h2 className="text-xl font-bold">Easy Returns</h2>
            <p className="mt-2">Simplified, customer-friendly return process.</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center">
            <div className="flex h-52 w-52">
              <Support />
            </div>
            <h2 className="text-xl font-bold">Support 24/7</h2>
            <p className="mt-2">Round-the-clock support for all your needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;

"use client";

import React, { useRef } from "react";
import Image from "next/image";

const Offer = ({ data }: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function scrollContent(direction: string) {
    const scrollAmount = 200;
    const container = scrollContainerRef.current;

    if (container) {
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="flex flex-col mt-7 border-t-2 border-b-2">
      <div className="flex gap-2 mt-3">
        <Image
          src={"/offer.svg"}
          width={30}
          height={30}
          alt="Picture of the return policy"
          style={{
            objectFit: "contain",
          }}
        />
        <span className="text-lg font-semibold">Offers</span>
      </div>
      <div className="navbar bg-base-100 flex justify-center items-center">
        {/* Left Arrow for Desktop */}
        <button
          onClick={() => scrollContent("left")}
          className="hidden md:block p-2"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
        </button>
        {/* Desktop and tablet size */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row overflow-x-auto my-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <ul className="flex flex-row px-1 gap-3">
            <li className="flex flex-col justify-center items-center">
              <div className="card card-bordered w-36 bg-base-100 shadow-xl">
                <span className="px-2 pt-2 text-md font-semibold">Rewards</span>
                <span className="px-2 py-2 text-md font-normal">
                  10X Moji(Points) on every order.
                </span>
              </div>
            </li>
            {data?.map((coupon: any) => (
              <li
                key={coupon._id}
                className="flex flex-col justify-center items-center"
              >
                  <div className="card card-bordered w-36 bg-base-100 shadow-xl">
                    <span className="px-2 pt-2 text-md font-semibold">
                      Coupon
                    </span>
                    <span className="px-2 py-2 text-md font-semibold text-info">
                      {coupon.name}
                    </span>
                    <span className="px-2 pb-2 text-md font-normal">
                      {coupon.description}
                    </span>
                  </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Right Arrow for Desktop */}
        <button
          onClick={() => scrollContent("right")}
          className="hidden md:block p-2"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Offer;

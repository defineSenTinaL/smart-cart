"use client";

import React, { useRef } from "react";
import Image from "next/image";

const ProductServices = ({data}: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function scrollContent(direction: string) {
    const scrollAmount = 200;
    const container = scrollContainerRef.current;

    if (container) {
      container.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <div className="navbar bg-base-100 flex justify-center items-center mt-10 border-t-2 border-b-2">
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
        className="flex flex-row overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <ul className="flex flex-row px-1 gap-3">
          <li className="flex flex-col justify-center items-center">
            <Image
              src={'/return.svg'}
              width={50}
              height={50}
              alt="Picture of the return policy"
              style={{
                objectFit: "contain",
              }}
            />
            <span className="btn btn-ghost text-xs sm:text-md font-semibold">
              {data} days return
            </span>
          </li>
          <li className="flex flex-col justify-center items-center">
          <Image
              src={'/pay.svg'}
              width={50}
              height={50}
              alt="Picture of the pay policy"
              style={{
                objectFit: "contain",
              }}
            />
            <span className="btn btn-ghost text-xs sm:text-md font-semibold">
              Pay on delivery
            </span>
          </li>
          <li className="flex flex-col justify-center items-center">
          <Image
              src={'/delivery.svg'}
              width={50}
              height={50}
              alt="Picture of the delivery policy"
              style={{
                objectFit: "contain",
              }}
            />
            <span className="btn btn-ghost text-xs sm:text-md font-semibold">
              Free Delivery
            </span>
          </li>
          <li className="flex flex-col justify-center items-center">
          <Image
              src={'/secure.svg'}
              width={50}
              height={50}
              alt="Picture of the secure policy"
              style={{
                objectFit: "contain",
              }}
            />
            <span className="btn btn-ghost text-xs sm:text-md font-semibold">
              Secure Transaction
            </span>
          </li>
          <li className="flex flex-col justify-center items-center">
          <Image
              src={'/delivery.svg'}
              width={50}
              height={50}
              alt="Picture of the delivery partner policy"
              style={{
                objectFit: "contain",
              }}
            />
            <span className="btn btn-ghost text-xs sm:text-md font-semibold">
              Top Rated Delivery partner
            </span>
          </li>
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
  );
};

export default ProductServices;

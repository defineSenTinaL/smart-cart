"use client";

import React from "react";
import { Slider } from "@nextui-org/slider";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Price = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const priceParam = searchParams.get("price");

  const [minPrice, maxPrice] = priceParam
    ? priceParam.split(":").map(Number)
    : [0, 100000];

  const updatePriceRange = (newMinPrice: number, newMaxPrice: number) => {
    let existingParams = Object.fromEntries(searchParams);
    existingParams.price = `${newMinPrice}:${newMaxPrice}`;
    const newSearch = new URLSearchParams(existingParams).toString();
    let URL = `${pathname}?${newSearch}`;
    router.push(URL, { scroll: false });
  };

  const handleSliderChange = (value: any) => {
    // Define a custom type for the 'value' parameter
    //const newValue: { min: number; max: number } = value;
    updatePriceRange(value[0], value[1]);
  };

  return (
    <div className="p-4 mb-5 card bg-base-100 card-bordered shadow-xl">
      <h2 className="text-2xl font-bold">Price Range</h2>
      <div className="w-16 pb-2 mb-10 border-b border-accent" />
      <div className="w-full mb-4 px-5">
        <Slider
          label="  "
          showTooltip={true}
          showOutline={true}
          step={100}
          minValue={0}
          maxValue={100000}
          defaultValue={[minPrice, maxPrice]}
          onChange={handleSliderChange as any}
          formatOptions={{ style: "currency", currency: "INR" }}
          className="max-w-md"
        />
      </div>
    </div>
  );
};

export default Price;

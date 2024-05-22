"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface Document {
  [key: string]: any; // Allow any extra fields
}

interface BrandProps {
  data: Document;
}

const Brand: React.FC<BrandProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const brandParam = searchParams.get("brand");

  const handleBrandSelection = (brand: string) => {
    const existingParams = Object.fromEntries(searchParams);
    let newBrands: string[] = [];

    if (existingParams.brand) {
      // Parse the existing selected brands from the URL query parameter
      newBrands = existingParams.brand.split(",");
    }

    if (!newBrands.includes(brand)) {
      // Brand doesn't exist, so add it
      newBrands.push(brand);
    } else {
      // Brand exists, so remove it
      newBrands = newBrands.filter((selectedBrand) => selectedBrand !== brand);
    }

    if (newBrands.length > 0) {
      existingParams.brand = newBrands.join(",");
    } else {
      // If no brands are left, remove the entire 'brand' parameter
      delete existingParams.brand;
    }

    const newSearch = new URLSearchParams(existingParams).toString();

    // Construct the new URL with the updated 'brand' parameter
    let URL = `${pathname}?${newSearch}`;

    // Update the URL
    router.push(URL, { scroll: false });
  };

  return (
    <div className="p-4 mb-5 card bg-base-100 card-bordered shadow-md">
      <h2 className="text-2xl font-bold">Brand</h2>
      <div className="w-16 pb-2 mb-6 border-b border-accent" />
      <ul>
        {data?.map((facet: any) => (
          <li key={facet.value} className="mb-4">
            <label
              htmlFor={facet.value}
              className="flex items-center"
            >
              <input
                type="checkbox"
                id={facet.value}
                className="w-4 h-4 mr-2 checkbox"
                checked={
                  brandParam
                    ? brandParam.split(",").includes(facet.value)
                    : false
                }
                onChange={() => handleBrandSelection(facet.value)}
              />
              <span className="text-lg">{facet.value}</span>
            </label>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Brand;

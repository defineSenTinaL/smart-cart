"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface Document {
  [key: string]: any; // Allow any extra fields
}

interface SizeProps {
  data: Document;
}

const Size: React.FC<SizeProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sizeParam = searchParams.get("size");

  const handleSizeSelection = (size: string) => {
    let existingParams = Object.fromEntries(searchParams);

    if (existingParams.size) {
      const sizes = existingParams.size.split(",");

      if (!sizes.includes(size)) {
        // Size exists, so add it
        sizes.push(size);
        existingParams.size = sizes.join(",");
      } else {
        // Size exists, so remove it
        sizes.splice(sizes.indexOf(size), 1); // Remove the size
        if (sizes.length === 0) {
          // If no sizes are left, remove the entire 'size' parameter
          delete existingParams.size;
        } else {
          existingParams.size = sizes.join(",");
        }
      }
    } else {
      // 'size' parameter doesn't exist, so add it
      existingParams.size = size;
    }

    const newSearch = new URLSearchParams(existingParams).toString();

    // Construct the new URL with the updated 'size' parameter
    let URL = `${pathname}?${newSearch}`;
    // Update the URL
    router.push(URL, { scroll: false });
  };
  return (
    <div className="card card-bordered shadow-md p-4 mb-5 bg-base-100">
      <h2 className="text-2xl font-bold ">Size</h2>
      <div className="w-16 pb-2 mb-6 border-b border-accent" />
      <div className="flex flex-wrap -mx-1 -mb-2">
        {data?.map((sizeItem: any) => {
          <>
            <button
              key={sizeItem.value}
              className={`p-1 mb-2 mr-4 btn btn-ghost`}
              onClick={() => handleSizeSelection(sizeItem.value)}
            ></button>
            <span className="text-lg">{sizeItem.value}</span>
          </>;
        })}
        {/* <button
          className={`p-1 mb-2 mr-4 ${sizeParam && sizeParam.includes("XL")} btn btn-outline btn-primary`}
          onClick={() => handleSizeSelection("XL")}
        >
          XL
        </button> */}
      </div>
    </div>
  );
};

export default Size;

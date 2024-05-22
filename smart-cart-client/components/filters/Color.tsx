"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface Document {
  [key: string]: any; // Allow any extra fields
}

interface ColorProps {
  data: Document;
}

const colorMap: { [key: string]: string } = {
  // Assume you have a custom CSS class for maroon
  chrome: "bg-gray-400 ring-gray-200",
  "Rose Gold": "bg-rose-800 ring-pink-600",
  "Black Matt": "bg-black ring-gray-800",
  Gold: "bg-yellow-300 ring-yellow-200",
  White: "bg-white ring-gray-200",
  Red: "bg-red-500 ring-red-400",
  Blue: "bg-blue-500 ring-blue-400",
  Maroon: "bg-red-700 ring-red-600",
  Brown: "bg-orange-950", // You might need to define custom colors like `bg-brown-500` in your CSS
  Black: "bg-black ring-gray-800",
  "Dark Grey": "bg-gray-500"
  // Add more mappings as needed
};

const Color: React.FC<ColorProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const colorParam = searchParams.get("color");

  const handleColorSelection = (color: string) => {
    let existingParams = Object.fromEntries(searchParams);

    if (existingParams.color) {
      const colors = existingParams.color.split(",");

      if (!colors.includes(color)) {
        // Color exists, so add it
        colors.push(color);
        existingParams.color = colors.join(",");
      } else {
        // Color exists, so remove it
        colors.splice(colors.indexOf(color), 1); // Remove the color
        if (colors.length === 0) {
          // If no colors are left, remove the entire 'color' parameter
          delete existingParams.color;
        } else {
          existingParams.color = colors.join(",");
        }
      }
    } else {
      // 'color' parameter doesn't exist, so add it
      existingParams.color = color;
    }

    const newSearch = new URLSearchParams(existingParams).toString();

    // Construct the new URL with the updated 'color' parameter
    let URL = `${pathname}?${newSearch}`;

    // Update the URL
    router.push(URL, { scroll: false });
  };

  return (
    <div className="card card-bordered shadow-md p-4 mb-5 bg-base-100">
      <h2 className="text-2xl font-bold">Colors</h2>
      <div className="w-16 pb-2 mb-6 border-b border-accent" />
      <div className="flex flex-wrap -mx-1 -mb-2">
      {data?.map((colorItem: any) => {
          const colorStyle = colorMap[colorItem.value] || ''; // Fallback if the color is not in the map
          return (
            <button
              key={colorItem.value}
              className={`p-1 mb-2 mr-4 ${colorParam && colorParam.includes(colorItem.value) ? "ring-2 ring-offset-2" : ""} btn btn-ghost`}
              onClick={() => handleColorSelection(colorItem.value)}
            >
              <div className={`w-5 h-5 ${colorStyle}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Color;

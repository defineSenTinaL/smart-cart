"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Sort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentSort: any = searchParams.get("sort");

  const sortOptionsMap: any = {
    'Featured': 'featured',
    'Price: Low to High': 'price:asc',
    'Price: High to Low': 'price:desc',
  };

  // Reverse the map to get user-friendly names from Typesense sort parameters
  const reverseSortOptionsMap = Object.fromEntries(
    Object.entries(sortOptionsMap).map(([key, value]) => [value, key])
  );

  const handleSortChange = (e: any) => {
    const userSelection = e.target.value;
    const typesenseSortParam = sortOptionsMap[userSelection];

    const existingParams = Object.fromEntries(searchParams);

    if (userSelection === 'Featured') {
        // If 'Featured' is selected, remove the 'sort' parameter from the URL
        delete existingParams.sort;
    } else {
        existingParams.sort = typesenseSortParam;
    }

    const newSearch = new URLSearchParams(existingParams).toString();

    router.push(`${pathname}?${newSearch}`, { scroll: false });

};

  return (
    <div className="px-3 ">
      <div className="flex gap-5 items-center justify-between px-4 py-2 mb-4 card card-side bg-base-100 card-bordered shadow-md">
        <h2 className="text-2xl">Results</h2>

        <div className="flex items-center justify-between card card-bordered">
          <div>
            <select 
              className="select select-secondary select-sm w-full max-w-xs"
              value={reverseSortOptionsMap[currentSort] || 'Featured'}
              onChange={handleSortChange}
            >
              <option>Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;

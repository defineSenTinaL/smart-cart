"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Pagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pageParam = searchParams.get("offset");
  const currentPage = parseInt(pageParam || "1", 10); // Default to page 1 if 'page' param is missing or invalid.

  const handlePageChange = (newPage: number) => {
    const existingParams = Object.fromEntries(searchParams);
    existingParams.offset = newPage.toString();
    const newSearch = new URLSearchParams(existingParams).toString();
    const URL = `${pathname}?${newSearch}`;
    router.push(URL);
  };

  return (
    <div className="flex justify-center md:justify-end mt-6">
      <div className="join grid grid-cols-2">
        <button
          className="join-item btn btn-outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1} // Disable previous button on the first page.
        >
          Previous Page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;

import { getCategories } from "@/utils/category/api";
import Link from "next/link";
import React from "react";

export default async function CategoryNavbar() {
  const data = await getCategories();
  return (
    <div className="navbar bg-base-100 flex justify-center items-center">
      {/* Desktop and tablet size */}
      <div className="flex flex-row overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
        <ul className="flex flex-row px-1 gap-10">
          {data?.map((category: any) => (
            <li key={category?._id}>
              <Link href={`/category/${category?.name}`}>
              <span className="btn btn-ghost text-xs sm:text-md font-semibold">{category?.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
import React from "react";
import VerticalCard from "../VerticalCard";
import { fetchAllProducts } from "@/utils/home/api";

export default async function FeaturedProduct() {
  const data: any = await fetchAllProducts();
  return (
    <section className="w-full bg-base-100 py-12 text-gray-700 sm:py-16 lg:py-20">
      <div className="w-full px-10">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            Newly Added Product
          </h2>
          <p className="mt-4 text-base text-gray-700">
            New range of product
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-5 mt-8 lg:grid-cols-4">
        {data?.map((data: any) => (
            <VerticalCard key={data?._id} product={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

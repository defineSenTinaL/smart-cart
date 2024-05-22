import React from "react";

import HorizantalCard from "@/components/HorizantalCard";
import VerticalCard from "@/components/VerticalCard";
import Brand from "@/components/filters/Brand";
import Categories from "@/components/filters/Categories";
import Color from "@/components/filters/Color";
import FilterButton from "@/components/filters/FilterButton";
import Pagination from "@/components/filters/Pagination";
import Price from "@/components/filters/Price";
import Size from "@/components/filters/Size";
import Sort from "@/components/filters/Sort";
import search, { fetchFilters } from "@/utils/search/api";
import { cookies } from "next/headers";
import logger from "@/libs/logger";
import Image from "next/image";

export default async function Search({ searchParams }: { searchParams: any }) {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(
    `${user?.value} access the Search page and searched => ${searchParams.q}`
  );

  const data: any = await search(searchParams);
  //console.log(data.hits[0].document);
  const filterData: any = await fetchFilters(searchParams.q);
  const brand_data: any = filterData?.results[0];
  const category_data: any = filterData?.results[1];
  const color_data: any = filterData?.results[2];
  const size_data: any = filterData?.results[3];

  return (
    <section className="py-10 bg-base-100">
      {/* Desktop and Tablet Mode */}
      <div className="hidden lg:block px-4 py-4 mx-5 max-w-full lg:py-6 md:px-6">
        <div className="flex flex-row mb-24 gap-10">
          {/* Filters section start */}
          <div className="w-full pr-4 lg:w-1/4 lg:block ">
            {/* Categories section */}
            {category_data?.facet_counts?.[0]?.counts &&
            category_data.facet_counts[0].counts.length > 0 ? (
              <Categories data={category_data.facet_counts} />
            ) : (
              <></>
            )}

            {/* Size section */}
            {size_data?.facet_counts?.[0]?.counts &&
            size_data.facet_counts[0].counts.length > 0 ? (
              <Size data={size_data.facet_counts[0].counts} />
            ) : (
              <></>
            )}

            {/* Color section */}
            {color_data?.facet_counts?.[0]?.counts &&
            color_data.facet_counts[0].counts.length > 0 ? (
              <Color data={color_data.facet_counts[0].counts} />
            ) : (
              <></>
            )}

            {/* Brand section */}
            {brand_data?.facet_counts?.[0]?.counts &&
            brand_data.facet_counts[0].counts.length > 0 ? (
              <Brand data={brand_data.facet_counts[0].counts} />
            ) : (
              <></>
            )}
            <Price />
          </div>
          {/* Filters section End */}
          <div className="w-full px-3 lg:w-3/4">
            {/* Sort section start */}
            <Sort />
            {/* Sort section End */}
            {/* Product Card section start */}
            {data && data.hits.length > 0 ? (
              <div className="grid grid-cols-3 gap-10 items-center my-10">
                {data?.hits.map((hit: any, index: number) => (
                  <VerticalCard key={index} product={hit?.document} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-5">
                <Image
                  src={"/not-found.png"}
                  width={400}
                  height={400}
                  alt="Picture of the product"
                />
              </div>
            )}
            {/* Product Card section End */}
            {/* Pagination section start */}
            <Pagination />
            {/* Pagination section End */}
          </div>
        </div>
      </div>

      {/* Mobile mode */}
      <div className="lg:hidden py-4 mx-2 max-w-full">
        <div className="flex flex-row mb-24 gap-10">
          {/* Filters section start */}
          {/* Filters section End */}
          <div className="w-full px-3 lg:w-3/4">
            <div className="flex flex-row">
              {/* Sort section start */}
              <Sort />
              {/* Sort section End */}
              <FilterButton filterData={filterData} />
            </div>
            {/* Product Card section start */}
            <div className="flex flex-col gap-4 my-10">
              {data?.hits.map((hit: any, index: number) => (
                <HorizantalCard key={index} product={hit.document} />
              ))}
            </div>
            {/* Product Card section End */}
            {/* Pagination section start */}
            <Pagination />
            {/* Pagination section End */}
          </div>
        </div>
      </div>
    </section>
  );
}

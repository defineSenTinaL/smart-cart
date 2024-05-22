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
import logger from "@/libs/logger";
import { category, fetchCategoryFilters } from "@/utils/category/api";
import { cookies } from "next/headers";
import React from "react";

export default async function Category({
  params,
  searchParams,
}: {
  params: { slug: any };
  searchParams: any;
}) {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the category page`);
  const cat = params?.slug ? decodeURIComponent(params.slug) : "";

  const data: any = await category(cat, searchParams);
  //console.log(data);
  //console.log(data.hits[0].document);
  const filterData: any = await fetchCategoryFilters(cat);
  // const brand_data: any = await fetchBrands(searchParams.q);
  const brand_data: any = filterData?.results[0];
  // const category_data: any = await fetchCategory(searchParams.q);
  const category_data: any = filterData?.results[1];
  // const color_data: any = await fetchColors(searchParams.q);
  const color_data: any = filterData?.results[2];
  // const size_data: any = await fetchSize(searchParams.q);
  const size_data: any = filterData?.results[3];
  return (
    <section className="py-10 bg-base-100">
      {/* Desktop and Tablet Mode */}
      <div className="hidden lg:block px-4 py-4 mx-5 max-w-full lg:py-6 md:px-6">
        <div className="flex flex-row mb-24 gap-10">
          {/* Filters section start */}
          <div className="w-full pr-4 lg:w-1/4 lg:block ">
            {/* Categories section */}
            {category_data?.facet_counts ? (
              <Categories data={category_data?.facet_counts} />
            ) : (
              <></>
            )}

            {/* Size section */}
            {size_data?.facet_counts?.[0]?.counts &&
            size_data.facet_counts[0].counts.length > 0 ? (
              <Size data={size_data?.facet_counts[0].counts} />
            ) : (
              <></>
            )}

            {/* Color section */}
            {color_data?.facet_counts?.[0]?.counts &&
            color_data.facet_counts[0].counts.length > 0 ? (
              <Color data={color_data?.facet_counts[0].counts} />
            ) : (
              <></>
            )}

            {/* Brand section */}
            {brand_data?.facet_counts?.[0]?.counts &&
            brand_data.facet_counts[0].counts.length > 0 ? (
              <Brand data={brand_data?.facet_counts[0].counts} />
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
            <div className="grid grid-cols-3 gap-10 items-center my-10">
              {data?.hits.map((hit: any, index: number) => (
                <VerticalCard key={index} product={hit.document} />
              ))}
            </div>
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
              {/* <FilterButton data={data} /> */}
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

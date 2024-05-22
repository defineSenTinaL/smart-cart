import React from "react";
import { ProductProps } from "./types";
import Image from "next/image";

const Feature: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="bg-base-100">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-10 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-3xl font-bold tracking-tight sm:text-4xl">
            Technical Specifications
          </span>
          <p className="mt-4">
          {product?.description}
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Origin</dt>
              <dd className="mt-2 text-sm">{product?.origin}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Material</dt>
              <dd className="mt-2 text-sm">{product?.material}</dd>
            </div>
            {/* <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Dimension</dt>
              <dd className="mt-2 text-sm">
                {product?.product_dimension.length} X{" "}
                {product?.product_dimension.breadth} X{" "}
                {product?.product_dimension.height}
              </dd>
            </div> */}
            {/* <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Style</dt>
              <dd className="mt-2 text-sm">{product?.style}</dd>
            </div> */}
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Inside package</dt>
              <dd className="mt-2 text-sm">{product?.component}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Fragile</dt>
              <dd className="mt-2 text-sm">{product?.fragile}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium">Warranty</dt>
              <dd className="mt-2 text-sm">{product?.warranty}</dd>
            </div>
          </dl>
        </div>
        <div className="border-l pl-5 grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <Image
            src={product?.image[2]?.url}
            width={260}
            height={260}
            alt="Picture of the product"
            style={{
              objectFit: "contain",
              aspectRatio: "auto",
              width: "100%",
              height: "100%",
            }}
          />
          <Image
            src={product?.image[3]?.url}
            width={260}
            height={260}
            alt="Picture of the product"
            style={{
              objectFit: "contain",
              aspectRatio: "auto",
              width: "100%",
              height: "100%",
            }}
          />
          <Image
            src={product?.image[4]?.url}
            width={260}
            height={260}
            alt="Picture of the product"
            style={{
              objectFit: "contain",
              aspectRatio: "auto",
              width: "100%",
              height: "100%",
            }}
          />
          <Image
            src={product?.image[5]?.url}
            width={260}
            height={260}
            alt="Picture of the product"
            style={{
              objectFit: "contain",
              aspectRatio: "auto",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Feature;

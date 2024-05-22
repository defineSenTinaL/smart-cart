"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
interface HorizantalCardProps {
  [key: string]: any;
}

const HorizantalCard: React.FC<HorizantalCardProps> = ({ product }) => {

  const imageAlt = `Picture of the product ${product?.title}`;

  return (
    <Link href={`/${product?.slug}?id=${product?._id}&keyword=${product?.keyword.join(',')}`}>
    <div className="card card-side w-full bg-base-100 shadow-xl h-44">
      <figure className="p-3">
        <Image
          src={product?.image[0].url}
          width={50}
          height={50}
          alt={imageAlt}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </figure>
      <div className="card-body p-1 pt-5">
        <div className="max-w-[188px] overflow-hidden">
          <p className="overflow-ellipsis">{product?.title}</p>
          <p className="text-primary">{product?.brand}</p>
        </div>
        <div>
          <div className="badge badge-error badge-md">50% OFF</div>
          <div className="pt-1 flex items-center">
            <h1 className="text-2xl font-bold">&#8377;{product?.price}</h1>
            <h1 className="text-md line-through pl-2">
              &#8377;{product?.mrp}
            </h1>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default HorizantalCard;

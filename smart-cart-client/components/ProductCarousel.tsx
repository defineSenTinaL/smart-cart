"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

// import required modules
import { Navigation, Pagination, EffectCards } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  [key: string]: any;
}

const SwiperCard: React.FC<ProductProps> = ({ product }) => {
  // Determine the price to display
  const displayPrice =
    product?.variation && product.variation.length > 0
      ? product.variation[0].price
      : product?.price;

  const displayMrpPrice =
    product?.variation && product.variation.length > 0
      ? product.variation[0].mrp
      : product?.mrp;

  // Calculate discount percentage
  const discountPercentage = displayMrpPrice
    ? Math.round(((displayMrpPrice - displayPrice) / displayMrpPrice) * 100)
    : 0;

    const imageAlt = `Picture of the product ${product?.title}`;

  return (
    <Link href={`/${product?.slug}?id=${product?._id}&keyword=${product?.keyword.join(',')}`}>
      <div className="card card-compact w-full bg-base-100 shadow-xl">
        <figure className="h-[145px] md:h-[200px]">
          <Image
            src={product?.image[0].url}
            width={280}
            height={180}
            alt={imageAlt}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </figure>
        <div className="card-body">
          <h1 className="block overflow-hidden text-ellipsis whitespace-nowrap text-black text-md md:text-lg">
            {product?.title}
          </h1>
          <div>
            <div className="badge badge-error font-bold badge-md">{discountPercentage}% OFF</div>
            <div className="pt-1 flex items-center">
              <h1 className="text-2xl font-bold text-black">&#8377;{displayPrice}</h1>
              <h1 className="text-md text-black line-through pl-1">
                &#8377;{displayMrpPrice}
              </h1>
            </div>
          </div>
          {/* <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div> */}
        </div>
      </div>
    </Link>
  );
};

const ProductCarousel: React.FC<ProductProps> = ({ product }) => {

  const breakpoints = {
    // When window width is >= 768px (tablet mode)
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // When window width is >= 1024px (desktop mode)
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  };
  return (
    <div className="w-full md:px-10 md:mb-[100px]">
      <div className="text-2xl font-bold mb-5 mx-10">You Might Also Like</div>

      <div className="hidden md:block pb-10">
        <Swiper
          slidesPerView={"auto"} // Default slides per view for all sizes
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="mySwiper"
          breakpoints={breakpoints}
        >
          {product?.hits.map((hit: any, index: number) => (
            <SwiperSlide key={index}>
              <SwiperCard key={index} product={hit?.document} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="md:hidden pl-1 pb-10">
        <Swiper
          slidesPerView={2} // Default slides per view for all sizes
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {product?.hits.map((hit: any, index: number) => (
            <SwiperSlide key={index}>
              <SwiperCard key={index} product={hit?.document} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
  );
};

export default ProductCarousel;

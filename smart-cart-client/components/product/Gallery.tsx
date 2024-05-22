"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";

// Define a TypeScript interface for the prop type
interface GalleryProps {
  image: {
    url: string;
    fileId: string;
    _id: string;
  }[];
}

const Gallery: React.FC<GalleryProps> = ({ image }) => {
  const imageStyle = {
    borderRadius: "50%",
    border: "1px solid #fff",
    height: "100%",
    width: "100%",
    objectfit: "contain",
  };

  return (
    <>
      <div className="hidden md:block ml-10">
        <div className="mx-auto mt-6 w-full h-[505px] sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="h-[505px] aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            {/* <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
              alt="Two each of gray, white, and black shirts laying flat."
              className="h-full w-full object-cover object-center"
            /> */}
            <Image
              src={image[0]?.url}
              width={384}
              height={544}
              alt="Picture of the product"
              style={{
                objectFit: "contain",
                aspectRatio: "3 / 2",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="hidden h-[505px] lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="w-[355px] h-[236px] aspect-w-3 overflow-hidden rounded-lg">
              {/* <img
                src={image[1].url}
                alt="Picture of the product"
                className="h-full w-full object-contain object-center"
              /> */}
              <Image
                src={image[1]?.url}
                width={355}
                height={236}
                alt="Picture of the product"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
            <div className="w-[355px] h-[236px] aspect-w-3 overflow-hidden rounded-lg">
              {/* <img
                src={image[2].url}
                alt="Picture of the product"
                className="h-full w-full object-contain object-center"
              /> */}
              <Image
                src={image[2]?.url}
                width={355}
                height={236}
                alt="Picture of the product"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="h-[505px] aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            {/* <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
              alt="Model wearing plain white basic tee."
              className="h-full w-full object-cover object-center"
            /> */}
            <Image
              src={image[3]?.url}
              width={384}
              height={544}
              alt="Picture of the product"
              style={{
                objectFit: "contain",
                aspectRatio: "3 / 2",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden mt-5 ml-[10px]">
        {" "}
        {/* Hide on medium and large screens */}
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative]}
          className="mySwiper"
        >
          {image.map((img, index) => (
            <SwiperSlide key={index} style={{ backgroundColor: 'white' }}>
              <Image
                src={img.url}
                width={390}
                height={497}
                alt={`Picture of the product ${index + 1}`}
                style={{
                  objectFit: "contain",
                  aspectRatio: "3 / 2",
                  width: "100%",
                  height: "100%",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Gallery;

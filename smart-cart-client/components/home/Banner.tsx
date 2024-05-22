"use client";

import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper relative z-0"
      >
        <SwiperSlide>
          <div className="w-full h-96 md:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-96 md:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-96 md:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;

{
  /* <div className="carousel w-full">
<div id="slide1" className="carousel-item relative w-full">
<div className="w-full h-96 md:aspect-auto">
    <img
      src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
      alt="image 1"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide4" className="btn btn-circle">
      ❮
    </a>
    <a href="#slide2" className="btn btn-circle">
      ❯
    </a>
  </div>
</div>
<div id="slide2" className="carousel-item relative w-full">
<div className="w-full h-96 md:aspect-auto">
    <img
      src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
      alt="image 2"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide1" className="btn btn-circle">
      ❮
    </a>
    <a href="#slide3" className="btn btn-circle">
      ❯
    </a>
  </div>
</div>
<div id="slide3" className="carousel-item relative w-full">
<div className="w-full h-96 md:aspect-auto">
    <img
      src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
      alt="image 3"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide2" className="btn btn-circle">
      ❮
    </a>
    <a href="#slide1" className="btn btn-circle">
      ❯
    </a>
  </div>
</div>
{/* <div id="slide4" className="carousel-item relative w-full">
  <img
    src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
    className="w-full"
  />
  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide3" className="btn btn-circle">
      ❮
    </a>
    <a href="#slide1" className="btn btn-circle">
      ❯
    </a>
  </div>
</div> */
}

"use client";

import React from "react";

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const Shipping = () => {
  return (
      <DotLottiePlayer src="/delivery.lottie" autoplay loop />
  );
};

export default Shipping;

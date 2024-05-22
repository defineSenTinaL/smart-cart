"use client";

import React from "react";

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const CustomLoading = () => {
  return (
      <DotLottiePlayer src="/loadingPlane.lottie" autoplay loop />
  );
};

export default CustomLoading;

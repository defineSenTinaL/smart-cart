"use client";

import React from "react";

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const Secure = () => {
  return (
      <DotLottiePlayer src="/secure.lottie" autoplay loop />
  );
};

export default Secure;

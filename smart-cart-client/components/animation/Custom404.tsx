"use client";

import React from 'react'
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { useRouter } from 'next/navigation';

const Custom404 = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    }
  return (
    <div className='flex flex-col justify-center gap-10 py-5 lg:py-16 px-16 lg:px-64 bg-base-100'>
        <div className='flex flex-col justify-center items-center gap-10 pb-5'>
        <h1 className='text-2xl text-black font-semibold '>Whoops!</h1>
        <p className='text-lg text-black font-medium'>Sorry, something went wrong, Please refresh the page.</p>
        </div>
        <DotLottiePlayer src="/Error404.lottie" autoplay loop />
        <div className='justify-center flex py-5'>
        <button className='btn btn-neutral btn-md lg:w-96' onClick={handleClick}>Back to Home</button>
        </div>
    </div>
  )
}

export default Custom404
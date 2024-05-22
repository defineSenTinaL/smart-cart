import dynamic from "next/dynamic";
import React from "react";

const NoSSR = dynamic(() => import('@/components/status/SuccessPage'), { ssr: false })


const Success = () => {
  return (
    <NoSSR />
  );
};

export default Success;

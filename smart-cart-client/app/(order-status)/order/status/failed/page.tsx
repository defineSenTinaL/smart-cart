import dynamic from "next/dynamic";
import React from "react";

const NoSSR = dynamic(() => import('@/components/status/FailedPage'), { ssr: false })


const Failed = () => {
  return (
    <NoSSR />
  );
};

export default Failed;

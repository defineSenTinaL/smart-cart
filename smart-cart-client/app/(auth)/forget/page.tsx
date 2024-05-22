import React from "react";
import dynamic from 'next/dynamic'
 
const ForgetPage = dynamic(() => import('@/components/auth/ForgetPage'), { ssr: false })

const Forget = () => {
  return (
    <>
    <ForgetPage />
    </>
  );
};

export default Forget;

import CartPage from "@/components/cart/CartPage";
import React from "react";
import dynamic from 'next/dynamic'
import logger from "@/libs/logger";
import { cookies } from "next/headers";
 
const NoSSR = dynamic(() => import('@/components/cart/CartPage'), { ssr: false })

const Cart = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Cart page`);

  return (
    <>
    <NoSSR />
    </>
  );
};

export default Cart;

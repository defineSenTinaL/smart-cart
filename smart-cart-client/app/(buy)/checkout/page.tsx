import React from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import logger from "@/libs/logger";

const NoSSR = dynamic(() => import("@/components/checkout/CheckoutPage"), {
  ssr: false,
});

const CheckoutNav = dynamic(() => import("@/components/checkout/CheckoutNav"), {
  ssr: false,
});

const Checkout = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Checkout page`);
  return (
    <>
    <CheckoutNav />
      <NoSSR />
    </>
  );
};

export default Checkout;

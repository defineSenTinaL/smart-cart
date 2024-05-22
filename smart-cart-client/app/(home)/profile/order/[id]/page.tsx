import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import logger from "@/libs/logger";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/profile/OrderDetails"), {
  ssr: false,
});

const OrderDetail = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the ORDER Details Page`);
  return (
    <>
      <NoSSR />
    </>
  );
};

export default OrderDetail;

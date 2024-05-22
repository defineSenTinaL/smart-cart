import React from "react";
import { cookies } from "next/headers";
import logger from "@/libs/logger";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/profile/OrdersPage"), {
  ssr: false,
});

export default async function Order() {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the ORDER Page`);
  return (
    <>
      <NoSSR />
    </>
  );
}

import AddressPage from "@/components/profile/AddressPage";
import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const Address = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Address page`);
  return <AddressPage />;
};

export default Address;

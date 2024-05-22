import WishlistPage from "@/components/profile/WishlistPage";
import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const Wishlist = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the WISHLIST Page`);
  return (
    <>
    <WishlistPage />
    </>
  );
};

export default Wishlist;

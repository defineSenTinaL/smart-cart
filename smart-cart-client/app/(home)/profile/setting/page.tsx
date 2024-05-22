import SettingPage from "@/components/profile/SettingPage";
import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const Setting = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Setting page`);
  return <SettingPage />;
};

export default Setting;

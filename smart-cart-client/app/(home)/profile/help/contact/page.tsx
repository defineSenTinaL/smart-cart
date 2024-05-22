import ContactPage from "@/components/profile/ContactPage";
import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const Contact = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Contact page`);
  return <ContactPage />;
};

export default Contact;

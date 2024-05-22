import ContactPage from "@/components/home/ContactPage";
import logger from "@/libs/logger";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Contact Page`);  

  return (
    <ContactPage />
  );
};

export default Contact;

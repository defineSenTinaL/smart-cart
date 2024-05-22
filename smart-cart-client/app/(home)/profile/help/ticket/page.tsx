import TicketPage from "@/components/profile/TicketPage";
import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const Ticket = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Ticket page`);
  return (
    <TicketPage />
  );
};

export default Ticket;

import React from "react";
import Link from 'next/link';
import { cookies } from "next/headers";
import logger from "@/libs/logger";


const Help = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Help page`);
  return (
    <div className="py-20 bg-base-100">
      <h1 className="mx-10 md:mx-72 text-3xl">Hello. What can we help you with?</h1>
      <div className="flex flex-col md:flex-row my-20 mx-10 md:mx-72">
        <div className="grid h-36 text-3xl md:flex-grow bg-base-100 card card-bordered shadow-md rounded-box place-items-center">
          Raise a ticket
          <Link href={'/profile/help/ticket'}>
          <button className="btn btn-primary md:btn-md md:btn-wide">Click here</button>
        </Link>
        </div>
        <div className="divider md:divider-horizontal">OR</div>
        <div className="grid h-36 text-3xl md:flex-grow card card-bordered shadow-md bg-base-100 rounded-box place-items-center">
          Call us
          <Link href={'/profile/help/contact'}>
          <button className="btn btn-secondary md:btn-md md:btn-wide">Click here</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;

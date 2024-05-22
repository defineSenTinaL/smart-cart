import Pagination from "@/components/filters/Pagination";
import logger from "@/libs/logger";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

function Card() {
  return (
    <li className="card card-bordered shadow-md mt-6 px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50">
      <a className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-primary font-medium">ticket Id</span>
          <span className="text-sm text-primary font-medium">Date</span>
        </div>
        <h3 className="text-base font-semibold mt-1">Subject</h3>
        <div className="text-lg flex items-center gap-6">
          <span className="flex items-center gap-2 text-info">
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 6V5C6 3.34315 7.34315 2 9 2H11C12.6569 2 14 3.34315 14 5V6H16C17.1046 6 18 6.89543 18 8V11.5708C15.5096 12.4947 12.8149 12.9999 10 12.9999C7.18514 12.9999 4.49037 12.4947 2 11.5707V8C2 6.89543 2.89543 6 4 6H6ZM8 5C8 4.44772 8.44772 4 9 4H11C11.5523 4 12 4.44772 12 5V6H8V5ZM9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z"
                fill="#9CA3AF"
              />
              <path
                d="M2 13.6923V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V13.6923C15.4872 14.5404 12.7964 14.9999 10 14.9999C7.20363 14.9999 4.51279 14.5404 2 13.6923Z"
                fill="#9CA3AF"
              />
            </svg>
            Open
          </span>
        </div>
      </a>
    </li>
  );
}

const Chat = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Chats page`);
  return (
    <section className="py-10">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8">
        <div className="max-w-md">
          <h1 className="text-2xl font-extrabold sm:text-3xl">Your Chats</h1>
        </div>
        <ul className=" divide-y space-y-3">
          <Card />
          <Card />
          <Card />
          <Card />
        </ul>
      </div>
      <div className="md:px-[275px]">
        <Pagination />
      </div>
    </section>
  );
};

export default Chat;

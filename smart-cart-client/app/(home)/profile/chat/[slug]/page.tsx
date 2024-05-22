import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const ChatDetails = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Chats Details page`);
  return (
    <div className="flex flex-col bg-base-100 px-auto md:px-44 py-10 antialiased">
      <div className="flex justify-between">
      <h1 className="mx-7 text-3xl font-semibold">Subject</h1>
      <h1 className="mx-7 text-xl font-semibold">Order ID</h1>
      </div>
      <div className="flex flex-col h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 card card-bordered bg-base-200 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid md:grid-cols-12 gap-y-2">
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl">
                        <div>Hey How are you today?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Vel ipsa commodi illum saepe numquam maxime
                          asperiores voluptate sit, minima perspiciatis.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 md:col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>Im ok what about you?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 md:col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl">
                        <div>Lorem ipsum dolor sit amet !</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                        <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                          Seen
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perspiciatis, in.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl">
                        <div className="flex flex-row items-center">
                          <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <div className="flex flex-row items-center space-x-px ml-4">
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-12 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-6 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-5 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-3 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-1 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-1 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                            <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card flex flex-row items-center h-16 bg-base-100 w-full px-4">
              <div>
                <button className="btn btn-sm btn-ghost flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="input input-bordered input-secondary flex w-full pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button className="btn btn-accent btn-sm px-4 py-2 flex-shrink-0">
                  <span>Send</span>
                  <span className="ml-2 invisible md:visible">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import useSWR from "swr";
import { getOrderById } from "@/utils/profile/api";
import { userStore } from "@/zustand/store";
import toast from "react-hot-toast";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedDay = day + ordinalSuffix(day);
  const formattedTime = `${formatHour(hours)}:${pad(minutes)} ${ampm}`;

  return `${formattedDay} ${month} ${year} at ${formattedTime}`;
}

function ordinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th"; // for 4th to 20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatHour(hour: number) {
  return hour % 12 || 12; // convert to 12-hour format and handle midnight
}

function pad(number: number) {
  return number < 10 ? "0" + number : number;
}

const OrderDetails = () => {
  const { id } = useParams();
  const { authUser } = useAuth();
  const token = authUser?.authtoken;

  const { user } = userStore();
  const router = useRouter();
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  const fetchOrderById = async ([, _id, authToken]: any) => {
    return getOrderById(_id, authToken);
  };

  // Use SWR with the adjusted fetcher function
  const { data: order, error } = useSWR(
    token && id ? [`/order`, id, token] : null,
    fetchOrderById,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Check if the order status is one of the specified values
  const showShippingInfo =
    order &&
    ["In_Transit", "Out_for_delivery", "Delivered"].includes(order.status);

  const createdAt = formatDate(order?.createdAt);

  const totalProductPrice = order?.products.reduce(
    (acc: any, product: any) => acc + product.quantity * product.price,
    0
  );

  // Calculate discount
  const isCouponApplicable =
    order?.coupon && totalProductPrice >= order?.coupon.minAmountRequired;
  const discountAmount = isCouponApplicable ? order.coupon.amount : 0;

  // Calculate final total
  const finalTotal = totalProductPrice - discountAmount + order?.shippingCharge;

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto bg-base-100">
      <div className="flex flex-row justify-between">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-xl lg:text-4xl font-semibold leading-9 lg:leading-9">
            Order# {order?.orderId}
          </h1>
          <p className="text-sm lg:text-base font-medium leading-6">
            {createdAt}
          </p>
        </div>
        <div className="flex flex-col md:flex-row lg:gap-10 gap-5">
          {order?.status === "Delivered" && (
            <button className="btn btn-primary md:w-48 text-base">
              Return
            </button>
          )}

          {order?.status === "In_Transit" && (
            <button className="btn btn-accent md:w-48 text-base">Cancel</button>
          )}
        </div>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="card bg-base-100 card-bordered shadow-md flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5">
              Product Purchased
            </p>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <Image
                  src={order?.products[0].productId.image[0].url}
                  alt="image of product"
                  height={100}
                  width={100}
                  className="h-60 w-80 sm:w-72 sm:h-32 object-fill rounded-lg"
                />
              </div>
              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl xl:text-2xl font-semibold leading-6">
                    {order?.products[0].productId.title}
                  </h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-sm leading-none">
                      <span className="">Style: </span> Italic Minimal Design
                    </p>
                    <p className="text-sm leading-none">
                      <span className="">Size: </span>{" "}
                      {order?.products[0].productId.size}
                    </p>
                    <p className="text-sm leading-none">
                      <span className="">Color: </span>{" "}
                      {order?.products[0].productId.color}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base xl:text-lg leading-6">
                    &#8377;{order?.products[0].price}{" "}
                  </p>
                  <p className="text-base xl:text-lg leading-6">
                    {order?.products[0].quantity}
                  </p>
                  <p className="text-base xl:text-lg font-semibold leading-6">
                    &#8377;{totalProductPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="card card-bordered bg-base-100 shadow-md flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full space-y-6">
              <h3 className="text-xl font-semibold leading-5">Summary</h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base leading-4">Subtotal</p>
                  <p className="text-base leading-4">
                    &#8377;{totalProductPrice}
                  </p>
                </div>
                {isCouponApplicable && (
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4">
                      Discount{" "}
                      <span className="badge badge-accent p-2 text-md font-medium leading-3">
                        {order?.coupon.name}
                      </span>
                    </p>
                    <p className="text-base leading-4">
                      -&#8377;{discountAmount}
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4">Shipping</p>
                  <p className="text-base leading-4">
                    &#8377;{order?.shippingCharge}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4">Total</p>
                <p className="text-base font-semibold leading-4">
                  &#8377;{finalTotal}
                </p>
              </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Payment Method</h2>
                <div className="card-actions pt-5">
                  <button className="btn btn-primary btn-outline w-full">
                    {order?.paymentMethod}
                  </button>
                </div>
              </div>
            </div>
            <div className="card card-bordered bg-base-100 shadow-md flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full space-y-6">
              <h3 className="text-xl font-semibold leading-5">Shipping</h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-16 h-16">
                    <Image
                      src={"/order.svg"}
                      alt={"Image of orders"}
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 font-semibold">
                      Shiprocket Delivery
                      <br />
                      <span className="font-normal text-sm">
                        Tracking id: {order?.shipment_id}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {showShippingInfo ? (
                <div className="w-full flex justify-center items-center">
                  <button className="btn btn-primary btn-wide md:w-full text-base font-medium">
                    Track Order
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="card card-bordered bg-base-100 shadow-md w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl font-semibold leading-5">Customer</h3>
          <div className="flex flex-col gap-5 md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <Image src="/logo.svg" alt="avatar" width={40} height={40} />
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left">
                    {order?.shippingAddress.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="cursor-pointer text-sm leading-5 ">
                  {order?.shippingAddress.mobile}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex gap-5 justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    {order?.shippingAddress.addressLine}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    {order?.shippingAddress.street}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    City: {order?.shippingAddress.city}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    State: {order?.shippingAddress.state}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    Pincode: {order?.shippingAddress.pincode}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base font-semibold leading-4 text-center md:text-left">
                    Billing Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    {order?.shippingAddress.addressLine}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    {order?.shippingAddress.street}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    City: {order?.shippingAddress.city}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    State: {order?.shippingAddress.state}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">
                    Pincode: {order?.shippingAddress.pincode}
                  </p>
                </div>
              </div>
              {/* <div className="flex w-full justify-center items-center md:justify-start md:items-start">
              <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4">
                Edit Details
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

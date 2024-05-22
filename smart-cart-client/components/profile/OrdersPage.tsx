"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { userStore } from "@/zustand/store";
import { getOrders } from "@/utils/profile/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";

function formatDate(dateString: any) {
  const options: any = { year: "numeric", month: "long", day: "numeric" }; // Correct format options
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function OrderBox({ order }: any) {
  const formattedDate = formatDate(order?.createdAt);
  return (
    <li className="card card-bordered bg-base-100 shadow-md mt-6 px-4 py-5 duration-150 hover:border-white hover:bg-accent">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium flex gap-3">
            Order # <h1 className="text-primary">{order?.orderId}</h1>
          </span>
          <span className="text-sm font-medium">Date: {formattedDate}</span>
        </div>
        <span className="text-base font-semibold mt-1 flex gap-3">
          Status: <h1 className="text-primary">{order?.status}</h1>
        </span>
        <div className="card card-side bg-inherit">
          <figure>
            <Image
              src={order?.products[0].productId.image[0].url}
              alt="image of product"
              height={100}
              width={100}
              className="h-32 w-52 sm:w-[100px] sm:h-[100px] object-fill rounded-lg"
            />
          </figure>
          <div className="card-body">
            <p>{order?.products[0].productId.title}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-outline sm:btn-wide sm:btn-md btn-secondary">
                write a review
              </button>
            </div>
          </div>
        </div>
        <div className="text-lg flex items-center gap-6">
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 6V5C6 3.34315 7.34315 2 9 2H11C12.6569 2 14 3.34315 14 5V6H16C17.1046 6 18 6.89543 18 8V11.5708C15.5096 12.4947 12.8149 12.9999 10 12.9999C7.18514 12.9999 4.49037 12.4947 2 11.5707V8C2 6.89543 2.89543 6 4 6H6ZM8 5C8 4.44772 8.44772 4 9 4H11C11.5523 4 12 4.44772 12 5V6H8V5ZM9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z"
                fill="#9CA3AF"
              />
              <path
                d="M2 13.6923V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V13.6923C15.4872 14.5404 12.7964 14.9999 10 14.9999C7.20363 14.9999 4.51279 14.5404 2 13.6923Z"
                fill="#9CA3AF"
              />
            </svg>
            {order?.total}
          </span>
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                fill="#9CA3AF"
              />
            </svg>
            {order?.products[0].quantity}
          </span>
        </div>
      </div>
    </li>
  );
}

const Pagination = ({ currentPage, onChange }: any) => {
  return (
    <div className="flex justify-center md:justify-end mt-6">
      <div className="join grid grid-cols-2">
        <button
          className="join-item btn btn-outline"
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => onChange(currentPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

interface OrderType {
  _id: string;
  // ... other properties of an order ...
}

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { authUser } = useAuth();
  const { user } = userStore();
  const id = user?._id;
  const authToken = authUser?.authtoken;

  const router = useRouter();
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  const fetchOrders = async ([, id, currentPage, authToken]: any) => {
    return getOrders(id, currentPage, authToken);
  };

  const {
    data: order,
    error: orderError,
    isLoading,
  } = useSWR(
    authToken && id ? [`/order/orders`, id, currentPage, authToken] : null,
    fetchOrders,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    // Show loading spinner while data is being loaded
    return (
      <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
          <Image src={"/pacman.svg"} alt={"loading animation"} height={80} width={80}/>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8">
        <div className="max-w-md">
          <h1 className="text-2xl font-extrabold sm:text-3xl">Your Orders</h1>
        </div>
        <ul className=" divide-y space-y-3">
          {order?.map((data: any) => (
            <Link key={data._id} href={`/profile/order/${data._id}`}>
              <OrderBox order={data} />
            </Link>
          ))}
        </ul>
      </div>
      <div className="md:px-[275px]">
        <Pagination currentPage={currentPage} onChange={handlePageChange} />
      </div>
    </section>
  );
};

export default OrdersPage;

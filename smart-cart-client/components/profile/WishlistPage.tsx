"use client";

import React, { useEffect, useState } from "react";
import { userStore } from "@/zustand/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { getWishlist } from "@/utils/profile/api";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

function Card({ data }: any) {
  // Determine the price to display
  const displayPrice =
    data?.productId?.variation && data?.productId.variation.length > 0
      ? data?.productId.variation[0].price
      : data?.productId?.price;

  const displayMrpPrice =
    data?.productId?.variation && data?.productId.variation.length > 0
      ? data?.productId.variation[0].mrp
      : data?.productId?.mrp;

  // Calculate discount percentage
  const discountPercentage = displayMrpPrice
    ? Math.round(((displayMrpPrice - displayPrice) / displayMrpPrice) * 100)
    : 0;

  return (
    <div className="card card-bordered w-full bg-base-100 shadow-md relative">
      <button className="top-1 right-1 absolute p-1.5 bg-accent hover:shadow-2xl hover:border hover:border-neutral">
        <svg
          className="fil-current"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 1L13 13"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Link
        href={`/${data?.productId?.slug}?id=${
          data?.productId?._id
        }&keyword=${data?.productId?.keyword.join(",")}`}
      >
        <figure className="px-2 pt-2">
          <Image
            src={data?.productId.image[0].url}
            width={280}
            height={180}
            alt={data?.productId.title}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </figure>
        <div className="card-body">
          <h1 className="block overflow-hidden text-ellipsis whitespace-nowrap text-md md:text-lg">
            {data?.productId?.title}
          </h1>
          <div>
            <div className="badge badge-error font-bold badge-md">
              {discountPercentage}% OFF
            </div>
            <div className="pt-1 flex items-center">
              <h1 className="text-2xl font-bold">&#8377;{displayPrice}</h1>
              <h1 className="text-md line-through pl-1">
                &#8377;{displayMrpPrice}
              </h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
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

const WishlistPage = () => {
  const { user } = userStore();
  const { authUser } = useAuth();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  const id = user?._id;
  const authToken = authUser?.authtoken;

  const fetchWishlist = async ([, id, currentPage, authToken]: any) => {
    return getWishlist(id, currentPage, authToken);
  };

  const {
    data: wishlist,
    error: wishlistError,
    isLoading,
  } = useSWR(
    authToken && id ? [`/user/wishlist`, id, currentPage, authToken] : null,
    fetchWishlist,
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
    <section className="w-full bg-base-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-20 max-w-md text-start">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9">
            Favourites
          </h1>
        </div>

        <div className="w-full grid grid-cols-2 gap-5 lg:gap-5 mt-16 lg:grid-cols-4 sm:px-4 md:px-10">
          {wishlist?.map((product: any) => (
            <Card key={product?.productId._id} data={product} />
          ))}
        </div>
        <div className="md:px-20">
          <Pagination currentPage={currentPage} onChange={handlePageChange} />
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;

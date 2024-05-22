"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { userStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user } = userStore();
  const router = useRouter();
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="card bg-base-100 card-bordered shadow-lg flex flex-col justify-center w-full p-6 sm:px-12">
      <div className="avatar flex justify-center">
        <div className="w-32 rounded-full ring">
          <Image
            src={"/logo.svg"}
            alt={"Profile photo"}
            height={100}
            width={100}
            style={{
              objectFit: "contain",
              aspectRatio: "3 / 2",
              width: "100%",
              height: "100%",
            }}
            className="justify-center flex items-center"
          />
        </div>
      </div>
      <div className="space-y-4 text-center divide-y divide-gray-700">
        <div className="my-2 space-y-1 ">
          <h2 className="text-xl font-semibold sm:text-2xl">{user?.name}</h2>
          <p className="px-5 text-base text-primary border-t-2">Expert Buyer</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

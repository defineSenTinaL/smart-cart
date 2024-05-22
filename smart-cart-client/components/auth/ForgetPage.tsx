"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const ForgetPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {}
  };
  return (
    <main className="w-full py-52 px-10 flex flex-col items-center justify-center bg-base-200">
      <div className="w-full space-y-6 sm:max-w-md">
        <div className="text-center">
          <Image
            src="/logoName.svg"
            width={200}
            height={100}
            alt="logo"
            className="mx-auto"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-lg font-bold sm:text-3xl">
              Reset your password
            </h3>
            <p className="">
              Enter your email and we&lsquo;ll send you a link to reset your
              password.
            </p>
          </div>
        </div>
        <div className="card card-bordered bg-base-100 shadow p-4 py-6 space-y-8 sm:p-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="input input-bordered input-secondary w-full mt-2 px-3 py-2 bg-transparent outline-none shadow-sm"
                onChange={(e: any) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                value={data.email}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium btn btn-primary duration-150"
            >
              Reset your password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgetPage;

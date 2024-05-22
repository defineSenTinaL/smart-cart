"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { userStore } from "@/zustand/store";

const RegisterPage = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const { setUser } = userStore();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegistration = async (e: any) => {
    e.preventDefault();

    try {
      const user = await signup(data.name, data.email, data.password);
      router.push("/");
    } catch (err) {
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
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
            <h3 className="text-gray-800 text-2xl font-bold">
              Create an account
            </h3>
            <p className="">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium link link-secondary hover:link-accent link-hover"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleRegistration} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="input input-bordered input-accent w-full mt-2 px-3 py-2 bg-transparent outline-none shadow-sm"
                onChange={(e: any) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
                value={data.name}
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="input input-bordered input-primary w-full mt-2 px-3 py-2 bg-transparent outline-none shadow-sm"
                onChange={(e: any) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                value={data.email}
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="input input-bordered input-secondary w-full mt-2 px-3 py-2 bg-transparent outline-none shadow-sm"
                onChange={(e: any) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                value={data.password}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium btn btn-primary duration-150"
            >
              Create account
            </button>
          </form>
          {/* <div className="mt-5">
            <button className="btn btn-outline btn-accent w-full flex items-center justify-center gap-x-3 py-2.5 text-sm font-medium">
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;

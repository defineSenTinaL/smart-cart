"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const LoginPage = () => {
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
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
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
              Log in to your account
            </h3>
            <p className="">
              Dont have an account?{" "}
              <Link
                href="/register"
                className="font-medium link link-secondary hover:link-accent link-hover"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white font-semibold px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>
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
            <div>
              <label className="font-medium">Password</label>
              <div className="relative">
                <input
                  type={passwordShown ? "text" : "password"}
                  required
                  className="input input-bordered input-secondary w-full mt-2 px-3 py-2 bg-transparent outline-none shadow-sm"
                  onChange={(e) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                  value={data.password}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                >
                  <svg
                    className="w-6 h-6 pt-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium btn btn-primary duration-150"
            >
              Sign in
            </button>
          </form>
        </div>
        <div className="text-center">
          <Link
            href="/forget"
            className="link link-secondary hover:link-accent link-hover"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

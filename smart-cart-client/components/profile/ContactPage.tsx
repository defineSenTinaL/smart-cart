"use client";

import { useAuth } from "@/context/AuthProvider";
import { createContact } from "@/utils/profile/api";
import { userStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const { user } = userStore();
  const { authUser } = useAuth();
  const token = authUser?.authtoken;
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  const handleContact = async (e: any) => {
    e.preventDefault();
    const data = {
      userId: user?._id,
      mobile,
    };
    try {
      const res = await createContact(data, token);
      toast.success("Contact submitted successfully!");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Error contact submitting!");
    }
  };
  return (
    <div className="relative flex items-top justify-center sm:items-center sm:pt-0 bg-base-100 py-32">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-16 overflow-hidden">
          <div className="card card-bordered shadow-md grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 mr-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Get in touch
              </h1>
              <p className="text-normal text-lg sm:text-2xl font-medium mt-2">
                Fill in the form to start a conversation
              </p>
            </div>
            <form className="p-6 flex flex-col justify-center">
              <div className="flex flex-col mt-2">
                <label htmlFor="tel" className="text-lg font-semibold">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="Mobile Number"
                  className="input input-bordered input-secondary w-100 mt-2 py-3 px-3  font-semibold"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className=" btn btn-outline btn-primary md:w-32 font-bold py-3 px-6 mt-3 transition ease-in-out duration-300"
                onClick={handleContact}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthProvider";
import { requestCancellation } from "@/utils/profile/api";

const CancelPage = () => {
  const options = [
    {
      id: "1",
      reason: "Found a Better Price Elsewhere",
      description: "Before the item has shipped, the customer found the same product at a lower price on a different platform.",
    },
    {
      id: "2",
      reason: "Change in Requirement",
      description: "The customer's need for the product has changed.",
    },
    {
      id: "3",
      reason: "Order Created by Mistake",
      description:
        "The order was placed unintentionally.",
    },
    {
      id: "4",
      reason: "Longer Delivery Times than Expected",
      description:
        "The estimated delivery time is longer than the customer is willing to wait.",
    },
    {
      id: "5",
      reason: "Changed My Mind",
      description:
        "The customer has reconsidered their decision to purchase the product.",
    },
    {
      id: "6",
      reason: "Payment Issues",
      description: "There were problems or second thoughts regarding the payment method used.",
    },
    {
      id: "7",
      reason: "Duplicate Order",
      description:
        "The same order was placed more than once by mistake.",
    },
  ];

  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuth();
  const token = authUser?.authtoken;

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedReason) {
      toast.error("Please select an reason");
      return;
    }

    if (!id) {
      toast.error("Please retry the cancel process form start");
      return;
    }

    setIsLoading(true);

    const formData = {
      cancellationReason: selectedReason,
      cancellationComment: comments,
    };

    try {
      const res = await requestCancellation(id, formData, token);
      toast.success(`${res.message}`);
    } catch (error) {
      console.log(error);
      toast.error("Error requesting cancellation!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Show loading spinner while data is being loaded
    return (
      <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
        <Image
          src={"/pacman.svg"}
          alt={"loading animation"}
          height={80}
          width={80}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center bg-base-100 py-5 px-5 lg:px-20 sm:py-5">
      <div className="card card-bordered p-4 sm:p-6 md:p-8 shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Cancel Order</h2>
        <h4 className="text-xl font-bold my-4 text-center">
          Select your cancellation options and click submit
        </h4>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 space-y-0.5">
            <label className="text-lg font-medium">Reason for Cancel</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {options.map((item, idx) => (
                <label
                  key={idx}
                  htmlFor={item.id}
                  className="block relative mt-3"
                >
                  <input
                    id={item.id}
                    type="radio"
                    name="reason"
                    value={item.reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="sr-only peer"
                  />
                  <div className="card card-side card-bordered w-full flex gap-x-3 items-start p-4 cursor-pointer bg-base-100 shadow-sm ring-primary peer-checked:ring-4 duration-200">
                    <div className="pl-7 flex gap-x-3 py-auto">
                      <div>
                        <h3 className="leading-none font-medium">
                          {item.reason}
                        </h3>
                        {/* <p className="mt-1 text-sm">{item.description}</p> */}
                      </div>
                    </div>
                  </div>
                  <span className="block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-secondary w-4 h-4 rounded-full"></span>
                </label>
              ))}
            </div>
            <div className="lg:px-52">
              <textarea
                className="textarea textarea-secondary w-full"
                placeholder="Any comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
              <button type="submit" className="btn btn-primary w-full mt-5">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelPage;

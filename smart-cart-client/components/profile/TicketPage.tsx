"use client";

import { useAuth } from "@/context/AuthProvider";
import { createTicket } from "@/utils/profile/api";
import { userStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Success from "../animation/Success";
import Error from "../animation/Error";

const TicketPage = () => {
  const [issue, setIssue] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const { user } = userStore();
  const { authUser } = useAuth();
  const token = authUser?.authtoken;
  const router = useRouter();
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true); // Begin submission attempt

    const ticketData = {
      userId: user._id,
      issue: issue,
      subject: subject,
      chat: {
        message: message,
        sender: "User",
      },
    };

    try {
      const res = await createTicket(ticketData, token);
      toast.success(`${res?.message}`);
      setSubmissionSuccess(true); // Mark submission as successful
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.log(error);
      toast.error("Error submitting ticket!");
      setIsSubmitting(false); // Reset submission status
      setTimeout(() => setSubmissionSuccess(false), 3000);
    }
  };

  if (isSubmitting && submissionSuccess) {
    return (
      <div className="flex h-96 w-96 items-center justify-center mx-auto">
        <Success />
      </div>
    );
  }

  if (isSubmitting && !submissionSuccess) {
    return (
      <div className="flex h-96 w-96 items-center justify-center mx-auto">
      <Error />
    </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center p-12 bg-base-100">
      <h1 className="mb-10 text-4xl"> Raise a Ticket</h1>
      <div className="w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-5 w-full">
            <label className="label mb-3 block text-base font-medium">
              Please Select the issue
            </label>
            <select
              className="select select-bordered w-full"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            >
              <option value="" disabled>
                Pick one
              </option>
              <option value="Order">Order</option>
              <option value="Delivery">Delivery</option>
              <option value="Product">Product</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="subject"
              className="mb-3 block text-base font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter your subject"
              className="input input-bordered input-primary w-full py-3 px-6 text-base font-medium"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base font-medium"
            >
              Message
            </label>
            <textarea
              rows={4}
              name="message"
              id="message"
              placeholder="Type your message"
              className="textarea textarea-bordered textarea-secondary textarea-lg w-full resize-none py-3 px-6 text-base font-medium"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline btn-accent py-3 px-8 text-base font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketPage;

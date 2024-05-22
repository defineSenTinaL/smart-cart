"use client";

import { useAuth } from "@/context/AuthProvider";
import { writeReview } from "@/utils/product/api";
import { userStore } from "@/zustand/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const ReviewPage = () => {
  const { title } = useParams();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuth();
  const { user } = userStore();
  const token = authUser?.authtoken;

    // Redirect to home if no user or user email is empty
    useEffect(() => {
      if (!user || !user.email) {
        toast("Please log in to write a review.", { icon: "🔒" });
        router.push('/');
      }
    }, [user, router]);

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  let decodedTitle = "";

  // Check if title is a string and decode it, otherwise handle as an array
  if (typeof title === "string") {
    decodedTitle = decodeURIComponent(title);
  } else if (Array.isArray(title) && title.length > 0) {
    // Example: take the first element if it's an array
    decodedTitle = decodeURIComponent(title[0]);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select star to rate");
      return;
    }

    setIsLoading(true);

    const reviewData = {
      userId: user?._id, // Assuming you have the user's ID
      productId: id, // Replace with actual product ID
      rating,
      reviewText,
      reviewTitle,
    };
    try {
      const res = await writeReview(reviewData, token);
      console.log(res); // or handle the response appropriately
      toast.success("Review submitted successfully");
      router.push("/");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Show loading spinner while data is being loaded
    return (
      <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="py-10 px-5 flex justify-center bg-base-100 ">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
        <hr className="my-2 border-gray-200" />
        <div>
          <h3 className="font-semibold my-2">You&apos;re Reviewing:</h3>
          <h4 className="font-medium text-lg mb-4">{decodedTitle}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="rating"
              >
                Your Rating <span className="text-red-500">*</span>
                <div className="rating flex mt-3">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value="1"
                    onChange={() => setRating(1)}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value="2"
                    onChange={() => setRating(2)}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value="3"
                    onChange={() => setRating(3)}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value="4"
                    onChange={() => setRating(4)}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value="5"
                    onChange={() => setRating(5)}
                  />
                </div>
              </label>
              <div className="flex items-center"></div>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="summary"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Type here title"
                className="input input-bordered input-primary w-full lg:max-w-md"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="review"
              >
                Review
              </label>
              <textarea
                className="textarea w-full textarea-lg textarea-secondary lg:max-w-md"
                placeholder="write a review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            <button className="btn btn-accent w-full lg:max-w-fit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

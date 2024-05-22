"use client";

import { fetchProductRating } from "@/utils/product/api";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { userStore } from "@/zustand/store";
import toast from "react-hot-toast";

interface ProductProps {
  product: any;
}

interface RatingSummary {
  [key: string]: number; // Maps star ratings ("1", "2", "3", etc.) to counts
}

interface RatingPercentages {
  [key: string]: number; // Maps star ratings to percentages
}

const renderRatingBars = (
  ratingSummary: RatingSummary,
  ratingPercentages: RatingPercentages
) => {
  if (!ratingSummary) {
    return; // Return empty object if ratingSummary is undefined
  }
  return Object?.entries(ratingSummary).map(([stars, count]) => (
    <span key={stars} className="flex w-full items-center gap-2">
      {stars}
      <progress
        max="100"
        value={ratingPercentages[stars]}
        className="progress progress-primary"
      >
        {ratingPercentages[stars]}%
      </progress>
      <span className="w-9 text-xs font-bold">{count}</span>
    </span>
  ));
};

const Review: React.FC<ProductProps> = ({ product }) => {
  const router = useRouter();
  const { user } = userStore();

  const fetchRating = async ([_id]: any) => {
    return fetchProductRating(_id);
  };

  // Use SWR with the adjusted fetcher function
  const { data: rating, error } = useSWR(
    product._id ? [product._id] : null,
    fetchRating,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const calculateRatingPercentages = (
    ratingSummary: RatingSummary
  ): RatingPercentages => {
    if (!ratingSummary) {
      return {}; // Return empty object if ratingSummary is undefined
    }

    const totalRatings = Object?.values(ratingSummary).reduce(
      (total, count) => total + count,
      0
    );

    const ratingPercentages: RatingPercentages = {};
    for (const [stars, count] of Object.entries(ratingSummary)) {
      ratingPercentages[stars] =
        totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
    }
    return ratingPercentages;
  };

  const ratingPercentages = calculateRatingPercentages(rating?.ratingSummary);

  const topReviews = rating?.topReviews;

  const hasReviews = topReviews && topReviews.length > 0;
  const hasRatings =
    rating?.ratingSummary &&
    Object.values(rating.ratingSummary as RatingSummary).some(
      (count) => count > 0
    );

  const handleReview = () => {
    if (!user || !user.email) {
      toast.error("Please login to write a review.");
      return;
    }
    router.push(`/review/${product.title}?id=${product._id}`);
  };

  return (
    <>
      {hasReviews || hasRatings ? (
        <div className="flex flex-col lg:flex-row md:px-8 md:mx-16 gap-[50px] lg:gap-[100px] my-16 px-5 pb-10">
          {hasRatings && (
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-md mx-auto">
              {/*        <!-- Component: Detailed Basic --> */}
              <div className="flex flex-col items-start gap-2">
                {/*          <!-- Title --> */}
                <span className="font-bold">Customer reviews</span>
                {/*          <!-- Rating --> */}
                <span className="flex items-center gap-4 rounded text-sm">
                  <span
                    className="flex gap-1 text-amber-400"
                    role="img"
                    aria-label="Rating: 4 out of 5 stars"
                  >
                    <div className="rating rating-md flex gap-3">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <input
                          key={value}
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-primary"
                          checked={product.review === value}
                          readOnly
                        />
                      ))}
                    </div>
                  </span>
                  <span>{product?.review.toFixed(1)} out 5</span>
                </span>
                {/*          <!-- Helper text --> */}
                <span className="text-xs leading-6">
                  based on {product?.totalRatingsCount} user ratings
                </span>
                {/*          <!-- Detailed rating --> */}
                <span className="flex w-full flex-col gap-4 pt-6">
                  {renderRatingBars(rating?.ratingSummary, ratingPercentages)}
                </span>
              </div>
              <button className="btn btn-accent mt-6" onClick={handleReview}>
                Write review
              </button>
            </div>
          )}
          <div className="md:border-l md:pl-5 flex-[1] py-3">
            {/*        <!-- Component: List Rating Detailed --> */}
            <div className="flex w-full flex-col divide-y divide-slate-200">
              {/*          <!-- Category rating --> */}
              {hasReviews &&
                topReviews?.map((review: any, index: any) => (
                  <div key={index} className="flex flex-col gap-2 py-4">
                    <div className="flex w-full flex-1 gap-4 text-base font-medium">
                      <div className="avatar">
                        <div className="w-10 rounded-full ring">
                          <Image
                            src={"/logo.svg"}
                            alt={"avator logo"}
                            height={25}
                            width={25}
                          />
                        </div>
                      </div>
                      <span className="w-0 pt-1 flex-1 truncate">
                        Aditya kumavat
                      </span>
                      <span className="flex shrink-0 items-center gap-4 rounded text-sm">
                        <div className="rating rating-sm flex gap-3">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <input
                              key={value}
                              type="radio"
                              name={`rating-${index}`}
                              className="mask mask-star-2 bg-primary"
                              checked={review.rating === value}
                              readOnly
                            />
                          ))}
                        </div>
                      </span>
                    </div>
                    <span className="text-md font-medium truncate">
                      {review.reviewTitle}
                    </span>
                    <p className="text-sm">{review.reviewText}</p>
                  </div>
                ))}
            </div>
            {/*        <!-- End List Rating Detailed --> */}
          </div>
        </div>
      ) : (
        <div className="flex py-5 gap-5 flex-col items-center justify-center bg-base-100">
          <div className="rating rating-lg">
            <input type="radio" name="rating-9" className="rating-hidden" />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
          </div>
          <span className="text-2xl font-semibold">No reviews at this moment</span>
          <p className="mt-2">Be the first to review</p>

          <button className="btn btn-accent mt-2" onClick={handleReview}>
            Write review
          </button>
        </div>
      )}
    </>
  );
};

export default Review;

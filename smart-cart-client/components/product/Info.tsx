"use client";

import React from "react";
import Variation from "./Variation";
import { cartStore, userStore } from "@/zustand/store";
import { ProductProps } from "./types";
import { addToCartDB } from "@/utils/cart/api";
import { useAuth } from "@/context/AuthProvider";
import toast from "react-hot-toast";
import { addToWishlist, getCoupons } from "@/utils/product/api";
import ProductServices from "./ProductServices";
import Offer from "./Offer";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const Info: React.FC<ProductProps> = ({ product }) => {
  const { addToCart, setBuyNowItem } = cartStore();
  const { authUser } = useAuth();
  const token = authUser?.authtoken;
  const { user } = userStore();
  const router = useRouter();

  const fetchCoupons = async () => {
    return getCoupons();
  };

  // Use SWR with the adjusted fetcher function
  const { data: coupon, error } = useSWR([`/coupon`], fetchCoupons, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });


  const addProductToCart = (e: any) => {
    e.preventDefault();
    // Assuming you have a 'product' object to add to the cart
    const productToAdd = {
      // Fill in the product details here
      _id: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      brand: product.brand,
      size: product?.size,
      color: product?.color,
      quantity: 1,
      // Include any other necessary product fields
    };

    // Check if the user is logged in
    if (!user?.email) {
      // User is not logged in, save the product to local storage or Zustand store instead
      addToCart(productToAdd);
      toast.success("Product added to cart!");
      return; // Exit the function to prevent further execution
    }

    const productToAddToDB = {
      // Fill in the product details here
      productId: product._id,
      quantity: 1,
    };

    addToCart(productToAdd);

    toast.success("Product added to cart!");

    addToCartDB(user._id, productToAddToDB, token);
  };

  const handleAddToWishlist = (e: any) => {
    e.preventDefault();

    // Check if the user is logged in by checking for an email
    if (!user?.email) {
      // User is not logged in, display a notification or handle accordingly
      toast.error("Please log in to add products to your wishlist.");
      return; // Exit the function to prevent further execution
    }

    // Add to wishlist logic here (adjust according to your application's logic)
    addToWishlist(user?._id, product?._id, token);

    // Optionally, provide feedback to the user
    toast.success("Product added to wishlist!");
  };

  // Example function to handle the Buy Now button click
  const handleBuyNow = (e: any) => {
    e.preventDefault();

    const productToAdd = {
      // Fill in the product details here
      _id: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      brand: product.brand,
      size: product?.size,
      color: product?.color,
      quantity: 1,
      // Include any other necessary product fields
    };
    setBuyNowItem(productToAdd); // Set the product as the Buy Now item
    router.push("/checkout?buyNow=true"); // Redirect to the checkout page
  };

  const returnTime = product?.return;

  // Determine the price to display
  const displayPrice =
    product?.variation && product.variation.length > 0
      ? product.variation[0].price
      : product?.price;

  const displayMrpPrice =
    product?.variation && product.variation.length > 0
      ? product.variation[0].mrp
      : product?.mrp;

  // Calculate discount percentage
  const discountPercentage = displayMrpPrice
    ? Math.round(((displayMrpPrice - displayPrice) / displayMrpPrice) * 100)
    : 0;

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <span className="sr-only">Product information</span>
      {/* <!-- Reviews --> */}
      {product?.review > 0 ? (
        <div className="mt-6">
          <span className="sr-only">Reviews</span>
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="rating flex gap-3">
                <span className="text-2xl">{product?.review.toFixed(1)}</span>
                <div>
                  {[1, 2, 3, 4, 5].map((value, index) => (
                    <input
                      key={value}
                      type="radio"
                      name={`rating-${index}`}
                      className="mask mask-star-2 bg-neutral"
                      checked={product.review === value}
                      readOnly
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="sr-only">{product?.review} out of 5 stars</p>
            <a
              href="#"
              className="ml-3 text-sm font-medium text-info hover:text-secondary"
            >
              {product?.totalRatingsCount} reviews
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
      {product?.variation.length > 0 ? (
        // Render variant component, which presumably includes its own "Add to Cart" button
        <Variation product={product} />
      ) : (
        // Render non-variant information and "Add to Cart" button
        <>
          <div>
            <div className="pt-5 flex items-center gap-2">
              <span className="text-4xl tracking-tight font-bold">
                &#8377;{displayPrice}
              </span>
              <span className="text-md line-through pl-1">
                &#8377;{displayMrpPrice}
              </span>
              <div className="badge badge-error font-bold badge-md">
                {discountPercentage}% OFF
              </div>
            </div>
          </div>
          {/* <p className="text-3xl tracking-tight pt-10">Rs. {product?.price}</p> */}
          <Offer data={coupon} />
          <button
            type="submit"
            className="btn btn-primary mt-10 flex w-full items-center justify-center px-8 py-3 text-base font-medium"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <button
            type="submit"
            className="btn btn-secondary mt-5 flex w-full items-center justify-center px-8 py-3 text-base font-medium"
            onClick={addProductToCart}
          >
            Add to Cart
          </button>
          <ProductServices data={returnTime} />
          <button
            type="submit"
            className="btn btn-outline btn-accent mt-5 flex w-full items-center justify-center px-8 py-3 text-base font-medium"
            onClick={handleAddToWishlist}
          >
            Add to Wishlist
          </button>
        </>
      )}
    </div>
  );
};

export default Info;

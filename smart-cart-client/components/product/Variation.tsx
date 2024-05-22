"use client";

import React, { useState, useEffect } from "react";
import { ProductProps } from "./types";
import { cartStore, userStore } from "@/zustand/store";
import { useAuth } from "@/context/AuthProvider";
import { addToCartDB } from "@/utils/cart/api";
import toast from "react-hot-toast";

// Define a mapping from color names to CSS classes or color values
const colorMap: { [key: string]: string } = {
  // Assume you have a custom CSS class for maroon
  chrome: "bg-gray-400 ring-gray-200",
  "Rose Gold": "bg-rose-800 ring-pink-600",
  "Black Matt": "bg-black ring-gray-800",
  Gold: "bg-yellow-300 ring-yellow-200",
  // Add more mappings as needed
};

const Variation: React.FC<ProductProps> = ({ product }) => {
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState(
    product.variation[0]?.size || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.variation[0]?.color || ""
  );
  const { addToCart } = cartStore();
  const { authUser } = useAuth();
  const { user } = userStore();

  useEffect(() => {
    // Extracting unique colors
    const colors = product.variation.map((v) => v.color);
    const unique = Array.from(new Set(colors));
    setUniqueColors(unique);

    // Extracting unique sizes
    const sizes = product.variation.map((v) => v.size);
    const uniqueSizeSet = new Set(sizes);
    setUniqueSizes(Array.from(uniqueSizeSet));
  }, [product.variation]);

  const handleSizeChange = (size: any) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
  };

  // Find the selected variation based on the user's choices
  const selectedVariation = product.variation.find(
    (variation) =>
      variation.size === selectedSize && variation.color === selectedColor
  );

  // Check if a matching variation was found
  if (!selectedVariation) {
    // Handle the case where no variation is found
    // For example, you could alert the user or log an error
    alert("No matching variation found. Please select another size or color.");
    return;
  }

  const addProductToCart = (e: any) => {
    e.preventDefault();

    // Assuming you have a 'product' object to add to the cart
    const productToAdd = {
      // Fill in the product details here
      _id: product._id,
      title: product.title,
      image: product.image,
      price: selectedVariation?.price,
      brand: product.brand,
      size: selectedVariation?.size,
      color: selectedVariation?.color,
      variationId: selectedVariation?._id,
      quantity: 1,
      // Include any other necessary product fields
    };

    const productToAddToDB = {
      // Fill in the product details here
      productId: product._id,
      variationId: selectedVariation._id,
      quantity: 1,
    };

    addToCart(productToAdd);

    toast.success("Product added to cart!");

    addToCartDB(user._id, productToAddToDB, authUser?.authtoken)

    // Call the addToCart action from the cartStore
  };

  const addToWishlist = (e: any) => {
    e.preventDefault();

    console.log(product._id);
  };

  return (
    <form className="mt-10">
      {/* Colors */}
      <div>
        {/* Display the price for the selected variation */}
        {selectedVariation && (
          <p className="text-3xl tracking-tight">
            Rs. {selectedVariation.price}
          </p>
        )}
        <h3 className="text-md font-normal pt-10 flex gap-2">
          Color: <h3 className="text-md font-medium">{selectedColor}</h3>
        </h3>
        <fieldset className="mt-4">
          <legend className="sr-only">Choose a color</legend>
          <ul className="mt-4 flex items-center flex-wrap gap-4">
            {uniqueColors.map((color, idx) => (
              <li key={idx} className="flex-none">
                <label
                  htmlFor={`color-${color}`}
                  className="block relative w-8 h-8"
                >
                  <input
                    id={`color-${color}`}
                    type="radio"
                    defaultChecked={idx === 0}
                    name="color-choice"
                    value={color}
                    className="sr-only peer"
                    onChange={() => handleColorChange(color)}
                    required
                  />
                  <span
                    className={`inline-flex justify-center items-center w-full h-full rounded-full peer-checked:ring ring-offset-2 cursor-pointer duration-150 ${
                      colorMap[color] || "bg-gray-200 ring-gray-100"
                    }`}
                  ></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-white absolute inset-0 m-auto z-0 pointer-events-none hidden peer-checked:block duration-150"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-md font-normal pt-10 flex gap-2">
          Size: <h3 className="text-md font-medium">{selectedSize}</h3>
        </h3>
        <fieldset className="mt-4">
          <legend className="sr-only">Choose a size</legend>
          <ul className="mt-4 gap-10 grid grid-cols-2">
            {uniqueSizes.map((size, idx) => (
              <li key={idx}>
                <label htmlFor={`size-${size}`} className="block relative">
                  <input
                    id={`size-${size}`}
                    type="radio"
                    defaultChecked={idx === 0}
                    name="size-choice"
                    value={size}
                    className="sr-only peer"
                    onChange={() => handleSizeChange(size)}
                  />
                  <div className="w-full flex gap-x-3 items-start p-4 cursor-pointer rounded-lg border bg-base-100 shadow-sm ring-accent peer-checked:ring-2 duration-200">
                    {/* Place for size icon if any */}
                    <div>
                      <h3 className="leading-none text-gray-800 font-medium pr-3">
                        {size}
                      </h3>
                      {/* Additional description can go here */}
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-10 flex w-full items-center justify-center px-8 py-3 text-base font-medium"
        onClick={addProductToCart}
      >
        Add to Cart
      </button>
      <button
        type="submit"
        className="btn btn-accent mt-5 flex w-full items-center justify-center px-8 py-3 text-base font-medium"
        onClick={addToWishlist}
      >
        Add to Wishlist
      </button>
    </form>
  );
};

export default Variation;

"use client";
import { cartStore, userStore } from "@/zustand/store";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { removeFromCartDB } from "@/utils/cart/api";
import toast from "react-hot-toast";

const DesktopCard: React.FC<any> = ({ product, quantity }) => {
  // Calculate the total price for the current item based on its quantity
  const totalPrice = product.productId.price * product.productId.quantity;

  return (
    <div className="card bg-base-100">
      <div className="flex items-center hover:bg-base-200 -mx-8 px-6 py-5 w-full">
        <div className="flex w-72">
          {/* product */}
          <div className="w-80">
            <Image
              src={product?.productId.image[0].url}
              width={90}
              height={96}
              alt="Picture of the product"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <span className="font-bold text-sm">{product?.productId.title}</span>
            <p className="text-base font-semibold mb-1">
              <span className="text-secondary text-sm">Brand: </span>
              <span className="text-primary text-sm">{product?.productId.brand}</span>
            </p>
            {product?.productId.size && (
            <p className="text-base font-semibold mb-1">
            <span className="text-secondary text-sm">Size: </span>
            <span className="text-primary text-sm">{product?.productId.size}</span>
          </p>
            )}
            {product?.color && (
            <p className="text-base font-semibold mb-1">
            <span className="text-secondary text-sm">Color: </span>
            <span className="text-primary text-sm">{product?.productId.color}</span>
          </p>
            )}
            <p
              className="link hover:link-accent link-hover text-sm"
            >
              Remove
            </p>
          </div>
        </div>
        <div className="flex gap-[90px]">
          <span className="text-center font-semibold text-sm pl-[80px]">
            &#8377;{product?.productId.price}
          </span>
          <span className="text-center font-semibold text-sm">
            &#8377;{totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesktopCard;

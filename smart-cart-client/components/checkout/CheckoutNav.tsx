"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const CheckoutNav = () => {
  return (
    <div className="navbar flex flex-col lg:flex-row bg-base-100 lg:h-10">
      <div>
        <Link href={"/"} className="btn">
          <Image src="/logoName.svg" alt="Logo" height={120} width={120} />
        </Link>
      </div>
      <div className="pt-3 lg:pl-96">
        <button className="btn btn-ghost text-3xl">Checkout</button>
      </div>
    </div>
  );
};

export default CheckoutNav;

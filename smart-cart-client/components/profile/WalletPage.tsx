import Link from "next/link";
import React from "react";
import Reward from "../animation/Reward";

const WalletPage = () => {
  return (
    <div className="card card-bordered shadow-lg bg-base-100 p-3">
      <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
        <span className="text-green-500">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
            <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
          </svg>
        </span>
        <span>Wallet Information</span>
      </div>
      <div className="flex justify-center p-3">
        <Reward />
      </div>
      <Link href={"/profile/reward"} className="pt-1 flex justify-center">
      <button className="btn btn-primary btn-outline btn-sm">
        View rewards
      </button>
      </Link>
    </div>
  );
};

export default WalletPage;

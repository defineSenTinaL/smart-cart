"use client";

import { useAuth } from "@/context/AuthProvider";
import { userStore } from "@/zustand/store";
import React, { useEffect } from "react";
import Image from "next/image";
import { getReward, getRewardHistory } from "@/utils/profile/api";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Transaction {
  _id: string;
  userId: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const formattedDate = formatDate(transaction?.createdAt);
  const formattedAmount = `₹${transaction?.amount.toFixed(2)}`;
  const typeClass =
    transaction?.type === "credit" ? "text-green-500" : "text-red-500";

  return (
    <tr
      key={transaction?._id}
      className="border-b transition-colors hover:bg-muted/50"
    >
      <td className="p-4 align-middle">{formattedDate}</td>
      <td className="p-4 align-middle">{transaction?.description}</td>
      <td className={`p-4 align-middle ${typeClass}`}>
        {transaction?.type.charAt(0).toUpperCase() + transaction?.type.slice(1)}
      </td>
      <td className={`p-4 align-middle text-right ${typeClass}`}>
        {formattedAmount}
      </td>
    </tr>
  );
}

const RewardPage = () => {
  const { authUser } = useAuth();
  const { user } = userStore();
  const authToken = authUser?.authtoken;
  const router = useRouter();
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  const id = user?._id;
  const page = 1;

  const fetchReward = async ([, id, authToken]: any) => {
    return getReward(id, authToken);
  };

  const fetchRewardHistory = async ([, id, page, authToken]: any) => {
    return getRewardHistory(id, page, authToken);
  };

  const { data: reward, error: rewardError } = useSWR(
    authToken && id ? [`/reward`, id, authToken] : null,
    fetchReward,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: rewardHistory, error: rewardHistoryError } = useSWR(
    authToken && id ? [`/reward/history`, id, page, authToken] : null,
    fetchRewardHistory,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div className="flex flex-col w-full overflow-hidden bg-base-100 pb-28">
      <header className="flex h-16 items-center border-b px-10 bg-base-100 shadow-md">
        <a className="flex items-center gap-2 font-semibold" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect width={20} height={5} x={2} y={7} />
            <line x1={12} x2={12} y1={22} y2={7} />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
          <span className="text-xl">Rewards Center</span>
        </a>
      </header>
      <main className="flex-1 overflow-auto py-4 md:py-10 px-4 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card card-bordered h-72 shadow-xl overflow-hidden">
            <div className="flex flex-col space-y-1.5 bg-secondary p-4">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                User Information
              </h3>
            </div>
            <div className="grid gap-2 p-5">
              <div className="flex items-center gap-5">
                <div className="avatar flex justify-center">
                  <div className="w-14 rounded-full ring">
                    <Image
                      src={"/logo.svg"}
                      alt={"Profile photo"}
                      height={64}
                      width={64}
                      style={{
                        objectFit: "contain",
                        aspectRatio: "3 / 2",
                        width: "100%",
                        height: "100%",
                      }}
                      className="justify-center flex items-center"
                    />
                  </div>
                </div>
                <div className="grid gap-0.5 text-sm">
                  <div className="font-semibold">{user?.name}</div>
                  <div className="">{user?.email}</div>
                </div>
              </div>
              <div className="grid gap-1 pt-3">
                <div className="text-sm font-medium">Balance</div>
                <div className="text-lg font-bold text-green-500">
                  &#8377;{reward?.currentBalance}
                </div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium">Total Rewards Earned</div>
                <div className="text-lg font-bold text-green-500">
                  &#8377;{reward?.totalEarnings}
                </div>
              </div>
            </div>
          </div>
          <div className="card card-bordered md:col-span-2 shadow-lg overflow-hidden">
            <div className="flex flex-col space-y-1.5 bg-secondary p-4">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                Transaction History
              </h3>
            </div>
            <div className="p-4">
              <div className="relative w-full overflow-auto">
                <table className="w-full table caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Description
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Type
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {rewardHistory?.map((transaction: Transaction) => (
                      <TransactionRow
                        key={transaction._id}
                        transaction={transaction}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RewardPage;

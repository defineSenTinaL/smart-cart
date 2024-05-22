import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import logger from "@/libs/logger";
import ProfilePage from "@/components/profile/ProfilePage";
import WalletPage from "@/components/profile/WalletPage";

const Profile = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Profile page`);
  return (
    <div className="bg-base-100 py-10">
      <div className="container mx-auto p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* Left Side */}
          <div className="w-full md:w-3/12 mx-auto">
            {/* Profile Card */}
            <ProfilePage />
            {/* End of profile card */}
            <div className="my-4" />
            {/* wallet card */}
            <WalletPage />
            {/* End of wallet card */}
          </div>
          {/* Right Side */}
          <div className="w-full px-5 pt-10 md:w-9/12 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Link href={"/profile/order"}>
                <div className="card card-bordered shadow-md bg-base-100 w-full hover:bg-secondary">
                  <div className="card-body">
                    <h2 className="card-title">Your Orders</h2>
                  </div>
                </div>
              </Link>
              <Link href={"/profile/setting"}>
                <div className="card card-bordered shadow-md bg-base-100 w-full hover:bg-secondary">
                  <div className="card-body">
                    <h2 className="card-title">Login & Security</h2>
                  </div>
                </div>
              </Link>
              <Link href={"/profile/address"}>
                <div className="card card-bordered shadow-md bg-base-100 w-full hover:bg-secondary ">
                  <div className="card-body">
                    <h2 className="card-title">Your Address</h2>
                  </div>
                </div>
              </Link>
              <Link href={"/profile/help"}>
                <div className="card card-bordered shadow-md bg-base-100 w-full hover:bg-secondary ">
                  <div className="card-body">
                    <h2 className="card-title">Help Center</h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

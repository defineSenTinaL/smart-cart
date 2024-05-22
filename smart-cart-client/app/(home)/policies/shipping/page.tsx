import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const Shipping = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Shipping Page`);
  return (
    <main className="w-full bg-base-100 py-12 justify-center flex">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Shipping Policy
            </h1>
            <h4 className="text-md py-5 font-semibold tracking-tighter">
              Effective Date: 1st Jan 2024
            </h4>
            <h2 className="px-6 text-md font-semibold">
              Welcome to Dintly
            </h2>
            <p className="mx-auto max-w-[700px] pb-5">
              Thank you for shopping with us. We understand that you are excited
              to receive your items and we are committed to delivering your
              products as quickly and efficiently as possible. This shipping
              policy outlines our shipping practices to ensure a clear
              understanding of the process.
            </p>
          </div>
          <div className="space-y-10">
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Shipping Within India Only
                </h1>
                <p className="px-6">
                  Please note that we currently ship exclusively within India.
                  We aim to expand our shipping destinations in the future.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Order Processing Time
                </h1>
                <p className="px-6">
                  Orders are typically processed within 1 or 2 business days.
                  Please note that orders are not shipped or delivered on
                  weekends or holidays. During peak seasons or sales, processing
                  times may be longer.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Shipping Methods and Carriers
                </h1>
                <p className="px-6">
                  We offer various shipping methods to meet your needs. These
                  may include standard shipping, express delivery, etc. We have
                  partnered with reputed carriers like Shiprocket, Delhivery,
                  Blue Dart, XpressBees, EcomExpress to ensure safe and timely
                  delivery.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Shipping Costs
                </h1>
                <p className="px-6">
                  Shipping costs are based on the weight of your order and the
                  shipping method selected. All shipping charges will be
                  displayed at checkout before you complete your purchase. We
                  offer free shipping on orders over 499, as a token of
                  appreciation for your business.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Estimated Delivery Time
                </h1>
                <p className="px-6">
                  The estimated delivery time varies depending on your location.
                  Generally, orders are delivered within 3 to 7 or 7 to 10 days.
                  Please note that these are estimated times and can vary based
                  on factors beyond our control.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Order Tracking
                </h1>
                <p className="px-6">
                  Once your order is shipped, you will receive a tracking number
                  via email. You can use this number to track your order through
                  our carrier&apos;s website.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Damaged or Lost Orders
                </h1>
                <p className="px-6">
                  We take great care in packaging your items. However, if you
                  receive a damaged item or if your order is lost in transit,
                  please contact us immediately at <a href="support@dintly.in" className="link link-primary">support@dintly.in.</a>{' '}
                  We will investigate the issue and resolve it at the earliest.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Returns and Refund
                </h1>
                <p className="px-6">
                  For information on returns, exchanges and refund, please refer to our{' '}
                  <a href="/policies/refundreturn" className="link link-primary">Refund & Return Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shipping;

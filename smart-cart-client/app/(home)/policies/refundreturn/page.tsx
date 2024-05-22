import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const RefundReturn = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Refund and return Page`);
  return (
    <main className="w-full bg-base-100 py-12 justify-center flex">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Return and Refund Policy
            </h1>
            <h4 className="text-md py-5 font-semibold tracking-tighter">
              Effective Date: 1st Jan 2024
            </h4>
            <p className="mx-auto max-w-[700px] pb-5">
              Thank you for shopping at Dintly.in. We value your satisfaction
              and want to ensure that your shopping experience with us is as
              enjoyable as possible. Please read our Return and Refund Policy
              carefully to understand your rights and obligations when it comes
              to returns and refunds.
            </p>
          </div>
          <div className="space-y-10">
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Returns and Exchanges
                </h1>
                <h2 className="px-6 text-md font-semibold">
                  Eligibility for Returns and Exchanges
                </h2>
                <p className="px-6">
                  We accept returns and exchanges within 7-10 days from the date
                  of delivery. To be eligible for a return or exchange, the item
                  must be unused, in its original packaging, and in the same
                  condition as when you received it.
                </p>
                <h2 className="px-6 text-md font-semibold pt-5">
                  Non-Returnable Items
                </h2>
                <p className="px-6">
                  Certain items are non-returnable for hygiene, safety reasons
                  or any other reason. Therefore, it is suggested to purchase an
                  item after checking return policy of the item in its
                  description.
                </p>
                <h2 className="px-6 text-md font-semibold pt-5">
                  Return Process
                </h2>
                <p className="px-6">
                  To initiate a return or exchange, please follow these steps:
                </p>
                <p className="px-6">Log in to your dintly.in account.</p>
                <p className="px-6">
                  Navigate to the &ldquo;My Orders&rdquo; section.
                </p>
                <p className="px-6">
                  Select the order containing the item you wish to return. (This
                  option will be available for 7days after delivery of the item)
                </p>
                <p className="px-6">
                  Follow the prompts to submit a return or exchange request.
                </p>
                <h2 className="px-6 text-md font-semibold pt-5">
                  Return Shipping
                </h2>
                <p className="px-6">
                  Customers are responsible for the cost of return shipping
                  unless the item received is defective or incorrect. We
                  recommend using a trackable shipping service to ensure the
                  safe return of your item.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Refund Process
                </h1>
                <h2 className="px-6 text-md font-semibold">
                  Refund Eligibility
                </h2>
                <p className="px-6">
                  Refund will be initiated once the item is inspected. To be
                  eligible for a refund, the item must meet the conditions
                  outlined in Section 1.1.
                </p>
                <h2 className="px-6 text-md font-semibold pt-5">
                  Refund Timeframe
                </h2>
                <p className="px-6">
                  Refunds will be initiated within 48 hours of picking up the
                  item. The refund will be issued to the original payment method
                  used during the purchase. Also, you will receive your refund
                  depending on process time on our payment partners Razorpay and
                  PhonePe.
                </p>
                <h2 className="px-6 text-md font-semibold pt-5">
                  Refund Exceptions
                </h2>
                <p className="px-6">
                  In some cases, refunds may not be processed or may be subject
                  to partial refund based on the condition of the returned item.
                  Refunds will not be issued for items damaged due to misuse,
                  negligence, or normal wear and tear.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Conditions for Returning Products
                </h1>
                <p className="px-6">
                  To qualify for a return or exchange, the product must meet the
                  following conditions:
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>The product must be in its original packaging.</span>
                  </li>
                  <li className="px-6">
                    <span>
                      All accessories, tags, and labels must be intact and
                      attached to the product.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      The product must be unused and in the same condition as
                      when you received it.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Additional Information
                </h1>
                <h2 className="px-6 text-md font-semibold">Customer Support</h2>
                <p className="px-6">
                  If you have any questions or need assistance with your return
                  or refund, please contact our customer support team at
                  support@dintly.in or +91 9860684596.
                </p>
                <h2 className="px-6 text-md font-semibold pt-5">
                  Changes to the Policy
                </h2>
                <p className="px-6">
                  Dintly.in reserves the right to modify or update this Return
                  and Refund Policy at any time without prior notice. Please
                  review this policy periodically for any changes.
                </p>
                <p className="px-6">
                  By making a purchase on Dintly.in, you acknowledge that you
                  have read, understood, and agreed to this Return and Refund
                  Policy.
                </p>
                <p className="px-6">Thank you for shopping with Dintly.in!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RefundReturn;

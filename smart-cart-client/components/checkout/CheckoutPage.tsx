"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { applyCoupon, createAddress } from "@/utils/profile/api";
import { cartStore, userStore } from "@/zustand/store";
import toast from "react-hot-toast";
import { createOrder } from "@/utils/checkout/api";
import { useRouter, useSearchParams } from "next/navigation";

interface ShippingDetailsProps {
  userInfo: any;
  token: any;
  onSubmit: (address: any) => void; // Define the type for the onSubmit prop
}

function ShippingDetails({ userInfo, token, onSubmit }: ShippingDetailsProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState<any>(true);
  const [data, setData] = useState({
    name: "",
    mobile: "",
    addressLine: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "",
  });

  // Function to open the modal
  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleAddress = async (e: any) => {
    e.preventDefault();
    // Add address to Zustand store immediately
    userStore.getState().addAddress(data);
    onSubmit(data);
    toast.success("Address added successfully!");
    try {
      const res = await createAddress(userInfo?._id, data, token);
      onSubmit(res);
      closeModal();
    } catch (error) {}
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  return (
    <section
      className={`collapse collapse-arrow bg-base-100 w-full ${
        isOpen ? "collapse-open" : "collapse-close"
      }`}
      onClick={toggleCollapse}
    >
      <div
        className={`collapse-title ${
          isOpen
            ? "bg-secondary text-secondary-content"
            : "bg-primary text-primary-content"
        }`}
      >
        Shipping Details
      </div>
      <div
        className={`collapse-content ${
          isOpen
            ? "bg-secondary text-secondary-content"
            : "bg-primary text-primary-content"
        }`}
      >
        <button className="btn btn-primary mt-5" onClick={openModal}>
          + New Address
        </button>
        <dialog ref={modalRef} id="my_modal_1" className="modal modal-middle">
          <div className="modal-box md:h-full h-96 max-w-6xl">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle glass fixed top-2 right-2 z-50">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-black text-lg mb-2">
              Enter your address
            </h3>
            <div className="w-full">
              <form
                onSubmit={handleAddress}
                method="dialog"
                className="w-full relative space-y-3 bg-white p-6 lg:p-10"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="input input-bordered input-primary w-full"
                      name="name"
                      required
                      pattern="[A-Za-z\s]+"
                      onChange={(e: any) =>
                        setData({
                          ...data,
                          name: e.target.value,
                        })
                      }
                      value={data.name}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Mobile Number</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Enter your mobile number"
                    className="input input-bordered input-accent w-full max-w-xs"
                    required
                    pattern="[0-9]{10}"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        mobile: e.target.value,
                      })
                    }
                    value={data.mobile}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Flat, House no, Building, Company, Apartment, Society
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Enter your address"
                    className="input input-bordered input-primary w-full"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        addressLine: e.target.value,
                      })
                    }
                    value={data.addressLine}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Area, Street, Sector, Village
                    </span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    placeholder="Enter your address"
                    className="input input-bordered input-secondary w-full"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        street: e.target.value,
                      })
                    }
                    value={data.street}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Landmark</span>
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Enter your landmark"
                    className="input input-bordered input-info w-full"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        landmark: e.target.value,
                      })
                    }
                    value={data.landmark}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Pincode</span>
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    required
                    pattern="\d{5}(-\d{4})?"
                    placeholder="Enter your pincode"
                    className="input input-bordered input-accent w-full max-w-xs"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        pincode: e.target.value,
                      })
                    }
                    value={data.pincode}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    name="City"
                    required
                    placeholder="Enter your city"
                    className="input input-bordered input-primary w-full"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        city: e.target.value,
                      })
                    }
                    value={data.city}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">State</span>
                  </label>
                  <input
                    type="text"
                    name="State"
                    required
                    placeholder="Enter your State"
                    className="input input-bordered input-secondary w-full"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        state: e.target.value,
                      })
                    }
                    value={data.state}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Address Type (Home, Office, Other)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="addressType"
                    required
                    placeholder="Enter your address type"
                    className="input input-bordered input-info w-full max-w-xs"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        addressType: e.target.value,
                      })
                    }
                    value={data.addressType}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn mt-5 w-full btn-primary p-2 text-center font-semibold"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
        <div className="mt-5">
          {userInfo?.address.length > 0 ? (
            <ul>
              {userInfo?.address.map((address: any, idx: any) => (
                <li key={idx}>
                  <label htmlFor={idx} className="block relative">
                    <input
                      id={idx}
                      type="radio"
                      name="shipping"
                      value={address}
                      className="sr-only peer radio"
                      onChange={() => onSubmit(address)}
                    />
                    <div className="card card-side mt-5 w-full flex gap-x-3 items-start p-4 cursor-pointer bg-base-100 shadow-sm ring-primary peer-checked:ring-4 duration-200">
                      <div className="pl-7">
                        <h3 className="leading-none  font-medium pr-3">
                          {address.name}
                        </h3>
                        <p className="mt-1 text-sm">
                          {address.addressLine}, {address.street},{" "}
                          {address.landmark}, {address.pincode}, {address.city},{" "}
                          {address.state}
                        </p>
                        <p className="mt-2 text-sm">
                          Phone Number: {address.mobile}
                        </p>
                        <p className="mt-2 text-sm">{address.addressType}</p>
                      </div>
                    </div>
                    <span className="block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-secondary w-4 h-4 rounded-full"></span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p>No saved addresses found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

interface PaymentProps {
  [key: string]: any;
}

const PaymentDetails: React.FC<PaymentProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState<any>(true);
  const radios = [
    {
      id: "COD",
      name: "Cash On Delivery",
      description: "Pay at Delivery",
      icon: (
        <Image
          src="/COD.svg"
          width={50}
          height={50}
          alt="Picture of the Cash on Delivery"
        />
      ),
    },
    {
      id: "Prepaid",
      name: "Online Payment",
      description: "UPI, Credit Card, Debit Card, Wallet",
      icon: (
        <Image
          src="/Online.svg"
          width={50}
          height={50}
          alt="Picture of the Online Payment"
        />
      ),
    },
  ];

  const toggleCollapse = () => {
    setIsOpen(!isOpen); // Toggle the state
  };
  return (
    <section
      className={`collapse collapse-arrow bg-base-100 w-full ${
        isOpen ? "collapse-open" : "collapse-close"
      }`}
      onClick={toggleCollapse}
    >
      <div
        className={`collapse-title ${
          isOpen
            ? "bg-secondary text-secondary-content"
            : "bg-primary text-primary-content"
        }`}
      >
        Payment Details
      </div>
      <div
        className={`collapse-content ${
          isOpen
            ? "bg-secondary text-secondary-content"
            : "bg-primary text-primary-content"
        }`}
      >
        <div className="w-full mx-auto px-4">
          <h2 className=" font-medium mt-5">Select your payment method</h2>
          <ul className="mt-6 md:flex md:flex-row md:gap-10 flex flex-col gap-10">
            {radios.map((item, idx) => (
              <li key={idx}>
                <label htmlFor={item.id} className="block relative">
                  <input
                    id={item.id}
                    type="radio"
                    name="payment"
                    value={item.id}
                    className="sr-only peer"
                    onChange={() => onSubmit(item.id)}
                  />
                  <div className="card card-side w-full flex gap-x-3 items-start p-4 cursor-pointer bg-base-100 shadow-sm ring-primary peer-checked:ring-4 duration-200">
                  <div className="pl-7 flex gap-x-3 py-auto">
                  <div className="flex-none">{item.icon}</div>
                    <div>
                      <h3 className="leading-none font-medium">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm">{item.description}</p>
                    </div>
                  </div>
                  </div>
                  <span className="block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-secondary w-4 h-4 rounded-full"></span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const CheckoutPage = () => {
  const [payment, setPayment] = useState<string>("");
  const [address, setAddress] = useState<any>(null);
  const [coupon, setCoupon] = useState<string>("");
  const [couponDetail, setCouponDetail] = useState<any>(null);
  const [couponError, setCouponError] = useState<string>("");
  const [couponStatus, setCouponStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, clearCart, buyNowItem, clearBuyNowItem } = cartStore(); // Access the buyNowItem from the store
  const { authUser } = useAuth();
  const { user } = userStore();
  const token = authUser?.authtoken;
  const searchParams = useSearchParams();
  const buyNowBool = searchParams.get("buyNow");
  const [subtotal, setSubtotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const router = useRouter();
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    // Calculate the subtotal based on the "Buy Now" option or cart items
    const isBuyNow = buyNowBool === "true" && buyNowItem;
    const newSubtotal = isBuyNow
      ? buyNowItem?.price * buyNowItem?.quantity
      : cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

    setSubtotal(newSubtotal);

    // Determine shipping cost based on the new subtotal
    const newShippingCost = newSubtotal < 499 ? 69 : 0;
    setShippingCost(newShippingCost);

    // Calculate the final total considering the discount and shipping
    const newFinalTotal = newSubtotal - discountAmount + newShippingCost;
    setFinalTotal(newFinalTotal);

    // Update coupon application status based on discount amount
    setIsCouponApplied(discountAmount > 0);
  }, [buyNowBool, buyNowItem, cartItems, discountAmount]);

  const handleOrderConfirmation = async (e: any, retries = 3) => {
    e.preventDefault();

    if (!address || !payment) {
      toast.error("Please select an address and a payment method.");
      return;
    }

    setIsLoading(true);

    // Properly interpret the buyNowBool as a boolean instead of relying on the existence of buyNowItem
    const isBuyNow = buyNowBool === "true"; // Assuming buyNowBool is a string "true" or "false"

    // Decide which set of items to use based on isBuyNow and the existence of buyNowItem or cartItems
    const filteredProducts =
      isBuyNow && buyNowItem
        ? [
            {
              productId: buyNowItem._id,
              variationId: buyNowItem.variationId, // Include this only if it exists
              quantity: buyNowItem.quantity,
              price: buyNowItem.price,
            },
          ]
        : cartItems
            .map((item) => ({
              productId: item._id,
              variationId: item.variationId, // Include this only if it exists
              quantity: item.quantity,
              price: item.price,
            }))
            .filter((item) => item.productId);

    const orderDetails = {
      userId: user._id,
      shippingAddress: address,
      products: filteredProducts,
      paymentMethod: payment,
      orderTotal: finalTotal,
      shippingCharge: shippingCost,
      coupon: couponDetail,
    };

    try {
      const response = await createOrder(user._id, orderDetails, token);
      clearBuyNowItem();

      if (payment === "COD") {
        clearCart();
        toast.success("Order placed successfully!");
        localStorage.setItem("checkoutCompleted", "true");
        router.push("/order/status/success");
      } else if (payment === "Prepaid") {
        clearCart();
        const paymentUrl = response?.data.instrumentResponse.redirectInfo.url;
        router.push(paymentUrl);
      }
    } catch (error) {
      if (retries > 0) {
        console.log(
          `Order placement failed, retrying... Attempts left: ${retries}`
        );
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
        await handleOrderConfirmation(e, retries - 1); // Recursive call with decremented retries
      } else {
        toast.error(
          "Unable to place order after several attempts, please try again later."
        );
        router.push("/order/status/failed");
      }
    } finally {
      setIsLoading(false); // This will turn off the loading state in both success and error scenarios
    }
  };

  const handleApplyCoupon = async (e: any) => {
    e.preventDefault();

    setCouponError("");
    setCouponStatus("");
    setIsLoading(true);

    try {
      const response = await applyCoupon(user._id, coupon, token, subtotal);
      // Assuming the response includes the updated total or a success message
      if (response.statusCode === 404) {
        setCouponStatus("error");
        setCouponError("Coupon not found or invalid.");
        toast.error("Coupon not found or invalid.");
      } else if (response.statusCode === 410) {
        setCouponStatus("error");
        setCouponError("Coupon has expired.");
        toast.error("Coupon has expired.");
      } else if (response.statusCode === 409) {
        setCouponStatus("error");
        setCouponError("Coupon has already been used by you.");
        toast.error("Coupon has already been used by you.");
      } else if (response.statusCode === 400) {
        setCouponStatus("error");
        setCouponError(
          "Order total is less than the minimum required for this coupon."
        );
        toast.error(
          "Order total is less than the minimum required for this coupon."
        );
      } else {
        const appliedDiscountAmount = subtotal - response.newTotal;
        setCouponStatus("success");
        setCouponDetail(response.couponId);
        setCoupon("");
        setDiscountAmount(appliedDiscountAmount);
        setIsCouponApplied(true);
        toast.success("Coupon Applied Successfully");
      }
    } catch (error: any) {
      // Analyze the error response and set user-friendly messages
      if (error.status === 404) {
        setCouponStatus("error");
        setCouponError("Coupon not found or invalid.");
        toast.error("Coupon not found or invalid.");
      } else if (error.status === 410) {
        setCouponStatus("error");
        setCouponError("Coupon has expired.");
        toast.error("Coupon has expired.");
      } else if (error.status === 409) {
        setCouponStatus("error");
        setCouponError("Coupon has already been used by you.");
        toast.error("Coupon has already been used by you.");
      } else if (error.status === 400) {
        setCouponStatus("error");
        setCouponError(
          "Order total is less than the minimum required for this coupon."
        );
        toast.error(
          "Order total is less than the minimum required for this coupon."
        );
      } else {
        setCouponStatus("error");
        setCouponError("An error occurred while applying the coupon.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) {
  //   // Show loading spinner while data is being loaded
  //   return (
  //     <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
  //       <Image
  //         src={"/pacman.svg"}
  //         alt={"loading animation"}
  //         height={80}
  //         width={80}
  //       />
  //     </div>
  //   );
  // }

  // Determine the class for the input field based on coupon status
  const inputClass = `input input-bordered ${
    couponStatus === "success"
      ? "input-success"
      : couponStatus === "error"
      ? "input-error"
      : "input-info"
  } w-full max-w-xs`;

  return (
    <div className="grid grid-cols-3 px-5 lg:px-16 gap-5 bg-base-100 pt-10">
      <div className="w-full lg:col-span-2 col-span-12 space-y-8 ">
        <div className="md:mt-20">
          <ShippingDetails
            userInfo={user}
            token={token}
            onSubmit={setAddress}
          />
        </div>
        <div className="mb-10">
          <PaymentDetails onSubmit={setPayment} />
        </div>
      </div>

      <div className="lg:col-span-1 col-span-12 mb-48 bg-base-100">
        <div className="w-full py-5 px-8 lg:mt-20 bg-base-100 shadow-md card card-bordered">
          <h5>Apply Coupon to Get a Discount!</h5>
          {couponError && (
            <h6 className="text-red-500 mt-2 text-sm">{couponError}</h6>
          )}

          <div className="flex mt-5 gap-2">
            <input
              type="text"
              placeholder="Type here"
              className={inputClass}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="btn btn-info w-24" onClick={handleApplyCoupon}>
              Apply
            </button>
          </div>
        </div>
        <h1 className="py-6 border-b-2 text-xl mx-5 flex justify-center items-center">
          Order Summary
        </h1>
        <div className="px-8 border-b">
          <div className="flex justify-between py-4 ">
            <span>Subtotal</span>
            <span className="font-semibold ">&#8377;{subtotal}</span>
          </div>
          {isCouponApplied && (
            <div className="flex justify-between py-4">
              <span className="text-error">Coupon Applied!</span>
              <span className="font-semibold">
                &#8377;{-discountAmount}
              </span>{" "}
              {/* Display the discount amount */}
            </div>
          )}
          <div className="flex justify-between py-4">
            <span>Shipping</span>
            {shippingCost > 0 ? (
              <span className="font-semibold">&#8377;{shippingCost}</span>
            ) : (
              <span className="font-semibold text-accent">Free</span>
            )}
          </div>
        </div>

        <div className="font-semibold text-xl px-8 flex justify-between py-8 ">
          <span>Total</span>
          <span>&#8377;{finalTotal}</span>
        </div>
        <div className="lg:w-full">
          <div className="flex justify-center items-center pb-5">
            <button
              className="btn btn-accent w-72 lg:w-full"
              onClick={handleOrderConfirmation}
              disabled={!address || !payment}
            >
              Confirm Order
            </button>
          </div>
          <div className="flex gap-2 justify-center opacity-90 pt-3 px-9 lg:px-1">
            <h4 className="text-purple-700 font-semibold">
              Secure Payment processed by
            </h4>
            <Image
              src={"/phonepe-logo.svg"}
              width={100}
              height={40}
              alt="logo of the phonepe payment gateway"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

// // Calculate the subtotal and total
// // Decide how to calculate the total. If there's a buyNowItem, use its price; otherwise, proceed with the cartItems
// const subtotal = buyNowItem
//   ? buyNowItem.price * buyNowItem.quantity
//   : cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
// const [discountedTotal, setDiscountedTotal] = useState<number>(subtotal);

// // You can add shipping, tax, or other costs here if needed
// // Calculate the discount amount
// const discountAmount = subtotal - discountedTotal;

// // Determine if a discount has been applied
// const isCouponApplied = discountAmount > 0;

// // Calculate shipping cost based on the discounted total
// const shippingCost = discountedTotal < 499 ? 69 : 0;

// // Calculate the final total
// const finalTotal = discountedTotal + shippingCost;

// const handlePayment = async (orderId: string, retries: number) => {
//   setIsLoading(false);
//   // Convert finalTotal to paise
//   const amountInPaise = finalTotal * 100;

//   const paymentData = {
//     merchantUserId: user._id,
//     amount: amountInPaise,
//     mobileNumber: address.mobile,
//     orderId,
//   };

//   try {
//     const paymentResponse = await initiatePayment(paymentData, token);
//     // Handle successful payment
//     const paymentUrl =
//       paymentResponse?.data.instrumentResponse.redirectInfo.url;

//     localStorage.setItem("checkoutCompleted", "true");
//     // Redirect to payment gateway or confirmation page
//     router.push(paymentUrl);
//   } catch (error) {
//     if (retries > 0) {
//       await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds delay
//       await handlePayment(orderId, retries - 1);
//     } else {
//       toast.error("Server error, please try again later.");
//     }
//   } finally {
//     setIsLoading(false);
//   }
// };

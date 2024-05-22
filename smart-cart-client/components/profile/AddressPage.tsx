"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { userStore } from "@/zustand/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createAddress } from "@/utils/profile/api";
import { useAuth } from "@/context/AuthProvider";
import Success from "../animation/Success";
import Error from "../animation/Error";

function AddressCard(address: any) {
  return (
    <div className="card card-bordered w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <p>Name: {address?.address.name}</p>
        <p>Mobile: {address?.address.mobile}</p>
        <p>Address: {address?.address.addressLine}</p>
        <p>Street: {address?.address.street}</p>
        <p>City: {address?.address.city}</p>
        <p>State: {address?.address.state}</p>
        <p>Pincode: {address?.address.pincode}</p>
        <p>Type: {address?.address.type}</p>

        <div className="card-actions justify-start pt-5">
          <button className="btn btn-sm btn-outline btn-primary">Edit</button>
          <button className="btn btn-sm btn-outline btn-secondary">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

interface ShippingDetailsProps {
  userInfo: any;
  token: any;
}

function ShippingDetails({ userInfo, token }: ShippingDetailsProps) {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const router = useRouter();

  // Function to open the modal
  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleAddress = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true); // Begin submission attempt

    userStore.getState().addAddress(data);
    toast.success("Address added successfully!");
    try {
      const res = await createAddress(userInfo?._id, data, token);
      setSubmissionSuccess(true); // Mark submission as successful
      window.location.reload();
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Error saving Address");
      setIsSubmitting(false); // Reset submission status
      setTimeout(() => setSubmissionSuccess(false), 3000);
    }
  };

  if (isSubmitting && submissionSuccess) {
    return (
      <div className="flex h-96 w-96 items-center justify-center mx-auto">
        <Success />
      </div>
    );
  }

  if (isSubmitting && !submissionSuccess) {
    return (
      <div className="flex h-96 w-96 items-center justify-center mx-auto">
        <Error />
      </div>
    );
  }

  return (
    <>
      <div
        className="card card-bordered w-full bg-base-100 hover:shadow-xl"
        onClick={openModal}
      >
        <div className="card-body flex flex-col justify-center items-center px-10 py-10">
          <svg
            className="w-24 h-24 text-gray-300 hover:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 14h6m-3 3v-6M1.857 1h4.286c.473 0 .857.384.857.857v4.286A.857.857 0 0 1 6.143 7H1.857A.857.857 0 0 1 1 6.143V1.857C1 1.384 1.384 1 1.857 1Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 11 6.143V1.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H1.857A.857.857 0 0 1 1 16.143v-4.286c0-.473.384-.857.857-.857Z"
            />
          </svg>
          <span className="pt-3 text-lg font-semibold text-gray-600 hover:text-gray-900">
            Add address
          </span>
        </div>
      </div>
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
    </>
  );
}

const AddressPage = () => {
  const { user } = userStore();
  const { authUser } = useAuth();
  const token = authUser?.authtoken;
  const router = useRouter();
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);
  return (
    <section className="w-full py-12 bg-base-100">
      <div className="flex justify-center lg:justify-start lg:px-28 pb-10 gap-3">
        <Image src={"/address-book.svg"} alt={""} height={40} width={40} />
        <h1 className="text-3xl font-semibold">Your Address</h1>
      </div>
      <div className="container grid gap-16 md:gap-8 px-10 md:px-28 max-w-xl mx-auto lg:max-w-none lg:grid-cols-3">
        <ShippingDetails userInfo={user} token={token} />
        {user.address.map((address, index) => (
          <AddressCard key={index} address={address} />
        ))}
      </div>
    </section>
  );
};

export default AddressPage;

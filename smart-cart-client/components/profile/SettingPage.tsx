"use client";

import { useAuth } from "@/context/AuthProvider";
import { updateProfile } from "@/utils/profile/api";
import { userStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function NameModal({ isOpen, onClose, userId, token }: any) {
  const [name, setName] = useState("");
  const updateUser = userStore((state) => state.updateUser);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await updateProfile(userId, { name }, token);
      toast.success("Name updated Successfully");

      // Update the user name in the Zustand store
      //updateUser({ name: name });

      //onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error updating name");
      onClose();
    }
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm text-2xl btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Name Change</h3>
        <div className="w-full relative space-y-3 bg-base-100 p-6 lg:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-1 pb-3">
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
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn mt-5 w-full btn-primary p-2 text-center font-semibold"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}

function EmailModal({ isOpen, onClose, userId, token }: any) {
  const [email, setEmail] = useState("");
  const updateUser = userStore((state) => state.updateUser);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await updateProfile(userId, { email }, token);
      toast.success("Name updated Successfully");

      // Update the user email in the Zustand store
      //updateUser({ email: email });

      //onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error updating email");
      onClose();
    }
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    console.log(email);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        {/* if there is a button in form, it will close the modal */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Email Change</h3>
        <div className="w-full relative space-y-3 bg-white p-6 lg:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-1 pb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Enter your Email"
                className="input input-bordered input-primary w-full"
                name="email"
                required
                pattern="[A-Za-z\s]+"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn mt-5 w-full btn-primary p-2 text-center font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}

function MobileModal({ isOpen, onClose, userId, token }: any) {
  const [mobile, setMobile] = useState<any>("");
  const updateUser = userStore((state) => state.updateUser);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await updateProfile(userId, { mobile }, token);
      toast.success("Mobile number updated Successfully");

      // Update the user mobile in the Zustand store
      //updateUser({ mobile: mobile });

      //onClose();
    } catch (error) {
      toast.error("Error updating mobile number");
      onClose();
    }
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Mobile Number Change</h3>
        <div className="w-full relative space-y-3 bg-white p-6 lg:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-1 pb-3">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="input input-bordered input-primary w-full"
                name="mobile"
                required
                pattern="[0-9]{10}"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="btn mt-5 w-full btn-primary p-2 text-center font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}

// function PasswordModal({ isOpen, onClose }: any) {
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     onClose();
//   };

//   const handleClose = (e: any) => {
//     e.preventDefault();
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <dialog open className="modal">
//       <div className="modal-box">
//         <form method="dialog">
//           {/* if there is a button in form, it will close the modal */}
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={handleClose}
//           >
//             ✕
//           </button>
//         </form>
//         <h3 className="font-bold text-lg">Password Change</h3>
//         <p className="py-4">Press ESC key or click on ✕ button to close</p>
//       </div>
//     </dialog>
//   );
// }

const SettingPage = () => {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  //const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { authUser } = useAuth();
  const { user } = userStore();
  const token = authUser?.authtoken;
  const userId = user?._id;

  const router = useRouter();
  // Redirect to home if no user or user email is empty
  useEffect(() => {
    if (!user || !user.email) {
      toast("Please log in and than revisit this page", { icon: "🔒" });
      router.push("/");
    }
  }, [user, router]);

  const handleNameEdit = (e: any) => {
    e.preventDefault();
    setIsNameModalOpen(true);
  };

  const handleEmailEdit = (e: any) => {
    e.preventDefault();
    setIsEmailModalOpen(true);
  };

  const handleMobileEdit = (e: any) => {
    e.preventDefault();
    setIsMobileModalOpen(true);
  };

  // const handlePasswordEdit = (e: any) => {
  //   e.preventDefault();
  //   setIsPasswordModalOpen(true);
  // };

  // Handlers for modal close
  const handleCloseModal = () => {
    setIsNameModalOpen(false);
    setIsEmailModalOpen(false);
    setIsMobileModalOpen(false);
    // setIsPasswordModalOpen(false);
  };
  return (
    <div className="flex flex-col items-center justify-center bg-base-100 py-5 px-5 sm:py-12">
      <div className="card card-bordered p-4 sm:p-6 md:p-8 shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
        <form className="space-y-6">
          <div className="space-y-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Name
            </label>
            <div className="flex justify-between">
              <h2>{user?.name}</h2>
              <button
                className="btn btn-sm btn-outline btn-secondary"
                onClick={handleNameEdit}
              >
                Edit
              </button>
              <NameModal
                isOpen={isNameModalOpen}
                onClose={handleCloseModal}
                userId={userId}
                token={token}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex justify-between">
              <h2>{user?.email}</h2>
              <button
                className="btn btn-sm btn-outline btn-secondary"
                onClick={handleEmailEdit}
              >
                Edit
              </button>
              <EmailModal
                isOpen={isEmailModalOpen}
                onClose={handleCloseModal}
                userId={userId}
                token={token}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="mobile"
            >
              Mobile Number
            </label>
            <div className="flex justify-between">
              {user?.mobile ? (
                <h2>{user?.mobile}</h2>
              ) : (
                <h2>No number added yet</h2>
              )}
              <button
                className="btn btn-sm btn-outline btn-secondary"
                onClick={handleMobileEdit}
              >
                Edit
              </button>
              <MobileModal
                isOpen={isMobileModalOpen}
                onClose={handleCloseModal}
                userId={userId}
                token={token}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex justify-between">
              <h2>..............</h2>
              {/* <button
                className="btn btn-sm btn-outline btn-secondary"
                onClick={handlePasswordEdit}
              >
                Edit
              </button>
              <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={handleCloseModal}
              /> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingPage;

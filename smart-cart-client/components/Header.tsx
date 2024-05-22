"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchMob from "./SearchMob";
import SearchDesk from "./SearchDesk";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { cartStore, userStore } from "@/zustand/store";

function Cart() {
  const { cart } = userStore((state) => state.user);
  const { cartItems, addToCart } = cartStore();
  const [isSynchronized, setIsSynchronized] = useState(false);
  const [detailsKey, setDetailsKey] = useState(0);

  const router = useRouter();

  // Function to synchronize cart
  const synchronizeCart = () => {
    if (!isSynchronized) {
      cart?.forEach((userCartItem) => {
        const product: any = userCartItem.productId; // Get the product details
        const existsInCart = cartItems.some(
          (cartItem) => cartItem._id === product._id
        );
        if (!existsInCart) {
          // Merge the quantity from userCartItem with the product details
          const cartItemToAdd = { ...product, quantity: userCartItem.quantity };
          addToCart(cartItemToAdd);
        }
      });
      setIsSynchronized(true);
    }
  };

  useEffect(() => {
    synchronizeCart();
  }, [cart]);

  const handleCart = () => {
    setDetailsKey((prevKey) => prevKey + 1);
    router.push("/cart");
  };

  // Calculate total item count
  const totalItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate subtotal price
  const subtotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <details key={detailsKey} className="dropdown dropdown-end dropdown-hover">
      <summary className="btn btn-ghost">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item">
            {totalItemCount}
          </span>
        </div>
      </summary>
      <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">{totalItemCount} Items</span>
          <div className="font-semibold text-md flex gap-2 py-2">
            <span className="text-secondary">Subtotal:</span>
            <span className="text-black">&#8377;{subtotalPrice}</span>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={handleCart}>
              View cart
            </button>
          </div>
        </div>
      </div>
    </details>
  );
}

function Theme() {
  const [detailsKey, setDetailsKey] = useState(0);

  const handleThemeChange = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    setCookie("daisyTheme", `${theme}`);
    setDetailsKey((prevKey) => prevKey + 1); // Change key to re-render <details>
  };

  return (
    <details key={detailsKey} className="dropdown dropdown-bottom dropdown-end">
      <summary className="btn btn-sm sm:btn-md btn-ghost">
        <Image
          src={"/theme.svg"}
          height={50}
          width={50}
          alt={"image of theme"}
        />
      </summary>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a onClick={() => handleThemeChange("corporate")}>Corporate Theme</a>
        </li>
        <li>
          <a onClick={() => handleThemeChange("cupcake")}>Cupcake Theme</a>
        </li>
        <li>
          <p onClick={() => handleThemeChange("dark")}>dark Theme</p>
        </li>
      </ul>
    </details>
  );
}

function Profile(user: any) {
  const { logout } = useAuth();
  const [detailsKey, setDetailsKey] = useState(0);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      // Handle any potential errors during logout
    }
  };

  const handleItemClick = () => {
    setDetailsKey((prevKey) => prevKey + 1); // Change key to re-render <details>
  };

  // Check if there's whitespace in the name
  const hasWhitespace = user?.user?.name ? user.user.name.includes(" ") : false;

  // Determine the displayed name based on presence of whitespace
  const displayName = hasWhitespace
    ? user?.user?.name.split(" ")[0]
    : user?.user?.name;

  return (
    <details className="dropdown dropdown-bottom dropdown-end" key={detailsKey}>
      <summary className="btn btn-sm sm:btn-md btn-ghost">
        {displayName}
      </summary>
      <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1">
        <li onClick={handleItemClick}>
          <Link href={"/profile"}>
            <Image
              src={"/profile.svg"}
              alt={"Image of profile"}
              height={24}
              width={24}
            />
            My Profile
          </Link>
        </li>
        <li onClick={handleItemClick}>
          <Link href={"/profile/order"}>
            <Image
              src={"/order.svg"}
              alt={"Image of orders"}
              height={24}
              width={24}
            />
            Orders
          </Link>
        </li>
        <li onClick={handleItemClick}>
          <Link href={"/profile/wishlist"}>
            <Image
              src={"/wishlist.svg"}
              alt={"Image of wishlist"}
              height={24}
              width={24}
            />
            Wishlist
          </Link>
        </li>
        <li
          onClick={() => {
            handleItemClick();
            handleLogout();
          }}
        >
          <span className="pl-4">
            <Image
              src={"/logout.svg"}
              alt={"Image of logout"}
              height={24}
              width={24}
            />
            Logout
          </span>
        </li>
      </ul>
    </details>
  );
}

const Header = () => {
  const { user } = userStore();
  const router = useRouter();

  const HandleLoginPage = () => {
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-20">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href={"/"} className="btn btn-ghost rounded-lg">
            <span className="w-32 h-28 md:w-40 md:h-36 pt-2 md:pt-1">
              <svg
                viewBox="0 0 97 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.23935 4.67401C8.18821 4.15838 7.96875 3.75781 7.58097 3.4723C7.19318 3.18679 6.6669 3.04403 6.00213 3.04403C5.55043 3.04403 5.16903 3.10795 4.85795 3.2358C4.54688 3.35938 4.30824 3.53196 4.14205 3.75355C3.98011 3.97514 3.89915 4.22656 3.89915 4.50781C3.89063 4.74219 3.93963 4.94673 4.04616 5.12145C4.15696 5.29616 4.30824 5.44744 4.5 5.57528C4.69176 5.69886 4.91335 5.80753 5.16477 5.90128C5.41619 5.99077 5.68466 6.06747 5.97017 6.13139L7.14631 6.41264C7.71733 6.54048 8.24148 6.71094 8.71875 6.92401C9.19602 7.13707 9.60938 7.39915 9.95881 7.71023C10.3082 8.02131 10.5788 8.38778 10.7706 8.80966C10.9666 9.23153 11.0668 9.7152 11.071 10.2607C11.0668 11.0618 10.8622 11.7564 10.4574 12.3445C10.0568 12.9283 9.47727 13.3821 8.71875 13.706C7.96449 14.0256 7.05469 14.1854 5.98935 14.1854C4.93253 14.1854 4.01207 14.0234 3.22798 13.6996C2.44815 13.3757 1.83878 12.8963 1.39986 12.2614C0.965199 11.6222 0.737216 10.8317 0.715909 9.88991H3.39418C3.42401 10.3288 3.54972 10.6953 3.77131 10.9893C3.99716 11.2791 4.29759 11.4986 4.67259 11.6477C5.05185 11.7926 5.48011 11.8651 5.95739 11.8651C6.42614 11.8651 6.8331 11.7969 7.17827 11.6605C7.5277 11.5241 7.7983 11.3345 7.99006 11.0916C8.18182 10.8487 8.2777 10.5696 8.2777 10.2543C8.2777 9.96023 8.19034 9.71307 8.01562 9.51278C7.84517 9.3125 7.59375 9.14205 7.26136 9.00142C6.93324 8.8608 6.53054 8.73295 6.05327 8.6179L4.62784 8.25994C3.52415 7.99148 2.6527 7.57173 2.01349 7.00071C1.37429 6.42969 1.05682 5.66051 1.06108 4.69318C1.05682 3.90057 1.26776 3.2081 1.69389 2.61577C2.12429 2.02344 2.71449 1.56108 3.46449 1.22869C4.21449 0.896306 5.06676 0.730113 6.02131 0.730113C6.9929 0.730113 7.84091 0.896306 8.56534 1.22869C9.29403 1.56108 9.8608 2.02344 10.2656 2.61577C10.6705 3.2081 10.8793 3.89418 10.892 4.67401H8.23935Z"
                  fill="#CAB600"
                />
                <path
                  d="M13.1756 14V4.18182H14.633V5.71591H14.7608C14.9654 5.19176 15.2956 4.7848 15.7516 4.49503C16.2076 4.20099 16.7551 4.05398 17.3944 4.05398C18.0421 4.05398 18.5811 4.20099 19.0115 4.49503C19.4462 4.7848 19.785 5.19176 20.0279 5.71591H20.1301C20.3816 5.20881 20.7587 4.80611 21.2615 4.50781C21.7644 4.20526 22.3674 4.05398 23.0705 4.05398C23.9483 4.05398 24.6664 4.32884 25.2246 4.87855C25.7828 5.42401 26.062 6.27415 26.062 7.42898V14H24.5534V7.42898C24.5534 6.70455 24.3553 6.18679 23.959 5.87571C23.5627 5.56463 23.0961 5.40909 22.5591 5.40909C21.8688 5.40909 21.334 5.6179 20.9547 6.03551C20.5755 6.44886 20.3858 6.97301 20.3858 7.60795V14H18.8517V7.27557C18.8517 6.71733 18.6706 6.26776 18.3084 5.92685C17.9462 5.58168 17.4796 5.40909 16.9086 5.40909C16.5165 5.40909 16.15 5.51349 15.8091 5.7223C15.4725 5.93111 15.1998 6.22088 14.9909 6.59162C14.7864 6.9581 14.6841 7.3821 14.6841 7.86364V14H13.1756ZM31.7093 14.2301C31.0872 14.2301 30.5225 14.1129 30.0154 13.8786C29.5083 13.6399 29.1056 13.2969 28.8074 12.8494C28.5091 12.3977 28.3599 11.8523 28.3599 11.2131C28.3599 10.6506 28.4707 10.1946 28.6923 9.84517C28.9139 9.49148 29.21 9.21449 29.5808 9.0142C29.9515 8.81392 30.3606 8.66477 30.8081 8.56676C31.2598 8.46449 31.7136 8.38352 32.1696 8.32386C32.7662 8.24716 33.2498 8.18963 33.6206 8.15128C33.9956 8.10866 34.2683 8.03835 34.4387 7.94034C34.6135 7.84233 34.7008 7.67187 34.7008 7.42898V7.37784C34.7008 6.74716 34.5282 6.2571 34.1831 5.90767C33.8422 5.55824 33.3244 5.38352 32.6298 5.38352C31.9096 5.38352 31.345 5.54119 30.9359 5.85653C30.5268 6.17187 30.2392 6.50852 30.073 6.86648L28.6412 6.35511C28.8968 5.75852 29.2377 5.29403 29.6639 4.96165C30.0943 4.625 30.563 4.39062 31.0701 4.25852C31.5815 4.12216 32.0843 4.05398 32.5787 4.05398C32.894 4.05398 33.2562 4.09233 33.6653 4.16903C34.0787 4.24148 34.4771 4.39276 34.8606 4.62287C35.2484 4.85298 35.5701 5.20028 35.8258 5.66477C36.0815 6.12926 36.2093 6.75142 36.2093 7.53125V14H34.7008V12.6705H34.6241C34.5218 12.8835 34.3514 13.1115 34.1127 13.3544C33.8741 13.5973 33.5566 13.804 33.1603 13.9744C32.764 14.1449 32.2804 14.2301 31.7093 14.2301ZM31.9395 12.875C32.536 12.875 33.0389 12.7578 33.448 12.5234C33.8613 12.2891 34.1724 11.9865 34.3812 11.6158C34.5943 11.245 34.7008 10.8551 34.7008 10.446V9.06534C34.6369 9.14205 34.4963 9.21236 34.2789 9.27628C34.0659 9.33594 33.8187 9.3892 33.5375 9.43608C33.2605 9.47869 32.9899 9.51705 32.7257 9.55114C32.4657 9.58097 32.2548 9.60653 32.0929 9.62784C31.7008 9.67898 31.3343 9.76207 30.9934 9.87713C30.6568 9.98793 30.3841 10.1562 30.1752 10.3821C29.9707 10.6037 29.8684 10.9062 29.8684 11.2898C29.8684 11.8139 30.0623 12.2102 30.4501 12.4787C30.8422 12.7429 31.3386 12.875 31.9395 12.875ZM38.9627 14V4.18182H40.4201V5.66477H40.5224C40.7013 5.17898 41.0252 4.7848 41.494 4.48224C41.9627 4.17969 42.4911 4.02841 43.0792 4.02841C43.19 4.02841 43.3285 4.03054 43.4947 4.0348C43.6609 4.03906 43.7866 4.04545 43.8718 4.05398V5.58807C43.8207 5.57528 43.7035 5.55611 43.5202 5.53054C43.3413 5.50071 43.1516 5.4858 42.9513 5.4858C42.4741 5.4858 42.0479 5.58594 41.6729 5.78622C41.3022 5.98224 41.0082 6.25497 40.7908 6.6044C40.5778 6.94957 40.4712 7.34375 40.4712 7.78693V14H38.9627ZM50.5451 4.18182V5.46023H45.457V4.18182H50.5451ZM46.94 1.82955H48.4485V11.1875C48.4485 11.6136 48.5103 11.9332 48.6339 12.1463C48.7617 12.3551 48.9237 12.4957 49.1197 12.5682C49.32 12.6364 49.5309 12.6705 49.7525 12.6705C49.9187 12.6705 50.055 12.6619 50.1616 12.6449C50.2681 12.6236 50.3533 12.6065 50.4173 12.5938L50.7241 13.9489C50.6218 13.9872 50.479 14.0256 50.2958 14.0639C50.1126 14.1065 49.8803 14.1278 49.5991 14.1278C49.1729 14.1278 48.7553 14.0362 48.3462 13.853C47.9414 13.6697 47.6048 13.3906 47.3363 13.0156C47.0721 12.6406 46.94 12.1676 46.94 11.5966V1.82955ZM77.2367 14.2301C76.6145 14.2301 76.0499 14.1129 75.5428 13.8786C75.0357 13.6399 74.633 13.2969 74.3347 12.8494C74.0364 12.3977 73.8873 11.8523 73.8873 11.2131C73.8873 10.6506 73.998 10.1946 74.2196 9.84517C74.4412 9.49148 74.7374 9.21449 75.1081 9.0142C75.4789 8.81392 75.888 8.66477 76.3354 8.56676C76.7871 8.46449 77.2409 8.38352 77.6969 8.32386C78.2935 8.24716 78.7772 8.18963 79.1479 8.15128C79.5229 8.10866 79.7956 8.03835 79.9661 7.94034C80.1408 7.84233 80.2282 7.67187 80.2282 7.42898V7.37784C80.2282 6.74716 80.0556 6.2571 79.7104 5.90767C79.3695 5.55824 78.8517 5.38352 78.1571 5.38352C77.437 5.38352 76.8723 5.54119 76.4632 5.85653C76.0542 6.17187 75.7665 6.50852 75.6003 6.86648L74.1685 6.35511C74.4242 5.75852 74.7651 5.29403 75.1912 4.96165C75.6216 4.625 76.0904 4.39062 76.5975 4.25852C77.1088 4.12216 77.6117 4.05398 78.106 4.05398C78.4213 4.05398 78.7836 4.09233 79.1926 4.16903C79.606 4.24148 80.0044 4.39276 80.388 4.62287C80.7757 4.85298 81.0975 5.20028 81.3532 5.66477C81.6088 6.12926 81.7367 6.75142 81.7367 7.53125V14H80.2282V12.6705H80.1515C80.0492 12.8835 79.8787 13.1115 79.6401 13.3544C79.4015 13.5973 79.084 13.804 78.6877 13.9744C78.2914 14.1449 77.8077 14.2301 77.2367 14.2301ZM77.4668 12.875C78.0634 12.875 78.5662 12.7578 78.9753 12.5234C79.3887 12.2891 79.6998 11.9865 79.9086 11.6158C80.1216 11.245 80.2282 10.8551 80.2282 10.446V9.06534C80.1642 9.14205 80.0236 9.21236 79.8063 9.27628C79.5932 9.33594 79.3461 9.3892 79.0648 9.43608C78.7878 9.47869 78.5172 9.51705 78.253 9.55114C77.9931 9.58097 77.7821 9.60653 77.6202 9.62784C77.2282 9.67898 76.8617 9.76207 76.5208 9.87713C76.1841 9.98793 75.9114 10.1562 75.7026 10.3821C75.498 10.6037 75.3958 10.9062 75.3958 11.2898C75.3958 11.8139 75.5897 12.2102 75.9775 12.4787C76.3695 12.7429 76.8659 12.875 77.4668 12.875ZM84.4901 14V4.18182H85.9474V5.66477H86.0497C86.2287 5.17898 86.5526 4.7848 87.0213 4.48224C87.4901 4.17969 88.0185 4.02841 88.6065 4.02841C88.7173 4.02841 88.8558 4.03054 89.022 4.0348C89.1882 4.03906 89.3139 4.04545 89.3991 4.05398V5.58807C89.348 5.57528 89.2308 5.55611 89.0476 5.53054C88.8686 5.50071 88.679 5.4858 88.4787 5.4858C88.0014 5.4858 87.5753 5.58594 87.2003 5.78622C86.8295 5.98224 86.5355 6.25497 86.3182 6.6044C86.1051 6.94957 85.9986 7.34375 85.9986 7.78693V14H84.4901ZM96.0724 4.18182V5.46023H90.9844V4.18182H96.0724ZM92.4673 1.82955H93.9759V11.1875C93.9759 11.6136 94.0376 11.9332 94.1612 12.1463C94.2891 12.3551 94.451 12.4957 94.647 12.5682C94.8473 12.6364 95.0582 12.6705 95.2798 12.6705C95.446 12.6705 95.5824 12.6619 95.6889 12.6449C95.7955 12.6236 95.8807 12.6065 95.9446 12.5938L96.2514 13.9489C96.1491 13.9872 96.0064 14.0256 95.8232 14.0639C95.6399 14.1065 95.4077 14.1278 95.1264 14.1278C94.7003 14.1278 94.2827 14.0362 93.8736 13.853C93.4688 13.6697 93.1321 13.3906 92.8636 13.0156C92.5994 12.6406 92.4673 12.1676 92.4673 11.5966V1.82955Z"
                  fill="black"
                />
                <path
                  d="M57.6339 0.909091H61.0472L64.6523 9.70455H64.8058L68.4109 0.909091H71.8242V14H69.1396V5.4794H69.0309L65.6431 13.9361H63.815L60.4272 5.44744H60.3185V14H57.6339V0.909091Z"
                  fill="#407200"
                />
              </svg>
            </span>
          </Link>
        </div>
        {/* <SearchDesk /> */}
        <div className="navbar-end sm:gap-10 sm:mr-10 lg:pl-10">
          {user && user.email ? (
            <Profile user={user} />
          ) : (
            <button
              className="btn hover:btn-secondary"
              onClick={HandleLoginPage}
            >
              Login
            </button>
          )}
          <Theme />
          <Cart />
        </div>
      </div>
      <div className="sm:hidden md:hidden lg:hidden xl:hidden">
        {/* <SearchMob /> */}
      </div>
    </div>
  );
};

export default Header;

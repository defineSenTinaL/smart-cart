import { API } from "../urls";

export const createAddress = async (
  _id: string,
  data: any,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(`${API}/user/address/${_id}`, requestOptions);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const applyCoupon = async (
  _id: string,
  couponName: string,
  authToken: string,
  orderTotal: number
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      `${API}/coupon/${_id}/${couponName}/${orderTotal}`,
      requestOptions
    );
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getOrders = async (
  userId: string,
  page: number,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const res = await fetch(
      `${API}/order/orders/${userId}?page=${page}`,
      requestOptions
    );
    return res.json();
  } catch (error) {
    console.error(`Error fetching orders: ${error}`);
    return [];
  }
};

export const getOrderById = async (_id: string, authToken: string) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const res = await fetch(`${API}/order/${_id}`, requestOptions);
    return res.json();
  } catch (error) {
    console.error(`Error fetching order: ${error}`);
    return [];
  }
};

export const updateProfile = async (
  _id: string,
  data: any,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({ data });

    console.log(data);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
    };

    // const response = await fetch(
    //   `${API}/user/update-profile/${_id}`,
    //   requestOptions
    // );
    // return response.json();
  } catch (error) {
    return error;
  }
};

export const getReward = async (userId: string, authToken: string) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const res = await fetch(`${API}/reward/${userId}`, requestOptions);
    return res.json();
  } catch (error) {
    console.error(`Error fetching reward: ${error}`);
    return [];
  }
};

export const getRewardHistory = async (
  userId: string,
  page: number,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const res = await fetch(
      `${API}/reward/history/${userId}?page=${page}`,
      requestOptions
    );
    return res.json();
  } catch (error) {
    console.error(`Error fetching reward history: ${error}`);
    return [];
  }
};

export const createTicket = async (
  data: any,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(`${API}/ticket`, requestOptions);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const createContact = async (
  data: any,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(`${API}/contact`, requestOptions);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getWishlist = async (
  userId: string,
  page: number,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const res = await fetch(
      `${API}/user/wishlist/${userId}?page=${page}`,
      requestOptions
    );
    return res.json();
  } catch (error) {
    console.error(`Error fetching orders: ${error}`);
    return [];
  }
};

export const removeFromCartDB = async (
  _id: string,
  productId: string,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    const response = await fetch(
      `${API}/user/wishlist/remove/${_id}/${productId}`,
      requestOptions
    );
    return response.json();
  } catch (error) {
    return error;
  }
};

export const requestReturn = async (
  orderId: string,
  data: any,
  authToken: string
) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
    };

    const res = await fetch(
      `${API}/order/return/${orderId}`,
      requestOptions
    );
    return res.json();
};

export const requestCancellation = async (
  orderId: string,
  data: any,
  authToken: string
) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
    };

    const res = await fetch(
      `${API}/order/cancel/${orderId}`,
      requestOptions
    );
    return res.json();
};

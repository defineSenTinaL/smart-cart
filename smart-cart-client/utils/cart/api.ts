import { API } from "../urls";

export const addToCartDB = async (
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

    const response = await fetch(`${API}/user/cart/add/${_id}`, requestOptions);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const removeFromCartDB = async (
  _id: string,
  productId: string,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    const response = await fetch(
      `${API}/user/cart/remove/${_id}/${productId}`,
      requestOptions
    );
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getUserCart = async (userId: string | null, authToken: string) => {
  const url = `${API}/user/cart/${userId}`;
  console.log(url);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  let Options = {
    method: "Get",
    headers: myHeaders,
  };

  const response = await fetch(url, Options);
  return response.json();
};

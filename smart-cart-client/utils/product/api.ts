import { API } from "../urls";


export const fetchProductById = async (_id: string) => {
  const url = `${API}/product/get/${_id}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error(`Error fetching product: ${error}`);
    return [];
  }
};

export const writeReview = async (data: any, authToken: string) => {
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
    const response = await fetch(`${API}/review`, requestOptions);
    //return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchProductRating = async (_id: string) => {
  const url = `${API}/review/${_id}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error(`Error fetching product Rating: ${error}`);
    return [];
  }
};

export async function getRelatedProducts(productTags: string[]) {
  try {
    // Constructing the search query
    const searchParameters = {
      q: productTags.join(" "),
      query_by: "tag", // Assuming your Typesense collection has a 'tag' field
    };


    // Performing the search query
    const results = {}

    return results;
  } catch (error) {
    console.error(`Error fetching related products: ${error}`);
    return [];
  }
}

export const addToWishlist = async (
  _id: string,
  productId: string,
  authToken: string
) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
    };

    const response = await fetch(`${API}/user/wishlist/add/${_id}/${productId}`, requestOptions);
    return response.json();
  } catch (error) {
    return error;
  }
};

export async function getCoupons() {
  try {
    const res = await fetch(`${API}/coupon`);
    return res.json();
  } catch (error: any) {
    console.error(`Error fetching categories: ${error.message}`);
    return [];
  }
}
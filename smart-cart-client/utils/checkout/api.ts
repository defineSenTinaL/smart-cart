import { API } from "../urls";

export const createOrder = async (_id: string, data: any, authToken: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(`${API}/order`, requestOptions);
  if (!response.ok) {
      // This will create an Error object with the status text and throw it
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};


  // export const initiatePayment = async (data: any, authToken: string) => {
  //   try {
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Authorization", `Bearer ${authToken}`);
  
  //     var raw = JSON.stringify(data);
  
  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //     };
  
  //     const response = await fetch(`${API}/payment`, requestOptions);
  //     return response.json();
  //   } catch (error) {
  //     return error
  //   }
  // };
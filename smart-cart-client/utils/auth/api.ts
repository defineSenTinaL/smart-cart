import { API } from "../urls";
import useSWR from 'swr';

export const createUser = async (name: string, authToken: string) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      name: name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(`${API}/user`, requestOptions);
  } catch (error) {
    return error;
  }
};

export const getUser = async (email: string | null, authToken: string) => {
  const url = `${API}/user/${email}`;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  let Options = {
    method: "Get",
    headers: myHeaders,
  };

  try {
    const response = await fetch(url, Options);
    return response.json();
  } catch (error) {
    console.error(`Error fetching user: ${error}`);
    return [];
  }
};


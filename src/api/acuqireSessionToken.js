import axios from "axios";

export const acquire_session_token = async () => {
  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/users/token",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    data: { userId: process.env.REACT_APP_CIRCLE_USER_ID},
  };

  try {
    const response = await axios.request(options);
    console.log("user token:", response.data.data.userToken);
    console.log("encryption key:", response.data.data.encryptionKey);
    return {
      userToken: response.data.data.userToken,
      encryptionKey: response.data.data.encryptionKey,
    };
  } catch (error) {
    console.error("Error acquiring session token:", error);
    throw error; // Optional: Propagate error to be caught in the component
  }
};

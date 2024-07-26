// src/api/createUserId.js
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const create_a_new_user = async () => {
  const userId = uuidv4();

  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    data: { userId: userId },
  };

  try {
    const response = await axios.request(options);
    console.log("user id: ", userId);
    console.log("status:", response.request.status);
    return {
      userId: userId,
      status: response.request.status,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Optional: Propagate error to be caught in the component
  }
};

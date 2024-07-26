// src/api/getAppID.js
import axios from "axios";

console.log(process.env.REACT_APP_API_KEY);
let appID;
export const get_app_id = async () => {
    const options = {
        method: "GET",
        url: "https://api.circle.com/v1/w3s/config/entity",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`, // Ensure this is correct
        },
      };

  return axios
    .request(options)
    .then(function (response) {
        appID = response.data.data.appId;
        alert("AppID"+appID);
      return response.data.data.appId;
      
    })
    .catch(function (error) {
      console.error(error);
    });
    
};



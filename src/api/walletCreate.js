import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const completeWallet = async () => {
  const sdk = new W3SSdk();
  console.log("Created the SDK");

  const challengeId = process.env.REACT_APP_CHALLANGE_ID;

  sdk.setAppSettings({
    appId: process.env.REACT_APP_ID,
  });
  console.log("Set the app settings");

  sdk.setAuthentication({
    userToken: process.env.REACT_APP_USER_TOKEN,
    encryptionKey: process.env.REACT_APP_ENCRYPTION_KEY,
  });
  console.log("Set the authentication");

  try {
    const result = await new Promise((resolve, reject) => {
      sdk.execute(challengeId, (error, result) => {
        if (error) {
          console.error(`${error?.code?.toString() || "Unknown code"}: ${error?.message ?? "Error!"}`);
          reject(new Error(`${error?.code?.toString() || "Unknown code"}: ${error?.message ?? "Error!"}`));
        } else {
          resolve(result);
        }
      });
    });

    console.log(`Challenge: ${result.type}`);
    console.log(`Status: ${result.status}`);

    if (result.data) {
      console.log(`Signature: ${result.data?.signature}`);
    }

    return result;
  } catch (error) {
    console.error('Error completing wallet:', error);
    throw error;
  }
};

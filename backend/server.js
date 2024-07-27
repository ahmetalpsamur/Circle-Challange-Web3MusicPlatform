const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/initialize-user', async (req, res) => {
  const idempotencyKey = uuidv4();

  const options = {
    method: 'POST',
    url: 'https://api.circle.com/v1/w3s/user/initialize',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      'X-User-Token': `${process.env.REACT_APP_USER_TOKEN}`,
    },
    data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-AMOY"] },
  };

  try {
    const response = await axios.request(options);
    res.json({ challengeId: response.data.data.challengeId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error initializing user');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

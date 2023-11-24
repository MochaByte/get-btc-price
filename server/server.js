const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const binanceApiKey = 'MzCVTcqBxqKtRDXfAvpzajqLSU8aBgExQ37n4jZz9bGTM8Lpjm5Nwe2oubcPkERk';
const binanceApiSecret = 'MNLkkCri8ldBap8eB0ctjPU8y8IHES2t4R9woaL8nZP8MMcI1C83hT6eYQYY13ko';

app.get('/api/bitcoin-price', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`,
      {
        headers: {
          'X-MBX-APIKEY': binanceApiKey,
        },
      }
    );

    const bitcoinPrice = response.data.price;
    res.json({ bitcoinPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

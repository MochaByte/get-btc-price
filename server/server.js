const express = require('express');
const cors = require('cors'); // Import the cors middleware
const axios = require('axios');

const app = express();
const port = 3001;


const binanceApiKey = 'PUT_IN_YOUR_API_KEY';
const binanceApiSecret = 'PUT_IN_YOUR_SERCRET_KEY';

// Enable CORS
app.use(cors());

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
















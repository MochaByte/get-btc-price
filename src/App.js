import React, { useState, useEffect } from 'react';

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bitcoin-price');
        const data = await response.json();
        setBitcoinPrice(data.bitcoinPrice);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Bitcoin Price</h1>
      {bitcoinPrice !== null ? (
        <p>Current Price: ${bitcoinPrice}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

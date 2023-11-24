import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bitcoin-price');
        const data = await response.json();
        const cappedPrice = parseFloat(data.bitcoinPrice).toFixed(2);

        // Update the Bitcoin price
        setBitcoinPrice(cappedPrice);

        // Update the price history
        setPriceHistory(prevHistory => [...prevHistory, parseFloat(cappedPrice)]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('priceChart').getContext('2d');

    const chart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: priceHistory.length }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Bitcoin Price',
            data: priceHistory,
            borderColor: '#3a396b',
            backgroundColor: 'rgba(58, 57, 107, 0.4)',
            pointBackgroundColor: '#3a396b',
            pointBorderColor: '#3a396b',
          },
        ],
      },
    });

    return () => {
      // Cleanup chart when component unmounts
      chart.destroy();
    };
  }, [priceHistory]);

  return (
    <div className="App">
      <div className="centered-container">
        <div className="price-box">
          <img
            className="bitcoin-logo"
            src={process.env.PUBLIC_URL + '/Bitcoin-Logo.wine.svg'}
            alt="Bitcoin Logo"
          />
          <h1>Bitcoin Price</h1>
          {bitcoinPrice !== null ? (
            <p>Current Price: ${bitcoinPrice}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="chart-container">
          <canvas id="priceChart" width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;

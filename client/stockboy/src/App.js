import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Stock = ({ symbol, data }) => (
  <div className="stock">
    <h2>{symbol}</h2>
    <p>Today: {data['1. open']}</p>
    <a href={`https://www.marketwatch.com/investing/stock/${symbol}`}>Go to MarketWatch</a>
  </div>
);

const Banner = () => (
  <div className="banner">
    <h2>The greatest thing to ever happen to investing</h2>
  </div>
);

const Testimonial = ({ quote, author }) => (
  <div className="testimonial">
    <p>"{quote}"</p>
    <h4>{author}</h4>
  </div>
);

function App() {
  const [stocks, setStocks] = useState([{ symbol: 'AAPL', data: { '1. open': '150.00' }}]); 
  const [input, setInput] = useState('');

  const testimonials = [
    { quote: "StockBoy revolutionized the way I invest!", author: "John Doe" },
    { quote: "With StockBoy, I'm always up-to-date with my stocks.", author: "Jane Smith" },
    { quote: "A simple and powerful tool for stock tracking.", author: "Steve Johnson" },
  ];

  const addStock = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/stocks/${input}`);
      setStocks(stocks => [...stocks, { symbol: input, data: response.data }]);
      setInput('');
    } catch (error) {
      console.error('Error fetching stock', error);
    }
  };

  return (
    <div className="app">
      <h1 className="title">StockBoy</h1>
      <Banner />
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} quote={testimonial.quote} author={testimonial.author} />
      ))}
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addStock}>Add Stock</button>
      {stocks.map((stock, index) => (
        <Stock key={index} symbol={stock.symbol} data={stock.data} />
      ))}
    </div>
  );

  
  
}

export default App;



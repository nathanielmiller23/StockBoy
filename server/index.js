const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/stocks/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=Y5X6GF9E7MXX8YZY`);
  //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=Y5X6GF9E7MXX8YZY
  
  res.send(response.data);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

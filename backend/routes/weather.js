const express = require('express');
const router = express.Router();

// Mock weather data for Indian cities
const weatherData = {
  Chennai: { temp: 32, humidity: 78, rainfall: 12, wind: 14, condition: 'Partly Cloudy', uv: 9 },
  Coimbatore: { temp: 28, humidity: 65, rainfall: 5, wind: 10, condition: 'Sunny', uv: 8 },
  Madurai: { temp: 35, humidity: 70, rainfall: 2, wind: 8, condition: 'Hot & Sunny', uv: 10 },
  Salem: { temp: 30, humidity: 60, rainfall: 8, wind: 12, condition: 'Cloudy', uv: 7 },
  Trichy: { temp: 33, humidity: 72, rainfall: 15, wind: 11, condition: 'Rainy', uv: 6 },
  default: { temp: 30, humidity: 68, rainfall: 10, wind: 12, condition: 'Partly Cloudy', uv: 7 }
};

const generateForecast = (baseTemp) => Array.from({ length: 7 }, (_, i) => ({
  day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date().getDay() + i) % 7],
  date: new Date(Date.now() + i * 86400000).toLocaleDateString('en-IN'),
  temp: Math.round(baseTemp + (Math.random() - 0.5) * 6),
  minTemp: Math.round(baseTemp - 4 + (Math.random() - 0.5) * 3),
  humidity: Math.round(60 + Math.random() * 30),
  rainfall: Math.round(Math.random() * 20),
  condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Thunderstorm'][Math.floor(Math.random() * 5)],
  icon: ['☀️', '☁️', '🌧️', '⛅', '⛈️'][Math.floor(Math.random() * 5)]
}));

// @GET /api/weather?city=Chennai
router.get('/', (req, res) => {
  const { city = 'default' } = req.query;
  const data = weatherData[city] || weatherData.default;
  const forecast = generateForecast(data.temp);

  res.json({
    success: true,
    current: {
      city, ...data,
      feels_like: data.temp - 2,
      pressure: 1012 + Math.round(Math.random() * 10),
      visibility: 10,
      sunrise: '06:12 AM', sunset: '06:48 PM',
      lastUpdated: new Date().toISOString()
    },
    forecast,
    alerts: data.temp > 38 ? [{ type: 'heat', message: 'Extreme heat warning. Irrigate crops early morning.', severity: 'high' }]
      : data.rainfall > 15 ? [{ type: 'rain', message: 'Heavy rainfall expected. Protect crops from waterlogging.', severity: 'medium' }]
      : [],
    seasonalAdvice: {
      season: 'Kharif (June–November)',
      suitable_crops: ['Paddy', 'Cotton', 'Sugarcane', 'Groundnut', 'Jowar', 'Bajra'],
      farming_tips: ['Ensure proper drainage in fields', 'Apply nitrogen fertilizer before rain', 'Monitor for fungal diseases in humid conditions']
    }
  });
});

// @GET /api/weather/cities
router.get('/cities', (req, res) => {
  res.json({ success: true, cities: Object.keys(weatherData).filter(k => k !== 'default') });
});

module.exports = router;

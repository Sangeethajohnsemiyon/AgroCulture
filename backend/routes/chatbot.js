const express = require('express');
const router = express.Router();

const responses = {
  hello: 'Hello! 👋 I am AgroBot, your smart agriculture assistant. How can I help you today?',
  weather: 'I can help you check weather! Go to the Weather Monitor page for real-time conditions, 7-day forecast, and crop-specific alerts. 🌤️',
  crop: 'I can assist with crop management! You can add crops, track growth stages, record water and fertilizer usage, and get disease detection help. 🌱',
  disease: 'For crop disease detection, go to the AI Disease Detection page, upload a photo of your affected crop, and get instant diagnosis with treatment recommendations. 🔬',
  market: 'Visit our Marketplace to sell your produce or buy from other farmers. You can also check Market Price Predictions for best selling times. 📈',
  scheme: 'Check our Government Schemes page for PM-KISAN, PMFBY, KCC, and other benefits you may be eligible for. 🏛️',
  fertilizer: 'For fertilizer guidance: 1) Use soil test results 2) Apply based on crop stage 3) Use organic options when possible. Visit Crop Monitor for detailed tracking. 🌿',
  water: 'Water management tips: Drip irrigation saves 50% water. Water early morning or evening. Track usage in Crop Monitor. 💧',
  default: 'I am here to help with farming questions! Ask me about crops, weather, diseases, market prices, or government schemes. 🌾'
};

router.post('/message', (req, res) => {
  const { message } = req.body;
  const lowerMsg = message?.toLowerCase() || '';
  let reply = responses.default;
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) reply = responses.hello;
  else if (lowerMsg.includes('weather')) reply = responses.weather;
  else if (lowerMsg.includes('crop') || lowerMsg.includes('plant')) reply = responses.crop;
  else if (lowerMsg.includes('disease') || lowerMsg.includes('pest')) reply = responses.disease;
  else if (lowerMsg.includes('market') || lowerMsg.includes('sell') || lowerMsg.includes('buy')) reply = responses.market;
  else if (lowerMsg.includes('scheme') || lowerMsg.includes('government')) reply = responses.scheme;
  else if (lowerMsg.includes('fertilizer') || lowerMsg.includes('manure')) reply = responses.fertilizer;
  else if (lowerMsg.includes('water') || lowerMsg.includes('irrigat')) reply = responses.water;
  res.json({ success: true, reply, timestamp: new Date() });
});

module.exports = router;

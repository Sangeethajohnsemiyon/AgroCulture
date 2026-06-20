const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

router.use(protect);

// @GET /api/analytics/sales
router.get('/sales', async (req, res) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const salesData = months.map((month, i) => ({
    month, sales: Math.round(15000 + Math.random() * 40000),
    orders: Math.round(20 + Math.random() * 80),
    revenue: Math.round(10000 + Math.random() * 30000)
  }));

  const categoryData = [
    { name: 'Vegetables', value: 35 }, { name: 'Fruits', value: 25 },
    { name: 'Grains', value: 20 }, { name: 'Pulses', value: 12 }, { name: 'Others', value: 8 }
  ];

  res.json({ success: true, salesData, categoryData, summary: { totalSales: 245000, totalOrders: 680, avgOrderValue: 360, growth: 23.5 } });
});

// @GET /api/analytics/market-prices
router.get('/market-prices', async (req, res) => {
  const crops = ['Tomato', 'Onion', 'Potato', 'Rice', 'Wheat', 'Cotton', 'Groundnut'];
  const priceData = crops.map(crop => ({
    crop,
    currentPrice: Math.round(20 + Math.random() * 200),
    lastWeek: Math.round(18 + Math.random() * 200),
    prediction: Math.round(22 + Math.random() * 200),
    unit: 'per kg', trend: Math.random() > 0.5 ? 'up' : 'down',
    changePercent: (Math.random() * 20 - 10).toFixed(1)
  }));

  const weeklyTrend = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    tomato: Math.round(25 + Math.random() * 30),
    onion: Math.round(30 + Math.random() * 25),
    potato: Math.round(20 + Math.random() * 20)
  }));

  res.json({ success: true, priceData, weeklyTrend });
});

// @GET /api/analytics/profit
router.get('/profit', async (req, res) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const profitData = months.map(month => ({
    month, revenue: Math.round(50000 + Math.random() * 50000),
    cost: Math.round(20000 + Math.random() * 20000),
    profit: Math.round(15000 + Math.random() * 35000)
  }));
  res.json({ success: true, profitData, summary: { totalRevenue: 380000, totalCost: 145000, netProfit: 235000, profitMargin: 61.8 } });
});

module.exports = router;

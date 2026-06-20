const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  const blogs = [
    { _id: '1', title: '5 Smart Irrigation Techniques to Save Water', slug: 'smart-irrigation-techniques', excerpt: 'Modern farming requires efficient water management. Learn 5 proven techniques to reduce water usage by up to 40%.', category: 'tips', authorName: 'Dr. Rajesh Kumar', readTime: 5, views: 1240, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', createdAt: new Date('2024-12-10'), tags: ['irrigation', 'water', 'tips'] },
    { _id: '2', title: 'Government Doubles PM-KISAN Support for 2025', slug: 'pmkisan-update-2025', excerpt: 'The central government has announced doubling of PM-KISAN direct benefit to farmers starting April 2025.', category: 'policy', authorName: 'AgroConnect Team', readTime: 3, views: 3420, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400', createdAt: new Date('2024-12-08'), tags: ['government', 'scheme', 'pmkisan'] },
    { _id: '3', title: 'How AI is Revolutionizing Crop Disease Detection', slug: 'ai-crop-disease-detection', excerpt: 'Artificial intelligence is helping farmers detect diseases 3x faster with up to 95% accuracy using smartphone cameras.', category: 'technology', authorName: 'Tech Team', readTime: 7, views: 2180, image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400', createdAt: new Date('2024-12-05'), tags: ['AI', 'technology', 'disease'] },
    { _id: '4', title: 'Organic Farming Market to Grow 25% in India by 2025', slug: 'organic-farming-market-growth', excerpt: 'The organic farming market in India is set for explosive growth. Here is what farmers need to know to capitalize.', category: 'market', authorName: 'Market Analyst', readTime: 4, views: 1890, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400', createdAt: new Date('2024-12-02'), tags: ['organic', 'market', 'growth'] },
    { _id: '5', title: 'Northeast Monsoon 2024: What Farmers Should Expect', slug: 'northeast-monsoon-2024-forecast', excerpt: 'IMD predicts above-normal northeast monsoon in South India. Farmers should prepare for higher rainfall in November-December.', category: 'weather', authorName: 'Weather Expert', readTime: 6, views: 4230, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400', createdAt: new Date('2024-11-28'), tags: ['monsoon', 'weather', 'forecast'] },
    { _id: '6', title: 'Top 10 High-Yield Vegetable Varieties for Tamil Nadu', slug: 'high-yield-vegetables-tamil-nadu', excerpt: 'Discover the best performing vegetable varieties for Tamil Nadu soil conditions and climate with yield data.', category: 'tips', authorName: 'Agriculture Expert', readTime: 8, views: 2650, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400', createdAt: new Date('2024-11-25'), tags: ['vegetables', 'varieties', 'tamil-nadu'] },
  ];
  res.json({ success: true, blogs });
});

router.get('/:slug', async (req, res) => {
  res.json({ success: true, blog: { _id: '1', title: 'Blog Article', content: 'Full blog content here...', authorName: 'Author', createdAt: new Date() } });
});

module.exports = router;

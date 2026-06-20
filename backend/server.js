const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth');
const farmerRoutes = require('./routes/farmer');
const marketplaceRoutes = require('./routes/marketplace');
const orderRoutes = require('./routes/orders');
const weatherRoutes = require('./routes/weather');
const diseaseRoutes = require('./routes/disease');
const adminRoutes = require('./routes/admin');
const schemeRoutes = require('./routes/schemes');
const blogRoutes = require('./routes/blog');
const equipmentRoutes = require('./routes/equipment');
const chatbotRoutes = require('./routes/chatbot');
const notificationRoutes = require('./routes/notifications');
const feedbackRoutes = require('./routes/feedback');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'AgroConnect API is running!', timestamp: new Date() });
});

// Root
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Welcome to AgroConnect API', 
    version: '1.0.0',
    docs: '/api/health'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🌱 AgroConnect Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}\n`);
});

module.exports = app;

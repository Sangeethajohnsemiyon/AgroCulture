const mongoose = require('mongoose');
const dns = require('dns');

// Fix Node.js 18+ DNS resolution issues with MongoDB Atlas
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const seedDemoUsers = async () => {
  try {
    const User = require('../models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding demo accounts (Farmer, Buyer, Admin)...');
      await User.create([
        {
          name: 'Demo Farmer',
          email: 'farmer@demo.com',
          password: 'demo123',
          role: 'farmer',
          phone: '+91 9876543210',
          farmName: 'Green Valley Organic Farms',
          farmSize: '5 Acres',
          isVerified: true,
          isActive: true
        },
        {
          name: 'Demo Buyer',
          email: 'buyer@demo.com',
          password: 'demo123',
          role: 'buyer',
          phone: '+91 8765432109',
          isVerified: true,
          isActive: true
        },
        {
          name: 'Demo Admin',
          email: 'admin@demo.com',
          password: 'demo123',
          role: 'admin',
          phone: '+91 7654321098',
          isVerified: true,
          isActive: true
        }
      ]);
      console.log('✅ Demo accounts seeded successfully!');
    }
  } catch (err) {
    console.error(`⚠️ Demo seeding failed: ${err.message}`);
  }
};

const connectDB = async () => {
  try {
    console.log(`Connecting to MongoDB: ${process.env.MONGO_URI}...`);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    await seedDemoUsers();
  } catch (error) {
    console.warn(`⚠️ Local MongoDB connection failed: ${error.message}`);
    console.log('🌱 Attempting to start in-memory MongoDB Server (fallback)...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log(`ℹ️ In-Memory MongoDB Server running at: ${uri}`);
      const conn = await mongoose.connect(uri);
      console.log(`✅ MongoDB In-Memory Connected: ${conn.connection.host}`);
      await seedDemoUsers();
    } catch (inMemError) {
      console.error(`❌ In-Memory MongoDB fallback failed: ${inMemError.message}`);
      console.error('Please ensure MongoDB is running locally, or run "npm install mongodb-memory-server" in backend.');
      process.exit(1);
    }
  }
};

module.exports = connectDB;

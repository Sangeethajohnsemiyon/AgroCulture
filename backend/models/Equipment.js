const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['tractor', 'harvester', 'plough', 'sprayer', 'seeder', 'pump', 'other'], default: 'other' },
  brand: { type: String },
  model: { type: String },
  yearOfManufacture: { type: Number },
  pricePerDay: { type: Number, required: true },
  pricePerHour: { type: Number },
  images: [{ type: String }],
  location: { city: String, state: String, pincode: String },
  isAvailable: { type: Boolean, default: true },
  condition: { type: String, enum: ['excellent', 'good', 'fair', 'poor'], default: 'good' },
  features: [{ type: String }],
  bookings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startDate: Date, endDate: Date, status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    totalCost: Number
  }],
  rating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);

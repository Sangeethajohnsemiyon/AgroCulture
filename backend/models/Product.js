const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['vegetables', 'fruits', 'grains', 'pulses', 'dairy', 'spices', 'herbs', 'organic', 'other'], required: true },
  price: { type: Number, required: true, min: 0 },
  unit: { type: String, enum: ['kg', 'gram', 'liter', 'piece', 'dozen', 'quintal'], default: 'kg' },
  quantity: { type: Number, required: true, min: 0 },
  images: [{ type: String }],
  isOrganic: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String, rating: Number, comment: String, date: { type: Date, default: Date.now }
  }],
  location: { city: String, state: String, pincode: String },
  harvestDate: { type: Date },
  expiryDate: { type: Date },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  isAvailable: { type: Boolean, default: true },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  soldCount: { type: Number, default: 0 },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);

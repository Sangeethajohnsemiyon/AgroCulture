const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cropName: { type: String, required: true },
  cropType: { type: String, enum: ['vegetable', 'fruit', 'grain', 'pulse', 'spice', 'flower', 'other'], default: 'other' },
  variety: { type: String },
  fieldName: { type: String },
  fieldSize: { type: Number }, // in acres
  soilType: { type: String, enum: ['clay', 'sandy', 'loamy', 'silt', 'peat', 'chalk', 'other'] },
  plantingDate: { type: Date },
  expectedHarvestDate: { type: Date },
  actualHarvestDate: { type: Date },
  status: { type: String, enum: ['planted', 'growing', 'flowering', 'harvested', 'failed'], default: 'planted' },
  growthStage: { type: Number, min: 0, max: 100, default: 0 }, // percentage
  irrigationMethod: { type: String, enum: ['drip', 'sprinkler', 'flood', 'furrow', 'manual'], default: 'manual' },
  waterUsage: [{ date: Date, amount: Number, unit: { type: String, default: 'liters' } }],
  fertilizerUsage: [{
    date: Date, name: String, type: { type: String, enum: ['organic', 'chemical', 'bio'] },
    amount: Number, unit: String, notes: String
  }],
  images: [{ url: String, caption: String, uploadedAt: { type: Date, default: Date.now } }],
  notes: { type: String },
  expectedYield: { type: Number }, // in kg
  actualYield: { type: Number },
  weatherAlerts: [{ message: String, severity: String, date: Date }],
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);

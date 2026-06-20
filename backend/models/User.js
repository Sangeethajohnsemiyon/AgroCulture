const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
  phone: { type: String, trim: true },
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  role: { type: String, enum: ['farmer', 'buyer', 'admin'], default: 'buyer' },
  avatar: { type: String, default: '' },
  address: {
    street: String, city: String, state: String, pincode: String, country: { type: String, default: 'India' }
  },
  farmName: { type: String }, // Farmer specific
  farmSize: { type: String }, // Farmer specific
  language: { type: String, enum: ['en', 'ta'], default: 'en' },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  otp: { type: String },
  otpExpire: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  lastLogin: { type: Date },
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

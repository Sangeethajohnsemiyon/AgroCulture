const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// @POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({ name, email, password, role, phone, otp, otpExpire });
    res.status(201).json({
      success: true,
      message: 'Registration successful. OTP sent to email.',
      userId: user._id,
      otp // In production, send via email
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId).select('+otp +otpExpire');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();
    const token = generateToken(user._id);
    res.json({ success: true, message: 'Account verified successfully', token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    if (!user.isActive) return res.status(403).json({ success: false, message: 'Account is deactivated' });

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id);
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, isVerified: user.isVerified, language: user.language }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'No account with that email' });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    res.json({ success: true, message: 'OTP sent to email', otp }); // In prod, remove otp from response
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email }).select('+otp +otpExpire');
    if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// @PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, address, farmName, farmSize, language } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, phone, address, farmName, farmSize, language }, { new: true, runValidators: true });
    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @PUT /api/auth/change-password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Current password is wrong' });
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

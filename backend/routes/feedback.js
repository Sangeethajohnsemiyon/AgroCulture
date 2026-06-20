const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const feedback = await Feedback.create({ ...req.body, user: req.user?._id });
    res.status(201).json({ success: true, message: 'Feedback submitted successfully', feedback });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.get('/', protect, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, feedbacks });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;

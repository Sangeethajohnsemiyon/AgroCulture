const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, notifications });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.put('/:id/read', async (req, res) => {
  try {
    await Notification.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { isRead: true });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.put('/read-all', async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id }, { isRead: true });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;

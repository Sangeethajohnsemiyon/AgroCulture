const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// All routes require farmer auth
router.use(protect, authorize('farmer', 'admin'));

// @GET /api/farmer/crops
router.get('/crops', async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: crops.length, crops });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @POST /api/farmer/crops
router.post('/crops', async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, farmer: req.user._id });
    res.status(201).json({ success: true, message: 'Crop added successfully', crop });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/farmer/crops/:id
router.get('/crops/:id', async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, farmer: req.user._id });
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    res.json({ success: true, crop });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @PUT /api/farmer/crops/:id
router.put('/crops/:id', async (req, res) => {
  try {
    const crop = await Crop.findOneAndUpdate({ _id: req.params.id, farmer: req.user._id }, req.body, { new: true, runValidators: true });
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    res.json({ success: true, message: 'Crop updated', crop });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @DELETE /api/farmer/crops/:id
router.delete('/crops/:id', async (req, res) => {
  try {
    const crop = await Crop.findOneAndDelete({ _id: req.params.id, farmer: req.user._id });
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    res.json({ success: true, message: 'Crop deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @POST /api/farmer/crops/:id/water
router.post('/crops/:id/water', async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, farmer: req.user._id });
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    crop.waterUsage.push({ date: new Date(), ...req.body });
    await crop.save();
    res.json({ success: true, message: 'Water usage recorded', crop });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @POST /api/farmer/crops/:id/fertilizer
router.post('/crops/:id/fertilizer', async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, farmer: req.user._id });
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    crop.fertilizerUsage.push({ date: new Date(), ...req.body });
    await crop.save();
    res.json({ success: true, message: 'Fertilizer usage recorded', crop });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/farmer/stats
router.get('/stats', async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id });
    const stats = {
      totalCrops: crops.length,
      growing: crops.filter(c => c.status === 'growing').length,
      harvested: crops.filter(c => c.status === 'harvested').length,
      planted: crops.filter(c => c.status === 'planted').length,
      totalWaterUsage: crops.reduce((acc, c) => acc + c.waterUsage.reduce((a, w) => a + (w.amount || 0), 0), 0),
    };
    res.json({ success: true, stats });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;

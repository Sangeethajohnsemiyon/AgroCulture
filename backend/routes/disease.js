const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock AI disease detection database
const diseaseDatabase = {
  'leaf_blight': {
    disease: 'Leaf Blight', confidence: 94.2, severity: 'High',
    symptoms: ['Brown spots on leaves', 'Yellowing leaf edges', 'Premature leaf drop'],
    causes: 'Fungal infection (Helminthosporium spp.) due to excess moisture',
    treatment: ['Apply Mancozeb 75% WP @ 2.5 g/L water', 'Remove and destroy infected leaves', 'Improve drainage around plants'],
    fertilizer: ['Potassium-based fertilizer to strengthen cell walls', 'Avoid excess nitrogen'],
    medicines: ['Mancozeb 75% WP', 'Carbendazim 50% WP', 'Propiconazole 25% EC'],
    prevention: ['Maintain proper plant spacing', 'Use certified disease-free seeds', 'Crop rotation every season'],
    image: 'leaf_blight'
  },
  'powdery_mildew': {
    disease: 'Powdery Mildew', confidence: 91.8, severity: 'Medium',
    symptoms: ['White powdery coating on leaves', 'Distorted young leaves', 'Stunted growth'],
    causes: 'Fungal infection (Erysiphe spp.) in dry warm conditions',
    treatment: ['Spray Sulphur 80% WP @ 3g/L water', 'Apply neem oil solution', 'Improve air circulation'],
    fertilizer: ['Reduce nitrogen fertilizer', 'Apply phosphorus and potassium'],
    medicines: ['Sulphur 80% WP', 'Hexaconazole 5% EC', 'Trifloxystrobin'],
    prevention: ['Use resistant varieties', 'Avoid overhead watering', 'Maintain proper spacing'],
    image: 'powdery_mildew'
  },
  'rust_disease': {
    disease: 'Rust Disease', confidence: 88.5, severity: 'Medium',
    symptoms: ['Orange/brown pustules on leaves', 'Yellow halos around spots', 'Leaf curling'],
    causes: 'Fungal infection (Puccinia spp.) spread by wind',
    treatment: ['Apply Propiconazole 25 EC @ 1ml/L', 'Remove infected plant parts', 'Apply copper fungicide'],
    fertilizer: ['Balanced NPK fertilizer', 'Avoid excess potassium'],
    medicines: ['Propiconazole 25% EC', 'Tebuconazole', 'Mancozeb + Metalaxyl'],
    prevention: ['Plant resistant varieties', 'Timely sowing', 'Avoid dense planting'],
    image: 'rust_disease'
  },
  'healthy': {
    disease: 'No Disease Detected', confidence: 97.1, severity: 'None',
    symptoms: ['Plant appears healthy'],
    causes: 'No pathogenic infection detected',
    treatment: ['Continue regular maintenance'],
    fertilizer: ['Regular NPK schedule', 'Monthly micronutrient application'],
    medicines: ['No medicine required'],
    prevention: ['Continue current good practices', 'Regular monitoring'],
    image: 'healthy'
  }
};

const cropRecommendations = [
  { soil: 'clay', season: 'kharif', crops: ['Paddy', 'Sugarcane', 'Jute'], suitability: 95 },
  { soil: 'sandy', season: 'rabi', crops: ['Groundnut', 'Carrot', 'Watermelon'], suitability: 88 },
  { soil: 'loamy', season: 'kharif', crops: ['Cotton', 'Maize', 'Soybean'], suitability: 92 },
  { soil: 'loamy', season: 'rabi', crops: ['Wheat', 'Barley', 'Mustard'], suitability: 90 },
  { soil: 'silt', season: 'kharif', crops: ['Rice', 'Banana', 'Turmeric'], suitability: 91 },
];

// @POST /api/disease/detect
router.post('/detect', protect, async (req, res) => {
  try {
    // Simulate AI processing time
    const diseases = Object.keys(diseaseDatabase);
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    const result = diseaseDatabase[randomDisease];

    res.json({
      success: true,
      result: {
        ...result,
        analysisTime: (Math.random() * 2 + 1).toFixed(2) + 's',
        analysisDate: new Date().toISOString(),
        cropName: req.body.cropName || 'Unknown Crop',
        imageAnalyzed: true
      }
    });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @POST /api/disease/recommend-crop
router.post('/recommend-crop', protect, async (req, res) => {
  try {
    const { soilType, season, ph, rainfall, temperature } = req.body;
    const filtered = cropRecommendations.filter(r => r.soil === soilType && r.season === season);
    const recommendations = filtered.length > 0 ? filtered : cropRecommendations.slice(0, 3);

    res.json({
      success: true,
      recommendations: recommendations.map(r => ({
        ...r,
        estimatedYield: `${Math.round(20 + Math.random() * 30)} quintals/acre`,
        growingPeriod: `${Math.round(90 + Math.random() * 60)} days`,
        waterRequirement: `${Math.round(300 + Math.random() * 400)} mm`,
        profitPotential: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
      }))
    });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;

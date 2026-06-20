const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

router.get('/', async (req, res) => {
  const equipment = [
    { _id: '1', name: 'Mahindra 575 DI Tractor', category: 'tractor', brand: 'Mahindra', pricePerDay: 2500, pricePerHour: 350, isAvailable: true, condition: 'excellent', rating: 4.8, images: ['https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400'], location: { city: 'Coimbatore', state: 'Tamil Nadu' }, features: ['45 HP', 'Power Steering', 'AC Cabin'] },
    { _id: '2', name: 'Massey Ferguson 241 Tractor', category: 'tractor', brand: 'Massey', pricePerDay: 2200, pricePerHour: 300, isAvailable: true, condition: 'good', rating: 4.5, images: ['https://images.unsplash.com/photo-1625248935542-c236a7a4d3ca?w=400'], location: { city: 'Salem', state: 'Tamil Nadu' }, features: ['42 HP', 'Hydraulics', '4WD'] },
    { _id: '3', name: 'Hydraulic Sprayer 500L', category: 'sprayer', brand: 'Aspee', pricePerDay: 800, pricePerHour: 120, isAvailable: true, condition: 'good', rating: 4.3, images: ['https://images.unsplash.com/photo-1601738261831-f57c4d6dd40e?w=400'], location: { city: 'Madurai', state: 'Tamil Nadu' }, features: ['500L tank', '12m boom', 'GPS compatible'] },
    { _id: '4', name: 'Seed Drill Machine', category: 'seeder', brand: 'Agri Gold', pricePerDay: 1200, pricePerHour: 180, isAvailable: false, condition: 'fair', rating: 4.1, images: ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400'], location: { city: 'Trichy', state: 'Tamil Nadu' }, features: ['9 rows', 'Zero till', 'Fertilizer box'] },
    { _id: '5', name: 'Water Pump 5HP', category: 'pump', brand: 'Kirloskar', pricePerDay: 500, pricePerHour: 80, isAvailable: true, condition: 'excellent', rating: 4.6, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'], location: { city: 'Chennai', state: 'Tamil Nadu' }, features: ['5 HP motor', '3" outlet', 'Diesel engine'] },
    { _id: '6', name: 'Combine Harvester', category: 'harvester', brand: 'John Deere', pricePerDay: 8000, pricePerHour: 1200, isAvailable: true, condition: 'excellent', rating: 4.9, images: ['https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400'], location: { city: 'Coimbatore', state: 'Tamil Nadu' }, features: ['Paddy & wheat', '130 HP', 'GPS navigation'] },
  ];
  res.json({ success: true, equipment });
});

module.exports = router;

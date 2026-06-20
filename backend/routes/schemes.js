const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

// @GET /api/schemes
router.get('/', async (req, res) => {
  // Return mock government schemes
  const schemes = [
    { _id: '1', title: 'PM-KISAN', description: 'Direct income support of ₹6000/year to farmer families', ministry: 'Ministry of Agriculture', category: 'subsidy', eligibility: 'All small and marginal farmers', benefits: ['₹2000 per installment', '3 installments per year', 'Direct bank transfer'], deadline: '2025-03-31', link: 'https://pmkisan.gov.in', state: 'All India', isActive: true },
    { _id: '2', title: 'Pradhan Mantri Fasal Bima Yojana', description: 'Crop insurance scheme providing financial support to farmers suffering crop loss', ministry: 'Ministry of Agriculture', category: 'insurance', eligibility: 'All farmers growing notified crops', benefits: ['Premium subsidy of 50-90%', 'Coverage for crop failure', 'Post-harvest loss coverage'], link: 'https://pmfby.gov.in', state: 'All India', isActive: true },
    { _id: '3', title: 'Kisan Credit Card (KCC)', description: 'Credit facility to farmers for their agricultural needs', ministry: 'Ministry of Finance', category: 'loan', eligibility: 'All farmers, tenant farmers, sharecroppers', benefits: ['Short-term credit at 4% interest', 'Coverage up to ₹3 lakh', 'No collateral required'], link: 'https://www.nabard.org', state: 'All India', isActive: true },
    { _id: '4', title: 'National Agriculture Market (eNAM)', description: 'Online trading platform for agricultural commodities', ministry: 'Ministry of Agriculture', category: 'other', eligibility: 'All registered farmers', benefits: ['Access to pan-India market', 'Better price discovery', 'Reduced transportation cost'], link: 'https://www.enam.gov.in', state: 'All India', isActive: true },
    { _id: '5', title: 'Soil Health Card Scheme', description: 'Government initiative to provide soil health card to farmers', ministry: 'Ministry of Agriculture', category: 'other', eligibility: 'All farmers', benefits: ['Free soil testing', 'Crop-wise recommendations', 'Fertilizer guidance'], link: 'https://soilhealth.dac.gov.in', state: 'All India', isActive: true },
    { _id: '6', title: 'Agriculture Infrastructure Fund', description: 'Financing facility for post-harvest management and agri infrastructure', ministry: 'Ministry of Agriculture', category: 'loan', eligibility: 'Farmers, FPOs, SHGs, cooperatives', benefits: ['₹1 lakh crore financing', '3% interest subvention', 'Credit guarantee coverage'], link: 'https://agriinfra.dac.gov.in', state: 'All India', isActive: true },
  ];
  res.json({ success: true, schemes });
});

module.exports = router;

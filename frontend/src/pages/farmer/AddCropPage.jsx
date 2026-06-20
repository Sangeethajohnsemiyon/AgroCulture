import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { farmerAPI } from '../../api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddCropPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cropName: '', cropType: 'vegetable', variety: '', fieldName: '', fieldSize: '',
    soilType: 'loamy', plantingDate: '', expectedHarvestDate: '', irrigationMethod: 'drip',
    expectedYield: '', notes: '', status: 'planted'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await farmerAPI.addCrop(form);
      if (data.success) { toast.success('Crop added successfully! 🌱'); navigate('/farmer/crop-monitor'); }
    } catch (err) { toast.error(err.message || 'Failed to add crop'); }
    finally { setLoading(false); }
  };

  const cropTypes = ['vegetable', 'fruit', 'grain', 'pulse', 'spice', 'flower', 'other'];
  const soilTypes = ['clay', 'sandy', 'loamy', 'silt', 'peat', 'chalk', 'other'];
  const irrigationMethods = ['drip', 'sprinkler', 'flood', 'furrow', 'manual'];

  const popular = ['Tomato', 'Paddy', 'Wheat', 'Onion', 'Groundnut', 'Cotton', 'Sugarcane', 'Maize', 'Brinjal', 'Okra', 'Chilli', 'Potato'];

  return (
    <DashboardLayout title="Add New Crop" subtitle="Track your crop from planting to harvest">
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Popular Crops */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, marginBottom: '1rem', color: '#1B2631' }}>🌾 Popular Crops</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {popular.map(c => (
              <button key={c} type="button" onClick={() => setForm({...form, cropName: c})}
                style={{ padding: '0.4rem 0.9rem', background: form.cropName === c ? '#E8F5E9' : '#F5F5F5', border: `1px solid ${form.cropName === c ? '#2E7D32' : '#E0E0E0'}`, borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, color: form.cropName === c ? '#2E7D32' : '#546E7A', transition: 'all 0.2s' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h4 style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F0F0F0' }}>🌱 Crop Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Crop Name *</label>
                <input className="form-input" type="text" placeholder="e.g., Tomato, Paddy" required value={form.cropName} onChange={e => setForm({...form, cropName: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Crop Type *</label>
                <select className="form-input form-select" value={form.cropType} onChange={e => setForm({...form, cropType: e.target.value})}>
                  {cropTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Variety</label>
                <input className="form-input" type="text" placeholder="e.g., Ponni, Hybrid-12" value={form.variety} onChange={e => setForm({...form, variety: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Field Name</label>
                <input className="form-input" type="text" placeholder="e.g., North Field, Plot A" value={form.fieldName} onChange={e => setForm({...form, fieldName: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Field Size (acres)</label>
                <input className="form-input" type="number" step="0.1" placeholder="2.5" value={form.fieldSize} onChange={e => setForm({...form, fieldSize: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Soil Type</label>
                <select className="form-input form-select" value={form.soilType} onChange={e => setForm({...form, soilType: e.target.value})}>
                  {soilTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Planting Date *</label>
                <input className="form-input" type="date" required value={form.plantingDate} onChange={e => setForm({...form, plantingDate: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Expected Harvest Date</label>
                <input className="form-input" type="date" value={form.expectedHarvestDate} onChange={e => setForm({...form, expectedHarvestDate: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Irrigation Method</label>
                <select className="form-input form-select" value={form.irrigationMethod} onChange={e => setForm({...form, irrigationMethod: e.target.value})}>
                  {irrigationMethods.map(m => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Expected Yield (kg)</label>
                <input className="form-input" type="number" placeholder="500" value={form.expectedYield} onChange={e => setForm({...form, expectedYield: e.target.value})} />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Notes / Remarks</label>
              <textarea className="form-input" rows={3} placeholder="Any additional notes about this crop..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} style={{ resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/farmer/crop-monitor')}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? '⏳ Adding...' : '✅ Add Crop'}</button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddCropPage;

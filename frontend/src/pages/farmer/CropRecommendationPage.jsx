import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { diseaseAPI } from '../../api';
import toast from 'react-hot-toast';

const CropRecommendationPage = () => {
  const [form, setForm] = useState({ soilType: 'loamy', season: 'kharif', ph: '6.5', rainfall: '800', temperature: '28' });
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const data = await diseaseAPI.recommendCrop(form);
      if (data.success) { setRecommendations(data.recommendations); toast.success('Crop recommendations ready! 🌾'); }
    } catch { toast.error('Failed to get recommendations'); }
    finally { setLoading(false); }
  };

  const profitColors = { High: '#E8F5E9', Medium: '#FFF8E1', Low: '#FFEBEE' };
  const profitText = { High: '#2E7D32', Medium: '#F9A825', Low: '#E53935' };

  return (
    <DashboardLayout title="Crop Recommendation" subtitle="AI-powered crop suggestions based on your soil and climate">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem', padding: '1rem', background: '#E8F5E9', borderRadius: '12px' }}>
              <span style={{ fontSize: '2rem' }}>🤖</span>
              <div><div style={{ fontWeight: 700, color: '#1B5E20' }}>AI Recommendation Engine</div><div style={{ fontSize: '0.8rem', color: '#2E7D32' }}>Enter your farm conditions for personalized crop suggestions</div></div>
            </div>

            <div className="form-group">
              <label className="form-label">Soil Type</label>
              <select className="form-input form-select" value={form.soilType} onChange={e => setForm({...form, soilType: e.target.value})}>
                {['clay', 'sandy', 'loamy', 'silt', 'peat'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Current Season</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[{ value: 'kharif', label: 'Kharif (Jun–Nov)', icon: '🌧️' }, { value: 'rabi', label: 'Rabi (Nov–Apr)', icon: '☀️' }].map(s => (
                  <button key={s.value} type="button" onClick={() => setForm({...form, season: s.value})} style={{ padding: '0.75rem', border: `2px solid ${form.season === s.value ? '#2E7D32' : '#E0E0E0'}`, borderRadius: '10px', cursor: 'pointer', background: form.season === s.value ? '#E8F5E9' : 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
                    <span>{s.icon}</span><span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Soil pH</label>
                <input className="form-input" type="number" step="0.1" min="4" max="9" value={form.ph} onChange={e => setForm({...form, ph: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Annual Rainfall (mm)</label>
                <input className="form-input" type="number" value={form.rainfall} onChange={e => setForm({...form, rainfall: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Avg Temperature (°C)</label>
                <input className="form-input" type="number" value={form.temperature} onChange={e => setForm({...form, temperature: e.target.value})} />
              </div>
            </div>
            <button className="btn btn-primary w-full" style={{ marginTop: '1.5rem' }} onClick={handleRecommend} disabled={loading}>
              {loading ? '🔄 Analyzing...' : '🌾 Get Crop Recommendations'}
            </button>
          </div>

          {/* Farm Conditions Summary */}
          <div style={{ background: '#F8F9FA', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Your Farm Conditions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {[['🌍', 'Soil Type', form.soilType], ['🌱', 'Season', form.season], ['⚗️', 'pH Level', form.ph], ['🌧️', 'Rainfall', `${form.rainfall}mm`], ['🌡️', 'Temperature', `${form.temperature}°C`]].map(([icon, label, value]) => (
                <div key={label} style={{ background: 'white', borderRadius: '8px', padding: '0.6rem 0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span>{icon}</span>
                  <div><div style={{ fontSize: '0.72rem', color: '#90A4AE', textTransform: 'capitalize' }}>{label}</div><div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'capitalize' }}>{value}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {!recommendations ? (
            <div style={{ background: 'white', borderRadius: '16px', padding: '3rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>🌾</div>
              <h4 style={{ color: '#90A4AE', marginBottom: '0.5rem' }}>Set Your Conditions</h4>
              <p style={{ color: '#90A4AE', fontSize: '0.9rem' }}>Fill in your farm details and click "Get Crop Recommendations" to receive personalized AI suggestions.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recommendations.map((rec, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: i === 0 ? '2px solid #2E7D32' : '1px solid #F0F0F0' }}>
                  {i === 0 && <div style={{ background: '#2E7D32', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px', display: 'inline-block', marginBottom: '0.75rem' }}>⭐ Best Match</div>}
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    Recommended Crops
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {rec.crops?.map(c => <span key={c} className="tag" style={{ fontWeight: 600 }}>{c}</span>)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', fontSize: '0.85rem' }}>
                    {[['📊', 'Suitability', `${rec.suitability}%`], ['⚖️', 'Expected Yield', rec.estimatedYield], ['📅', 'Growing Period', rec.growingPeriod], ['💧', 'Water Need', rec.waterRequirement]].map(([icon, label, val]) => (
                      <div key={label} style={{ background: '#F8F9FA', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
                        <div style={{ color: '#90A4AE', fontSize: '0.75rem' }}>{icon} {label}</div>
                        <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#546E7A' }}>Profit Potential:</span>
                    <span className="badge" style={{ background: profitColors[rec.profitPotential] || '#E8F5E9', color: profitText[rec.profitPotential] || '#2E7D32' }}>💰 {rec.profitPotential}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CropRecommendationPage;

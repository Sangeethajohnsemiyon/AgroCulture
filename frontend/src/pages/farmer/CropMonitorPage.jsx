import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { farmerAPI } from '../../api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockCrops = [
  { _id: '1', cropName: 'Tomato', cropType: 'vegetable', variety: 'Hybrid-12', fieldName: 'North Field', fieldSize: 2, status: 'growing', growthStage: 68, plantingDate: '2024-10-15', expectedHarvestDate: '2025-01-20', soilType: 'loamy', irrigationMethod: 'drip', expectedYield: 800, notes: 'Healthy growth, minor pest observed' },
  { _id: '2', cropName: 'Paddy (Ponni)', cropType: 'grain', variety: 'Ponni', fieldName: 'South Field', fieldSize: 5, status: 'planted', growthStage: 22, plantingDate: '2024-11-01', expectedHarvestDate: '2025-02-15', soilType: 'clay', irrigationMethod: 'flood', expectedYield: 2000 },
  { _id: '3', cropName: 'Groundnut', cropType: 'pulse', variety: 'TMV-7', fieldName: 'East Field', fieldSize: 3, status: 'growing', growthStage: 55, plantingDate: '2024-09-20', expectedHarvestDate: '2024-12-30', soilType: 'sandy', irrigationMethod: 'sprinkler', expectedYield: 900 },
  { _id: '4', cropName: 'Brinjal', cropType: 'vegetable', variety: 'CO-2', fieldName: 'West Field', fieldSize: 1, status: 'harvested', growthStage: 100, plantingDate: '2024-07-01', expectedHarvestDate: '2024-10-01', soilType: 'loamy', irrigationMethod: 'drip', expectedYield: 400, actualYield: 380 },
  { _id: '5', cropName: 'Chilli', cropType: 'spice', fieldName: 'Corner Plot', fieldSize: 0.5, status: 'flowering', growthStage: 80, plantingDate: '2024-09-01', expectedHarvestDate: '2024-12-15', soilType: 'loamy', irrigationMethod: 'manual', expectedYield: 150 },
  { _id: '6', cropName: 'Sugarcane', cropType: 'grain', fieldName: 'River Side', fieldSize: 8, status: 'growing', growthStage: 35, plantingDate: '2024-06-01', expectedHarvestDate: '2025-05-01', soilType: 'clay', irrigationMethod: 'flood', expectedYield: 45000 },
];

const CropMonitorPage = () => {
  const [crops, setCrops] = useState(mockCrops);
  const [filter, setFilter] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const statusColors = { growing: '#2E7D32', planted: '#1976D2', harvested: '#F9A825', flowering: '#9C27B0', failed: '#E53935' };
  const statusBg = { growing: '#E8F5E9', planted: '#E3F2FD', harvested: '#FFF8E1', flowering: '#F3E5F5', failed: '#FFEBEE' };
  const cropEmojis = { vegetable: '🥬', fruit: '🍎', grain: '🌾', pulse: '🫘', spice: '🌶️', flower: '🌸', other: '🌱' };

  const filtered = filter === 'all' ? crops : crops.filter(c => c.status === filter);

  const handleDelete = (id) => {
    setCrops(crops.filter(c => c._id !== id));
    toast.success('Crop removed');
    setSelectedCrop(null);
  };

  return (
    <DashboardLayout title="Crop Monitor" subtitle="Track all your crops in real-time">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['all', 'planted', 'growing', 'flowering', 'harvested'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', background: filter === f ? '#2E7D32' : 'white', color: filter === f ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s', textTransform: 'capitalize' }}>{f}</button>
          ))}
        </div>
        <Link to="/farmer/add-crop" className="btn btn-primary btn-sm">+ Add New Crop</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(crop => (
          <div key={crop._id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #F0F0F0', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => setSelectedCrop(crop)} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,125,50,0.15)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'}>
            <div style={{ height: 8, background: `linear-gradient(90deg, ${statusColors[crop.status]}, ${statusColors[crop.status]}88)` }} />
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: 42, height: 42, background: statusBg[crop.status], borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>{cropEmojis[crop.cropType] || '🌱'}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{crop.cropName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#546E7A' }}>{crop.variety || crop.cropType} • {crop.fieldName}</div>
                  </div>
                </div>
                <span className="badge" style={{ background: statusBg[crop.status], color: statusColors[crop.status], textTransform: 'capitalize', height: 'fit-content' }}>{crop.status}</span>
              </div>

              {/* Growth Progress */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#546E7A', fontWeight: 500 }}>Growth Progress</span>
                  <span style={{ color: '#2E7D32', fontWeight: 700 }}>{crop.growthStage}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${crop.growthStage}%`, background: `linear-gradient(90deg, ${statusColors[crop.status]}, ${statusColors[crop.status]}88)` }} />
                </div>
              </div>

              {/* Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', fontSize: '0.78rem' }}>
                {[
                  { icon: '📅', label: 'Planted', value: new Date(crop.plantingDate).toLocaleDateString('en-IN') },
                  { icon: '🗓️', label: 'Harvest', value: new Date(crop.expectedHarvestDate).toLocaleDateString('en-IN') },
                  { icon: '📐', label: 'Field Size', value: `${crop.fieldSize} acres` },
                  { icon: '⚖️', label: 'Exp. Yield', value: `${crop.expectedYield} kg` },
                ].map(info => (
                  <div key={info.label} style={{ background: '#F8F9FA', borderRadius: '8px', padding: '0.5rem 0.6rem' }}>
                    <div style={{ color: '#90A4AE' }}>{info.icon} {info.label}</div>
                    <div style={{ fontWeight: 600, color: '#1B2631', marginTop: '0.15rem' }}>{info.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: '0.8rem' }}>✏️ Edit</button>
                <button className="btn btn-sm" style={{ flex: 1, fontSize: '0.8rem', background: '#FFEBEE', color: '#E53935', border: 'none' }} onClick={(e) => { e.stopPropagation(); handleDelete(crop._id); }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCrop && (
        <div className="modal-overlay" onClick={() => setSelectedCrop(null)}>
          <div className="modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3>{selectedCrop.cropName} Details</h3>
              <button onClick={() => setSelectedCrop(null)} style={{ background: '#F5F5F5', border: 'none', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                ['Crop Type', selectedCrop.cropType], ['Soil Type', selectedCrop.soilType],
                ['Irrigation', selectedCrop.irrigationMethod], ['Status', selectedCrop.status],
                ['Field Size', `${selectedCrop.fieldSize} acres`], ['Growth', `${selectedCrop.growthStage}%`],
              ].map(([k, v]) => (
                <div key={k} style={{ background: '#F8F9FA', borderRadius: '10px', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#90A4AE', textTransform: 'capitalize' }}>{k}</div>
                  <div style={{ fontWeight: 600, textTransform: 'capitalize', marginTop: '0.2rem' }}>{v}</div>
                </div>
              ))}
            </div>
            {selectedCrop.notes && <div style={{ background: '#FFF8E1', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}><strong>📝 Notes:</strong> {selectedCrop.notes}</div>}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/farmer/fertilizer" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>🧪 Add Fertilizer</Link>
              <Link to="/farmer/water" className="btn btn-sm" style={{ flex: 1, background: '#E3F2FD', color: '#1976D2', border: 'none' }}>💧 Log Water</Link>
              <Link to="/farmer/disease-detection" className="btn btn-sm" style={{ flex: 1, background: '#F3E5F5', color: '#9C27B0', border: 'none' }}>🔬 Disease Check</Link>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CropMonitorPage;

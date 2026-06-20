import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const HarvestSchedulePage = () => {
  const crops = [
    { id: 1, name: 'Tomato', field: 'North Field', plantedDate: '2024-10-15', harvestDate: '2025-01-20', status: 'growing', daysLeft: 31, growthStage: 68, expectedYield: 800 },
    { id: 2, name: 'Paddy (Ponni)', field: 'South Field', plantedDate: '2024-11-01', harvestDate: '2025-02-15', status: 'planted', daysLeft: 57, growthStage: 22, expectedYield: 2000 },
    { id: 3, name: 'Groundnut', field: 'East Field', plantedDate: '2024-09-20', harvestDate: '2024-12-30', status: 'growing', daysLeft: 11, growthStage: 85, expectedYield: 900 },
    { id: 4, name: 'Brinjal', field: 'West Field', plantedDate: '2024-07-01', harvestDate: '2024-10-01', status: 'harvested', daysLeft: 0, growthStage: 100, expectedYield: 400 },
    { id: 5, name: 'Chilli', field: 'Corner Plot', plantedDate: '2024-09-01', harvestDate: '2024-12-15', status: 'ready', daysLeft: 0, growthStage: 98, expectedYield: 150 },
  ];

  const statusColors = { planted: '#1976D2', growing: '#2E7D32', ready: '#F9A825', harvested: '#9C27B0' };
  const statusBg = { planted: '#E3F2FD', growing: '#E8F5E9', ready: '#FFF8E1', harvested: '#F3E5F5' };

  return (
    <DashboardLayout title="Harvest Schedule" subtitle="Upcoming and past harvests calendar">
      {/* Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[['📅', 'Total Crops', crops.length, '#E8F5E9'], ['🌱', 'Growing', crops.filter(c=>c.status==='growing').length, '#E8F5E9'], ['✅', 'Ready to Harvest', crops.filter(c=>c.status==='ready').length, '#FFF8E1'], ['🎉', 'Harvested', crops.filter(c=>c.status==='harvested').length, '#F3E5F5']].map(([icon, label, val, bg]) => (
          <div key={label} style={{ background: bg, borderRadius: '14px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{val}</div>
            <div style={{ fontSize: '0.8rem', color: '#546E7A' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Crop List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {crops.sort((a, b) => a.daysLeft - b.daysLeft).map(crop => (
          <div key={crop.id} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `2px solid ${crop.status === 'ready' ? '#F9A825' : 'transparent'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: 50, height: 50, background: statusBg[crop.status], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  {crop.status === 'harvested' ? '🎊' : crop.status === 'ready' ? '⚠️' : '🌱'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{crop.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#546E7A' }}>📍 {crop.field} • Expected Yield: {crop.expectedYield} kg</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge" style={{ background: statusBg[crop.status], color: statusColors[crop.status], textTransform: 'capitalize', fontSize: '0.85rem', marginBottom: '0.4rem', display: 'block' }}>{crop.status === 'ready' ? '⚠️ Ready to Harvest!' : crop.status}</span>
                {crop.daysLeft > 0 && <div style={{ fontSize: '0.8rem', color: '#546E7A' }}>{crop.daysLeft} days remaining</div>}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
              <div style={{ background: '#F8F9FA', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#90A4AE' }}>Planted</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem' }}>{new Date(crop.plantedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
              </div>
              <div style={{ background: '#F8F9FA', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#90A4AE' }}>Harvest Date</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem', color: crop.status === 'ready' ? '#F9A825' : '#1B2631' }}>{new Date(crop.harvestDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
              </div>
              <div style={{ background: '#F8F9FA', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#90A4AE' }}>Growth</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem', color: '#2E7D32' }}>{crop.growthStage}%</div>
              </div>
            </div>
            <div className="progress-bar" style={{ marginTop: '0.75rem' }}>
              <div className="progress-fill" style={{ width: `${crop.growthStage}%`, background: crop.status === 'ready' ? 'linear-gradient(90deg, #F9A825, #FFB300)' : undefined }} />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default HarvestSchedulePage;

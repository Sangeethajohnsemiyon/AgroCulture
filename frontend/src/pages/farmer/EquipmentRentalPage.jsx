import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { equipmentAPI } from '../../api';
import toast from 'react-hot-toast';

const EquipmentRentalPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    equipmentAPI.getEquipment().then(d => { if (d.success) setEquipment(d.equipment); }).catch(() => {});
  }, []);

  const mockEquipment = [
    { _id: '1', name: 'John Deere Tractor 5310', type: 'tractor', dailyRate: 2500, hourlyRate: 350, availability: true, owner: 'Murugan Farm Rentals', location: 'Coimbatore', rating: 4.8, description: '85 HP tractor with all attachments. AC cabin.' },
    { _id: '2', name: 'Combine Harvester JD960', type: 'harvester', dailyRate: 8000, hourlyRate: 1200, availability: true, owner: 'AgriEquip Tamil Nadu', location: 'Thanjavur', rating: 4.9, description: 'Modern combine harvester, harvests 2 acres/hr.' },
    { _id: '3', name: 'Rotavator 7 Blade', type: 'rotavator', dailyRate: 800, hourlyRate: 120, availability: false, owner: 'Kisan Rentals', location: 'Madurai', rating: 4.5, description: 'Heavy duty rotavator for soil preparation.' },
    { _id: '4', name: 'Drip Irrigation Kit (1 acre)', type: 'irrigation', dailyRate: 300, hourlyRate: null, availability: true, owner: 'AgroTech Solutions', location: 'Salem', rating: 4.6, description: 'Complete drip irrigation kit for 1 acre.' },
    { _id: '5', name: 'Power Sprayer 16L', type: 'sprayer', dailyRate: 400, hourlyRate: 60, availability: true, owner: 'Farm Tools TN', location: 'Chennai', rating: 4.4, description: 'Battery-powered backpack sprayer, 16L capacity.' },
    { _id: '6', name: 'Seed Drill Machine', type: 'sowing', dailyRate: 600, hourlyRate: 90, availability: true, owner: 'Coimbatore Agri', location: 'Coimbatore', rating: 4.7, description: 'Precision seed drill for uniform seed spacing.' },
  ];

  const displayEquipment = equipment.length > 0 ? equipment : mockEquipment;
  const categories = ['all', 'tractor', 'harvester', 'rotavator', 'irrigation', 'sprayer', 'sowing'];
  const filtered = filter === 'all' ? displayEquipment : displayEquipment.filter(e => e.type === filter);
  const typeEmojis = { tractor: '🚜', harvester: '🌾', rotavator: '⚙️', irrigation: '💧', sprayer: '💦', sowing: '🌱' };

  const handleRent = (item) => { toast.success(`Rental request sent for ${item.name}! 🚜`); };

  return (
    <DashboardLayout title="Equipment Rental" subtitle="Rent agricultural equipment for your farm needs">
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: '0.45rem 1.1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', background: filter === c ? '#2E7D32' : 'white', color: filter === c ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textTransform: 'capitalize' }}>
            {typeEmojis[c] || '🔧'} {c === 'all' ? 'All Equipment' : c}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(item => (
          <div key={item._id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}>
            <div style={{ height: 140, background: `linear-gradient(135deg, #E8F5E9, #C8E6C9)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
              {typeEmojis[item.type] || '🔧'}
              {!item.availability && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem' }}>⚠️ Not Available</div>}
              <span style={{ position: 'absolute', top: 10, right: 10, background: item.availability ? '#2E7D32' : '#E53935', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>{item.availability ? '✅ Available' : '❌ Rented'}</span>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h5 style={{ lineHeight: 1.3 }}>{item.name}</h5>
                <div style={{ color: '#F9A825', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>⭐ {item.rating}</div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#546E7A', marginBottom: '0.75rem' }}>{item.description}</p>
              <div style={{ fontSize: '0.8rem', color: '#90A4AE', marginBottom: '1rem' }}>
                👤 {item.owner} • 📍 {item.location}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, background: '#E8F5E9', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: '#546E7A' }}>Per Day</div>
                  <div style={{ fontWeight: 800, color: '#2E7D32', fontSize: '1rem' }}>₹{item.dailyRate?.toLocaleString()}</div>
                </div>
                {item.hourlyRate && (
                  <div style={{ flex: 1, background: '#E3F2FD', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: '#546E7A' }}>Per Hour</div>
                    <div style={{ fontWeight: 800, color: '#1976D2', fontSize: '1rem' }}>₹{item.hourlyRate}</div>
                  </div>
                )}
              </div>
              <button className="btn btn-primary btn-sm w-full" onClick={() => handleRent(item)} disabled={!item.availability}>
                {item.availability ? '🚜 Rent Now' : '⏳ Join Waitlist'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default EquipmentRentalPage;

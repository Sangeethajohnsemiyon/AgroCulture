import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import toast from 'react-hot-toast';

const FarmGalleryPage = () => {
  const [images, setImages] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400', caption: 'Tomato Field - North Plot', crop: 'Tomato', date: '2024-12-10' },
    { id: 2, url: 'https://images.unsplash.com/photo-1625248935542-c236a7a4d3ca?w=400', caption: 'Paddy Field after irrigation', crop: 'Paddy', date: '2024-12-08' },
    { id: 3, url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', caption: 'Healthy Groundnut Crop', crop: 'Groundnut', date: '2024-12-05' },
    { id: 4, url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400', caption: 'Harvest Ready Vegetables', crop: 'Vegetables', date: '2024-12-01' },
    { id: 5, url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', caption: 'Drip Irrigation Setup', crop: 'All Crops', date: '2024-11-28' },
    { id: 6, url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400', caption: 'Farm from Drone View', crop: 'General', date: '2024-11-20' },
  ]);

  return (
    <DashboardLayout title="Farm Gallery" subtitle="Document your farm with photos">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ color: '#546E7A', fontSize: '0.9rem' }}>{images.length} photos uploaded</div>
        <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
          📷 Upload Photo
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
            if (e.target.files[0]) { const url = URL.createObjectURL(e.target.files[0]); setImages(prev => [...prev, { id: Date.now(), url, caption: 'New Upload', crop: 'Unknown', date: new Date().toISOString().split('T')[0] }]); toast.success('Photo uploaded!'); }
          }} />
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {images.map(img => (
          <div key={img.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
              <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', opacity: 0, transition: 'all 0.2s' }} className="img-overlay" />
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.95rem' }}>{img.caption}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#90A4AE' }}>
                <span>🌱 {img.crop}</span>
                <span>📅 {new Date(img.date).toLocaleDateString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button className="btn btn-sm" style={{ flex: 1, background: '#E8F5E9', color: '#2E7D32', border: 'none', fontSize: '0.8rem' }}>✏️ Edit</button>
                <button className="btn btn-sm" style={{ flex: 1, background: '#FFEBEE', color: '#E53935', border: 'none', fontSize: '0.8rem' }} onClick={() => { setImages(prev => prev.filter(i => i.id !== img.id)); toast.success('Photo removed'); }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default FarmGalleryPage;

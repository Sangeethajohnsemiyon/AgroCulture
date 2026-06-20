import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { schemeAPI } from '../../api';

const GovernmentSchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    schemeAPI.getSchemes().then(d => { if (d.success) setSchemes(d.schemes); }).catch(() => {});
  }, []);

  const categories = ['all', 'subsidy', 'loan', 'insurance', 'training', 'other'];
  const filtered = filter === 'all' ? schemes : schemes.filter(s => s.category === filter);
  const categoryColors = { subsidy: '#E8F5E9', loan: '#E3F2FD', insurance: '#FFF3E0', training: '#F3E5F5', other: '#F1F8E9' };
  const categoryIcons = { subsidy: '💰', loan: '🏦', insurance: '🛡️', training: '📚', other: '📋' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '5rem 0 7rem', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}><svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 0V60H0Z" fill="#F1F8E9"/></svg></div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
          <h1 style={{ color: 'white', marginBottom: '1rem' }}>Government Agriculture Schemes</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600, margin: '0 auto' }}>Discover and apply for government schemes, subsidies, and financial support programs for farmers across India.</p>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: '0.45rem 1.1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', background: filter === c ? '#2E7D32' : 'white', color: filter === c ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textTransform: 'capitalize' }}>{categoryIcons[c] || ''} {c === 'all' ? 'All Schemes' : c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(scheme => (
            <div key={scheme._id} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,125,50,0.12)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: 48, height: 48, background: categoryColors[scheme.category] || '#E8F5E9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{categoryIcons[scheme.category] || '📋'}</div>
                <span className="badge badge-green" style={{ textTransform: 'capitalize' }}>{scheme.category}</span>
              </div>
              <h4 style={{ marginBottom: '0.5rem', lineHeight: 1.3 }}>{scheme.title}</h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{scheme.description}</p>
              {scheme.benefits?.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.825rem', color: '#2E7D32', marginBottom: '0.4rem' }}>Key Benefits:</div>
                  {scheme.benefits.slice(0, 3).map((b, i) => <div key={i} style={{ fontSize: '0.825rem', color: '#546E7A', marginBottom: '0.25rem' }}>✅ {b}</div>)}
                </div>
              )}
              {scheme.eligibility && <div style={{ background: '#FFF8E1', borderRadius: '10px', padding: '0.6rem 0.85rem', fontSize: '0.8rem', color: '#E65100', marginBottom: '1rem' }}>👤 Eligibility: {scheme.eligibility}</div>}
              <a href={scheme.link || '#'} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm w-full" style={{ textAlign: 'center' }}>Apply Now →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemesPage;

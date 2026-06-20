import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({ children, title, subtitle }) => {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const { lang, switchLang } = useLang();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleColors = { farmer: '#2E7D32', buyer: '#1976D2', admin: '#7B1FA2' };
  const roleColor = roleColors[user?.role] || '#2E7D32';

  return (
    <div className="dashboard-layout">
      <DashboardSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', padding: '0.4rem', borderRadius: '8px' }} onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{title || 'Dashboard'}</div>
              {subtitle && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subtitle}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Language Toggle */}
            <button onClick={() => switchLang(lang === 'en' ? 'ta' : 'en')} style={{ background: 'var(--primary-50)', border: 'none', color: 'var(--primary)', padding: '0.4rem 0.75rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>
              {lang === 'en' ? '🌐 English (Click for தமிழ்)' : '🌐 தமிழ் (Click for English)'}
            </button>
            {/* Cart (for buyer/farmer) */}
            {(user?.role === 'buyer' || user?.role === 'farmer') && (
              <button onClick={() => navigate('/buyer/cart')} className="notif-bell" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', position: 'relative' }}>
                🛒
                {cartCount > 0 && <span className="notif-dot">{cartCount}</span>}
              </button>
            )}
            {/* Notifications */}
            <button onClick={() => navigate('/notifications')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem' }}>🔔</button>
            {/* User Avatar */}
            <button onClick={() => navigate('/profile')} style={{ width: 38, height: 38, background: `linear-gradient(135deg, ${roleColor}, ${roleColor}bb)`, border: 'none', borderRadius: '50%', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
              {user?.name?.[0]?.toUpperCase()}
            </button>
          </div>
        </header>
        {/* Content */}
        <main className="dashboard-content page-enter">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

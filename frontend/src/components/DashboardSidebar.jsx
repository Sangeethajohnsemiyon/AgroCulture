import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

const farmerNav = [
  { section: 'Overview', items: [{ icon: '🏡', label: 'dashboard', path: '/farmer/dashboard' }] },
  { section: 'Farm Management', items: [
    { icon: '🌱', label: 'myCrops', path: '/farmer/crop-monitor' },
    { icon: '➕', label: 'addCrop', path: '/farmer/add-crop' },
    { icon: '🖼️', label: 'farmGallery', path: '/farmer/gallery' },
    { icon: '🧪', label: 'fertilizerTracker', path: '/farmer/fertilizer' },
    { icon: '💧', label: 'waterUsage', path: '/farmer/water' },
    { icon: '📅', label: 'harvestSchedule', path: '/farmer/harvest' },
  ]},
  { section: 'Smart Tools', items: [
    { icon: '🌤️', label: 'weather', path: '/weather' },
    { icon: '🔬', label: 'diseaseDetection', path: '/farmer/disease-detection' },
    { icon: '🌾', label: 'cropRecommendation', path: '/farmer/crop-recommendation' },
    { icon: '🚜', label: 'equipmentRental', path: '/farmer/equipment' },
  ]},
  { section: 'Marketplace', items: [
    { icon: '🛒', label: 'marketplace', path: '/marketplace' },
    { icon: '📊', label: 'salesAnalytics', path: '/analytics/sales' },
  ]},
  { section: 'More', items: [
    { icon: '🏛️', label: 'govtSchemes', path: '/schemes' },
    { icon: '📰', label: 'blog', path: '/blog' },
    { icon: '🔔', label: 'notifications', path: '/notifications' },
    { icon: '⚙️', label: 'profile', path: '/profile' },
  ]},
];

const buyerNav = [
  { section: 'Overview', items: [{ icon: '🏡', label: 'dashboard', path: '/buyer/dashboard' }] },
  { section: 'Shopping', items: [
    { icon: '🛍️', label: 'marketplace', path: '/marketplace' },
    { icon: '🛒', label: 'shoppingCart', path: '/buyer/cart' },
    { icon: '📦', label: 'orderHistory', path: '/buyer/orders' },
  ]},
  { section: 'Analytics', items: [
    { icon: '📈', label: 'marketPrices', path: '/analytics/market-prices' },
  ]},
  { section: 'More', items: [
    { icon: '🏛️', label: 'govtSchemes', path: '/schemes' },
    { icon: '📰', label: 'blog', path: '/blog' },
    { icon: '🔔', label: 'notifications', path: '/notifications' },
    { icon: '⚙️', label: 'profile', path: '/profile' },
  ]},
];

const adminNav = [
  { section: 'Overview', items: [{ icon: '🏡', label: 'adminDashboard', path: '/admin/dashboard' }] },
  { section: 'Management', items: [
    { icon: '👥', label: 'userManagement', path: '/admin/users' },
    { icon: '📦', label: 'productManagement', path: '/admin/products' },
    { icon: '📋', label: 'orderMonitoring', path: '/admin/orders' },
  ]},
  { section: 'Analytics', items: [
    { icon: '📊', label: 'salesAnalytics', path: '/analytics/sales' },
    { icon: '💰', label: 'profitAnalysis', path: '/analytics/profit' },
    { icon: '📈', label: 'marketPrices', path: '/analytics/market-prices' },
    { icon: '📄', label: 'reportGeneration', path: '/admin/reports' },
  ]},
  { section: 'System', items: [
    { icon: '⚙️', label: 'systemSettings', path: '/admin/settings' },
    { icon: '🔔', label: 'notifications', path: '/notifications' },
    { icon: '👤', label: 'profile', path: '/profile' },
  ]},
];

const DashboardSidebar = ({ mobileOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const navConfig = user?.role === 'farmer' ? farmerNav : user?.role === 'admin' ? adminNav : buyerNav;
  const roleColors = { farmer: '#2E7D32', buyer: '#1976D2', admin: '#7B1FA2' };
  const roleColor = roleColors[user?.role] || '#2E7D32';

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      {mobileOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} onClick={onClose} />}
      <aside className={`dashboard-sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${roleColor}, ${roleColor}99)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🌿</div>
          <div>
            <div className="sidebar-logo-text" style={{ color: roleColor }}>AgroConnect</div>
            <div style={{ fontSize: '0.7rem', color: '#90A4AE', textTransform: 'capitalize' }}>{t(user?.role)} Panel</div>
          </div>
        </div>

        {/* User Card */}
        <div style={{ margin: '1rem', padding: '0.85rem', background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 36, height: 36, background: roleColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1B2631', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#546E7A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navConfig.map((section) => (
            <div key={section.section}>
              <div className="sidebar-section">{section.section}</div>
              {section.items.map((item) => (
                <NavLink key={item.path} to={item.path} className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <span className="sidebar-icon">{item.icon}</span>
                  <span>{t(item.label) || item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '1rem', marginTop: 'auto', borderTop: '1px solid #E0E0E0' }}>
          <button onClick={handleLogout} className="sidebar-item" style={{ width: '100%', color: '#E53935', border: 'none', background: 'none', cursor: 'pointer' }}>
            <span className="sidebar-icon">🚪</span>
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const mockNotifications = [
  { _id: '1', title: 'Heavy Rainfall Alert', message: 'Heavy rainfall expected in your area tomorrow. Please ensure proper drainage for your crops.', type: 'weather', isRead: false, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), icon: '🌧️' },
  { _id: '2', title: 'Order Delivered!', message: 'Your order #AGR1734001 has been delivered successfully.', type: 'order', isRead: false, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), icon: '📦' },
  { _id: '3', title: 'PM-KISAN Payment Credited', message: 'Your PM-KISAN installment of ₹2000 has been credited to your linked bank account.', type: 'scheme', isRead: true, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), icon: '🏛️' },
  { _id: '4', title: 'Disease Alert – Tomato Crop', message: 'Our AI system detected early signs of leaf blight in your Tomato field. Take immediate action.', type: 'alert', isRead: false, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), icon: '🔬' },
  { _id: '5', title: 'Groundnut Ready for Harvest', message: 'Your Groundnut crop in East Field is nearing harvest. Estimated 11 days to optimal harvest time.', type: 'crop', isRead: true, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), icon: '🌾' },
  { _id: '6', title: 'New Government Scheme', message: 'A new subsidy scheme "Krishi Yantra Anudaan" is available for tractors and farm equipment.', type: 'scheme', isRead: true, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), icon: '🚜' },
];

const typeColors = { weather: '#E3F2FD', order: '#E8F5E9', scheme: '#F3E5F5', alert: '#FFEBEE', crop: '#FFF8E1' };
const typeText = { weather: '#1565C0', order: '#1B5E20', scheme: '#7B1FA2', alert: '#B71C1C', crop: '#E65100' };

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications.filter(n => n.type === filter);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getRelativeTime = (dateStr) => {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 3600) return `${Math.round(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.round(diff / 3600)} hours ago`;
    return `${Math.round(diff / 86400)} days ago`;
  };

  return (
    <DashboardLayout title="Notifications" subtitle={`${unreadCount} unread notifications`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[['all', '🔔', 'All'], ['unread', '🆕', 'Unread'], ['weather', '🌤️', 'Weather'], ['order', '📦', 'Orders'], ['scheme', '🏛️', 'Schemes'], ['alert', '⚠️', 'Alerts']].map(([val, icon, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{ padding: '0.4rem 0.9rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', background: filter === val ? '#2E7D32' : 'white', color: filter === val ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>{icon} {label}</button>
          ))}
        </div>
        {unreadCount > 0 && <button className="btn btn-sm btn-secondary" onClick={markAllRead}>✓ Mark All Read</button>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map(notif => (
          <div key={notif._id} onClick={() => markRead(notif._id)} style={{ background: 'white', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `1px solid ${notif.isRead ? '#F0F0F0' : typeColors[notif.type]}`, cursor: 'pointer', transition: 'all 0.2s', opacity: notif.isRead ? 0.85 : 1 }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, background: typeColors[notif.type], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{notif.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: notif.isRead ? 600 : 800, fontSize: '0.95rem', color: '#1B2631' }}>{notif.title}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0, marginLeft: '0.5rem' }}>
                    {!notif.isRead && <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeText[notif.type] }} />}
                    <span style={{ fontSize: '0.75rem', color: '#90A4AE', whiteSpace: 'nowrap' }}>{getRelativeTime(notif.createdAt)}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#546E7A', margin: '0.25rem 0 0' }}>{notif.message}</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="empty-state"><div className="empty-state-icon">🔔</div><div className="empty-state-title">No notifications</div></div>}
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;

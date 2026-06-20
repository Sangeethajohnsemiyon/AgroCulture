import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { marketAPI, orderAPI } from '../../api';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BuyerDashboard = () => {
  const recentOrders = [
    { id: 'ORD001', item: 'Organic Tomatoes', amount: 585, status: 'delivered', date: '2024-12-10' },
    { id: 'ORD002', item: 'Alphonso Mangoes', amount: 240, status: 'shipped', date: '2024-12-12' },
    { id: 'ORD003', item: 'Groundnut Oil', amount: 195, status: 'processing', date: '2024-12-14' },
  ];

  const spendingData = [
    { month: 'Jul', spend: 820 }, { month: 'Aug', spend: 1250 }, { month: 'Sep', spend: 680 },
    { month: 'Oct', spend: 1450 }, { month: 'Nov', spend: 1100 }, { month: 'Dec', spend: 1620 },
  ];

  const categorySpend = [{ name: 'Vegetables', value: 35 }, { name: 'Fruits', value: 28 }, { name: 'Grains', value: 20 }, { name: 'Other', value: 17 }];
  const COLORS = ['#2E7D32', '#4CAF50', '#81C784', '#C8E6C9'];

  const statusColors = { placed: '#1565C0', confirmed: '#7B1FA2', processing: '#E65100', shipped: '#006064', delivered: '#1B5E20', cancelled: '#B71C1C' };
  const statusBg = { placed: '#E3F2FD', confirmed: '#F3E5F5', processing: '#FFF3E0', shipped: '#E0F7FA', delivered: '#E8F5E9', cancelled: '#FFEBEE' };

  return (
    <DashboardLayout title="Buyer Dashboard" subtitle="Your shopping summary and recent activity">
      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        {[
          { icon: '📦', label: 'Total Orders', value: '28', color: 'blue', change: '+3 this month' },
          { icon: '✅', label: 'Delivered', value: '24', color: 'green', change: '85% success rate' },
          { icon: '💰', label: 'Total Spent', value: '₹6.9K', color: 'accent', change: 'This year' },
          { icon: '❤️', label: 'Saved Items', value: '12', color: 'red', change: 'Wishlist' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change up">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: '🛍️', label: 'Browse Marketplace', path: '/marketplace', color: '#E8F5E9' },
          { icon: '🛒', label: 'View Cart', path: '/buyer/cart', color: '#E3F2FD' },
          { icon: '📦', label: 'My Orders', path: '/buyer/orders', color: '#FFF8E1' },
          { icon: '🌤️', label: 'Weather', path: '/weather', color: '#E0F7FA' },
        ].map(a => (
          <Link key={a.label} to={a.path} style={{ padding: '1.25rem', background: a.color, borderRadius: '14px', textAlign: 'center', display: 'block', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{a.icon}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1B2631' }}>{a.label}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="chart-container">
          <div className="chart-title">💰 Monthly Spending (₹)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v}`} />
              <Tooltip formatter={v => [`₹${v}`]} />
              <Bar dataKey="spend" fill="url(#greenGrad2)" radius={[6,6,0,0]} />
              <defs><linearGradient id="greenGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4CAF50"/><stop offset="100%" stopColor="#2E7D32"/></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <div className="chart-title">🥧 Spend by Category</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categorySpend} cx="50%" cy="50%" outerRadius={75} dataKey="value">
                {categorySpend.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={v => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div className="chart-title">📦 Recent Orders</div>
          <Link to="/buyer/orders" style={{ color: '#2E7D32', fontWeight: 600, fontSize: '0.875rem' }}>View All →</Link>
        </div>
        {recentOrders.map((order, i) => (
          <div key={order.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', background: '#F8F9FA', borderRadius: '12px', marginBottom: i < recentOrders.length - 1 ? '0.6rem' : 0 }}>
            <div style={{ width: 40, height: 40, background: statusBg[order.status] || '#E8F5E9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>📦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{order.item}</div>
              <div style={{ fontSize: '0.75rem', color: '#90A4AE' }}>#{order.id} • {new Date(order.date).toLocaleDateString('en-IN')}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: '#1B2631' }}>₹{order.amount}</div>
              <span className="badge" style={{ background: statusBg[order.status] || '#E8F5E9', color: statusColors[order.status] || '#2E7D32', fontSize: '0.75rem', textTransform: 'capitalize' }}>{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboard;

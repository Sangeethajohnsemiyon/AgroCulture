import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { adminAPI } from '../../api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useLang } from '../../context/LangContext';

const AdminDashboard = () => {
  const { t, lang } = useLang();
  const [stats, setStats] = useState({ totalUsers: 1247, farmers: 680, buyers: 541, totalProducts: 3420, totalOrders: 8960, revenue: 4250000 });

  const monthlyData = [
    { month: 'Jul', users: 45, orders: 320, revenue: 285000 },
    { month: 'Aug', users: 62, orders: 445, revenue: 390000 },
    { month: 'Sep', users: 38, orders: 287, revenue: 241000 },
    { month: 'Oct', users: 78, orders: 521, revenue: 455000 },
    { month: 'Nov', users: 92, orders: 612, revenue: 538000 },
    { month: 'Dec', users: 115, orders: 745, revenue: 672000 },
  ];

  const roleData = [{ name: 'Farmers', value: 680 }, { name: 'Buyers', value: 541 }, { name: 'Admins', value: 26 }];
  const COLORS = ['#2E7D32', '#1976D2', '#F9A825'];

  const recentOrders = [
    { id: 'ORD9945', user: 'Anita Sharma', amount: 485, status: 'delivered', date: '2024-12-15' },
    { id: 'ORD9944', user: 'Ravi Kumar', amount: 240, status: 'shipped', date: '2024-12-15' },
    { id: 'ORD9943', user: 'Priya M', amount: 795, status: 'processing', date: '2024-12-14' },
    { id: 'ORD9942', user: 'Siva Ram', amount: 180, status: 'confirmed', date: '2024-12-14' },
    { id: 'ORD9941', user: 'Meena K', amount: 1240, status: 'placed', date: '2024-12-14' },
  ];

  const statusColors = { placed: '#1565C0', confirmed: '#7B1FA2', processing: '#E65100', shipped: '#006064', delivered: '#1B5E20', cancelled: '#B71C1C' };

  useEffect(() => {
    adminAPI.getStats().then(d => { if (d.success) setStats(d.stats); }).catch(() => {});
  }, []);

  return (
    <DashboardLayout title={t('adminDashboard')} subtitle={t('systemOverview')}>
      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', marginBottom: '2rem' }}>
        {[
          { icon: '👥', label: t('totalUsers'), value: stats.totalUsers?.toLocaleString(), color: 'blue', change: `+23 ${lang === 'en' ? 'today' : 'இன்று'}` },
          { icon: '👨‍🌾', label: t('farmersCount'), value: stats.farmers?.toLocaleString(), color: 'green', change: lang === 'en' ? 'Active farmers' : 'செயலில் உள்ள விவசாயிகள்' },
          { icon: '🛒', label: t('buyersCount'), value: stats.buyers?.toLocaleString(), color: 'accent', change: lang === 'en' ? 'Registered buyers' : 'பதிவுசெய்யப்பட்ட வாங்குபவர்கள்' },
          { icon: '📦', label: t('productsCount'), value: stats.totalProducts?.toLocaleString(), color: 'green', change: lang === 'en' ? 'Listed products' : 'பட்டியலிடப்பட்ட தயாரிப்புகள்' },
          { icon: '🛍️', label: t('totalOrdersCount'), value: stats.totalOrders?.toLocaleString(), color: 'blue', change: `+145 ${lang === 'en' ? 'this week' : 'இந்த வாரம்'}` },
          { icon: '💰', label: t('revenueCount'), value: `₹${((stats.revenue || 0)/100000).toFixed(1)}L`, color: 'accent', change: lang === 'en' ? 'Total revenue' : 'மொத்த வருவாய்' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change up" style={{ fontSize: '0.75rem' }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="chart-container">
          <div className="chart-title">📊 {t('platformGrowth')}</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#2E7D32" radius={[4,4,0,0]} name={lang === 'en' ? 'Orders' : 'ஆர்டர்கள்'} />
              <Bar dataKey="users" fill="#81C784" radius={[4,4,0,0]} name={lang === 'en' ? 'New Users' : 'புதிய பயனர்கள்'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <div className="chart-title">👥 {t('userDistribution')}</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label={({ name, value }) => `${lang === 'en' ? name : name === 'Farmers' ? 'விவசாயிகள்' : name === 'Buyers' ? 'வாங்குபவர்கள்' : 'நிர்வாகிகள்'}: ${value}`}>
                {roleData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="table-container">
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700 }}>{t('recentOrders')}</span>
          <a href="/admin/orders" style={{ color: '#2E7D32', fontWeight: 600, fontSize: '0.875rem' }}>{t('viewAll')}</a>
        </div>
        <table className="table">
          <thead><tr><th>{t('orderId')}</th><th>{t('customer')}</th><th>{t('amount')}</th><th>{t('statusLabel')}</th><th>{t('dateLabel')}</th><th>{t('actionLabel')}</th></tr></thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 700 }}>#{order.id}</td>
                <td>{order.user}</td>
                <td style={{ fontWeight: 700 }}>₹{order.amount}</td>
                <td><span className="badge" style={{ background: `${statusColors[order.status]}22`, color: statusColors[order.status], textTransform: 'capitalize' }}>{lang === 'en' ? order.status : order.status === 'delivered' ? 'வழங்கப்பட்டது' : order.status === 'shipped' ? 'அனுப்பப்பட்டது' : order.status === 'processing' ? 'செயலாக்கம்' : order.status === 'confirmed' ? 'உறுதி செய்யப்பட்டது' : 'வைக்கப்பட்டது'}</span></td>
                <td style={{ color: '#90A4AE' }}>{new Date(order.date).toLocaleDateString('en-IN')}</td>
                <td><button className="btn btn-sm btn-ghost" style={{ fontSize: '0.8rem' }}>{lang === 'en' ? 'Manage' : 'நிர்வகி'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

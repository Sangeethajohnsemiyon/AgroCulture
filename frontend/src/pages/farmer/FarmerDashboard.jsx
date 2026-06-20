import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { farmerAPI, marketAPI, weatherAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalCrops: 6, growing: 3, harvested: 2, planted: 1, totalWaterUsage: 12400 });
  const [crops, setCrops] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock monthly yield data
  const yieldData = [
    { month: 'Jul', yield: 450 }, { month: 'Aug', yield: 620 }, { month: 'Sep', yield: 380 },
    { month: 'Oct', yield: 710 }, { month: 'Nov', yield: 540 }, { month: 'Dec', yield: 830 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cropsRes, weatherRes] = await Promise.all([farmerAPI.getCrops(), weatherAPI.getWeather('Chennai')]);
        if (cropsRes.success) setCrops(cropsRes.crops || []);
        if (weatherRes.success) setWeather(weatherRes.current);
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  // Mock crops for display
  const mockCrops = [
    { _id: '1', cropName: 'Tomato', status: 'growing', growthStage: 68, plantingDate: '2024-10-15', expectedHarvestDate: '2025-01-20', fieldSize: 2 },
    { _id: '2', cropName: 'Paddy (Ponni)', status: 'planted', growthStage: 22, plantingDate: '2024-11-01', expectedHarvestDate: '2025-02-15', fieldSize: 5 },
    { _id: '3', cropName: 'Groundnut', status: 'growing', growthStage: 45, plantingDate: '2024-09-20', expectedHarvestDate: '2024-12-30', fieldSize: 3 },
    { _id: '4', cropName: 'Brinjal', status: 'harvested', growthStage: 100, plantingDate: '2024-07-01', expectedHarvestDate: '2024-10-01', fieldSize: 1 },
  ];

  const displayCrops = crops.length > 0 ? crops : mockCrops;

  const statusColors = { growing: '#2E7D32', planted: '#1976D2', harvested: '#F9A825', flowering: '#9C27B0', failed: '#E53935' };
  const statusBg = { growing: '#E8F5E9', planted: '#E3F2FD', harvested: '#FFF8E1', flowering: '#F3E5F5', failed: '#FFEBEE' };

  const notifications = [
    { icon: '🌧️', text: 'Heavy rainfall expected tomorrow. Ensure proper drainage.', time: '2 hrs ago', type: 'weather' },
    { icon: '🔔', text: 'Tomato crop ready for harvest in 5 days!', time: '5 hrs ago', type: 'crop' },
    { icon: '🏛️', text: 'PM-KISAN installment of ₹2000 credited to your account.', time: '1 day ago', type: 'scheme' },
    { icon: '🤖', text: 'AI detected early signs of leaf blight in Field 2. Take action!', time: '2 days ago', type: 'alert' },
  ];

  return (
    <DashboardLayout title="Farmer Dashboard" subtitle={`Welcome back, ${user?.name}! 🌱`}>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ opacity: 0.85, fontSize: '0.875rem', marginBottom: '0.4rem' }}>🌤️ Good {new Date().getHours() < 12 ? 'Morning' : 'Afternoon'}</div>
          <h2 style={{ color: 'white', fontSize: '1.6rem', marginBottom: '0.5rem' }}>{user?.name}'s Farm</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Your farm is doing great! 3 crops growing actively. 🌱</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/farmer/add-crop" className="btn btn-accent btn-sm">+ Add Crop</Link>
          <Link to="/farmer/disease-detection" className="btn btn-sm" style={{ border: '2px solid rgba(255,255,255,0.6)', color: 'white' }}>🔬 Detect Disease</Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {[
          { icon: '🌱', label: 'Total Crops', value: stats.totalCrops, color: 'green', change: '+2 this month' },
          { icon: '🌿', label: 'Growing', value: stats.growing, color: 'green', change: 'Active' },
          { icon: '✅', label: 'Harvested', value: stats.harvested, color: 'accent', change: 'Completed' },
          { icon: '💧', label: 'Water Used (L)', value: (stats.totalWaterUsage / 1000).toFixed(1) + 'K', color: 'blue', change: 'This season' },
          { icon: '🌡️', label: 'Temperature', value: weather ? `${weather.temp}°C` : '32°C', color: 'red', change: weather?.condition || 'Partly Cloudy' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change up" style={{ fontSize: '0.78rem', color: '#2E7D32' }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Crops Table */}
        <div className="chart-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div className="chart-title">My Crops Status</div>
            <Link to="/farmer/crop-monitor" style={{ fontSize: '0.85rem', color: '#2E7D32', fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {displayCrops.slice(0, 4).map(crop => (
              <div key={crop._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ width: 40, height: 40, background: statusBg[crop.status] || '#E8F5E9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🌱</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{crop.cropName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#546E7A' }}>{crop.fieldSize} acres • Harvest: {new Date(crop.expectedHarvestDate).toLocaleDateString('en-IN')}</div>
                  <div className="progress-bar" style={{ marginTop: '0.4rem' }}>
                    <div className="progress-fill" style={{ width: `${crop.growthStage}%` }} />
                  </div>
                </div>
                <span className="badge" style={{ background: statusBg[crop.status], color: statusColors[crop.status], textTransform: 'capitalize' }}>{crop.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="chart-container">
          <div className="chart-title">🔔 Notifications</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {notifications.map((n, i) => (
              <div key={i} style={{ padding: '0.75rem', background: '#F8F9FA', borderRadius: '10px', borderLeft: '3px solid #2E7D32' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem' }}>{n.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#1B2631', lineHeight: 1.5, margin: 0 }}>{n.text}</p>
                    <span style={{ fontSize: '0.7rem', color: '#90A4AE' }}>{n.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yield Chart */}
      <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div className="chart-title">📊 Monthly Yield (kg)</div>
          <Link to="/analytics/sales" style={{ fontSize: '0.85rem', color: '#2E7D32', fontWeight: 600 }}>Full Analytics →</Link>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={yieldData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#546E7A' }} />
            <YAxis tick={{ fontSize: 12, fill: '#546E7A' }} />
            <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E0E0E0' }} />
            <Bar dataKey="yield" fill="url(#greenGrad)" radius={[6, 6, 0, 0]} />
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4CAF50" />
                <stop offset="100%" stopColor="#2E7D32" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
        {[
          { icon: '🌱', label: 'Add Crop', path: '/farmer/add-crop', color: '#E8F5E9' },
          { icon: '💧', label: 'Log Water', path: '/farmer/water', color: '#E3F2FD' },
          { icon: '🧪', label: 'Add Fertilizer', path: '/farmer/fertilizer', color: '#FFF8E1' },
          { icon: '🔬', label: 'Check Disease', path: '/farmer/disease-detection', color: '#F3E5F5' },
          { icon: '🌤️', label: 'Weather', path: '/weather', color: '#E0F7FA' },
          { icon: '🚜', label: 'Rent Equipment', path: '/farmer/equipment', color: '#FFEBEE' },
        ].map(a => (
          <Link key={a.label} to={a.path} style={{ padding: '1.25rem', background: a.color, borderRadius: '14px', textAlign: 'center', display: 'block', transition: 'all 0.2s', border: '1px solid transparent' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{a.icon}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1B2631' }}>{a.label}</div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;

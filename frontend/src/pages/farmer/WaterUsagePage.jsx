import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const WaterUsagePage = () => {
  const [logs, setLogs] = useState([
    { id: 1, crop: 'Tomato', date: '2024-12-14', amount: 1200, unit: 'liters', method: 'drip', duration: 120 },
    { id: 2, crop: 'Paddy', date: '2024-12-13', amount: 8500, unit: 'liters', method: 'flood', duration: 180 },
    { id: 3, crop: 'Groundnut', date: '2024-12-12', amount: 950, unit: 'liters', method: 'sprinkler', duration: 90 },
    { id: 4, crop: 'Chilli', date: '2024-12-11', amount: 400, unit: 'liters', method: 'manual', duration: 45 },
  ]);
  const [form, setForm] = useState({ crop: '', date: '', amount: '', unit: 'liters', method: 'drip', duration: '' });
  const [showForm, setShowForm] = useState(false);

  const weeklyData = [
    { day: 'Mon', water: 2100 }, { day: 'Tue', water: 1850 }, { day: 'Wed', water: 3200 },
    { day: 'Thu', water: 2650 }, { day: 'Fri', water: 1900 }, { day: 'Sat', water: 2400 }, { day: 'Sun', water: 1600 },
  ];

  const totalThisWeek = weeklyData.reduce((a, b) => a + b.water, 0);

  const addLog = () => {
    setLogs(prev => [...prev, { ...form, id: Date.now() }]);
    setForm({ crop: '', date: '', amount: '', unit: 'liters', method: 'drip', duration: '' });
    setShowForm(false);
    toast.success('Water usage logged! 💧');
  };

  return (
    <DashboardLayout title="Water Usage Tracker" subtitle="Monitor irrigation and water consumption">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { icon: '💧', label: 'This Week', value: `${(totalThisWeek/1000).toFixed(1)}K L`, color: '#E3F2FD' },
          { icon: '🏃', label: 'Daily Avg', value: `${Math.round(totalThisWeek/7)} L`, color: '#E8F5E9' },
          { icon: '💦', label: 'Drip Coverage', value: '65%', color: '#E0F7FA' },
          { icon: '📉', label: 'Savings vs Flood', value: '42%', color: '#FFF3E0' },
        ].map(s => (
          <div key={s.label} style={{ background: s.color, borderRadius: '14px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#546E7A' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>+ Log Water Usage</button>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Crop</label><input className="form-input" value={form.crop} onChange={e => setForm({...form, crop: e.target.value})} placeholder="Crop name" /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Date</label><input className="form-input" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Method</label><select className="form-input form-select" value={form.method} onChange={e => setForm({...form, method: e.target.value})}><option>drip</option><option>sprinkler</option><option>flood</option><option>manual</option></select></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Amount (liters)</label><input className="form-input" type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} placeholder="1200" /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Duration (minutes)</label><input className="form-input" type="number" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="90" /></div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button className="btn btn-primary btn-sm" onClick={addLog}>💧 Save Log</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
        <div className="chart-title">💧 Water Usage This Week</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weeklyData}>
            <defs><linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1976D2" stopOpacity={0.3}/><stop offset="100%" stopColor="#1976D2" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${v}L`} />
            <Tooltip formatter={v => [`${v} liters`]} />
            <Area type="monotone" dataKey="water" stroke="#1976D2" fill="url(#waterGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="table-container">
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #F0F0F0', fontWeight: 700 }}>Irrigation History</div>
        <table className="table">
          <thead><tr><th>Crop</th><th>Date</th><th>Method</th><th>Amount</th><th>Duration</th></tr></thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td style={{ fontWeight: 600 }}>{log.crop}</td>
                <td style={{ color: '#90A4AE' }}>{log.date}</td>
                <td><span className="badge badge-info" style={{ textTransform: 'capitalize' }}>{log.method}</span></td>
                <td style={{ fontWeight: 600 }}>💧 {log.amount.toLocaleString()} L</td>
                <td>{log.duration} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default WaterUsagePage;

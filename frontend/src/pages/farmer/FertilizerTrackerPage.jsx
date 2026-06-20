import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const FertilizerTrackerPage = () => {
  const [logs, setLogs] = useState([
    { id: 1, crop: 'Tomato', date: '2024-12-10', name: 'Urea (46-0-0)', type: 'chemical', amount: 25, unit: 'kg', notes: 'Top dressing after 45 days' },
    { id: 2, crop: 'Paddy', date: '2024-12-05', name: 'DAP (18-46-0)', type: 'chemical', amount: 50, unit: 'kg', notes: 'Basal application' },
    { id: 3, crop: 'Groundnut', date: '2024-11-30', name: 'Vermicompost', type: 'organic', amount: 200, unit: 'kg', notes: 'Mixed with soil before planting' },
    { id: 4, crop: 'Chilli', date: '2024-11-25', name: 'Neem Cake', type: 'bio', amount: 30, unit: 'kg', notes: 'Pest management + nutrition' },
  ]);
  const [form, setForm] = useState({ crop: '', date: '', name: '', type: 'chemical', amount: '', unit: 'kg', notes: '' });
  const [showForm, setShowForm] = useState(false);

  const chartData = [
    { month: 'Sep', organic: 150, chemical: 80, bio: 30 },
    { month: 'Oct', organic: 120, chemical: 120, bio: 45 },
    { month: 'Nov', organic: 200, chemical: 75, bio: 60 },
    { month: 'Dec', organic: 180, chemical: 100, bio: 40 },
  ];

  const typeColors = { chemical: '#E3F2FD', organic: '#E8F5E9', bio: '#FFF3E0' };
  const typeText = { chemical: '#1565C0', organic: '#2E7D32', bio: '#E65100' };

  const addLog = () => {
    setLogs(prev => [...prev, { ...form, id: Date.now() }]);
    setForm({ crop: '', date: '', name: '', type: 'chemical', amount: '', unit: 'kg', notes: '' });
    setShowForm(false);
    toast.success('Fertilizer usage logged!');
  };

  return (
    <DashboardLayout title="Fertilizer Tracker" subtitle="Monitor and log fertilizer applications">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>+ Log Fertilizer Use</button>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h4 style={{ marginBottom: '1.25rem' }}>🧪 Add Fertilizer Record</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Crop Name</label>
              <input className="form-input" placeholder="e.g., Tomato" value={form.crop} onChange={e => setForm({...form, crop: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Date Applied</label>
              <input className="form-input" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Fertilizer Name</label>
              <input className="form-input" placeholder="e.g., Urea, DAP" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Type</label>
              <select className="form-input form-select" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="chemical">Chemical</option>
                <option value="organic">Organic</option>
                <option value="bio">Bio-fertilizer</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Amount</label>
              <input className="form-input" type="number" placeholder="25" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Unit</label>
              <select className="form-input form-select" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
                <option>kg</option><option>gram</option><option>liter</option>
              </select>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">Notes</label>
            <input className="form-input" placeholder="Application notes..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button className="btn btn-primary btn-sm" onClick={addLog}>✅ Save Record</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
        <div className="chart-title">📊 Fertilizer Usage by Month (kg)</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="organic" fill="#2E7D32" name="Organic" radius={[4,4,0,0]} />
            <Bar dataKey="chemical" fill="#1976D2" name="Chemical" radius={[4,4,0,0]} />
            <Bar dataKey="bio" fill="#F9A825" name="Bio" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Logs Table */}
      <div className="table-container">
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #F0F0F0', fontWeight: 700 }}>Application History</div>
        <table className="table">
          <thead><tr><th>Crop</th><th>Date</th><th>Fertilizer</th><th>Type</th><th>Amount</th><th>Notes</th></tr></thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td style={{ fontWeight: 600 }}>{log.crop}</td>
                <td style={{ color: '#90A4AE', fontSize: '0.875rem' }}>{log.date}</td>
                <td>{log.name}</td>
                <td><span className="badge" style={{ background: typeColors[log.type], color: typeText[log.type], textTransform: 'capitalize' }}>{log.type}</span></td>
                <td style={{ fontWeight: 600 }}>{log.amount} {log.unit}</td>
                <td style={{ color: '#546E7A', fontSize: '0.85rem' }}>{log.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default FertilizerTrackerPage;

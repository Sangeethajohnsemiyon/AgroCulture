import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { analyticsAPI } from '../../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const SalesAnalyticsPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => { analyticsAPI.getSales().then(d => { if (d.success) setData(d); }).catch(() => {}); }, []);

  const salesData = data?.salesData || [
    { month: 'Jan', sales: 32000, orders: 45, revenue: 28000 }, { month: 'Feb', sales: 41000, orders: 62, revenue: 35000 },
    { month: 'Mar', sales: 29000, orders: 38, revenue: 25000 }, { month: 'Apr', sales: 55000, orders: 78, revenue: 48000 },
    { month: 'May', sales: 48000, orders: 65, revenue: 42000 }, { month: 'Jun', sales: 62000, orders: 89, revenue: 54000 },
    { month: 'Jul', sales: 38000, orders: 51, revenue: 33000 }, { month: 'Aug', sales: 71000, orders: 95, revenue: 62000 },
    { month: 'Sep', sales: 45000, orders: 60, revenue: 39000 }, { month: 'Oct', sales: 58000, orders: 80, revenue: 50000 },
    { month: 'Nov', sales: 67000, orders: 92, revenue: 58000 }, { month: 'Dec', sales: 84000, orders: 112, revenue: 73000 },
  ];
  const categoryData = [{ name: 'Vegetables', value: 35 }, { name: 'Fruits', value: 25 }, { name: 'Grains', value: 20 }, { name: 'Pulses', value: 12 }, { name: 'Others', value: 8 }];
  const COLORS = ['#2E7D32', '#4CAF50', '#81C784', '#A5D6A7', '#C8E6C9'];
  const summary = data?.summary || { totalSales: 630000, totalOrders: 867, avgOrderValue: 727, growth: 23.5 };

  return (
    <DashboardLayout title="Sales Analytics" subtitle="Track your sales performance over time">
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        {[
          { icon: '💰', label: 'Total Sales', value: `₹${(summary.totalSales/1000).toFixed(0)}K`, color: 'green' },
          { icon: '📦', label: 'Total Orders', value: summary.totalOrders, color: 'blue' },
          { icon: '📊', label: 'Avg Order Value', value: `₹${summary.avgOrderValue}`, color: 'accent' },
          { icon: '📈', label: 'Growth Rate', value: `+${summary.growth}%`, color: 'green' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
        <div className="chart-title">📊 Monthly Sales & Revenue</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v/1000}K`} />
            <Tooltip formatter={(v, n) => [`₹${v.toLocaleString()}`, n === 'sales' ? 'Sales' : 'Revenue']} />
            <Legend />
            <Bar dataKey="sales" fill="#2E7D32" radius={[4,4,0,0]} name="Sales" />
            <Bar dataKey="revenue" fill="#81C784" radius={[4,4,0,0]} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="chart-container">
          <div className="chart-title">📈 Monthly Orders Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#F9A825" strokeWidth={3} dot={{ fill: '#F9A825', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <div className="chart-title">🥧 Sales by Category</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesAnalyticsPage;

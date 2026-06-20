import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { analyticsAPI } from '../../api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ProfitAnalysisPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => { analyticsAPI.getProfit().then(d => { if (d.success) setData(d); }).catch(() => {}); }, []);

  const profitData = data?.profitData || [
    { month: 'Jul', revenue: 62000, cost: 28000, profit: 34000 },
    { month: 'Aug', revenue: 84000, cost: 35000, profit: 49000 },
    { month: 'Sep', revenue: 51000, cost: 22000, profit: 29000 },
    { month: 'Oct', revenue: 73000, cost: 31000, profit: 42000 },
    { month: 'Nov', revenue: 91000, cost: 38000, profit: 53000 },
    { month: 'Dec', revenue: 108000, cost: 42000, profit: 66000 },
  ];
  const summary = data?.summary || { totalRevenue: 469000, totalCost: 196000, netProfit: 273000, profitMargin: 58.2 };

  return (
    <DashboardLayout title="Profit Analysis" subtitle="Monitor revenue, costs, and net profit">
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        {[
          { icon: '💰', label: 'Total Revenue', value: `₹${(summary.totalRevenue/1000).toFixed(0)}K`, color: 'green' },
          { icon: '📉', label: 'Total Cost', value: `₹${(summary.totalCost/1000).toFixed(0)}K`, color: 'red' },
          { icon: '💵', label: 'Net Profit', value: `₹${(summary.netProfit/1000).toFixed(0)}K`, color: 'accent' },
          { icon: '📊', label: 'Profit Margin', value: `${summary.profitMargin}%`, color: 'blue' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
        <div className="chart-title">📈 Revenue vs Cost vs Profit Trend</div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={profitData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2E7D32" stopOpacity={0.3}/><stop offset="100%" stopColor="#2E7D32" stopOpacity={0}/></linearGradient>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F9A825" stopOpacity={0.3}/><stop offset="100%" stopColor="#F9A825" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v/1000}K`} />
            <Tooltip formatter={v => [`₹${v.toLocaleString()}`]} />
            <Area type="monotone" dataKey="revenue" stroke="#2E7D32" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
            <Area type="monotone" dataKey="profit" stroke="#F9A825" fill="url(#profitGrad)" strokeWidth={2} name="Profit" />
            <Area type="monotone" dataKey="cost" stroke="#E53935" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Cost" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <div className="chart-title">💰 Monthly Profit Breakdown</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v/1000}K`} />
            <Tooltip formatter={v => [`₹${v.toLocaleString()}`]} />
            <Bar dataKey="revenue" fill="#81C784" name="Revenue" stackId="a" />
            <Bar dataKey="profit" fill="#2E7D32" name="Profit" stackId="b" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
};

export default ProfitAnalysisPage;

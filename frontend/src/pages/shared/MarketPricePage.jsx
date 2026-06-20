import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { analyticsAPI } from '../../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MarketPricePage = () => {
  const [data, setData] = useState(null);
  useEffect(() => { analyticsAPI.getMarketPrices().then(d => { if (d.success) setData(d); }).catch(() => {}); }, []);

  const priceData = data?.priceData || [
    { crop: 'Tomato', currentPrice: 45, lastWeek: 38, prediction: 52, unit: 'per kg', trend: 'up', changePercent: '18.4' },
    { crop: 'Onion', currentPrice: 35, lastWeek: 42, prediction: 30, unit: 'per kg', trend: 'down', changePercent: '-16.7' },
    { crop: 'Potato', currentPrice: 28, lastWeek: 25, prediction: 31, unit: 'per kg', trend: 'up', changePercent: '12.0' },
    { crop: 'Rice', currentPrice: 58, lastWeek: 60, prediction: 55, unit: 'per kg', trend: 'down', changePercent: '-3.3' },
    { crop: 'Groundnut', currentPrice: 85, lastWeek: 79, prediction: 92, unit: 'per kg', trend: 'up', changePercent: '7.6' },
    { crop: 'Chilli', currentPrice: 95, lastWeek: 88, prediction: 110, unit: 'per kg', trend: 'up', changePercent: '7.9' },
    { crop: 'Turmeric', currentPrice: 185, lastWeek: 172, prediction: 200, unit: 'per kg', trend: 'up', changePercent: '7.5' },
  ];

  const weeklyTrend = data?.weeklyTrend || [
    { day: 'Mon', tomato: 42, onion: 45, potato: 26 }, { day: 'Tue', tomato: 43, onion: 43, potato: 27 },
    { day: 'Wed', tomato: 44, onion: 40, potato: 27 }, { day: 'Thu', tomato: 46, onion: 38, potato: 28 },
    { day: 'Fri', tomato: 45, onion: 36, potato: 28 }, { day: 'Sat', tomato: 48, onion: 35, potato: 29 },
    { day: 'Sun', tomato: 45, onion: 35, potato: 28 },
  ];

  return (
    <DashboardLayout title="Market Price Prediction" subtitle="Real-time crop prices and AI predictions">
      {/* Price Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {priceData.map(item => (
          <div key={item.crop} style={{ background: 'white', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `2px solid ${item.trend === 'up' ? '#C8E6C9' : '#FFCDD2'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{item.crop}</div>
              <span style={{ background: item.trend === 'up' ? '#E8F5E9' : '#FFEBEE', color: item.trend === 'up' ? '#2E7D32' : '#E53935', fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                {item.trend === 'up' ? '↑' : '↓'} {Math.abs(Number(item.changePercent)).toFixed(1)}%
              </span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1B2631', marginBottom: '0.25rem' }}>₹{item.currentPrice}</div>
            <div style={{ fontSize: '0.75rem', color: '#90A4AE', marginBottom: '0.75rem' }}>{item.unit}</div>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ flex: 1, background: '#F8F9FA', borderRadius: '8px', padding: '0.4rem 0.6rem' }}>
                <div style={{ color: '#90A4AE' }}>Last Week</div>
                <div style={{ fontWeight: 700 }}>₹{item.lastWeek}</div>
              </div>
              <div style={{ flex: 1, background: item.trend === 'up' ? '#E8F5E9' : '#FFEBEE', borderRadius: '8px', padding: '0.4rem 0.6rem' }}>
                <div style={{ color: '#90A4AE' }}>🤖 Predicted</div>
                <div style={{ fontWeight: 700, color: item.trend === 'up' ? '#2E7D32' : '#E53935' }}>₹{item.prediction}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Trend Chart */}
      <div className="chart-container">
        <div className="chart-title">📈 Weekly Price Trend – Top Crops</div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v}`} />
            <Tooltip formatter={v => [`₹${v}/kg`]} />
            <Line type="monotone" dataKey="tomato" stroke="#E53935" strokeWidth={2} name="Tomato" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="onion" stroke="#9C27B0" strokeWidth={2} name="Onion" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="potato" stroke="#F9A825" strokeWidth={2} name="Potato" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
};

export default MarketPricePage;

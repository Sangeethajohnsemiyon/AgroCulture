import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { weatherAPI } from '../../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const WeatherPage = () => {
  const [city, setCity] = useState('Chennai');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const cities = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await weatherAPI.getWeather(city);
        if (data.success) setWeather(data);
      } catch {}
      setLoading(false);
    };
    fetch();
  }, [city]);

  const conditionIcons = { 'Sunny': '☀️', 'Cloudy': '☁️', 'Rainy': '🌧️', 'Partly Cloudy': '⛅', 'Thunderstorm': '⛈️', 'Hot & Sunny': '🌞' };

  if (loading) return <DashboardLayout title="Weather Monitor"><div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner" /></div></DashboardLayout>;

  const current = weather?.current;
  const forecast = weather?.forecast || [];
  const alerts = weather?.alerts || [];
  const advice = weather?.seasonalAdvice;

  return (
    <DashboardLayout title="Weather Monitor" subtitle="Real-time weather and crop-specific alerts">
      {/* City Selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {cities.map(c => (
          <button key={c} onClick={() => setCity(c)} style={{ padding: '0.5rem 1.25rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', background: city === c ? 'linear-gradient(135deg, #2E7D32, #4CAF50)' : 'white', color: city === c ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      {/* Alerts */}
      {alerts.map((alert, i) => (
        <div key={i} style={{ padding: '1rem 1.25rem', background: alert.severity === 'high' ? '#FFEBEE' : '#FFF3E0', borderRadius: '12px', marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center', border: `1px solid ${alert.severity === 'high' ? '#FFCDD2' : '#FFE0B2'}` }}>
          <span style={{ fontSize: '1.4rem' }}>{alert.type === 'heat' ? '🌡️' : '🌧️'}</span>
          <div><div style={{ fontWeight: 700, color: alert.severity === 'high' ? '#E53935' : '#E65100', fontSize: '0.9rem' }}>⚠️ Weather Alert</div><div style={{ fontSize: '0.875rem', color: '#546E7A' }}>{alert.message}</div></div>
        </div>
      ))}

      {/* Current Weather Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1976D2, #0D47A1)', borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem', color: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>📍 {current?.city}, Tamil Nadu</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '4rem' }}>{conditionIcons[current?.condition] || '🌤️'}</span>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>{current?.temp}°C</div>
                <div style={{ opacity: 0.8 }}>{current?.condition}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Feels like {current?.feels_like}°C • Updated just now</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: '💧', label: 'Humidity', value: `${current?.humidity}%` },
              { icon: '🌬️', label: 'Wind', value: `${current?.wind} km/h` },
              { icon: '🌧️', label: 'Rainfall', value: `${current?.rainfall} mm` },
              { icon: '☀️', label: 'UV Index', value: current?.uv },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '1rem', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.value}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
        <div className="chart-title">📅 7-Day Forecast</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {forecast.map((day, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1rem 0.5rem', background: i === 0 ? '#E3F2FD' : '#F8F9FA', borderRadius: '12px', border: i === 0 ? '1px solid #BBDEFB' : '1px solid transparent' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#546E7A', marginBottom: '0.5rem' }}>{day.day}</div>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{day.icon}</div>
              <div style={{ fontWeight: 800, fontSize: '1rem' }}>{day.temp}°C</div>
              <div style={{ fontSize: '0.7rem', color: '#90A4AE' }}>{day.minTemp}°</div>
              <div style={{ fontSize: '0.7rem', color: '#1976D2', marginTop: '0.3rem' }}>💧{day.rainfall}mm</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Temperature Chart */}
        <div className="chart-container">
          <div className="chart-title">🌡️ Temperature Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#2E7D32" strokeWidth={2} dot={{ fill: '#2E7D32', r: 4 }} />
              <Line type="monotone" dataKey="minTemp" stroke="#81C784" strokeWidth={2} strokeDasharray="4 4" dot={{ fill: '#81C784', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Seasonal Advice */}
        <div className="chart-container">
          <div className="chart-title">🌾 Seasonal Farming Advice</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontWeight: 600, color: '#2E7D32', marginBottom: '0.5rem' }}>Current Season: {advice?.season}</div>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>✅ Suitable Crops:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {advice?.suitable_crops?.map(c => <span key={c} className="tag">{c}</span>)}
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>💡 Farming Tips:</div>
            {advice?.farming_tips?.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#546E7A' }}>
                <span style={{ color: '#2E7D32', fontWeight: 700, minWidth: 16 }}>•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WeatherPage;

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F1F8E9, #E8F5E9)', textAlign: 'center', padding: '2rem' }}>
    <div style={{ fontSize: '8rem', marginBottom: '1.5rem', animation: 'float 3s ease-in-out infinite' }}>🌾</div>
    <h1 style={{ fontSize: '6rem', color: '#2E7D32', margin: 0, lineHeight: 1 }}>404</h1>
    <h2 style={{ marginBottom: '1rem', color: '#1B2631' }}>Oops! Field Not Found</h2>
    <p style={{ color: '#546E7A', maxWidth: 400, marginBottom: '2rem' }}>The page you're looking for has gone off the farm. Let's get you back to the main fields!</p>
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Link to="/" className="btn btn-primary">🏠 Back to Home</Link>
      <Link to="/marketplace" className="btn btn-secondary">🛒 Browse Marketplace</Link>
    </div>
  </div>
);

export default NotFoundPage;

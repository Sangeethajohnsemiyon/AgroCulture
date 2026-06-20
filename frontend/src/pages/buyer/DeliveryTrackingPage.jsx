import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useParams } from 'react-router-dom';

const DeliveryTrackingPage = () => {
  const { id } = useParams();
  const timeline = [
    { status: 'placed', message: 'Order placed successfully', timestamp: '2024-12-12 10:30', location: 'Online', done: true },
    { status: 'confirmed', message: 'Order confirmed by farmer', timestamp: '2024-12-12 11:45', location: 'Coimbatore', done: true },
    { status: 'processing', message: 'Order being prepared for shipment', timestamp: '2024-12-13 08:00', location: 'Coimbatore Farm', done: true },
    { status: 'shipped', message: 'Package shipped via Delhivery Express', timestamp: '2024-12-13 14:00', location: 'Coimbatore Hub', done: true },
    { status: 'out_for_delivery', message: 'Out for delivery with courier partner', timestamp: null, location: 'Chennai Delivery Hub', done: false },
    { status: 'delivered', message: 'Delivered to your address', timestamp: null, location: 'Your Address', done: false },
  ];

  return (
    <DashboardLayout title="Delivery Tracking" subtitle={`Order #AGR${id || '1733980'}`}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Map Placeholder */}
        <div style={{ background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', textAlign: 'center', height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
          <div style={{ fontWeight: 700, color: '#1565C0' }}>Tracking Map</div>
          <div style={{ color: '#1976D2', fontSize: '0.875rem' }}>Your package is in transit • ETA: Tomorrow by 6 PM</div>
        </div>

        {/* Current Status */}
        <div style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', color: 'white' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚚</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>Package Shipped</div>
          <div style={{ opacity: 0.85, marginTop: '0.25rem' }}>Expected delivery: Tomorrow, Dec 14 by 6:00 PM</div>
          <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.75rem', fontSize: '0.875rem' }}>
            📦 Tracking No: <strong>DLV9876543210</strong> (Delhivery Express)
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h4 style={{ marginBottom: '1.5rem' }}>📍 Tracking Timeline</h4>
          {timeline.map((step, i) => (
            <div key={step.status} style={{ display: 'flex', gap: '1.25rem', marginBottom: i < timeline.length - 1 ? '1.5rem' : 0, position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: step.done ? '#2E7D32' : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.done ? 'white' : '#90A4AE', fontWeight: 700, fontSize: '1rem', zIndex: 1 }}>{step.done ? '✓' : '○'}</div>
                {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: step.done ? '#2E7D32' : '#E0E0E0', marginTop: '0.25rem', minHeight: 40 }} />}
              </div>
              <div style={{ paddingTop: '0.4rem', paddingBottom: '0.75rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: step.done ? '#1B2631' : '#90A4AE' }}>{step.message}</div>
                <div style={{ fontSize: '0.8rem', color: step.done ? '#546E7A' : '#BDBDBD', marginTop: '0.25rem' }}>📍 {step.location} {step.timestamp && `• ${step.timestamp}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryTrackingPage;

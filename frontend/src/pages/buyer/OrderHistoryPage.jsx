import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Link } from 'react-router-dom';

const mockOrders = [
  { _id: 'ORD001', trackingNumber: 'AGR1734001', orderStatus: 'delivered', totalAmount: 585, items: [{ name: 'Organic Tomatoes', quantity: 3, price: 45 }, { name: 'Country Eggs', quantity: 2, price: 185 }], createdAt: '2024-12-10', deliveryDate: '2024-12-13', paymentMethod: 'upi' },
  { _id: 'ORD002', trackingNumber: 'AGR1733980', orderStatus: 'shipped', totalAmount: 240, items: [{ name: 'Alphonso Mangoes', quantity: 2, price: 120 }], createdAt: '2024-12-12', paymentMethod: 'cod' },
  { _id: 'ORD003', trackingNumber: 'AGR1733950', orderStatus: 'processing', totalAmount: 195, items: [{ name: 'Groundnut Oil', quantity: 1, price: 195 }], createdAt: '2024-12-14', paymentMethod: 'card' },
  { _id: 'ORD004', trackingNumber: 'AGR1733920', orderStatus: 'placed', totalAmount: 430, items: [{ name: 'Dragon Fruit', quantity: 2, price: 200 }, { name: 'Spinach', quantity: 1, price: 30 }], createdAt: '2024-12-15', paymentMethod: 'upi' },
  { _id: 'ORD005', trackingNumber: 'AGR1733800', orderStatus: 'cancelled', totalAmount: 320, items: [{ name: 'Turmeric Powder', quantity: 2, price: 89 }, { name: 'Chilli', quantity: 2, price: 35 }, { name: 'Rice', quantity: 2, price: 58 }], createdAt: '2024-12-05', cancelReason: 'Changed my mind' },
];

const statusConfig = {
  placed: { color: '#1565C0', bg: '#E3F2FD', label: 'Order Placed', icon: '📋' },
  confirmed: { color: '#7B1FA2', bg: '#F3E5F5', label: 'Confirmed', icon: '✅' },
  processing: { color: '#E65100', bg: '#FFF3E0', label: 'Processing', icon: '⚙️' },
  shipped: { color: '#006064', bg: '#E0F7FA', label: 'Shipped', icon: '🚚' },
  out_for_delivery: { color: '#2E7D32', bg: '#E8F5E9', label: 'Out for Delivery', icon: '🛵' },
  delivered: { color: '#1B5E20', bg: '#E8F5E9', label: 'Delivered', icon: '✅' },
  cancelled: { color: '#B71C1C', bg: '#FFEBEE', label: 'Cancelled', icon: '❌' },
};

const OrderHistoryPage = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? mockOrders : mockOrders.filter(o => o.orderStatus === filter);

  return (
    <DashboardLayout title="Order History" subtitle="Track and manage your orders">
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'placed', 'processing', 'shipped', 'delivered', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', background: filter === f ? '#2E7D32' : 'white', color: filter === f ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textTransform: 'capitalize' }}>{f}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(order => {
          const sc = statusConfig[order.orderStatus] || statusConfig.placed;
          return (
            <div key={order._id} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>#{order.trackingNumber}</div>
                  <div style={{ fontSize: '0.8rem', color: '#546E7A' }}>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                </div>
                <span className="badge" style={{ background: sc.bg, color: sc.color, fontSize: '0.85rem' }}>{sc.icon} {sc.label}</span>
              </div>
              <div style={{ background: '#F8F9FA', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: i < order.items.length - 1 ? '0.4rem' : 0 }}>
                    <span style={{ color: '#546E7A' }}>{item.name} × {item.quantity}</span>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E0E0E0', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700 }}>Total Paid</span>
                  <strong style={{ color: '#2E7D32', fontSize: '1rem' }}>₹{order.totalAmount}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {order.orderStatus === 'shipped' && <Link to={`/buyer/track/${order._id}`} className="btn btn-primary btn-sm">🚚 Track Order</Link>}
                {order.orderStatus === 'delivered' && <button className="btn btn-sm" style={{ background: '#E8F5E9', color: '#2E7D32', border: 'none' }}>⭐ Write Review</button>}
                {['placed', 'confirmed'].includes(order.orderStatus) && <button className="btn btn-sm" style={{ background: '#FFEBEE', color: '#E53935', border: 'none' }}>Cancel Order</button>}
                <button className="btn btn-secondary btn-sm">📄 Invoice</button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="empty-state"><div className="empty-state-icon">📦</div><div className="empty-state-title">No orders found</div><Link to="/marketplace" className="btn btn-primary" style={{ marginTop: '1rem' }}>Shop Now</Link></div>}
      </div>
    </DashboardLayout>
  );
};

export default OrderHistoryPage;

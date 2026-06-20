import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { orderAPI } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  // Mock cart items for demo
  const mockCart = {
    items: [
      { product: { _id: '1', name: 'Fresh Organic Tomatoes', price: 45, unit: 'kg', images: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200'], farmer: { name: 'Rajesh Kumar' } }, quantity: 3 },
      { product: { _id: '3', name: 'Country Eggs (30 pcs)', price: 185, unit: 'dozen', images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200'], farmer: { name: 'Priya Devi' } }, quantity: 2 },
      { product: { _id: '4', name: 'Alphonso Mangoes', price: 120, unit: 'kg', images: ['https://images.unsplash.com/photo-1601493700631-2851410db6ce?w=200'], farmer: { name: 'Anil Sharma' } }, quantity: 1 },
    ]
  };

  useEffect(() => {
    setCart(mockCart);
    setLoading(false);
  }, []);

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      setCart(prev => ({ items: prev.items.filter(i => i.product._id !== productId) }));
    } else {
      setCart(prev => ({ items: prev.items.map(i => i.product._id === productId ? { ...i, quantity: qty } : i) }));
    }
  };

  const removeItem = (productId) => {
    setCart(prev => ({ items: prev.items.filter(i => i.product._id !== productId) }));
    toast.success('Item removed');
  };

  const subtotal = cart.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <DashboardLayout title="Shopping Cart" subtitle="Review your items before checkout">
      {cart.items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <div className="empty-state-title">Your cart is empty</div>
          <div className="empty-state-text">Add fresh produce from the marketplace</div>
          <Link to="/marketplace" className="btn btn-primary">Browse Marketplace</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          {/* Cart Items */}
          <div>
            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>Cart Items ({cart.items.length})</span>
                <button onClick={() => setCart({ items: [] })} style={{ color: '#E53935', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>Clear All</button>
              </div>
              {cart.items.map((item, i) => (
                <div key={item.product._id} style={{ padding: '1.25rem 1.5rem', borderBottom: i < cart.items.length - 1 ? '1px solid #F8F9FA' : 'none', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <img src={item.product.images[0]} alt={item.product.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '12px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.product.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#546E7A', marginBottom: '0.5rem' }}>👨‍🌾 {item.product.farmer?.name}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2E7D32' }}>₹{item.product.price}/{item.product.unit}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
                      <button onClick={() => updateQty(item.product._id, item.quantity - 1)} style={{ width: 34, height: 34, border: 'none', background: '#F5F5F5', cursor: 'pointer', fontWeight: 700 }}>−</button>
                      <span style={{ width: 40, textAlign: 'center', fontWeight: 700 }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.product._id, item.quantity + 1)} style={{ width: 34, height: 34, border: 'none', background: '#F5F5F5', cursor: 'pointer', fontWeight: 700 }}>+</button>
                    </div>
                    <div style={{ fontWeight: 800, color: '#1B2631', minWidth: 70, textAlign: 'right' }}>₹{item.product.price * item.quantity}</div>
                    <button onClick={() => removeItem(item.product._id)} style={{ background: '#FFEBEE', border: 'none', color: '#E53935', width: 32, height: 32, borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#2E7D32', fontWeight: 600, fontSize: '0.9rem' }}>← Continue Shopping</Link>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'sticky', top: '90px' }}>
              <h4 style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F0F0F0' }}>Order Summary</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#546E7A' }}>Subtotal</span><strong>₹{subtotal}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#546E7A' }}>Shipping</span><strong style={{ color: shipping === 0 ? '#2E7D32' : '#1B2631' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</strong></div>
                {subtotal < 500 && <div style={{ fontSize: '0.78rem', color: '#2E7D32', background: '#E8F5E9', padding: '0.5rem', borderRadius: '8px' }}>Add ₹{500 - subtotal} more for FREE shipping!</div>}
                <div className="divider" />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}><span style={{ fontWeight: 700 }}>Total</span><strong style={{ color: '#2E7D32', fontSize: '1.3rem' }}>₹{total}</strong></div>
              </div>
              <button className="btn btn-primary w-full btn-lg" onClick={() => navigate('/buyer/checkout')}>Proceed to Checkout →</button>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.25rem' }}>
                {['🔒 Secure Payment', '🚚 Fast Delivery', '✅ Verified Farmers'].map(f => (
                  <span key={f} style={{ fontSize: '0.72rem', color: '#90A4AE' }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CartPage;

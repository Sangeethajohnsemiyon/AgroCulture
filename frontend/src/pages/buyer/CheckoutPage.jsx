import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { orderAPI } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ name: user?.name || '', phone: '', street: '', city: '', state: 'Tamil Nadu', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const mockItems = [
    { product: { _id: '1', name: 'Organic Tomatoes', price: 45, unit: 'kg' }, quantity: 3 },
    { product: { _id: '3', name: 'Country Eggs', price: 185, unit: 'dozen' }, quantity: 2 },
  ];
  const subtotal = mockItems.reduce((a, i) => a + i.product.price * i.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const data = await orderAPI.checkout({ shippingAddress: address, paymentMethod, items: mockItems.map(i => ({ product: i.product._id, name: i.product.name, price: i.product.price, quantity: i.quantity, unit: i.product.unit })), subtotal, shippingCost: shipping, discount: 0, totalAmount: total });
      if (data.success) {
        toast.success('🎉 Order placed successfully!');
        navigate('/buyer/orders');
      }
    } catch { toast.error('Order failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const steps = [{ label: 'Address', icon: '📍' }, { label: 'Payment', icon: '💳' }, { label: 'Confirm', icon: '✅' }];
  const states = ['Andhra Pradesh', 'Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu', 'Telangana'];
  const paymentMethods = [
    { value: 'upi', icon: '📱', label: 'UPI / GPay / PhonePe', desc: 'Instant payment' },
    { value: 'cod', icon: '💵', label: 'Cash on Delivery', desc: 'Pay when delivered' },
    { value: 'card', icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, MasterCard, etc.' },
    { value: 'netbanking', icon: '🏦', label: 'Net Banking', desc: 'All major banks' },
  ];

  return (
    <DashboardLayout title="Checkout" subtitle="Complete your order">
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: step > i ? '#2E7D32' : step === i + 1 ? 'linear-gradient(135deg, #2E7D32, #4CAF50)' : '#E0E0E0', color: step >= i + 1 ? 'white' : '#90A4AE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, transition: 'all 0.3s' }}>{step > i + 1 ? '✓' : s.icon}</div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: step >= i + 1 ? '#2E7D32' : '#90A4AE' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? '#2E7D32' : '#E0E0E0', maxWidth: 80, margin: '0 0.5rem', marginBottom: '1.4rem', transition: 'all 0.3s' }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div>
          {step === 1 && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h4 style={{ marginBottom: '1.5rem' }}>📍 Delivery Address</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" type="tel" required value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 0, gridColumn: 'span 2' }}>
                  <label className="form-label">Street Address *</label>
                  <input className="form-input" required placeholder="House no., Street, Area" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">City *</label>
                  <input className="form-input" required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">State</label>
                  <select className="form-input form-select" value={address.state} onChange={e => setAddress({...address, state: e.target.value})}>
                    {states.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Pincode *</label>
                  <input className="form-input" required maxLength={6} value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} />
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setStep(2)}>Continue to Payment →</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h4 style={{ marginBottom: '1.5rem' }}>💳 Payment Method</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {paymentMethods.map(pm => (
                  <label key={pm.value} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.25rem', border: `2px solid ${paymentMethod === pm.value ? '#2E7D32' : '#E0E0E0'}`, borderRadius: '14px', cursor: 'pointer', background: paymentMethod === pm.value ? '#E8F5E9' : 'white', transition: 'all 0.2s' }}>
                    <input type="radio" name="payment" value={pm.value} checked={paymentMethod === pm.value} onChange={() => setPaymentMethod(pm.value)} style={{ accentColor: '#2E7D32' }} />
                    <span style={{ fontSize: '1.5rem' }}>{pm.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{pm.label}</div>
                      <div style={{ fontSize: '0.8rem', color: '#546E7A' }}>{pm.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>Review Order →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h4 style={{ marginBottom: '1.5rem' }}>✅ Order Review</h4>
              <div style={{ background: '#F8F9FA', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#2E7D32' }}>📍 Delivery To:</div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#546E7A' }}>{address.name}<br />{address.phone}<br />{address.street}, {address.city}, {address.state} - {address.pincode}</p>
              </div>
              <div style={{ background: '#F8F9FA', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#2E7D32' }}>💳 Payment: {paymentMethods.find(p => p.value === paymentMethod)?.label}</div>
                {mockItems.map(i => <div key={i.product._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem' }}><span>{i.product.name} × {i.quantity}</span><strong>₹{i.product.price * i.quantity}</strong></div>)}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
                <button className="btn btn-accent btn-lg" style={{ flex: 1 }} onClick={handlePlaceOrder} disabled={loading}>{loading ? '⏳ Placing order...' : '🎉 Place Order - ₹' + total}</button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary sidebar */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', height: 'fit-content', position: 'sticky', top: '90px' }}>
          <h5 style={{ marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F0F0F0' }}>Order Summary</h5>
          {mockItems.map(i => <div key={i.product._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.6rem', color: '#546E7A' }}><span>{i.product.name} ×{i.quantity}</span><strong style={{ color: '#1B2631' }}>₹{i.product.price * i.quantity}</strong></div>)}
          <div className="divider" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span style={{ color: '#546E7A' }}>Subtotal</span><strong>₹{subtotal}</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}><span style={{ color: '#546E7A' }}>Shipping</span><strong style={{ color: '#2E7D32' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}><strong>Total</strong><strong style={{ color: '#2E7D32' }}>₹{total}</strong></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CheckoutPage;

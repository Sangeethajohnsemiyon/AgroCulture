import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { feedbackAPI } from '../../api';
import toast from 'react-hot-toast';

const FeedbackPage = () => {
  const [form, setForm] = useState({ type: 'general', rating: 5, message: '', name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await feedbackAPI.submit(form);
      if (data.success) { setSubmitted(true); toast.success('Feedback submitted! Thank you 🙏'); }
    } catch { toast.error('Submission failed. Please try again.'); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <DashboardLayout title="Feedback">
      <div style={{ maxWidth: 500, margin: '3rem auto', textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🙏</div>
        <h3 style={{ marginBottom: '1rem' }}>Thank You for Your Feedback!</h3>
        <p style={{ color: '#546E7A', marginBottom: '2rem' }}>Your feedback helps us improve AgroConnect for all farmers and buyers.</p>
        <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Submit Another</button>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="Submit Feedback" subtitle="Help us improve AgroConnect">
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Overall Rating */}
        <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '0.75rem' }}>How would you rate AgroConnect?</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map(s => (
              <button key={s} onClick={() => setForm({...form, rating: s})} style={{ fontSize: '2.5rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.1s', transform: s <= form.rating ? 'scale(1.1)' : 'scale(1)' }}>
                {s <= form.rating ? '⭐' : '☆'}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating]}</div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Your Name</label>
              <input className="form-input" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">Feedback Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {[['general', '💬', 'General'], ['bug', '🐛', 'Bug Report'], ['feature', '💡', 'Feature Request'], ['performance', '⚡', 'Performance']].map(([val, icon, label]) => (
                <button key={val} type="button" onClick={() => setForm({...form, type: val})} style={{ padding: '0.75rem 0.5rem', border: `2px solid ${form.type === val ? '#2E7D32' : '#E0E0E0'}`, borderRadius: '10px', cursor: 'pointer', background: form.type === val ? '#E8F5E9' : 'white', textAlign: 'center', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{icon}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: form.type === val ? '#2E7D32' : '#546E7A' }}>{label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Message *</label>
            <textarea className="form-input" rows={5} required placeholder="Tell us what you think, what's working well, or what could be improved..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: 'vertical' }} />
          </div>

          <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}>{loading ? '⏳ Submitting...' : '📨 Submit Feedback'}</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default FeedbackPage;

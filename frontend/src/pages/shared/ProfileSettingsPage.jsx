import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProfileSettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', farmName: user?.farmName || '', location: user?.location || '', bio: user?.bio || '' });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('profile');

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000)); // Mock save
      toast.success('Profile updated successfully! ✅');
    } catch { toast.error('Failed to update profile'); }
    finally { setLoading(false); }
  };

  const roleColors = { farmer: '#2E7D32', buyer: '#1976D2', admin: '#7B1FA2' };
  const roleColor = roleColors[user?.role] || '#2E7D32';

  return (
    <DashboardLayout title="Profile Settings" subtitle="Manage your account information">
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Profile Header */}
        <div style={{ background: `linear-gradient(135deg, ${roleColor}, ${roleColor}bb)`, borderRadius: '20px', padding: '2rem', marginBottom: '2rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user?.name}</div>
            <div style={{ opacity: 0.85, textTransform: 'capitalize' }}>{user?.role} Account</div>
            <div style={{ opacity: 0.75, fontSize: '0.875rem' }}>{user?.email}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.25)', color: 'white', fontSize: '0.85rem' }}>✅ Verified Account</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[['profile', '👤', 'Profile'], ['security', '🔒', 'Security'], ['preferences', '⚙️', 'Preferences']].map(([val, icon, label]) => (
            <button key={val} onClick={() => setTab(val)} style={{ padding: '0.55rem 1.25rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, background: tab === val ? '#2E7D32' : 'white', color: tab === val ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>{icon} {label}</button>
          ))}
        </div>

        {tab === 'profile' && (
          <form onSubmit={handleSave} style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name</label>
                <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              {user?.role === 'farmer' && (
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Farm Name</label>
                  <input className="form-input" placeholder="Your farm name" value={form.farmName} onChange={e => setForm({...form, farmName: e.target.value})} />
                </div>
              )}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Location</label>
                <input className="form-input" placeholder="City, State" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label className="form-label">About Me</label>
              <textarea className="form-input" rows={3} placeholder="Tell us a bit about yourself..." value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} style={{ resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>{loading ? '⏳ Saving...' : '✅ Save Changes'}</button>
          </form>
        )}

        {tab === 'security' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h4 style={{ marginBottom: '1.5rem' }}>🔒 Change Password</h4>
            {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
              <div key={label} className="form-group">
                <label className="form-label">{label}</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
            ))}
            <button className="btn btn-primary" onClick={() => toast.success('Password changed!')}>Update Password</button>
            <div style={{ marginTop: '2rem', padding: '1.25rem', background: '#FFEBEE', borderRadius: '12px' }}>
              <div style={{ fontWeight: 700, color: '#C62828', marginBottom: '0.5rem' }}>⚠️ Danger Zone</div>
              <p style={{ fontSize: '0.875rem', color: '#C62828', margin: 0 }}>Permanently delete your account. This action cannot be undone.</p>
              <button className="btn btn-sm" style={{ background: '#E53935', color: 'white', border: 'none', marginTop: '0.75rem' }} onClick={() => toast.error('Contact support to delete your account')}>Delete Account</button>
            </div>
          </div>
        )}

        {tab === 'preferences' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h4 style={{ marginBottom: '1.5rem' }}>⚙️ Notification Preferences</h4>
            {[['Email Notifications', 'Receive order updates via email'], ['SMS Alerts', 'Crop and weather alerts via SMS'], ['Push Notifications', 'Browser push notifications'], ['Weekly Report', 'Weekly sales/farm summary email'], ['Market Price Alerts', 'Get notified when prices change']].map(([label, desc]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #F0F0F0' }}>
                <div><div style={{ fontWeight: 600 }}>{label}</div><div style={{ fontSize: '0.8rem', color: '#546E7A' }}>{desc}</div></div>
                <label style={{ position: 'relative', width: 44, height: 24, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: 'absolute', inset: 0, background: '#2E7D32', borderRadius: '12px', transition: '0.3s' }} />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettingsPage;

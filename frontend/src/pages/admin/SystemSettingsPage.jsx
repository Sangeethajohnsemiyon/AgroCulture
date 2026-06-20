import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import toast from 'react-hot-toast';

export const SystemSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [saving, setSaving] = useState(false);

  const [marketplace, setMarketplace] = useState({
    commission: '5',
    minPayout: '1000',
    taxRate: '18',
    currency: 'INR (₹)',
    allowSelfPickup: true,
  });

  const [notifications, setNotifications] = useState({
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    senderEmail: 'noreply@agroconnect.com',
    enableSMS: false,
    enablePush: true,
  });

  const [security, setSecurity] = useState({
    manualFarmerApproval: true,
    forceOtp: true,
    maxLoginAttempts: '5',
    adminAlertEmail: 'admin@agroconnect.com',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('System settings saved successfully! ⚙️');
    }, 1000);
  };

  const handleBackup = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Generating database backup (compressed GZIP)...',
        success: 'Backup file generated: agroconnect_db_backup_2026.tar.gz! 💾',
        error: 'Failed to backup database',
      }
    );
  };

  return (
    <DashboardLayout title="System Settings" subtitle="Configure platform rules, commission rates, notification gateways, and security">
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.5rem' }}>
        {/* Navigation Sidebar inside Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'marketplace', label: '🛍️ Marketplace Rules' },
            { id: 'notifications', label: '📧 Notifications & SMTP' },
            { id: 'security', label: '🔐 User & Security Policy' },
            { id: 'database', label: '💾 Database & Operations' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: 'none', background: activeTab === tab.id ? 'var(--primary-50)' : 'white', color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-primary)', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s', boxShadow: 'var(--shadow-sm)' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Form */}
        <div className="card">
          <form onSubmit={handleSave}>
            {activeTab === 'marketplace' && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Marketplace Configuration</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Platform Commission (%)</label>
                    <input type="number" className="form-input" value={marketplace.commission} onChange={e => setMarketplace({...marketplace, commission: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Minimum Farmer Payout Threshold (₹)</label>
                    <input type="number" className="form-input" value={marketplace.minPayout} onChange={e => setMarketplace({...marketplace, minPayout: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Standard Product GST/Tax (%)</label>
                    <input type="number" className="form-input" value={marketplace.taxRate} onChange={e => setMarketplace({...marketplace, taxRate: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Platform Primary Currency</label>
                    <input type="text" className="form-input" disabled value={marketplace.currency} />
                  </div>
                </div>

                <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                  <input type="checkbox" id="allowSelfPickup" checked={marketplace.allowSelfPickup} onChange={e => setMarketplace({...marketplace, allowSelfPickup: e.target.checked})} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                  <label htmlFor="allowSelfPickup" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Allow Buyers Self-Pickup option from Farms</label>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>SMTP & Gateway Settings</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">SMTP Relay Host</label>
                    <input type="text" className="form-input" value={notifications.smtpServer} onChange={e => setNotifications({...notifications, smtpServer: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SMTP Port</label>
                    <input type="text" className="form-input" value={notifications.smtpPort} onChange={e => setNotifications({...notifications, smtpPort: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sender Email Address</label>
                    <input type="email" className="form-input" value={notifications.senderEmail} onChange={e => setNotifications({...notifications, senderEmail: e.target.value})} />
                  </div>
                </div>

                <div className="divider" />

                <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>Notification Dispatches</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginBottom: 0 }}>
                    <input type="checkbox" id="enableSMS" checked={notifications.enableSMS} onChange={e => setNotifications({...notifications, enableSMS: e.target.checked})} style={{ width: 18, height: 18 }} />
                    <label htmlFor="enableSMS" className="form-label" style={{ margin: 0 }}>Enable SMS / Twilio OTP verification dispatch</label>
                  </div>
                  <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginBottom: 0 }}>
                    <input type="checkbox" id="enablePush" checked={notifications.enablePush} onChange={e => setNotifications({...notifications, enablePush: e.target.checked})} style={{ width: 18, height: 18 }} />
                    <label htmlFor="enablePush" className="form-label" style={{ margin: 0 }}>Enable Web Push Notifications for orders</label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Registration & Authentication Policies</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Max Login Lockout Attempts</label>
                    <input type="number" className="form-input" value={security.maxLoginAttempts} onChange={e => setSecurity({...security, maxLoginAttempts: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Security Alert Dispatch Email</label>
                    <input type="email" className="form-input" value={security.adminAlertEmail} onChange={e => setSecurity({...security, adminAlertEmail: e.target.value})} />
                  </div>
                </div>

                <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>Account Rules</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginBottom: 0 }}>
                    <input type="checkbox" id="manualFarmerApproval" checked={security.manualFarmerApproval} onChange={e => setSecurity({...security, manualFarmerApproval: e.target.checked})} style={{ width: 18, height: 18 }} />
                    <label htmlFor="manualFarmerApproval" className="form-label" style={{ margin: 0 }}>Require manual admin review/activation for Farmers</label>
                  </div>
                  <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginBottom: 0 }}>
                    <input type="checkbox" id="forceOtp" checked={security.forceOtp} onChange={e => setSecurity({...security, forceOtp: e.target.checked})} style={{ width: 18, height: 18 }} />
                    <label htmlFor="forceOtp" className="form-label" style={{ margin: 0 }}>Require strict 6-digit OTP verification upon registration</label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>System Backup & Maintenance</h3>
                
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Manage system operations, perform cold backups of MongoDB clusters, and restore configuration sets.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button type="button" onClick={handleBackup} className="btn btn-secondary">
                    💾 Create Database Backup
                  </button>
                  <button type="button" onClick={() => toast.error('Database restore is disabled in development mode.')} className="btn btn-danger btn-ghost" style={{ background: '#FFEBEE', color: '#E53935' }}>
                    🔄 Restore Database Snapshot
                  </button>
                </div>

                <div className="divider" />
                
                <div className="form-group" style={{ maxWidth: 300 }}>
                  <label className="form-label">System Log Verbosity Level</label>
                  <select className="form-input form-select" defaultValue="info">
                    <option value="debug">DEBUG (Verbose)</option>
                    <option value="info">INFO (Recommended)</option>
                    <option value="warn">WARN (Warnings only)</option>
                    <option value="error">ERROR (Critical exceptions)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab !== 'database' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? '⏳ Saving System...' : '💾 Save Settings'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettingsPage;

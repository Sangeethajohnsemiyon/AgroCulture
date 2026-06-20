import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AuthLayout = ({ children, title, subtitle, imgEmoji = '🌿' }) => (
  <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg)' }}>
    {/* Left - Decorative */}
    <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', width: `${150 + i * 100}px`, height: `${150 + i * 100}px`, top: `${20 + i * 20}%`, left: `${10 + i * 10}%` }} />
      ))}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '100px', marginBottom: '1.5rem', animation: 'float 3s ease-in-out infinite' }}>{imgEmoji}</div>
        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>AgroConnect</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.7 }}>Smart Agriculture Management & Marketplace for Indian Farmers</p>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', justifyContent: 'center' }}>
          {[['15K+', 'Farmers'], ['8.5K+', 'Products'], ['₹2.5Cr', 'Sales']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ color: '#F9A825', fontWeight: 800, fontSize: '1.3rem' }}>{v}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Right - Form */}
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 4rem', overflowY: 'auto' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', color: '#2E7D32', fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem' }}>
        <span>🌿</span> AgroConnect
      </Link>
      <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ marginBottom: '2rem', color: '#546E7A' }}>{subtitle}</p>
      {children}
    </div>
  </div>
);

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      const dashPath = data.user.role === 'farmer' ? '/farmer/dashboard' : data.user.role === 'admin' ? '/admin/dashboard' : '/buyer/dashboard';
      navigate(from || dashPath);
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  const demos = [
    { role: 'Farmer Demo', email: 'farmer@demo.com', password: 'demo123', icon: '👨‍🌾' },
    { role: 'Buyer Demo', email: 'buyer@demo.com', password: 'demo123', icon: '🛒' },
    { role: 'Admin Demo', email: 'admin@demo.com', password: 'demo123', icon: '⚙️' },
  ];

  return (
    <AuthLayout title="Welcome Back! 👋" subtitle="Sign in to your AgroConnect account">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input className="form-input" type="email" placeholder="your@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input className="form-input" type={showPw ? 'text' : 'password'} placeholder="Enter your password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>{showPw ? '🙈' : '👁️'}</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <Link to="/forgot-password" style={{ color: '#2E7D32', fontWeight: 500, fontSize: '0.875rem' }}>Forgot Password?</Link>
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? '⏳ Signing in...' : '🔐 Sign In'}</button>
      </form>
      {/* Demo Credentials */}
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#F1F8E9', borderRadius: '12px', border: '1px dashed #4CAF50' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2E7D32', marginBottom: '0.75rem', textAlign: 'center' }}>🎯 Try Demo Accounts</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {demos.map(d => (
            <button key={d.role} onClick={() => setForm({ email: d.email, password: d.password })} style={{ flex: 1, padding: '0.5rem', background: 'white', border: '1px solid #E0E0E0', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500, color: '#546E7A', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <span>{d.icon}</span><span>{d.role}</span>
            </button>
          ))}
        </div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#546E7A' }}>
        Don't have an account? <Link to="/register" style={{ color: '#2E7D32', fontWeight: 600 }}>Register here</Link>
      </p>
    </AuthLayout>
  );
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'buyer' });
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = { register: async (data) => { const { authAPI } = await import('../../api'); return authAPI.register(data); } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const { authAPI } = await import('../../api');
      const data = await authAPI.register(form);
      if (data.success) {
        toast.success('Registration successful! Please verify your OTP.');
        navigate('/verify-otp', { state: { userId: data.userId, otp: data.otp, email: form.email } });
      }
    } catch (err) { toast.error(err.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <AuthLayout title="Create Account 🌱" subtitle="Join thousands of farmers and buyers on AgroConnect" imgEmoji="👨‍🌾">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input className="form-input" type="text" placeholder="Your full name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="your@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input className="form-input" type="tel" placeholder="+91 9876543210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">I am a...</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[{ value: 'farmer', icon: '👨‍🌾', label: 'Farmer' }, { value: 'buyer', icon: '🛒', label: 'Buyer' }].map(r => (
              <button key={r.value} type="button" onClick={() => setForm({...form, role: r.value})} style={{ padding: '0.85rem', border: `2px solid ${form.role === r.value ? '#2E7D32' : '#E0E0E0'}`, borderRadius: '12px', cursor: 'pointer', background: form.role === r.value ? '#E8F5E9' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', gridColumn: r.value === 'buyer' ? 'span 2' : 'span 1', transition: 'all 0.2s' }}>
                <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: form.role === r.value ? '#2E7D32' : '#546E7A' }}>{r.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Min 6 characters" required minLength={6} value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input className="form-input" type="password" placeholder="Confirm password" required value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} />
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? '⏳ Creating account...' : '🚀 Create Account'}</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#546E7A' }}>
        Already have an account? <Link to="/login" style={{ color: '#2E7D32', fontWeight: 600 }}>Sign in here</Link>
      </p>
    </AuthLayout>
  );
};

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { authAPI } = await import('../../api');
      const data = await authAPI.forgotPassword({ email });
      toast.success('OTP sent to your email!');
      navigate('/verify-otp', { state: { userId: null, otp: data.otp, email, isReset: true } });
    } catch (err) { toast.error(err.message || 'Email not found'); }
    finally { setLoading(false); }
  };

  return (
    <AuthLayout title="Forgot Password? 🔑" subtitle="Enter your email and we'll send you an OTP to reset your password" imgEmoji="🔐">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Registered Email</label>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input className="form-input" type="email" placeholder="your@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? '⏳ Sending OTP...' : '📨 Send OTP'}</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#546E7A' }}>
        Remember your password? <Link to="/login" style={{ color: '#2E7D32', fontWeight: 600 }}>Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { userId, otp: sentOtp, email, isReset } = location.state || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const inputs = Array(6).fill(null).map(() => React.createRef());

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) inputs[i + 1].current?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputs[i - 1].current?.focus();
  };

  const enteredOtp = otp.join('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { authAPI } = await import('../../api');
      if (isReset) {
        await authAPI.resetPassword({ email, otp: enteredOtp, newPassword });
        toast.success('Password reset successfully! Please login.');
        navigate('/login');
      } else {
        const data = await authAPI.verifyOtp({ userId, otp: enteredOtp });
        if (data.success) {
          localStorage.setItem('agroconnect_token', data.token);
          localStorage.setItem('agroconnect_user', JSON.stringify(data.user));
          window.location.href = data.user.role === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard';
        }
      }
    } catch (err) { toast.error(err.message || 'Invalid OTP'); }
    finally { setLoading(false); }
  };

  return (
    <AuthLayout title="Verify OTP ✉️" subtitle={`Enter the 6-digit OTP sent to ${email || 'your email'}`} imgEmoji="✅">
      {sentOtp && <div style={{ padding: '0.75rem 1rem', background: '#FFF8E1', border: '1px solid #F9A825', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#E65100' }}>🎯 Demo OTP: <strong>{sentOtp}</strong></div>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
          {otp.map((digit, i) => (
            <input key={i} ref={inputs[i]} type="text" maxLength={1} value={digit} onChange={e => handleOtpChange(i, e.target.value)} onKeyDown={e => handleKey(i, e)}
              style={{ width: 50, height: 56, textAlign: 'center', fontSize: '1.3rem', fontWeight: 700, border: `2px solid ${digit ? '#2E7D32' : '#E0E0E0'}`, borderRadius: '12px', outline: 'none', background: digit ? '#E8F5E9' : 'white', transition: 'all 0.2s' }} />
          ))}
        </div>
        {isReset && (
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input className="form-input" type="password" placeholder="Enter new password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
        )}
        <button type="submit" className="btn btn-primary w-full" disabled={enteredOtp.length < 6 || loading}>{loading ? '⏳ Verifying...' : '✅ Verify OTP'}</button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

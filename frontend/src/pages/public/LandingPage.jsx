import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { marketAPI } from '../../api';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'farmer') return '/farmer/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/buyer/dashboard';
  };

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, transition: 'all 0.3s', background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>🌿</div>
        <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem', color: scrolled ? '#2E7D32' : 'white' }}>AgroConnect</span>
      </Link>
      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
        {[['Home', '/'], ['Marketplace', '/marketplace'], ['Schemes', '/schemes'], ['Blog', '/blog'], ['About', '/about']].map(([label, path]) => (
          <Link key={path} to={path} style={{ color: scrolled ? '#546E7A' : 'rgba(255,255,255,0.9)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#4CAF50'} onMouseLeave={e => e.target.style.color = scrolled ? '#546E7A' : 'rgba(255,255,255,0.9)'}>{label}</Link>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {isAuthenticated ? (
          <button onClick={() => navigate(getDashboardPath())} className="btn btn-primary btn-sm">Go to Dashboard</button>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary btn-sm" style={{ borderColor: scrolled ? '#2E7D32' : 'white', color: scrolled ? '#2E7D32' : 'white' }}>Login</Link>
            <Link to="/register" className="btn btn-accent btn-sm">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const stats = [{ value: '15,000+', label: 'Farmers', icon: '👨‍🌾' }, { value: '8,500+', label: 'Products', icon: '🌾' }, { value: '25,000+', label: 'Buyers', icon: '🛒' }, { value: '₹2.5Cr', label: 'Sales', icon: '💰' }];
  return (
    <section style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 40%, #388E3C 70%, #1B5E20 100%)', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
      {/* Animated background circles */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', width: `${100 + i * 80}px`, height: `${100 + i * 80}px`, top: `${10 + i * 15}%`, right: `${5 + i * 8}%`, animation: `float ${3 + i}s ease-in-out infinite` }} />
      ))}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ color: 'white', animation: 'fadeInUp 0.8s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', marginBottom: '1.5rem', backdropFilter: 'blur(10px)' }}>
            🌱 India's #1 Smart Agriculture Platform
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Grow Smarter,<br /><span style={{ color: '#F9A825' }}>Sell Better</span><br />with AgroConnect
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Connect farmers directly to buyers. Manage crops, track growth, detect diseases with AI, and access government schemes — all in one platform.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-accent btn-lg">Start Free Today 🚀</Link>
            <Link to="/marketplace" className="btn" style={{ border: '2px solid white', color: 'white', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 600 }}>Browse Marketplace</Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#F9A825' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', animation: 'float 4s ease-in-out infinite' }}>
            <div style={{ width: 380, height: 380, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '180px', lineHeight: 1 }}>🌾</div>
            </div>
            {/* Floating feature cards */}
            {[
              { icon: '🤖', text: 'AI Disease Detection', top: '5%', left: '-20%' },
              { icon: '🌤️', text: 'Weather Alerts', top: '5%', right: '-20%' },
              { icon: '📊', text: 'Market Analytics', bottom: '10%', left: '-15%' },
              { icon: '💰', text: 'Direct Payments', bottom: '10%', right: '-15%' },
            ].map(f => (
              <div key={f.text} style={{ position: 'absolute', ...f, background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', whiteSpace: 'nowrap' }}>
                <span>{f.icon}</span><span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1B2631' }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 80L1440 0V80H0Z" fill="#F1F8E9"/></svg>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: '🌱', title: 'Smart Crop Management', desc: 'Track planting, growth stages, fertilizer usage, water consumption, and harvest schedules all in one place.', color: '#E8F5E9' },
    { icon: '🤖', title: 'AI Disease Detection', desc: 'Upload crop photos and get instant AI-powered disease diagnosis with medicine and fertilizer recommendations.', color: '#E3F2FD' },
    { icon: '🛒', title: 'Direct Marketplace', desc: 'Farmers list produce, buyers browse and purchase directly. No middlemen. Better prices for everyone.', color: '#FFF8E1' },
    { icon: '🌤️', title: 'Weather Monitoring', desc: 'Real-time weather data, 7-day forecasts, and crop-specific seasonal alerts for your location.', color: '#F3E5F5' },
    { icon: '📊', title: 'Analytics & Insights', desc: 'Sales reports, profit analysis, and market price predictions with interactive charts and graphs.', color: '#E0F7FA' },
    { icon: '🏛️', title: 'Government Schemes', desc: 'Discover and apply for PM-KISAN, crop insurance, KCC loans, and other government agriculture benefits.', color: '#FFEBEE' },
  ];
  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">✨ Why AgroConnect</div>
          <h2 className="section-title">Everything a Farmer <span className="gradient-text">Needs</span></h2>
          <p className="section-subtitle">From seed to sale, we empower Indian farmers with cutting-edge technology and a thriving marketplace.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {features.map((f, i) => (
            <div key={f.title} className="card" style={{ border: 'none', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
              <div style={{ width: 56, height: 56, background: f.color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h4 style={{ marginBottom: '0.5rem' }}>{f.title}</h4>
              <p style={{ fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => (
  <section className="section" style={{ background: 'var(--bg)' }}>
    <div className="container">
      <div className="section-header">
        <div className="section-tag">🚀 How It Works</div>
        <h2 className="section-title">Simple. Smart. <span className="gradient-text">Profitable.</span></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', position: 'relative' }}>
        {[
          { step: '01', icon: '📝', title: 'Create Account', desc: 'Sign up as Farmer or Buyer. Verify your account with OTP.' },
          { step: '02', icon: '🌱', title: 'Set Up Your Farm', desc: 'Add your crops, upload farm photos, and track all farm activities.' },
          { step: '03', icon: '🛍️', title: 'List or Browse', desc: 'Farmers list produce on marketplace. Buyers discover fresh local products.' },
          { step: '04', icon: '💰', title: 'Grow Together', desc: 'Complete transactions, track orders, and grow your agri business.' },
        ].map((item, i) => (
          <div key={item.step} style={{ textAlign: 'center', animation: `fadeInUp 0.5s ease ${i * 0.15}s both` }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
              <div style={{ width: 80, height: 80, background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 8px 24px rgba(46,125,50,0.15)', margin: '0 auto' }}>{item.icon}</div>
              <div style={{ position: 'absolute', top: -8, right: -8, width: 28, height: 28, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.7rem' }}>{item.step}</div>
            </div>
            <h5 style={{ marginBottom: '0.5rem' }}>{item.title}</h5>
            <p style={{ fontSize: '0.875rem' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const testimonials = [
    { name: 'Rajesh Kumar', role: 'Tomato Farmer, Coimbatore', text: 'AgroConnect helped me sell directly to buyers and I earned 40% more than selling to local middlemen. The disease detection AI saved my entire crop this season!', rating: 5, avatar: '👨‍🌾' },
    { name: 'Priya Suresh', role: 'Organic Buyer, Chennai', text: 'I now get fresh organic vegetables directly from verified farmers. The quality is amazing and prices are much better than supermarkets. Delivery is always on time.', rating: 5, avatar: '👩' },
    { name: 'Murugan Selvam', role: 'Rice Farmer, Thanjavur', text: 'The weather alerts saved my paddy crop from unexpected rain. The government schemes page helped me apply for PM-KISAN without visiting any office!', rating: 5, avatar: '👨‍🌾' },
    { name: 'Anitha Ramesh', role: 'Vegetable Buyer, Madurai', text: 'Amazing platform! I can order seasonal vegetables, track delivery in real-time, and even chat with farmers directly. Highly recommend!', rating: 5, avatar: '👩' },
  ];
  return (
    <section className="section" style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>💬 Success Stories</div>
          <h2 className="section-title" style={{ color: 'white' }}>Farmers & Buyers <span style={{ color: '#F9A825' }}>Love Us</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className="card-glass" style={{ padding: '1.75rem', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
              <div style={{ color: '#F9A825', fontSize: '1rem', marginBottom: '1rem' }}>{'★'.repeat(t.rating)}</div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#1B2631', marginBottom: '1.25rem' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>{t.avatar}</div>
                <div><div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div><div style={{ fontSize: '0.78rem', color: '#546E7A' }}>{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer style={{ background: '#0D1B2A', color: 'rgba(255,255,255,0.8)', padding: '4rem 0 2rem' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🌿</div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', color: '#4CAF50' }}>AgroConnect</span>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>India's smart agriculture management and marketplace platform connecting farmers to buyers directly.</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {['📘', '🐦', '📸', '▶️'].map(icon => (
              <div key={icon} style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>{icon}</div>
            ))}
          </div>
        </div>
        {[
          { title: 'Platform', links: ['Marketplace', 'For Farmers', 'For Buyers', 'Weather Monitor', 'AI Disease Detection'] },
          { title: 'Resources', links: ['Government Schemes', 'Blog & News', 'FAQ', 'Equipment Rental', 'About Us'] },
          { title: 'Support', links: ['Contact Us', 'Live Chat', 'Feedback', 'Privacy Policy', 'Terms of Service'] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontWeight: 700, color: 'white', marginBottom: '1.25rem', fontSize: '0.95rem' }}>{col.title}</div>
            {col.links.map(link => (
              <div key={link} style={{ marginBottom: '0.6rem' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#4CAF50'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>{link}</a>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>© 2025 AgroConnect. All rights reserved. Made with 💚 for Indian Farmers</p>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>🌾 Empowering Agriculture with Technology</p>
      </div>
    </div>
  </footer>
);

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      {/* CTA Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', borderRadius: '24px', padding: '4rem 2rem', color: 'white' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Transform Your Farming?</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '1.05rem' }}>Join 15,000+ farmers already using AgroConnect. Sign up free in 2 minutes.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-accent btn-lg">Join as Farmer 👨‍🌾</Link>
              <Link to="/register" className="btn" style={{ border: '2px solid white', color: 'white', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 600 }}>Join as Buyer 🛒</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;

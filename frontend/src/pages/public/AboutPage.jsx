import React from 'react';
import { Link, useParams } from 'react-router-dom';

const SimpleLayout = ({ children, title }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🌿</div>
          <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.1rem', color: '#2E7D32' }}>AgroConnect</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['Home', '/'], ['Marketplace', '/marketplace'], ['Blog', '/blog'], ['Schemes', '/schemes']].map(([l, p]) => (
            <Link key={p} to={p} style={{ color: '#546E7A', fontWeight: 500, fontSize: '0.9rem' }}>{l}</Link>
          ))}
        </div>
        <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
      </nav>
      <main>{children}</main>
      <footer style={{ background: '#0D1B2A', color: 'rgba(255,255,255,0.7)', padding: '2rem', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>© 2025 AgroConnect. Made with 💚 for Indian Farmers</p>
      </footer>
    </div>
  );
};

export const AboutPage = () => (
  <SimpleLayout>
    <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '6rem 0 4rem', textAlign: 'center', color: 'white' }}>
      <div className="container"><h1 style={{ color: 'white', marginBottom: '1rem' }}>About AgroConnect</h1><p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600, margin: '0 auto' }}>India's smart agriculture management and marketplace platform, connecting farmers directly to buyers.</p></div>
    </div>
    <div className="container section">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div className="section-tag">🌱 Our Mission</div>
          <h2 style={{ marginBottom: '1.5rem' }}>Empowering Every Indian Farmer</h2>
          <p style={{ color: '#546E7A', lineHeight: 1.8, marginBottom: '1.5rem' }}>AgroConnect was founded with a simple mission: to use technology to improve the lives of Indian farmers. We eliminate middlemen, provide AI-powered crop insights, and connect farmers directly to buyers across India.</p>
          <p style={{ color: '#546E7A', lineHeight: 1.8 }}>Our platform combines modern technology with deep agricultural knowledge to create a comprehensive ecosystem for smart farming, direct selling, and sustainable agriculture.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[['15,000+', 'Registered Farmers', '👨‍🌾'], ['25,000+', 'Active Buyers', '🛒'], ['₹2.5Cr+', 'Transactions', '💰'], ['95%', 'Satisfaction Rate', '⭐']].map(([v, l, icon]) => (
            <div key={l} style={{ background: '#E8F5E9', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2E7D32' }}>{v}</div>
              <div style={{ fontSize: '0.8rem', color: '#546E7A' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SimpleLayout>
);

export const ContactPage = () => {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  return (
    <SimpleLayout>
      <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '6rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container"><h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Contact Us</h1><p style={{ color: 'rgba(255,255,255,0.85)' }}>We'd love to hear from you. Get in touch with our team.</p></div>
      </div>
      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          <div>
            {[['📧', 'Email', 'support@agroconnect.in'], ['📞', 'Phone', '+91 44 4567 8900'], ['📍', 'Address', 'Chennai, Tamil Nadu, India'], ['⏰', 'Hours', 'Mon-Sat: 9 AM – 6 PM IST']].map(([icon, label, val]) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 44, height: 44, background: '#E8F5E9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{icon}</div>
                <div><div style={{ fontWeight: 700 }}>{label}</div><div style={{ color: '#546E7A', fontSize: '0.9rem' }}>{val}</div></div>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}><label className="form-label">Subject</label><input className="form-input" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: 'vertical' }} /></div>
            <button className="btn btn-primary w-full" onClick={() => import('react-hot-toast').then(m => m.default.success('Message sent! We\'ll get back to you soon.'))}>📨 Send Message</button>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
};

export const FaqPage = () => {
  const [open, setOpen] = React.useState(null);
  const faqs = [
    { q: 'How do I register as a farmer on AgroConnect?', a: 'Click "Get Started" and select "Farmer" as your role. Complete the registration form with your details, verify your OTP, and you\'ll have full access to all farmer features.' },
    { q: 'Is AgroConnect free to use?', a: 'Yes! Basic registration and use is completely free. We charge a small commission only on successful marketplace transactions.' },
    { q: 'How does the AI Disease Detection work?', a: 'Upload a photo of your affected crop/leaf, and our AI model analyzes it to identify diseases, pests, or deficiencies with up to 95% accuracy, providing treatment recommendations.' },
    { q: 'What payment methods are supported?', a: 'We support UPI (GPay, PhonePe), Credit/Debit Cards, Net Banking, and Cash on Delivery for maximum convenience.' },
    { q: 'How long does delivery take?', a: 'Most products are delivered within 2-5 business days. Fresh produce is typically delivered within 1-2 days to maintain freshness.' },
    { q: 'Can I sell my produce on AgroConnect?', a: 'Yes! Register as a farmer, set up your profile, and list your products on the marketplace. Buyers from across India can discover and purchase your produce directly.' },
  ];
  return (
    <SimpleLayout>
      <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '6rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container"><h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Frequently Asked Questions</h1><p style={{ color: 'rgba(255,255,255,0.85)' }}>Find answers to common questions about AgroConnect</p></div>
      </div>
      <div className="container section" style={{ maxWidth: 800 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '14px', marginBottom: '0.75rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '1.25rem 1.5rem', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontWeight: 700, color: '#1B2631' }}>❓ {faq.q}</span>
              <span style={{ fontSize: '1.2rem', color: '#2E7D32', flexShrink: 0 }}>{open === i ? '▲' : '▼'}</span>
            </button>
            {open === i && <div style={{ padding: '0 1.5rem 1.25rem', color: '#546E7A', lineHeight: 1.7 }}>{faq.a}</div>}
          </div>
        ))}
      </div>
    </SimpleLayout>
  );
};

export const BlogListPage = () => {
  const posts = [
    { slug: '1', title: 'Top 5 Organic Farming Techniques for Tamil Nadu', category: 'Tips', date: '2024-12-10', readTime: '5 min', author: 'Agro Expert', excerpt: 'Discover proven organic farming methods that improve yield while preserving soil health in Tamil Nadu\'s climate.' },
    { slug: '2', title: 'Understanding PM-KISAN: How to Apply Online', category: 'Schemes', date: '2024-12-08', readTime: '8 min', author: 'Policy Desk', excerpt: 'Step-by-step guide to applying for PM-KISAN benefits online and tracking your payments.' },
    { slug: '3', title: 'Drip Irrigation: Save Water, Increase Yield', category: 'Technology', date: '2024-12-05', readTime: '6 min', author: 'Irrigation Expert', excerpt: 'How drip irrigation can save up to 50% water while increasing crop yield by 30% on your farm.' },
    { slug: '4', title: 'Market Price Forecast: Tomato & Onion (Dec 2024)', category: 'Market', date: '2024-12-03', readTime: '4 min', author: 'Market Analyst', excerpt: 'December market price predictions for key vegetables based on historical trends and supply data.' },
    { slug: '5', title: 'AI in Agriculture: Future of Smart Farming', category: 'Technology', date: '2024-11-30', readTime: '7 min', author: 'Tech Desk', excerpt: 'Exploring how artificial intelligence is revolutionizing crop management, disease detection, and market predictions.' },
  ];
  const catColors = { Tips: '#E8F5E9', Schemes: '#E3F2FD', Technology: '#F3E5F5', Market: '#FFF8E1' };
  const catText = { Tips: '#2E7D32', Schemes: '#1976D2', Technology: '#7B1FA2', Market: '#E65100' };

  return (
    <SimpleLayout>
      <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '6rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container"><h1 style={{ color: 'white', marginBottom: '0.5rem' }}>📰 AgroConnect Blog</h1><p style={{ color: 'rgba(255,255,255,0.85)' }}>Farming tips, market news, and technology insights for Indian farmers</p></div>
      </div>
      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {posts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'block', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ height: 10, background: 'linear-gradient(90deg, #2E7D32, #4CAF50)' }} />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span className="badge" style={{ background: catColors[post.category], color: catText[post.category] }}>{post.category}</span>
                  <span style={{ fontSize: '0.75rem', color: '#90A4AE' }}>⏱️ {post.readTime}</span>
                </div>
                <h4 style={{ marginBottom: '0.75rem', lineHeight: 1.4 }}>{post.title}</h4>
                <p style={{ fontSize: '0.875rem', color: '#546E7A', marginBottom: '1rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#90A4AE' }}>
                  <span>✍️ {post.author}</span>
                  <span>📅 {new Date(post.date).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
};

export const BlogDetailPage = () => {
  const { slug } = useParams();
  return (
    <SimpleLayout>
      <div className="container section" style={{ maxWidth: 800 }}>
        <Link to="/blog" style={{ color: '#2E7D32', fontWeight: 500, fontSize: '0.875rem' }}>← Back to Blog</Link>
        <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', marginTop: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Tips</span>
          <h1 style={{ marginBottom: '1rem' }}>Top 5 Organic Farming Techniques for Tamil Nadu</h1>
          <div style={{ display: 'flex', gap: '1rem', color: '#90A4AE', fontSize: '0.85rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #F0F0F0' }}>
            <span>✍️ Agro Expert</span><span>📅 Dec 10, 2024</span><span>⏱️ 5 min read</span>
          </div>
          <div style={{ color: '#546E7A', lineHeight: 1.9 }}>
            <p>Organic farming is gaining momentum across Tamil Nadu as farmers recognize the long-term benefits for soil health, crop quality, and market value. Here are five proven techniques...</p>
            <h3>1. Vermicomposting</h3>
            <p>Vermicomposting transforms organic waste into nutrient-rich fertilizer using earthworms. This improves soil structure, water retention, and microbial activity significantly.</p>
            <h3>2. Green Manuring</h3>
            <p>Growing leguminous plants like dhaincha and sunhemp, then incorporating them into the soil improves nitrogen levels naturally and reduces fertilizer costs.</p>
            <h3>3. Crop Rotation</h3>
            <p>Rotating different crop families in the same field prevents nutrient depletion, breaks pest cycles, and improves overall soil biodiversity.</p>
            <h3>4. Biopesticides</h3>
            <p>Using Neem oil, Trichoderma, and other biological pesticides provides effective pest control without harming beneficial insects or soil organisms.</p>
            <h3>5. Drip Irrigation</h3>
            <p>Precision water delivery through drip irrigation reduces water usage by 50% while improving crop yield and reducing weed growth simultaneously.</p>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
};

export const LiveChatPage = () => (
  <SimpleLayout>
    <div className="container section" style={{ maxWidth: 600, textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>💬</div>
      <h2>Live Chat Support</h2>
      <p style={{ color: '#546E7A', marginBottom: '2rem' }}>Our support team is available Monday-Saturday 9 AM to 6 PM IST. For immediate help, use our AgroBot chatbot available on every page.</p>
      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
        {[['📧', 'Email Support', 'support@agroconnect.in', 'Response within 24 hours'], ['📞', 'Phone Support', '+91 44 4567 8900', 'Mon-Sat: 9 AM - 6 PM IST'], ['🤖', 'AgroBot', 'Available 24/7', 'Instant AI assistance']].map(([icon, label, val, note]) => (
          <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', padding: '1rem', background: '#F8F9FA', borderRadius: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{label}</div>
              <div style={{ color: '#2E7D32', fontWeight: 500 }}>{val}</div>
              <div style={{ fontSize: '0.8rem', color: '#90A4AE' }}>{note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SimpleLayout>
);

export default BlogListPage;

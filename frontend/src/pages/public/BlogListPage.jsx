import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../../api';
import toast from 'react-hot-toast';

const mockBlogsFallback = [
  { _id: '1', slug: 'drip-irrigation-subsidies', title: 'How to Apply for Govt Drip Irrigation Subsidies 💧', snippet: 'A complete step-by-step guide for Indian farmers to claim up to 90% subsidy on drip irrigation installations under PMKSY.', category: 'subsidies', author: 'Dr. A. K. Swaminathan', date: '2024-12-10', readTime: '5 min read', body: 'Subsidies are key...' },
  { _id: '2', slug: 'managing-paddy-leaf-blast', title: 'Managing and Preventing Leaf Blast in Paddy Crops 🌾', snippet: 'Leaf blast can destroy up to 50% of your rice yield. Learn how to identify symptoms early and apply organic treatment solutions.', category: 'farming tips', author: 'Advisory Panel', date: '2024-12-08', readTime: '7 min read', body: 'Leaf blast is caused...' },
  { _id: '3', slug: 'organic-farming-basics', title: 'Organic Farming: The Basics for Beginners 🥬', snippet: 'Transitioning from chemical to organic farming? Learn the essential soil preparation, composting techniques, and pest control methods.', category: 'technology', author: 'Senthil Pathy (Farmer)', date: '2024-11-28', readTime: '6 min read', body: 'Organic farming is...' },
  { _id: '4', slug: 'turmeric-market-trends', title: 'Market Trends: Rising Demand for Organic Spices 🌶️', snippet: 'Export analysis indicates a 25% year-on-year increase in international demand for organic turmeric. Read our price prediction report.', category: 'market trends', author: 'R. K. Iyer (Agri Analyst)', date: '2024-11-15', readTime: '4 min read', body: 'Spices are valuable...' },
];

export const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await blogAPI.getBlogs();
      if (res && res.success && res.blogs) {
        setBlogs(res.blogs);
      } else {
        setBlogs(mockBlogsFallback);
      }
    } catch (err) {
      console.warn('API error, falling back to mock blogs:', err);
      setBlogs(mockBlogsFallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const categories = ['all', 'subsidies', 'farming tips', 'technology', 'market trends'];

  const filtered = blogs.filter(b => {
    if (activeCategory !== 'all' && b.category !== activeCategory) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.snippet.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', color: 'white', padding: '4rem 2rem', textCenter: 'center', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '1rem' }}>AgroConnect Blog & News 📰</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Stay updated with scientific farming techniques, government schemes, agricultural updates, and market intelligence reports.
        </p>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        
        {/* Navigation back */}
        <Link to="/" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem' }}>
          ⬅️ Back to Landing Page
        </Link>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
            <input className="form-input" style={{ paddingLeft: '2.75rem', margin: 0 }} placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding: '0.5rem 1.1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', background: activeCategory === cat ? 'var(--primary)' : 'white', color: activeCategory === cat ? 'white' : 'var(--text-secondary)', boxShadow: 'var(--shadow-sm)', textTransform: 'capitalize' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
            <div className="spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center" style={{ padding: '4rem' }}>
            <span style={{ fontSize: '3rem' }}>📭</span>
            <h3>No articles found</h3>
            <p>Try searching for other terms or selecting a different category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filtered.map(blog => (
              <div key={blog._id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0, overflow: 'hidden' }}>
                {/* Banner illustration */}
                <div style={{ height: '160px', background: 'linear-gradient(135deg, #C8E6C9, #E8F5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                  {blog.category === 'subsidies' ? '🏛️' : blog.category === 'farming tips' ? '🌾' : blog.category === 'technology' ? '🚜' : '📈'}
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-green" style={{ textTransform: 'uppercase' }}>{blog.category}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{blog.readTime}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                    <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--text-primary)' }}>{blog.title}</Link>
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                    {blog.snippet}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{blog.author}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(blog.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</div>
                    </div>
                    
                    <Link to={`/blog/${blog.slug}`} className="btn btn-sm btn-ghost" style={{ color: 'var(--primary)', fontWeight: 700, paddingRight: 0 }}>
                      Read More ➡️
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogListPage;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../../api';
import toast from 'react-hot-toast';

const mockBlogsFallback = [
  {
    _id: '1',
    slug: 'drip-irrigation-subsidies',
    title: 'How to Apply for Govt Drip Irrigation Subsidies 💧',
    snippet: 'A complete step-by-step guide for Indian farmers to claim up to 90% subsidy on drip irrigation installations under PMKSY.',
    category: 'subsidies',
    author: 'Dr. A. K. Swaminathan',
    date: '2024-12-10',
    readTime: '5 min read',
    body: `
### Overview of PMKSY
The Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) is a central government initiative to promote water conservation. Under this scheme, the government provides financial assistance for Micro Irrigation (drip and sprinkler systems) to maximize crop yields with minimal water usage.

### Subsidy Percentages
1. **Small & Marginal Farmers:** Up to 90% of the total installation cost is subsidized by the government.
2. **Other Farmers:** Up to 75% of the total installation cost is covered.

### Eligible Crops
Drip irrigation works exceptionally well for row crops and high-value crops including:
- **Vegetables:** Tomato, Onion, Chilli, Brinjal, Potatoes.
- **Horticulture:** Banana, Papaya, Mango, Coconut, Lemon, Guava.
- **Cash Crops:** Sugarcane, Cotton.

### Step-by-Step Application Process
Follow these steps to submit your application for the drip irrigation subsidy:

1. **Soil & Water Testing:** Before applying, obtain a soil and water quality report from your nearest district agriculture lab.
2. **Contact Registered Manufacturers:** Visit local agricultural offices or the state website to find approved irrigation system suppliers. Ask them to design a custom layout for your farm and provide a cost estimation invoice.
3. **Assemble Required Documents:**
   - Land Ownership Documents (7/12 extract or Patta chitta)
   - Farm layout design map
   - Official Aadhaar card copy
   - Bank passbook copy (with IFSC details)
   - Soil & water report
4. **Submit Application:** Fill out the Micro-Irrigation application form on your state's agricultural portal (e.g., Hortnet) and upload the documents.
5. **Physical Inspection:** A district officer will visit your farm to verify land boundaries and confirm crop eligibility.
6. **Installation & Subsidy Release:** Once approved, the company installs the drip system. The subsidy amount is then credited directly to the manufacturer or the farmer's bank account via DBT (Direct Benefit Transfer).
    `
  },
  {
    _id: '2',
    slug: 'managing-paddy-leaf-blast',
    title: 'Managing and Preventing Leaf Blast in Paddy Crops 🌾',
    snippet: 'Leaf blast can destroy up to 50% of your rice yield. Learn how to identify symptoms early and apply organic treatment solutions.',
    category: 'farming tips',
    author: 'Advisory Panel',
    date: '2024-12-08',
    readTime: '7 min read',
    body: `
### What is Paddy Leaf Blast?
Leaf Blast is a destructive fungal disease caused by the pathogen *Magnaporthe oryzae* (formerly *Pyricularia oryzae*). It affects rice crops at all stages of growth—primarily on leaves, nodes, and panicles. If left untreated, it leads to severe crop losses.

### Key Symptoms to Look For
- **Diamond-Shaped Spots:** Watch for spindle-shaped (diamond-shaped) lesions on leaves with brown or reddish-brown borders and grey centers.
- **Node Rotting:** Infected nodes turn dark brown or black and break easily.
- **Neck Blast:** The neck of the panicle becomes greyish-brown and rots, resulting in empty or partially filled grains.

### Preventive Cultural Practices
Preventive management is the most effective approach against leaf blast:
- **Resistant Varieties:** Choose disease-resistant paddy seeds approved for your region.
- **Optimal Nitrogen Balance:** Avoid applying excessive nitrogen-based fertilizers. High nitrogen levels make leaf tissues succulent and highly susceptible to fungal spores. Apply nitrogen in split doses.
- **Proper Plant Spacing:** Avoid dense planting. Keep recommended spacing between rows to ensure good air circulation.
- **Destroy Crop Residues:** Burn or compost infected stubble after harvest to kill overwintering fungal spores.

### Organic Treatment Options
If symptoms are spotted early, apply these natural treatments:
1. **Neem Oil Spray:** Spray neem oil (concentrated at 3% or 30ml/liter of water) weekly to form a protective layer on leaves.
2. **Pseudomonas fluorescens:** Apply a bio-fungicide containing *Pseudomonas fluorescens* (powder form: 10g/liter of water, or seed treatment) to suppress pathogens.
3. **Bordeaux Mixture:** Apply a copper-based organic spray (1% concentration) to restrict fungal spore germination.
    `
  },
  {
    _id: '3',
    slug: 'organic-farming-basics',
    title: 'Organic Farming: The Basics for Beginners 🥬',
    snippet: 'Transitioning from chemical to organic farming? Learn the essential soil preparation, composting techniques, and pest control methods.',
    category: 'technology',
    author: 'Senthil Pathy (Farmer)',
    date: '2024-11-28',
    readTime: '6 min read',
    body: `
### Why Switch to Organic?
Organic farming relies on natural ecological processes instead of synthetic chemicals. It preserves soil health, decreases groundwater pollution, and commands a premium market price (up to 30-50% higher) for your products.

### Step 1: Restoring Soil Biology
Chemical farming destroys beneficial soil microbes. Restoring them takes time:
- **Green Manure:** Grow crops like Dhaincha or Sunnhemp and plow them back into the soil before sowing main crops.
- **Panchagavya:** Apply this fermented mix of cow dung, urine, milk, curd, and ghee to feed soil microbes and build resistance.

### Step 2: Vermicomposting
Convert organic waste into rich black gold:
- Build a concrete bed in a shaded location.
- Layer dry leaves, crop residue, and cow dung.
- Introduce earthworms (*Eisenia fetida*).
- Maintain 30% moisture by sprinkling water weekly. In 60 days, harvest the fine vermicompost.

### Step 3: Natural Pest Management
Avoid chemical pesticides by using natural repellents:
- **Agniastra / Neemastra:** Organic formulations made with cow urine, neem leaves, garlic, and green chillies to repel chewing insects and pests.
- **Intercropping:** Grow marigold flowers alongside vegetables to deter nematodes and attract beneficial predator insects.
    `
  },
  {
    _id: '4',
    slug: 'turmeric-market-trends',
    title: 'Market Trends: Rising Demand for Organic Spices 🌶️',
    snippet: 'Export analysis indicates a 25% year-on-year increase in international demand for organic turmeric. Read our price prediction report.',
    category: 'market trends',
    author: 'R. K. Iyer (Agri Analyst)',
    date: '2024-11-15',
    readTime: '4 min read',
    body: `
### Rising Global Demand
Spices form a major export asset. Demand for organic spices—particularly Turmeric (due to high curcumin content)—has surged in North America and Western Europe.

### Key Insights
- **Curcumin Premium:** Buyers pay up to 40% more for turmeric containing curcumin levels higher than 5%.
- **Traceability:** Importers look for certificates of authenticity, verifying pesticide-free farming methods.
- **Market Price Outlook:** Prices are expected to remain bullish next season, rising from ₹9,000/quintal to ₹12,500/quintal.

### Action Plan for Farmers
To capitalize on these trends:
1. **Get Certification:** Register with NPOP (National Programme for Organic Production) for organic certification.
2. **Quality Drying:** Invest in solar dryers rather than sun drying on roadsides to avoid dust contamination and preserve color.
    `
  }
];

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await blogAPI.getBlog(slug);
        if (res && res.success && res.blog) {
          setBlog(res.blog);
        } else {
          const match = mockBlogsFallback.find(b => b.slug === slug);
          setBlog(match || null);
        }
      } catch (err) {
        console.warn('API error, falling back to mock blog detail:', err);
        const match = mockBlogsFallback.find(b => b.slug === slug);
        setBlog(match || null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <h3>Article Not Found</h3>
        <p>The requested blog post could not be retrieved.</p>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link> / 
          <Link to="/blog" style={{ color: 'var(--primary)' }}>Blog</Link> / 
          <span>{blog.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
          
          {/* Main Content Article */}
          <article className="card" style={{ padding: '2rem 2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="badge badge-green" style={{ textTransform: 'uppercase', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                {blog.category}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{blog.readTime}</span>
            </div>

            <h1 style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: '1.25' }}>{blog.title}</h1>
            
            {/* Meta */}
            <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>AUTHOR</span>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{blog.author}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>PUBLISHED</span>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {new Date(blog.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                </div>
              </div>
            </div>

            {/* Body rendering */}
            <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {blog.body}
            </div>

            <div className="divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Share this article:</span>
                {['🔗 Link', '🐦 Twitter', '👥 Facebook'].map(s => (
                  <button key={s} onClick={() => toast.success('Share link copied to clipboard! 📋')}
                    style={{ background: 'var(--bg)', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {s}
                  </button>
                ))}
              </div>
              <Link to="/blog" className="btn btn-secondary btn-sm">
                ⬅️ Back to Blog List
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Help desk banner */}
            <div className="card card-green" style={{ padding: '1.5rem', position: 'relative' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Need Advisor Help? 👨‍🌾</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                Get instant advisory help from our expert support officers for pests, crop choices, and disease detection.
              </p>
              <Link to="/live-chat" className="btn btn-accent btn-sm w-full">
                💬 Open Live Chat
              </Link>
            </div>

            {/* Related Tools */}
            <div className="card">
              <h4 style={{ marginBottom: '1rem' }}>Smart Farming Tools</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { title: '🔬 Disease Detection', path: '/farmer/disease-detection', desc: 'Scan leaf pictures for disease' },
                  { title: '🌾 Crop Advisor', path: '/farmer/crop-recommendation', desc: 'Receive seasonal seed advises' },
                  { title: '🌤️ Weather Alerts', path: '/weather', desc: 'Rain predictions & wind warnings' },
                ].map(tool => (
                  <Link key={tool.title} to={tool.path} style={{ display: 'block', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg)', transition: 'all 0.2s', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{tool.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{tool.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>

      </div>
    </div>
  );
};

export default BlogDetailPage;

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { marketAPI } from '../../api';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const mockProducts = [
  { _id: '1', name: 'Fresh Organic Tomatoes', category: 'vegetables', price: 45, unit: 'kg', quantity: 500, images: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400'], isOrganic: true, rating: 4.8, numReviews: 124, farmer: { name: 'Rajesh Kumar', farmName: 'Green Valley Farm' }, location: { city: 'Coimbatore' }, description: 'Fresh, juicy tomatoes grown without pesticides' },
  { _id: '2', name: 'Ponni Rice (Raw)', category: 'grains', price: 58, unit: 'kg', quantity: 2000, images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'], isOrganic: false, rating: 4.6, numReviews: 89, farmer: { name: 'Murugan Selvam', farmName: 'Thanjavur Farms' }, location: { city: 'Thanjavur' }, description: 'Premium quality Ponni rice from Thanjavur' },
  { _id: '3', name: 'Country Eggs (30 pcs)', category: 'dairy', price: 185, unit: 'dozen', quantity: 200, images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400'], isOrganic: true, rating: 4.9, numReviews: 211, farmer: { name: 'Priya Devi', farmName: 'Sunrise Poultry' }, location: { city: 'Salem' }, description: 'Free-range country eggs, rich in nutrients' },
  { _id: '4', name: 'Alphonso Mangoes', category: 'fruits', price: 120, unit: 'kg', quantity: 300, images: ['https://images.unsplash.com/photo-1601493700631-2851410db6ce?w=400'], isOrganic: false, rating: 4.7, numReviews: 156, farmer: { name: 'Anil Sharma', farmName: 'Mango Paradise' }, location: { city: 'Krishnagiri' }, description: 'Premium Alphonso mangoes, naturally ripened' },
  { _id: '5', name: 'Green Chillis (Hot)', category: 'vegetables', price: 35, unit: 'kg', quantity: 150, images: ['https://images.unsplash.com/photo-1526346698789-22fd84314424?w=400'], isOrganic: true, rating: 4.5, numReviews: 67, farmer: { name: 'Ravi Kumar', farmName: 'Spice Garden' }, location: { city: 'Madurai' }, description: 'Fresh hot green chillis, organically grown' },
  { _id: '6', name: 'Turmeric Powder (500g)', category: 'spices', price: 89, unit: 'gram', quantity: 400, images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400'], isOrganic: true, rating: 4.8, numReviews: 93, farmer: { name: 'Lakshmi Narayanan', farmName: 'Organic Spices' }, location: { city: 'Erode' }, description: 'Pure turmeric with high curcumin content' },
  { _id: '7', name: 'Banana (Yelakki)', category: 'fruits', price: 40, unit: 'dozen', quantity: 800, images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'], isOrganic: false, rating: 4.4, numReviews: 45, farmer: { name: 'Siva Ram', farmName: 'Banana Plantation' }, location: { city: 'Trichy' }, description: 'Sweet Yelakki bananas, freshly harvested' },
  { _id: '8', name: 'Fresh Spinach (Palak)', category: 'vegetables', price: 25, unit: 'kg', quantity: 100, images: ['https://images.unsplash.com/photo-1566566839079-8eb1ade57523?w=400'], isOrganic: true, rating: 4.6, numReviews: 78, farmer: { name: 'Meenakshi Farm', farmName: 'Leafy Greens' }, location: { city: 'Chennai' }, description: 'Fresh organic spinach, harvested daily' },
  { _id: '9', name: 'Groundnut Oil (1L)', category: 'other', price: 195, unit: 'liter', quantity: 250, images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'], isOrganic: false, rating: 4.7, numReviews: 134, farmer: { name: 'Oil Factory Tamil Nadu', farmName: 'Traditional Mill' }, location: { city: 'Coimbatore' }, description: 'Cold-pressed groundnut oil, traditional method' },
  { _id: '10', name: 'Dragon Fruit', category: 'fruits', price: 200, unit: 'kg', quantity: 80, images: ['https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400'], isOrganic: true, rating: 4.9, numReviews: 42, farmer: { name: 'Exotic Fruits Farm', farmName: 'Dragon Orchard' }, location: { city: 'Vellore' }, description: 'Fresh dragon fruit, high antioxidant content' },
  { _id: '11', name: 'Lady Finger (Okra)', category: 'vegetables', price: 30, unit: 'kg', quantity: 200, images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400'], isOrganic: false, rating: 4.3, numReviews: 56, farmer: { name: 'Village Farm', farmName: 'Green Fields' }, location: { city: 'Madurai' }, description: 'Fresh tender okra, perfect for curries' },
  { _id: '12', name: 'Coconut (Fresh, 10 pcs)', category: 'fruits', price: 150, unit: 'piece', quantity: 500, images: ['https://images.unsplash.com/photo-1542838686-42e1c93c76e9?w=400'], isOrganic: false, rating: 4.5, numReviews: 99, farmer: { name: 'Coconut Groves', farmName: 'Palm Farm' }, location: { city: 'Coimbatore' }, description: 'Fresh tender coconuts, sweet and nutritious' },
];

const MarketplacePage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [isOrganic, setIsOrganic] = useState(false);
  const [cartAdded, setCartAdded] = useState({});

  const categories = ['all', 'vegetables', 'fruits', 'grains', 'pulses', 'dairy', 'spices', 'other'];

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'all' && p.category !== category) return false;
    if (isOrganic && !p.isOrganic) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleAddToCart = async (product) => {
    await addToCart(product._id);
    setCartAdded(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => setCartAdded(prev => ({ ...prev, [product._id]: false })), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '4rem 0 6rem', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 0V60H0Z" fill="#F1F8E9"/></svg>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>🏠 Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0.5rem' }}>›</span>
          <span style={{ color: 'white', fontSize: '0.875rem' }}>Marketplace</span>
          <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '0.5rem' }}>🛒 Fresh Farm Marketplace</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)' }}>Buy directly from verified local farmers. Fresh. Organic. Affordable.</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Search & Filters */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', marginBottom: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 2, minWidth: 220, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
            <input className="form-input" style={{ paddingLeft: '2.75rem', margin: 0, borderRadius: '12px' }} placeholder="Search fresh produce, grains, dairy..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-input form-select" style={{ flex: 1, minWidth: 140, margin: 0 }} value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
          <select className="form-input form-select" style={{ flex: 1, minWidth: 140, margin: 0 }} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
            <input type="checkbox" checked={isOrganic} onChange={e => setIsOrganic(e.target.checked)} style={{ accentColor: '#2E7D32', width: 16, height: 16 }} />
            🌿 Organic Only
          </label>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {[['🛒', 'all', 'All'], ['🥬', 'vegetables', 'Vegetables'], ['🍎', 'fruits', 'Fruits'], ['🌾', 'grains', 'Grains'], ['🫘', 'pulses', 'Pulses'], ['🥛', 'dairy', 'Dairy'], ['🌶️', 'spices', 'Spices']].map(([icon, val, label]) => (
            <button key={val} onClick={() => setCategory(val)} style={{ padding: '0.5rem 1.1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600, fontSize: '0.85rem', background: category === val ? 'linear-gradient(135deg, #2E7D32, #4CAF50)' : 'white', color: category === val ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <p style={{ color: '#546E7A', fontSize: '0.9rem' }}><strong style={{ color: '#1B2631' }}>{filtered.length}</strong> products found</p>
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((product, i) => (
            <div key={product._id} className="product-card" style={{ animation: `fadeInUp 0.4s ease ${i * 0.05}s both` }}>
              <div style={{ position: 'relative' }}>
                <img src={product.images[0]} alt={product.name} className="product-card-img" onError={e => e.target.src = 'https://via.placeholder.com/400x200?text=Fresh+Produce'} />
                {product.isOrganic && <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#2E7D32', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '20px' }}>🌿 Organic</span>}
                <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'white', fontSize: '0.8rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>⭐ {product.rating}</span>
              </div>
              <div className="product-card-body">
                <div className="product-card-category">{product.category}</div>
                <Link to={`/marketplace/product/${product._id}`}>
                  <h5 className="product-card-name">{product.name}</h5>
                </Link>
                <p style={{ fontSize: '0.8rem', color: '#90A4AE', margin: '0.25rem 0 0.75rem' }}>📍 {product.location?.city} • 👨‍🌾 {product.farmer?.name}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><span className="product-card-price">₹{product.price}</span><span className="product-card-unit"> /{product.unit}</span></div>
                  <span style={{ fontSize: '0.75rem', color: '#90A4AE' }}>({product.numReviews} reviews)</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.85rem' }}>
                  <Link to={`/marketplace/product/${product._id}`} className="btn btn-secondary btn-sm" style={{ textAlign: 'center' }}>Details</Link>
                  <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(product)} style={{ background: cartAdded[product._id] ? '#81C784' : undefined }}>
                    {cartAdded[product._id] ? '✅ Added' : '🛒 Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">No products found</div>
            <div className="empty-state-text">Try adjusting your search or filters</div>
            <button className="btn btn-primary" onClick={() => { setSearch(''); setCategory('all'); setIsOrganic(false); }}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;

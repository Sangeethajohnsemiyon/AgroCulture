import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const products = {
  '1': { _id: '1', name: 'Fresh Organic Tomatoes', category: 'vegetables', price: 45, unit: 'kg', quantity: 500, images: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600', 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600'], isOrganic: true, rating: 4.8, numReviews: 124, farmer: { name: 'Rajesh Kumar', farmName: 'Green Valley Farm', phone: '9876543210', address: { city: 'Coimbatore', state: 'Tamil Nadu' } }, description: 'Fresh, juicy tomatoes grown without any pesticides or chemicals in our certified organic farm. Rich in lycopene and antioxidants. Perfect for cooking, salads, and juices.', reviews: [{ name: 'Anita R', rating: 5, comment: 'Very fresh and tasty! Better than supermarket tomatoes. Will buy again.', date: '2024-12-10' }, { name: 'Suresh K', rating: 4, comment: 'Good quality organic tomatoes. Delivery was quick.', date: '2024-12-08' }] }
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [review, setReview] = useState({ rating: 5, comment: '' });

  const product = products[id] || products['1'];

  const handleAddToCart = () => {
    addToCart(product._id, qty);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'white', padding: '1rem 0', borderBottom: '1px solid #E0E0E0' }}>
        <div className="container">
          <Link to="/">🏠 Home</Link> › <Link to="/marketplace">Marketplace</Link> › <span style={{ color: '#2E7D32' }}>{product.name}</span>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Images */}
          <div>
            <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: '16px', marginBottom: '0.75rem' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {product.images.map((img, i) => (
                <img key={i} src={img} alt="" style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: '10px', cursor: 'pointer', border: activeImg === i ? '2px solid #2E7D32' : '2px solid transparent' }} onClick={() => setActiveImg(i)} />
              ))}
            </div>
          </div>
          {/* Details */}
          <div>
            {product.isOrganic && <span className="badge badge-green" style={{ marginBottom: '1rem' }}>🌿 Certified Organic</span>}
            <h2 style={{ marginBottom: '0.5rem' }}>{product.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ color: '#F9A825', fontSize: '1.1rem' }}>{'★'.repeat(Math.round(product.rating))}</div>
              <span style={{ color: '#546E7A', fontSize: '0.875rem' }}>({product.numReviews} reviews)</span>
              <span style={{ color: product.quantity > 100 ? '#2E7D32' : '#E53935', fontSize: '0.875rem', fontWeight: 600 }}>{product.quantity > 0 ? '✅ In Stock' : '❌ Out of Stock'}</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2E7D32', marginBottom: '0.25rem' }}>₹{product.price}<span style={{ fontSize: '1rem', fontWeight: 400, color: '#546E7A' }}>/{product.unit}</span></div>
            <p style={{ marginBottom: '1.5rem' }}>{product.description}</p>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 600 }}>Quantity ({product.unit}):</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #E0E0E0', borderRadius: '10px', overflow: 'hidden' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 40, border: 'none', background: '#F5F5F5', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}>−</button>
                <span style={{ width: 50, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 40, border: 'none', background: '#F5F5F5', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}>+</button>
              </div>
              <span style={{ color: '#546E7A', fontSize: '0.875rem' }}>Total: <strong style={{ color: '#2E7D32' }}>₹{product.price * qty}</strong></span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAddToCart}>🛒 Add to Cart</button>
              <Link to="/buyer/checkout" className="btn btn-accent" style={{ flex: 1, textAlign: 'center' }}>⚡ Buy Now</Link>
            </div>

            {/* Farmer Info */}
            <div style={{ background: '#E8F5E9', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1B5E20' }}>👨‍🌾 Seller Information</div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, background: '#2E7D32', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{product.farmer.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{product.farmer.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#546E7A' }}>{product.farmer.farmName} • {product.farmer.address?.city}, {product.farmer.address?.state}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Customer Reviews</h3>
          {product.reviews?.map((r, i) => (
            <div key={i} style={{ padding: '1.25rem 0', borderBottom: i < product.reviews.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, background: '#2E7D32', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.name}</div>
                    <div style={{ color: '#F9A825', fontSize: '0.85rem' }}>{'★'.repeat(r.rating)}</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#90A4AE' }}>{new Date(r.date).toLocaleDateString('en-IN')}</span>
              </div>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

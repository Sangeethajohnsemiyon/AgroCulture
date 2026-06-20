import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { marketAPI, adminAPI } from '../../api';
import toast from 'react-hot-toast';

const mockProductsFallback = [
  { _id: '1', name: 'Fresh Organic Tomatoes', category: 'vegetables', price: 40, unit: 'kg', stock: 150, status: 'approved', isFeatured: true, farmer: { name: 'Rajesh Kumar' } },
  { _id: '2', name: 'Basmati Rice (Premium)', category: 'grains', price: 90, unit: 'kg', stock: 500, status: 'approved', isFeatured: false, farmer: { name: 'Murugan Selvam' } },
  { _id: '3', name: 'Alphonso Mangoes', category: 'fruits', price: 250, unit: 'dozen', stock: 0, status: 'approved', isFeatured: true, farmer: { name: 'Rajesh Kumar' } },
  { _id: '4', name: 'Natural Honey', category: 'other', price: 400, unit: 'kg', stock: 50, status: 'pending', isFeatured: false, farmer: { name: 'Senthil Pathy' } },
  { _id: '5', name: 'Organic Turmeric Powder', category: 'spices', price: 180, unit: 'kg', stock: 200, status: 'approved', isFeatured: false, farmer: { name: 'Murugan Selvam' } },
];

export const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ price: '', stock: '' });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getProducts();
      // If server returns data, use it; otherwise fallback
      if (res && res.success && res.products) {
        setProducts(res.products);
      } else {
        setProducts(mockProductsFallback);
      }
    } catch (err) {
      console.warn('API error, falling back to mock products:', err);
      setProducts(mockProductsFallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleFeature = async (id, currentVal) => {
    try {
      // Optimitic UI update
      setProducts(products.map(p => p._id === id ? { ...p, isFeatured: !currentVal } : p));
      await adminAPI.featureProduct(id, { isFeatured: !currentVal });
      toast.success(currentVal ? 'Product unfeatured' : 'Product featured on Landing Page! ⭐');
    } catch (err) {
      toast.error('Failed to update product settings');
      // Revert if error
      setProducts(products.map(p => p._id === id ? { ...p, isFeatured: currentVal } : p));
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      setProducts(products.map(p => p._id === id ? { ...p, status } : p));
      // Call update API (can use generic update or custom endpoint if exists)
      await marketAPI.updateProduct(id, { status });
      toast.success(`Product status updated to ${status}`);
    } catch (err) {
      toast.error('Failed to update product status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      setProducts(products.filter(p => p._id !== id));
      await marketAPI.deleteProduct(id);
      toast.success('Product listing deleted');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setEditForm({ price: product.price, stock: product.stock });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      setProducts(products.map(p => p._id === editingProduct._id ? { ...p, price: Number(editForm.price), stock: Number(editForm.stock) } : p));
      await marketAPI.updateProduct(editingProduct._id, { price: Number(editForm.price), stock: Number(editForm.stock) });
      toast.success('Product updated successfully');
      setEditingProduct(null);
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  const filtered = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !(p.farmer?.name || '').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout title="Product Management" subtitle={`${filtered.length} products listed`}>
      {/* Filters header */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input className="form-input" style={{ paddingLeft: '2.75rem', margin: 0 }} placeholder="Search product or farmer..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        
        <select className="form-input form-select" style={{ margin: 0, minWidth: 150 }} value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="spices">Spices</option>
          <option value="other">Other</option>
        </select>

        <select className="form-input form-select" style={{ margin: 0, minWidth: 150 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-icon green">📦</div>
          <div className="stat-value">{products.length}</div>
          <div className="stat-label">Total Listings</div>
        </div>
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-icon accent">⭐</div>
          <div className="stat-value">{products.filter(p => p.isFeatured).length}</div>
          <div className="stat-label">Featured Products</div>
        </div>
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-icon red">⚠️</div>
          <div className="stat-value">{products.filter(p => p.stock === 0).length}</div>
          <div className="stat-label">Out of Stock</div>
        </div>
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-icon blue">⏳</div>
          <div className="stat-value">{products.filter(p => p.status === 'pending').length}</div>
          <div className="stat-label">Pending Approval</div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div className="spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <span style={{ fontSize: '3rem' }}>📭</span>
          <h3>No products match your criteria</h3>
          <p>Try modifying your search or filters.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Farmer</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '8px', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                        {product.category === 'vegetables' ? '🥦' : product.category === 'fruits' ? '🍎' : product.category === 'grains' ? '🌾' : product.category === 'spices' ? '🌶️' : '📦'}
                      </div>
                      <div style={{ fontWeight: 600 }}>{product.name}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>{product.category}</span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{product.farmer?.name || 'Unknown'}</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>₹{product.price} / {product.unit}</td>
                  <td>
                    <span className={`badge ${product.stock === 0 ? 'badge-danger' : product.stock < 20 ? 'badge-warning' : 'badge-green'}`}>
                      {product.stock} {product.unit}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${product.status === 'approved' ? 'badge-green' : product.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleToggleFeature(product._id, product.isFeatured)} style={{ fontSize: '1.3rem', cursor: 'pointer' }}>
                      {product.isFeatured ? '⭐' : '☆'}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {product.status === 'pending' && (
                        <button onClick={() => handleUpdateStatus(product._id, 'approved')} className="btn btn-sm" style={{ background: '#E8F5E9', color: '#2E7D32', border: 'none', padding: '0.35rem 0.75rem' }}>
                          Approve
                        </button>
                      )}
                      <button onClick={() => startEdit(product)} className="btn btn-sm btn-ghost" style={{ padding: '0.35rem 0.75rem' }}>
                        ✍️ Edit
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="btn btn-sm" style={{ background: '#FFEBEE', color: '#E53935', border: 'none', padding: '0.35rem 0.75rem' }}>
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h3 style={{ marginBottom: '1rem' }}>Edit Listing</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Updating: <strong>{editingProduct.name}</strong>
            </p>
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label className="form-label">Price (₹ per {editingProduct.unit})</label>
                <input type="number" className="form-input" required value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity ({editingProduct.unit})</label>
                <input type="number" className="form-input" required value={editForm.stock} onChange={e => setEditForm({ ...editForm, stock: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setEditingProduct(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProductManagementPage;

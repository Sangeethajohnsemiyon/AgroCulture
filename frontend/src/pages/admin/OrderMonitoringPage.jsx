import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { adminAPI } from '../../api';
import toast from 'react-hot-toast';

const mockOrdersFallback = [
  { _id: 'AC-10024', createdAt: '2024-12-19T10:30:00Z', buyer: { name: 'Priya Suresh', phone: '9876543210', address: '12, Gandhi Street, Chennai' }, farmer: { name: 'Rajesh Kumar', phone: '9823456712' }, amount: 4500, status: 'placed', items: [{ name: 'Basmati Rice (Premium)', qty: 50, price: 90 }] },
  { _id: 'AC-10023', createdAt: '2024-12-18T14:15:00Z', buyer: { name: 'Anitha Devi', phone: '8765432109', address: '45, Nehru Nagar, Coimbatore' }, farmer: { name: 'Murugan Selvam', phone: '9785641230' }, amount: 1200, status: 'confirmed', items: [{ name: 'Fresh Organic Tomatoes', qty: 30, price: 40 }] },
  { _id: 'AC-10022', createdAt: '2024-12-15T09:00:00Z', buyer: { name: 'Siva Perumal', phone: '7654321098', address: '5, Kamarajar Salai, Madurai' }, farmer: { name: 'Rajesh Kumar', phone: '9823456712' }, amount: 5000, status: 'delivered', items: [{ name: 'Alphonso Mangoes', qty: 20, price: 250 }] },
  { _id: 'AC-10021', createdAt: '2024-12-14T11:45:00Z', buyer: { name: 'Priya Suresh', phone: '9876543210', address: '12, Gandhi Street, Chennai' }, farmer: { name: 'Murugan Selvam', phone: '9785641230' }, amount: 360, status: 'cancelled', items: [{ name: 'Organic Turmeric Powder', qty: 2, price: 180 }] },
  { _id: 'AC-10020', createdAt: '2024-12-12T16:20:00Z', buyer: { name: 'Vijay Anand', phone: '6543210987', address: '102, Anna Salai, Trichy' }, farmer: { name: 'Murugan Selvam', phone: '9785641230' }, amount: 1800, status: 'processing', items: [{ name: 'Basmati Rice', qty: 20, price: 90 }] },
];

export const OrderMonitoringPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getOrders();
      if (res && res.success && res.orders) {
        setOrders(res.orders);
      } else {
        setOrders(mockOrdersFallback);
      }
    } catch (err) {
      console.warn('API error, falling back to mock orders:', err);
      setOrders(mockOrdersFallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // Optimistic update
      setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
      await adminAPI.updateOrderStatus(id, { status: newStatus });
      toast.success(`Order status updated to: ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
      fetchOrders(); // Revert
    }
  };

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchId = o._id.toLowerCase().includes(q);
      const matchBuyer = (o.buyer?.name || '').toLowerCase().includes(q);
      const matchFarmer = (o.farmer?.name || '').toLowerCase().includes(q);
      return matchId || matchBuyer || matchFarmer;
    }
    return true;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'placed': return 'status-placed';
      case 'confirmed': return 'status-confirmed';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'badge-gray';
    }
  };

  return (
    <DashboardLayout title="Order Monitoring" subtitle={`${filtered.length} orders tracked`}>
      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input className="form-input" style={{ paddingLeft: '2.75rem', margin: 0 }} placeholder="Search by Order ID, buyer, or farmer..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        
        <select className="form-input form-select" style={{ margin: 0, minWidth: 180 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="placed">Placed</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-icon blue">📋</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-icon green">💰</div>
          <div className="stat-value">₹{orders.reduce((acc, o) => o.status !== 'cancelled' ? acc + o.amount : acc, 0).toLocaleString('en-IN')}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-icon accent">⏳</div>
          <div className="stat-value">{orders.filter(o => ['placed', 'confirmed', 'processing'].includes(o.status)).length}</div>
          <div className="stat-label">Pending Fulfilment</div>
        </div>
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-icon red">❌</div>
          <div className="stat-value">{orders.filter(o => o.status === 'cancelled').length}</div>
          <div className="stat-label">Cancelled Orders</div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div className="spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <span style={{ fontSize: '3rem' }}>🛍️</span>
          <h3>No orders found</h3>
          <p>No orders match the current filters.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Buyer</th>
                <th>Farmer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order._id}>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>#{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600 }}>{order.buyer?.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.buyer?.phone}</div>
                    </div>
                  </td>
                  <td>{order.farmer?.name || 'Multi-farmer'}</td>
                  <td style={{ fontWeight: 700 }}>₹{order.amount.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(order.status)}`} style={{ textTransform: 'capitalize' }}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <select className="form-input" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', margin: 0, width: 120 }} value={order.status} onChange={e => handleUpdateStatus(order._id, e.target.value)}>
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button onClick={() => setSelectedOrder(order)} className="btn btn-sm btn-ghost" style={{ padding: '0.25rem 0.5rem' }}>
                        👁️ View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Order Details #{selectedOrder._id}</h3>
              <span className={`badge ${getStatusBadgeClass(selectedOrder.status)}`} style={{ textTransform: 'capitalize' }}>
                {selectedOrder.status}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <strong>Buyer Information:</strong>
                <p style={{ margin: 0, marginTop: '0.25rem' }}>{selectedOrder.buyer?.name} ({selectedOrder.buyer?.phone})</p>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>{selectedOrder.buyer?.address}</p>
              </div>

              <div>
                <strong>Farmer Information:</strong>
                <p style={{ margin: 0, marginTop: '0.25rem' }}>{selectedOrder.farmer?.name || 'N/A'}</p>
              </div>

              <div className="divider" style={{ margin: '0.5rem 0' }} />

              <div>
                <strong>Items:</strong>
                <table style={{ width: '100%', marginTop: '0.5rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                      <th style={{ padding: '0.25rem 0', color: 'var(--text-muted)' }}>Item</th>
                      <th style={{ padding: '0.25rem 0', color: 'var(--text-muted)' }}>Qty</th>
                      <th style={{ padding: '0.25rem 0', color: 'var(--text-muted)' }}>Price</th>
                      <th style={{ padding: '0.25rem 0', color: 'var(--text-muted)', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.5rem 0' }}>{item.name}</td>
                        <td style={{ padding: '0.5rem 0' }}>{item.qty}</td>
                        <td style={{ padding: '0.5rem 0' }}>₹{item.price}</td>
                        <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: 600 }}>₹{item.qty * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem', marginTop: '1rem' }}>
                <span>Total Amount:</span>
                <span className="text-primary">₹{selectedOrder.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OrderMonitoringPage;

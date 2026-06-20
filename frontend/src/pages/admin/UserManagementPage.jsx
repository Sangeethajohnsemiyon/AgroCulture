import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import toast from 'react-hot-toast';

const mockUsers = [
  { _id: '1', name: 'Rajesh Kumar', email: 'rajesh@farm.com', role: 'farmer', isActive: true, isVerified: true, createdAt: '2024-10-01', farmName: 'Green Valley' },
  { _id: '2', name: 'Priya Suresh', email: 'priya@buyer.com', role: 'buyer', isActive: true, isVerified: true, createdAt: '2024-11-15' },
  { _id: '3', name: 'Murugan Selvam', email: 'murugan@farm.com', role: 'farmer', isActive: true, isVerified: false, createdAt: '2024-12-01', farmName: 'Thanjavur Farm' },
  { _id: '4', name: 'Admin User', email: 'admin@agroconnect.com', role: 'admin', isActive: true, isVerified: true, createdAt: '2024-01-01' },
  { _id: '5', name: 'Anitha Devi', email: 'anitha@buyer.com', role: 'buyer', isActive: false, isVerified: true, createdAt: '2024-09-20' },
];

const UserManagementPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = users.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleActive = (id) => {
    setUsers(users.map(u => u._id === id ? { ...u, isActive: !u.isActive } : u));
    toast.success('User status updated');
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u._id !== id));
    toast.success('User removed');
  };

  const roleColors = { farmer: '#E8F5E9', buyer: '#E3F2FD', admin: '#F3E5F5' };
  const roleTextColors = { farmer: '#2E7D32', buyer: '#1976D2', admin: '#7B1FA2' };

  return (
    <DashboardLayout title="User Management" subtitle={`${users.length} total users`}>
      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input className="form-input" style={{ paddingLeft: '2.75rem', margin: 0 }} placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {['all', 'farmer', 'buyer', 'admin'].map(r => (
          <button key={r} onClick={() => setRoleFilter(r)} style={{ padding: '0.45rem 1.1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', background: roleFilter === r ? '#2E7D32' : 'white', color: roleFilter === r ? 'white' : '#546E7A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textTransform: 'capitalize' }}>{r}</button>
        ))}
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[['👥', 'Total Users', users.length, '#E8F5E9'], ['👨‍🌾', 'Farmers', users.filter(u=>u.role==='farmer').length, '#E8F5E9'], ['🛒', 'Buyers', users.filter(u=>u.role==='buyer').length, '#E3F2FD'], ['✅', 'Verified', users.filter(u=>u.isVerified).length, '#FFF8E1']].map(([icon, label, val, bg]) => (
          <div key={label} style={{ background: bg, borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem' }}>{icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{val}</div>
            <div style={{ fontSize: '0.78rem', color: '#546E7A' }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <table className="table">
          <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, background: roleColors[user.role], borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: roleTextColors[user.role] }}>{user.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name}</div>
                      {user.farmName && <div style={{ fontSize: '0.75rem', color: '#90A4AE' }}>{user.farmName}</div>}
                    </div>
                  </div>
                </td>
                <td style={{ color: '#546E7A', fontSize: '0.875rem' }}>{user.email}</td>
                <td><span className="badge" style={{ background: roleColors[user.role], color: roleTextColors[user.role], textTransform: 'capitalize' }}>{user.role}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: user.isActive ? '#E8F5E9' : '#FFEBEE', color: user.isActive ? '#2E7D32' : '#E53935' }}>{user.isActive ? '✅ Active' : '❌ Inactive'}</span>
                    {user.isVerified && <span className="badge badge-info">✓ Verified</span>}
                  </div>
                </td>
                <td style={{ color: '#90A4AE', fontSize: '0.85rem' }}>{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => toggleActive(user._id)} className="btn btn-sm" style={{ background: user.isActive ? '#FFF3E0' : '#E8F5E9', color: user.isActive ? '#E65100' : '#2E7D32', border: 'none', fontSize: '0.78rem' }}>{user.isActive ? 'Suspend' : 'Activate'}</button>
                    <button onClick={() => deleteUser(user._id)} className="btn btn-sm" style={{ background: '#FFEBEE', color: '#E53935', border: 'none', fontSize: '0.78rem' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default UserManagementPage;

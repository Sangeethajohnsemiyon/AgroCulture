import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import toast from 'react-hot-toast';

const reportTypes = [
  { id: 'sales', label: '📊 Sales & Revenue Report', description: 'Transaction logs, commission fees, and overall financial summaries.' },
  { id: 'farmers', label: '👨‍🌾 Farmer Enrollment & Activity', description: 'New farmer registrations, active crop monitorings, and listing counts.' },
  { id: 'buyers', label: '🛒 Buyer Demographics & Orders', description: 'Buyer purchase history, cart conversion rates, and area analysis.' },
  { id: 'crops', label: '🌾 Crop Growth & Health Trends', description: 'Aggregated crop health analytics, water logs, and disease outbreaks.' },
];

const mockReportData = {
  sales: {
    title: 'Sales & Revenue Summary',
    period: 'Last 30 Days',
    summary: [
      { label: 'Total Sales Volume', value: '₹2,48,500' },
      { label: 'Platform Commission (5%)', value: '₹12,425' },
      { label: 'Successful Transactions', value: '142' },
      { label: 'Average Order Value', value: '₹1,750' },
    ],
    details: [
      { id: '#AC-10024', item: 'Basmati Rice', client: 'Priya Suresh', date: '2024-12-19', amount: '₹4,500' },
      { id: '#AC-10023', item: 'Organic Tomatoes', client: 'Anitha Devi', date: '2024-12-18', amount: '₹1,200' },
      { id: '#AC-10022', item: 'Alphonso Mangoes', client: 'Siva Perumal', date: '2024-12-15', amount: '₹5,000' },
      { id: '#AC-10020', item: 'Premium Grains', client: 'Vijay Anand', date: '2024-12-12', amount: '₹1,800' },
    ]
  },
  farmers: {
    title: 'Farmer Registration & Crops Summary',
    period: 'Last 30 Days',
    summary: [
      { label: 'New Registered Farmers', value: '34' },
      { label: 'Active Crop Listings', value: '158' },
      { label: 'Crops Monitored', value: '89' },
      { label: 'Top Active Region', value: 'Thanjavur' },
    ],
    details: [
      { name: 'Rajesh Kumar', region: 'Madurai', crops: 'Basmati Rice, Mangoes', joins: '2024-10-01', status: 'Active' },
      { name: 'Murugan Selvam', region: 'Thanjavur', crops: 'Basmati Rice, Turmeric', joins: '2024-12-01', status: 'Active' },
      { name: 'Senthil Pathy', region: 'Coimbatore', crops: 'Honey, Coconut', joins: '2024-12-05', status: 'Active' },
      { name: 'Ravi Teja', region: 'Salem', crops: 'Tapioca, Cotton', joins: '2024-12-10', status: 'Pending' },
    ]
  },
  buyers: {
    title: 'Buyer Activity & Demographics',
    period: 'Last 30 Days',
    summary: [
      { label: 'New Buyer Accounts', value: '56' },
      { label: 'Active Buyers', value: '112' },
      { label: 'Orders Placed', value: '185' },
      { label: 'Repeat Customer Rate', value: '42%' },
    ],
    details: [
      { name: 'Priya Suresh', orders: '12', spend: '₹24,500', region: 'Chennai', lastOrder: '2024-12-19' },
      { name: 'Anitha Devi', orders: '6', spend: '₹8,200', region: 'Coimbatore', lastOrder: '2024-12-18' },
      { name: 'Siva Perumal', orders: '4', spend: '₹9,800', region: 'Madurai', lastOrder: '2024-12-15' },
      { name: 'Vijay Anand', orders: '9', spend: '₹14,300', region: 'Trichy', lastOrder: '2024-12-12' },
    ]
  },
  crops: {
    title: 'Crop Health & Diseases Overview',
    period: 'Last 30 Days',
    summary: [
      { label: 'Scans Performed', value: '312' },
      { label: 'Diseases Detected', value: '48' },
      { label: 'Healthy Crops', value: '84.6%' },
      { label: 'Most Common Pest', value: 'Leaf Blast' },
    ],
    details: [
      { crop: 'Paddy', scanCount: '124', healthyPercent: '88%', diseaseAlerts: 'Leaf Blast (12)' },
      { crop: 'Tomato', scanCount: '98', healthyPercent: '76%', diseaseAlerts: 'Late Blight (18)' },
      { crop: 'Mango', scanCount: '45', healthyPercent: '91%', diseaseAlerts: 'Powdery Mildew (3)' },
      { crop: 'Cotton', scanCount: '45', healthyPercent: '84%', diseaseAlerts: 'Bollworm (8)' },
    ]
  }
};

export const ReportGenerationPage = () => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [timePeriod, setTimePeriod] = useState('30days');
  const [generating, setGenerating] = useState(false);
  const [reportPreview, setReportPreview] = useState(mockReportData.sales);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setReportPreview(mockReportData[selectedReport]);
      setGenerating(false);
      toast.success('Report successfully generated! 📄');
    }, 1200);
  };

  const handleDownload = (format) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Preparing ${format.toUpperCase()} download...`,
        success: `AgroConnect_${selectedReport}_report.${format} downloaded successfully! 📁`,
        error: 'Failed to download report',
      }
    );
  };

  return (
    <DashboardLayout title="Report Generation" subtitle="Analyze system analytics and download performance reports">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Left Control Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card">
            <h4 style={{ marginBottom: '1rem' }}>Report Configuration</h4>
            
            <div className="form-group">
              <label className="form-label">Select Report Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {reportTypes.map(r => (
                  <button key={r.id} onClick={() => setSelectedReport(r.id)}
                    style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: `2px solid ${selectedReport === r.id ? 'var(--primary)' : 'var(--border)'}`, background: selectedReport === r.id ? 'var(--primary-50)' : 'white', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ fontWeight: 600, color: selectedReport === r.id ? 'var(--primary)' : 'var(--text-primary)' }}>{r.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{r.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Time Period</label>
              <select className="form-input form-select" value={timePeriod} onChange={e => setTimePeriod(e.target.value)}>
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>

            {timePeriod === 'custom' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">From</label>
                  <input type="date" className="form-input" defaultValue="2024-11-20" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">To</label>
                  <input type="date" className="form-input" defaultValue="2024-12-20" />
                </div>
              </div>
            )}

            <button onClick={handleGenerate} className="btn btn-primary w-full" disabled={generating} style={{ marginTop: '0.5rem' }}>
              {generating ? '⏳ Fetching Data...' : '⚙️ Generate Report'}
            </button>
          </div>
        </div>

        {/* Right Report Preview */}
        <div>
          {reportPreview ? (
            <div className="card" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              {/* Report Header */}
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <span className="badge badge-green" style={{ textTransform: 'uppercase', marginBottom: '0.4rem' }}>{selectedReport} report</span>
                  <h3 style={{ margin: 0 }}>{reportPreview.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Period: {reportPreview.period} • Generated on {new Date().toLocaleDateString('en-IN')}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleDownload('csv')} className="btn btn-sm btn-secondary">📥 CSV</button>
                  <button onClick={() => handleDownload('pdf')} className="btn btn-sm btn-primary">📄 PDF</button>
                </div>
              </div>

              {/* Grid Summaries */}
              <div className="stats-grid" style={{ marginBottom: '1.5rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {reportPreview.summary?.map((sum, index) => (
                  <div key={index} style={{ background: 'var(--bg)', borderRadius: '12px', padding: '1rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>{sum.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem', fontWeight: 500 }}>{sum.label}</div>
                  </div>
                ))}
              </div>

              {/* Data Table */}
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Detailed Audit Logs</h4>
                <div className="table-container">
                  <table className="table">
                    {selectedReport === 'sales' && (
                      <>
                        <thead><tr><th>Order ID</th><th>Commodity</th><th>Buyer</th><th>Date</th><th>Amount</th></tr></thead>
                        <tbody>
                          {reportPreview.details.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{item.id}</td>
                              <td>{item.item}</td>
                              <td>{item.client}</td>
                              <td>{item.date}</td>
                              <td style={{ fontWeight: 600 }}>{item.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )}

                    {selectedReport === 'farmers' && (
                      <>
                        <thead><tr><th>Farmer</th><th>District</th><th>Crops Monitored</th><th>Registered</th><th>Status</th></tr></thead>
                        <tbody>
                          {reportPreview.details.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: 600 }}>{item.name}</td>
                              <td>{item.region}</td>
                              <td>{item.crops}</td>
                              <td>{item.joins}</td>
                              <td><span className={`badge ${item.status === 'Active' ? 'badge-green' : 'badge-warning'}`}>{item.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )}

                    {selectedReport === 'buyers' && (
                      <>
                        <thead><tr><th>Buyer</th><th>Region</th><th>Orders</th><th>Total Spend</th><th>Last Order</th></tr></thead>
                        <tbody>
                          {reportPreview.details.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: 600 }}>{item.name}</td>
                              <td>{item.region}</td>
                              <td>{item.orders}</td>
                              <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.spend}</td>
                              <td>{item.lastOrder}</td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )}

                    {selectedReport === 'crops' && (
                      <>
                        <thead><tr><th>Crop</th><th>Scans</th><th>Healthy Rate</th><th>Disease / Outbreak details</th></tr></thead>
                        <tbody>
                          {reportPreview.details.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: 600 }}>{item.crop}</td>
                              <td>{item.scanCount}</td>
                              <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.healthyPercent}</td>
                              <td style={{ color: 'var(--danger)', fontSize: '0.82rem', fontWeight: 500 }}>⚠️ {item.diseaseAlerts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )}
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <span style={{ fontSize: '3.5rem' }}>📄</span>
              <h3>No Report Generated</h3>
              <p>Configure parameters on the left and click "Generate Report".</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportGenerationPage;

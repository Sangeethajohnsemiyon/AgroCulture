import React, { useState, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { diseaseAPI } from '../../api';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const DiseaseDetectionPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cropName, setCropName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const f = acceptedFiles[0];
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); setResult(null); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, maxFiles: 1 });

  const handleDetect = async () => {
    if (!file) { toast.error('Please upload a crop image first'); return; }
    setLoading(true);
    try {
      const data = await diseaseAPI.detectDisease({ cropName });
      if (data.success) { setResult(data.result); toast.success('Analysis complete! 🔬'); }
    } catch { toast.error('Detection failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const severityColors = { None: '#2E7D32', Low: '#F9A825', Medium: '#FB8C00', High: '#E53935' };

  return (
    <DashboardLayout title="AI Disease Detection" subtitle="Upload crop photo for instant AI diagnosis">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Info Banner */}
        <div style={{ background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '2rem' }}>🤖</span>
          <div>
            <div style={{ fontWeight: 700, color: '#1565C0' }}>AI-Powered Crop Disease Detection</div>
            <p style={{ fontSize: '0.875rem', color: '#1976D2', margin: 0 }}>Our AI model analyzes crop images with up to 95% accuracy to detect diseases, pests, and nutritional deficiencies. Get instant treatment recommendations.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Upload Section */}
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '1.25rem' }}>📸 Upload Crop Image</h4>
              <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'drag-active' : ''}`}>
                <input {...getInputProps()} />
                {preview ? (
                  <img src={preview} alt="Crop" style={{ maxHeight: 200, borderRadius: '10px', margin: '0 auto' }} />
                ) : (
                  <>
                    <div className="upload-zone-icon">📷</div>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Drop image here or click to upload</div>
                    <div style={{ fontSize: '0.85rem', color: '#90A4AE' }}>JPG, PNG, WEBP supported • Max 5MB</div>
                  </>
                )}
              </div>
              {preview && (
                <button onClick={() => { setFile(null); setPreview(null); setResult(null); }} className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem', width: '100%' }}>🔄 Change Image</button>
              )}
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Crop Name (Optional)</label>
                <input className="form-input" type="text" placeholder="e.g., Tomato, Paddy, Cotton" value={cropName} onChange={e => setCropName(e.target.value)} />
              </div>
              <button className="btn btn-primary w-full" onClick={handleDetect} disabled={loading || !file}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <div className="spinner spinner-sm" style={{ borderTopColor: 'white' }} />
                    Analyzing image...
                  </span>
                ) : '🔬 Detect Disease'}
              </button>
            </div>

            {/* Sample Images */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginTop: '1.5rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem' }}>💡 Tips for Best Results</div>
              {['Capture in good lighting conditions', 'Focus on affected leaf/plant part', 'Include multiple affected areas', 'Avoid blurry or dark images'].map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#546E7A' }}>
                  <span style={{ color: '#2E7D32', fontWeight: 700 }}>✓</span> {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Result Section */}
          <div>
            {!result ? (
              <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔬</div>
                <h4 style={{ marginBottom: '0.5rem', color: '#90A4AE' }}>Upload & Analyze</h4>
                <p style={{ color: '#90A4AE', fontSize: '0.9rem' }}>Upload a photo of your crop and click "Detect Disease" to get AI-powered diagnosis and treatment recommendations.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Disease Result */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `2px solid ${severityColors[result.severity]}22` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{result.disease}</div>
                      <div style={{ fontSize: '0.8rem', color: '#546E7A' }}>Analysis in {result.analysisTime}</div>
                    </div>
                    <div>
                      <span className="badge" style={{ background: `${severityColors[result.severity]}22`, color: severityColors[result.severity], fontSize: '0.85rem' }}>Severity: {result.severity}</span>
                      <div style={{ fontSize: '0.8rem', color: '#2E7D32', fontWeight: 700, marginTop: '0.25rem', textAlign: 'right' }}>{result.confidence}% confident</div>
                    </div>
                  </div>
                  <div style={{ height: 6, background: '#F0F0F0', borderRadius: '3px', marginBottom: '1.25rem' }}>
                    <div style={{ height: '100%', width: `${result.confidence}%`, background: `linear-gradient(90deg, #2E7D32, #4CAF50)`, borderRadius: '3px' }} />
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#546E7A', marginBottom: '1rem' }}><strong>Cause:</strong> {result.causes}</p>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>🔴 Symptoms Detected:</div>
                    {result.symptoms?.map((s, i) => <div key={i} style={{ fontSize: '0.825rem', color: '#546E7A', marginBottom: '0.25rem' }}>• {s}</div>)}
                  </div>
                </div>

                {/* Treatment */}
                <div style={{ background: '#E8F5E9', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700, color: '#2E7D32', marginBottom: '0.75rem' }}>💊 Treatment Plan</div>
                  {result.treatment?.map((t, i) => <div key={i} style={{ fontSize: '0.85rem', color: '#1B5E20', marginBottom: '0.35rem' }}>✅ {t}</div>)}
                </div>

                {/* Medicines */}
                <div style={{ background: '#FFF3E0', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700, color: '#E65100', marginBottom: '0.75rem' }}>💉 Recommended Medicines</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {result.medicines?.map(m => <span key={m} style={{ padding: '0.35rem 0.85rem', background: 'white', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 500, border: '1px solid #FFB74D', color: '#E65100' }}>{m}</span>)}
                  </div>
                </div>

                {/* Prevention */}
                <div style={{ background: '#E3F2FD', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700, color: '#1565C0', marginBottom: '0.75rem' }}>🛡️ Prevention Tips</div>
                  {result.prevention?.map((p, i) => <div key={i} style={{ fontSize: '0.85rem', color: '#1565C0', marginBottom: '0.35rem' }}>🔵 {p}</div>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DiseaseDetectionPage;

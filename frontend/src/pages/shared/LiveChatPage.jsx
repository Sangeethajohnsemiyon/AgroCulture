import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import toast from 'react-hot-toast';

const initialMessages = [
  { id: 1, text: 'Hello! Welcome to AgroConnect Help Desk. How can I assist you today? 🌾', sender: 'agent', time: '10:30 AM' },
  { id: 2, text: 'Hi, I registered as a farmer, but I do not see my uploaded crop listed in the marketplace.', sender: 'user', time: '10:32 AM' },
  { id: 3, text: 'Ah, I see. All crop listings from new farmers go through a quick security approval process by our administrators. This usually takes less than 2 hours. Let me check your listing status for you. What is your crop name?', sender: 'agent', time: '10:33 AM' },
];

const smartReplies = [
  'Organic Basmati Rice listing',
  'How do I request a payout?',
  'Crop recommendation tool question',
  'Report a buyer for order delay',
];

export const LiveChatPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [agentTyping, setAgentTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, agentTyping]);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;
    
    const userMsg = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate Agent response
    setAgentTyping(true);
    setTimeout(() => {
      setAgentTyping(false);
      let replyText = "I will look into that immediately. Let me query our system and get back to you.";
      
      if (textToSend.toLowerCase().includes('basmati')) {
        replyText = "I checked our listing database. Your Basmati Rice listing is currently 'Pending Approval'. I have marked it high priority, and an admin will review it within 10 minutes!";
      } else if (textToSend.toLowerCase().includes('payout')) {
        replyText = "Farmers can request payouts from the Sales Analytics page once their wallet balance exceeds ₹1,000. Payouts are processed every Friday.";
      } else if (textToSend.toLowerCase().includes('recommendation')) {
        replyText = "The Crop Recommendation tool uses temperature, humidity, and rainfall logs to suggest the best seasonal crop. You can find it under 'Smart Tools' in the sidebar.";
      } else if (textToSend.toLowerCase().includes('report')) {
        replyText = "To report a delay, please open your Order History under Buyer dashboard, select the specific order, and click 'Submit Dispute'. Our support team will mediate.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: replyText,
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 1500);
  };

  return (
    <DashboardLayout title="Live Chat Support" subtitle="Talk directly with agricultural advisors and customer support representatives">
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', height: 'calc(100vh - 180px)', background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
        
        {/* Left conversations list */}
        <div style={{ borderRight: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', background: 'var(--border-light)' }}>
          <div style={{ padding: '1rem', background: 'white', borderBottom: '1px solid var(--border-light)' }}>
            <input className="form-input" style={{ margin: 0, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }} placeholder="Search channels..." />
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', cursor: 'pointer', borderLeft: '4px solid var(--primary)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>🎫 Help Desk Agent</span>
                <span style={{ width: 8, height: 8, background: '#4CAF50', borderRadius: '50%' }} />
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.25rem' }}>
                Let me check your listing status...
              </p>
            </div>
            
            <div style={{ padding: '1rem', cursor: 'pointer', marginTop: '0.5rem', opacity: 0.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>🌾 Farmers Guild (Madurai)</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Group</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.25rem' }}>
                Veera: Water levels are low this week...
              </p>
            </div>

            <div style={{ padding: '1rem', cursor: 'pointer', marginTop: '0.5rem', opacity: 0.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>🚜 Equipment Rentals Help</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Ticket</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.25rem' }}>
                Your tractor rental is scheduled...
              </p>
            </div>
          </div>
        </div>

        {/* Right Chat window */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'white' }}>
          
          {/* Chat Header */}
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 42, height: 42, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>
                AK
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Arun Kumar</div>
                <div style={{ fontSize: '0.75rem', color: '#4CAF50', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, background: '#4CAF50', borderRadius: '50%' }} /> Active Online • Senior Advisor
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => toast.success('Call feature available in premium version! 📞')} className="btn btn-sm btn-ghost" style={{ fontSize: '1.2rem' }}>📞</button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#F9FBF7' }}>
            {messages.map((m) => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                <div style={{
                  padding: '0.85rem 1.1rem',
                  borderRadius: '16px',
                  fontSize: '0.9rem',
                  lineHeight: '1.45',
                  background: m.sender === 'user' ? 'var(--primary)' : 'white',
                  color: m.sender === 'user' ? 'white' : 'var(--text-primary)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-light)',
                  borderBottomRightRadius: m.sender === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: m.sender === 'agent' ? '4px' : '16px',
                }}>
                  {m.text}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', marginTop: '0.3rem', padding: '0 0.25rem' }}>
                  {m.time}
                </span>
              </div>
            ))}

            {agentTyping && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.25rem', padding: '0.75rem 1rem', background: 'white', borderRadius: '16px', borderBottomLeftRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border-light)' }}>
                <span style={{ animation: 'pulse 1s infinite', fontSize: '1.2rem', height: 18, lineHeight: 1 }}>💬</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Arun is typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Smart Replies */}
          <div style={{ padding: '0.5rem 1.5rem 0', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', background: '#F9FBF7' }}>
            {smartReplies.map((r, idx) => (
              <button key={idx} onClick={() => handleSend(r)}
                style={{ padding: '0.4rem 0.85rem', background: 'white', border: '1px solid var(--border)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                💡 {r}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={() => toast.success('Attachments capability is mock-only. 📎')} style={{ fontSize: '1.3rem', cursor: 'pointer', padding: '0.4rem' }}>📎</button>
            <input type="text" className="form-input" style={{ margin: 0, flex: 1, padding: '0.75rem 1rem' }} placeholder="Type your message here..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend(input)} />
            <button onClick={() => handleSend(input)} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', borderRadius: '12px' }}>
              Send 🚀
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default LiveChatPage;

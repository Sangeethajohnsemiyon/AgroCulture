import React, { useState, useRef, useEffect } from 'react';
import { chatbotAPI } from '../api';

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm AgroBot 🌱 Your smart agriculture assistant. Ask me about crops, weather, diseases, or market prices!", sender: 'bot', time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { id: Date.now(), text: input, sender: 'user', time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const data = await chatbotAPI.sendMessage({ message: input });
      if (data.success) {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: data.reply, sender: 'bot', time: new Date() }]);
      }
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting. Please try again.", sender: 'bot', time: new Date() }]);
    } finally { setLoading(false); }
  };

  const handleKey = (e) => { if (e.key === 'Enter') sendMessage(); };

  const quickReplies = ['Weather forecast', 'Crop diseases', 'Market prices', 'Government schemes'];

  return (
    <>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🤖</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>AgroBot</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>{msg.text}</div>
            ))}
            {loading && (
              <div className="chat-bubble bot">
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span style={{ width: 8, height: 8, background: '#2E7D32', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                  <span style={{ width: 8, height: 8, background: '#2E7D32', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }} />
                  <span style={{ width: 8, height: 8, background: '#2E7D32', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {messages.length === 1 && (
            <div style={{ padding: '0 1rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {quickReplies.map(r => (
                <button key={r} onClick={() => { setInput(r); }} style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', border: '1px solid #2E7D32', color: '#2E7D32', background: 'white', fontSize: '0.78rem', cursor: 'pointer' }}>{r}</button>
              ))}
            </div>
          )}
          <div className="chatbot-input">
            <input className="form-input" style={{ flex: 1, margin: 0, padding: '0.6rem 0.9rem' }} placeholder="Ask me anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} />
            <button className="btn btn-primary btn-sm" onClick={sendMessage} disabled={!input.trim() || loading}>➤</button>
          </div>
        </div>
      )}
      <button className="chatbot-fab" onClick={() => setOpen(!open)} title="Open AgroBot">
        {open ? '✕' : '🤖'}
      </button>
    </>
  );
};

export default ChatbotWidget;

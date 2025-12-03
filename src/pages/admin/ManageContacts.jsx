import React, { useState, useEffect } from 'react';
import { getAllContactMessages, markMessageAsRead, deleteContactMessage } from '../../services/contactService';

const ManageContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const { data, error } = await getAllContactMessages();
    if (data) {
      setMessages(data);
    } else {
      console.error('Error loading messages:', error);
    }
    setLoading(false);
  };

  const handleMarkAsRead = async (id) => {
    await markMessageAsRead(id);
    loadMessages();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      await deleteContactMessage(id);
      loadMessages();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc', padding: '40px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '20px' }}>
          <a href="/admin" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
            ← Back to Dashboard
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
            Contact Messages
          </h1>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div style={{ background: 'white', padding: '60px', borderRadius: '10px', textAlign: 'center' }}>
            <h3>No messages yet</h3>
            <p style={{ color: '#718096' }}>Contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="row g-4">
            {messages.map((msg) => (
              <div key={msg.id} className="col-12">
                <div style={{
                  background: msg.read ? 'white' : '#f0f9ff',
                  padding: '25px',
                  borderRadius: '10px',
                  border: msg.read ? '1px solid #e2e8f0' : '2px solid #667eea',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div>
                      <h4 style={{ color: '#2d3748', marginBottom: '5px' }}>{msg.subject}</h4>
                      <p style={{ color: '#718096', fontSize: '0.9rem', margin: 0 }}>
                        From: <strong>{msg.name}</strong> ({msg.email})
                        {msg.phone && ` • ${msg.phone}`}
                      </p>
                      <p style={{ color: '#a0aec0', fontSize: '0.85rem', margin: '5px 0 0 0' }}>
                        {formatDate(msg.created_at)}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkAsRead(msg.id)}
                          style={{
                            padding: '6px 12px',
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#c43c2dff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '600'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div style={{
                    background: '#f7fafc',
                    padding: '15px',
                    borderRadius: '6px',
                    borderLeft: '3px solid #667eea'
                  }}>
                    <p style={{ color: '#4a5568', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContacts;
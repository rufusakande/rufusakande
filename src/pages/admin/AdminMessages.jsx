import { useState, useEffect } from 'react';
import { Trash2, Loader, Mail, MailOpen, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import './AdminMessages.css';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      setMessages(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id, isRead) => {
    try {
      await supabase
        .from('contact_messages')
        .update({ is_read: !isRead })
        .eq('id', id);
      await loadMessages();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Supprimer ce message?')) return;
    try {
      await supabase.from('contact_messages').delete().eq('id', id);
      setSelectedMessage(null);
      await loadMessages();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Messages reçus</h1>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="loading">
            <Loader size={40} className="animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <p>Aucun message</p>
          </div>
        ) : (
          <div className="messages-layout">
            <div className="messages-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-item ${msg.is_read ? '' : 'unread'} ${selectedMessage?.id === msg.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="message-header">
                    <strong>{msg.name}</strong>
                    {!msg.is_read && <span className="badge">Nouveau</span>}
                  </div>
                  <p className="message-preview">{msg.message.substring(0, 50)}...</p>
                  <p className="message-date">
                    {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ))}
            </div>

            {selectedMessage && (
              <div className="message-detail">
                <div className="detail-header">
                  <div>
                    <h2>{selectedMessage.name}</h2>
                    <p>{selectedMessage.email}</p>
                  </div>
                  <button
                    onClick={() => toggleRead(selectedMessage.id, selectedMessage.is_read)}
                    className="btn-icon"
                    title={selectedMessage.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                  >
                    {selectedMessage.is_read ? <Mail size={18} /> : <MailOpen size={18} />}
                  </button>
                </div>

                <p className="detail-date">
                  {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>

                <div className="detail-content">
                  <h3>Message:</h3>
                  <p>{selectedMessage.message}</p>
                </div>

                <div className="detail-actions">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="btn btn-primary"
                  >
                    <ExternalLink size={16} />
                    Répondre par email
                  </a>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="btn btn-secondary"
                    style={{ color: '#dc2626' }}
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminMessages;

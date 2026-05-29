import { useState, useEffect } from 'react';
import { Briefcase, FileText, Mail, Star, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentItems, setRecentItems] = useState({
    portfolios: [],
    blogs: [],
    messages: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      // Récupérer les statistiques
      const [portfolioRes, blogRes, messagesRes, testimonialsRes] = await Promise.all([
        supabase.from('portfolio').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      ]);

      setStats({
        portfolios: portfolioRes.count || 0,
        blogs: blogRes.count || 0,
        messages: messagesRes.count || 0,
        testimonials: testimonialsRes.count || 0,
      });

      // Récupérer les éléments récents
      const [portfoliosRes, blogsRes, messagesItemsRes] = await Promise.all([
        supabase
          .from('portfolio')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('blog_posts')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('contact_messages')
          .select('id, name, email, message, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      setRecentItems({
        portfolios: portfoliosRes.data || [],
        blogs: blogsRes.data || [],
        messages: messagesItemsRes.data || [],
      });
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="dashboard-loading">
          <Loader size={40} className="animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Bienvenue dans votre espace d'administration</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon portfolio">
              <Briefcase size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Portfolios</p>
              <p className="stat-value">{stats?.portfolios || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blog">
              <FileText size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Articles</p>
              <p className="stat-value">{stats?.blogs || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon messages">
              <Mail size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Messages</p>
              <p className="stat-value">{stats?.messages || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon testimonials">
              <Star size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Avis clients</p>
              <p className="stat-value">{stats?.testimonials || 0}</p>
            </div>
          </div>
        </div>

        {/* Recent Items */}
        <div className="recent-section">
          <div className="recent-portfolios">
            <h2>Derniers portfolios</h2>
            {recentItems.portfolios.length > 0 ? (
              <div className="items-list">
                {recentItems.portfolios.map((item) => (
                  <div key={item.id} className="item">
                    <p className="item-title">{item.title}</p>
                    <p className="item-date">
                      {new Date(item.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Aucun portfolio</p>
            )}
          </div>

          <div className="recent-blogs">
            <h2>Derniers articles</h2>
            {recentItems.blogs.length > 0 ? (
              <div className="items-list">
                {recentItems.blogs.map((item) => (
                  <div key={item.id} className="item">
                    <p className="item-title">{item.title}</p>
                    <p className="item-date">
                      {new Date(item.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Aucun article</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="recent-messages">
          <h2>Derniers messages</h2>
          {recentItems.messages.length > 0 ? (
            <div className="messages-list">
              {recentItems.messages.map((msg) => (
                <div key={msg.id} className="message-item">
                  <div className="message-header">
                    <p className="message-name">{msg.name}</p>
                    <p className="message-date">
                      {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <p className="message-email">{msg.email}</p>
                  <p className="message-text">{msg.message.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">Aucun message</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

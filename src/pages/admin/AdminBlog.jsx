import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import './AdminPortfolio.css';

function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    category: '',
    tags: '',
    reading_time: '5',
    status: 'draft',
    published_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      setBlogs(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const slug = formData.slug || slugify(formData.title);
      const payload = {
        ...formData,
        slug,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        reading_time: parseInt(formData.reading_time),
        published_at: formData.status === 'published' ? new Date(formData.published_at).toISOString() : null,
      };

      if (editingId) {
        await supabase.from('blog_posts').update(payload).eq('id', editingId);
      } else {
        await supabase.from('blog_posts').insert([payload]);
      }

      await loadBlogs();
      resetForm();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr?')) return;
    try {
      await supabase.from('blog_posts').delete().eq('id', id);
      await loadBlogs();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur: ' + error.message);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      cover_image_url: blog.cover_image_url || '',
      category: blog.category || '',
      tags: (blog.tags || []).join(', '),
      reading_time: blog.reading_time?.toString() || '5',
      status: blog.status,
      published_at: blog.published_at ? new Date(blog.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image_url: '',
      category: '',
      tags: '',
      reading_time: '5',
      status: 'draft',
      published_at: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await supabase.from('blog_posts').update({ status: newStatus }).eq('id', id);
      await loadBlogs();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gestion des Articles de Blog</h1>
          <button 
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Nouvel article
          </button>
        </div>

        {showForm && (
          <div className="form-container">
            <h2>{editingId ? 'Modifier' : 'Nouveau'} Article</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="Auto-généré si vide"
                />
              </div>

              <div className="form-group">
                <label>Résumé</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Contenu</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows="8"
                />
              </div>

              <div className="form-group">
                <label>URL de l'image</label>
                <input
                  type="text"
                  value={formData.cover_image_url}
                  onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Temps de lecture (min)</label>
                  <input
                    type="number"
                    value={formData.reading_time}
                    onChange={(e) => setFormData({...formData, reading_time: e.target.value})}
                    min="1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tags</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="Tag1, Tag2"
                  />
                </div>

                <div className="form-group">
                  <label>Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                  </select>
                </div>
              </div>

              {formData.status === 'published' && (
                <div className="form-group">
                  <label>Date de publication</label>
                  <input
                    type="date"
                    value={formData.published_at}
                    onChange={(e) => setFormData({...formData, published_at: e.target.value})}
                  />
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <Loader size={18} className="animate-spin" /> : 'Sauvegarder'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading">
            <Loader size={40} className="animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <p>Aucun article</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th className="hidden-mobile">Catégorie</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="title">{blog.title}</td>
                    <td className="hidden-mobile">{blog.category}</td>
                    <td>
                      <button
                        onClick={() => toggleStatus(blog.id, blog.status)}
                        className={`status-badge ${blog.status}`}
                      >
                        {blog.status === 'published' ? (
                          <>
                            <Eye size={14} />
                            Publié
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} />
                            Brouillon
                          </>
                        )}
                      </button>
                    </td>
                    <td className="actions">
                      <button 
                        onClick={() => handleEdit(blog)}
                        className="btn-icon edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="btn-icon delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminBlog;

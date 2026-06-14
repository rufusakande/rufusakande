import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import './AdminPortfolio.css';

function AdminPortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const emptyForm = {
    title: '',
    short_description: '',
    long_description: '',
    image_url: '',
    gallery: '',
    videos: '',
    project_url: '',
    category: 'webapp',
    tags: '',
    status: 'draft',
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      setPortfolios(data || []);
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
      const toList = (v) => v.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
      const payload = {
        ...formData,
        tags: toList(formData.tags),
        gallery: toList(formData.gallery),
        videos: toList(formData.videos),
      };

      if (editingId) {
        await supabase
          .from('portfolio')
          .update(payload)
          .eq('id', editingId);
      } else {
        await supabase.from('portfolio').insert([payload]);
      }

      await loadPortfolios();
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
      await supabase.from('portfolio').delete().eq('id', id);
      await loadPortfolios();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur: ' + error.message);
    }
  };

  const handleEdit = (portfolio) => {
    setEditingId(portfolio.id);
    setFormData({
      title: portfolio.title,
      short_description: portfolio.short_description || '',
      long_description: portfolio.long_description || '',
      image_url: portfolio.image_url || '',
      gallery: (portfolio.gallery || []).join('\n'),
      videos: (portfolio.videos || []).join('\n'),
      project_url: portfolio.project_url || '',
      category: portfolio.category || 'webapp',
      tags: (portfolio.tags || []).join(', '),
      status: portfolio.status,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await supabase
        .from('portfolio')
        .update({ status: newStatus })
        .eq('id', id);
      await loadPortfolios();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gestion des Portfolios</h1>
          <button 
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Ajouter un portfolio
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="form-container">
            <h2>{editingId ? 'Modifier' : 'Nouveau'} Portfolio</h2>
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
                <label>Description courte</label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Description longue</label>
                <textarea
                  value={formData.long_description}
                  onChange={(e) => setFormData({...formData, long_description: e.target.value})}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Image principale (couverture)</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/cover.jpg"
                />
                {formData.image_url && (
                  <img src={formData.image_url} alt="" style={{ marginTop: 8, maxHeight: 120, borderRadius: 8, objectFit: 'cover' }} />
                )}
              </div>

              <div className="form-group">
                <label>Galerie d'images (une URL par ligne)</label>
                <textarea
                  value={formData.gallery}
                  onChange={(e) => setFormData({...formData, gallery: e.target.value})}
                  rows="4"
                  placeholder={'https://exemple.com/img-1.jpg\nhttps://exemple.com/img-2.jpg'}
                />
                {formData.gallery && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {formData.gallery.split(/[\n,]+/).map((u) => u.trim()).filter(Boolean).map((u, i) => (
                      <img key={i} src={u} alt="" style={{ width: 80, height: 60, borderRadius: 6, objectFit: 'cover' }} />
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Vidéos (une URL par ligne — YouTube, Vimeo ou MP4)</label>
                <textarea
                  value={formData.videos}
                  onChange={(e) => setFormData({...formData, videos: e.target.value})}
                  rows="3"
                  placeholder={'https://youtu.be/xxxxxxxxxxx\nhttps://exemple.com/video.mp4'}
                />
              </div>

              <div className="form-group">
                <label>URL du projet</label>
                <input
                  type="text"
                  value={formData.project_url}
                  onChange={(e) => setFormData({...formData, project_url: e.target.value})}
                  placeholder="https://exemple.com"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>webapp</option>
                    <option>ecommerce</option>
                    <option>coaching</option>
                    <option>formation</option>
                    <option>consulting</option>
                  </select>
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

              <div className="form-group">
                <label>Tags (séparés par des virgules)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

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

        {/* List */}
        {loading ? (
          <div className="loading">
            <Loader size={40} className="animate-spin" />
          </div>
        ) : portfolios.length === 0 ? (
          <div className="empty-state">
            <p>Aucun portfolio</p>
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
                {portfolios.map((portfolio) => (
                  <tr key={portfolio.id}>
                    <td className="title">{portfolio.title}</td>
                    <td className="hidden-mobile">{portfolio.category}</td>
                    <td>
                      <button
                        onClick={() => toggleStatus(portfolio.id, portfolio.status)}
                        className={`status-badge ${portfolio.status}`}
                      >
                        {portfolio.status === 'published' ? (
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
                        onClick={() => handleEdit(portfolio)}
                        className="btn-icon edit"
                        title="Modifier"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(portfolio.id)}
                        className="btn-icon delete"
                        title="Supprimer"
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

export default AdminPortfolio;

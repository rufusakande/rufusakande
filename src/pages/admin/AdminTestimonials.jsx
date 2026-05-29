import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader, Eye, EyeOff, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import './AdminPortfolio.css';

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    role: '',
    content: '',
    image_url: '',
    rating: '5',
    status: 'draft',
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      setTestimonials(data || []);
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
      const payload = {
        ...formData,
        rating: parseInt(formData.rating),
      };

      if (editingId) {
        await supabase.from('testimonials').update(payload).eq('id', editingId);
      } else {
        await supabase.from('testimonials').insert([payload]);
      }

      await loadTestimonials();
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
      await supabase.from('testimonials').delete().eq('id', id);
      await loadTestimonials();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur: ' + error.message);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      author: testimonial.author,
      role: testimonial.role || '',
      content: testimonial.content || '',
      image_url: testimonial.image_url || '',
      rating: testimonial.rating?.toString() || '5',
      status: testimonial.status,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      author: '',
      role: '',
      content: '',
      image_url: '',
      rating: '5',
      status: 'draft',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await supabase.from('testimonials').update({ status: newStatus }).eq('id', id);
      await loadTestimonials();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gestion des Avis Clients</h1>
          <button 
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Ajouter un avis
          </button>
        </div>

        {showForm && (
          <div className="form-container">
            <h2>{editingId ? 'Modifier' : 'Nouvel'} Avis</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Auteur *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Rôle/Titre</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="Ex: Chef d'entreprise"
                />
              </div>

              <div className="form-group">
                <label>Avis *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>URL de la photo</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Note</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  >
                    <option value="1">1 étoile</option>
                    <option value="2">2 étoiles</option>
                    <option value="3">3 étoiles</option>
                    <option value="4">4 étoiles</option>
                    <option value="5">5 étoiles</option>
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
        ) : testimonials.length === 0 ? (
          <div className="empty-state">
            <p>Aucun avis</p>
          </div>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="card-header">
                  <div>
                    <h3>{testimonial.author}</h3>
                    <p>{testimonial.role}</p>
                  </div>
                  <button
                    onClick={() => toggleStatus(testimonial.id, testimonial.status)}
                    className={`status-badge ${testimonial.status}`}
                  >
                    {testimonial.status === 'published' ? (
                      <Eye size={14} />
                    ) : (
                      <EyeOff size={14} />
                    )}
                  </button>
                </div>

                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < testimonial.rating ? '#e8b025' : '#e0e0e0'}
                      color={i < testimonial.rating ? '#e8b025' : '#e0e0e0'}
                    />
                  ))}
                </div>

                <p className="content">{testimonial.content}</p>

                <div className="card-actions">
                  <button 
                    onClick={() => handleEdit(testimonial)}
                    className="btn-icon edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(testimonial.id)}
                    className="btn-icon delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .testimonial-card {
          background: white;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          border-color: #3c44e9;
          box-shadow: 0 4px 12px rgba(60, 68, 233, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .card-header h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .card-header p {
          font-size: 0.8rem;
          color: #999;
          margin: 4px 0 0 0;
        }

        .rating {
          display: flex;
          gap: 4px;
        }

        .content {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
          flex: 1;
        }

        .card-actions {
          display: flex;
          gap: 10px;
          padding-top: 10px;
          border-top: 1px solid #f0f0f0;
        }

        .card-actions .btn-icon {
          flex: 1;
          justify-content: center;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminTestimonials;

import { useState, useEffect, useMemo } from 'react';
import { Plus, Pencil, Trash2, Loader, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import SortableMediaList from '@/components/admin/SortableMediaList';
import './AdminPortfolio.css';

// ── Validation config ────────────────────────────────────────────
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg'];
const VIDEO_EXTS = ['mp4', 'webm', 'ogg', 'mov', 'm4v'];
const VIDEO_HOSTS = ['youtube.com', 'youtu.be', 'vimeo.com', 'player.vimeo.com'];
const IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml'];
const VIDEO_MIME = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB

const getExt = (url) => {
  try {
    const clean = url.split('?')[0].split('#')[0];
    const m = clean.match(/\.([a-z0-9]+)$/i);
    return m ? m[1].toLowerCase() : '';
  } catch { return ''; }
};
const isValidUrl = (s) => { try { new URL(s); return true; } catch { return false; } };
const isImageUrl = (u) => isValidUrl(u) && IMAGE_EXTS.includes(getExt(u));
const isVideoUrl = (u) => {
  if (!isValidUrl(u)) return false;
  try {
    const host = new URL(u).hostname.replace(/^www\./, '');
    if (VIDEO_HOSTS.some((h) => host.endsWith(h))) return true;
  } catch {}
  return VIDEO_EXTS.includes(getExt(u));
};

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));

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
    project_url: '',
    category: 'webapp',
    tags: '',
    status: 'draft',
  };
  const [formData, setFormData] = useState(emptyForm);
  // Unified ordered media list (images + videos)
  const [mediaItems, setMediaItems] = useState([]); // [{id,type,url}]
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => { loadPortfolios(); }, []);

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

  const addImageUrl = () => {
    const u = newImageUrl.trim();
    if (!u) return;
    if (!isImageUrl(u)) {
      setErrors((p) => ({ ...p, newImage: `Format non supporté. Extensions autorisées : ${IMAGE_EXTS.join(', ')}` }));
      return;
    }
    setErrors((p) => ({ ...p, newImage: null }));
    setMediaItems((prev) => [...prev, { id: uid(), type: 'image', url: u }]);
    setNewImageUrl('');
  };

  const addVideoUrl = () => {
    const u = newVideoUrl.trim();
    if (!u) return;
    if (!isVideoUrl(u)) {
      setErrors((p) => ({ ...p, newVideo: `URL invalide. YouTube, Vimeo ou fichier ${VIDEO_EXTS.join('/')}` }));
      return;
    }
    setErrors((p) => ({ ...p, newVideo: null }));
    setMediaItems((prev) => [...prev, { id: uid(), type: 'video', url: u }]);
    setNewVideoUrl('');
  };

  const uploadFile = async (file, kind) => {
    // kind = 'image' | 'video'
    const allowedMime = kind === 'image' ? IMAGE_MIME : VIDEO_MIME;
    const maxBytes = kind === 'image' ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
    if (!allowedMime.includes(file.type)) {
      throw new Error(`Type MIME non supporté (${file.type}). Autorisés : ${allowedMime.join(', ')}`);
    }
    if (file.size > maxBytes) {
      throw new Error(`Fichier trop lourd (${(file.size / 1024 / 1024).toFixed(1)} Mo). Max ${(maxBytes / 1024 / 1024)} Mo.`);
    }
    const ext = file.name.split('.').pop();
    const path = `portfolio/${Date.now()}-${uid()}.${ext}`;
    const { error } = await supabase.storage.from('media').upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleFileUpload = async (e, kind) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setErrors((p) => ({ ...p, upload: null }));
    for (const file of files) {
      try {
        const url = await uploadFile(file, kind);
        setMediaItems((prev) => [...prev, { id: uid(), type: kind, url }]);
      } catch (err) {
        setErrors((p) => ({ ...p, upload: err.message }));
      }
    }
    e.target.value = '';
  };

  const validateForm = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Titre requis';
    if (formData.image_url && !isImageUrl(formData.image_url)) e.image_url = 'URL image invalide';
    if (formData.project_url && !isValidUrl(formData.project_url)) e.project_url = 'URL projet invalide';
    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    try {
      const gallery = mediaItems.filter((m) => m.type === 'image').map((m) => m.url);
      const videos = mediaItems.filter((m) => m.type === 'video').map((m) => m.url);
      const tags = formData.tags.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
      const payload = { ...formData, tags, gallery, videos };

      if (editingId) {
        await supabase.from('portfolio').update(payload).eq('id', editingId);
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
      project_url: portfolio.project_url || '',
      category: portfolio.category || 'webapp',
      tags: (portfolio.tags || []).join(', '),
      status: portfolio.status,
    });
    const items = [
      ...(portfolio.gallery || []).filter(Boolean).map((url) => ({ id: uid(), type: 'image', url })),
      ...(portfolio.videos || []).filter(Boolean).map((url) => ({ id: uid(), type: 'video', url })),
    ];
    setMediaItems(items);
    setErrors({});
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setMediaItems([]);
    setNewImageUrl('');
    setNewVideoUrl('');
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await supabase.from('portfolio').update({ status: newStatus }).eq('id', id);
      await loadPortfolios();
    } catch (error) { console.error(error); }
  };

  const ErrMsg = ({ msg }) => msg ? (
    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
      <AlertCircle size={13} /> {msg}
    </div>
  ) : null;

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gestion des Portfolios</h1>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="btn btn-primary">
            <Plus size={18} /> Ajouter un portfolio
          </button>
        </div>

        {showForm && (
          <div className="form-container">
            <h2>{editingId ? 'Modifier' : 'Nouveau'} Portfolio</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Titre *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                <ErrMsg msg={errors.title} />
              </div>

              <div className="form-group">
                <label>Description courte</label>
                <textarea value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} rows="2" />
              </div>

              <div className="form-group">
                <label>Description longue</label>
                <textarea value={formData.long_description} onChange={(e) => setFormData({ ...formData, long_description: e.target.value })} rows="4" />
              </div>

              <div className="form-group">
                <label>Image principale (couverture)</label>
                <input type="text" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://example.com/cover.jpg" />
                <ErrMsg msg={errors.image_url} />
                {formData.image_url && isImageUrl(formData.image_url) && (
                  <img src={formData.image_url} alt="" style={{ marginTop: 8, maxHeight: 120, borderRadius: 8, objectFit: 'cover' }} />
                )}
              </div>

              {/* Media manager */}
              <div className="form-group">
                <label>Médias du carrousel (glisser-déposer pour réordonner)</label>
                <p style={{ fontSize: 12, color: '#666', margin: '0 0 12px' }}>
                  Images : {IMAGE_EXTS.join(', ')} · max 5 Mo · Vidéos : {VIDEO_EXTS.join('/')} ou YouTube/Vimeo · max 50 Mo
                </p>

                {/* Add image URL */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl(); } }}
                    placeholder="URL image (jpg, png, webp…)"
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn btn-secondary" onClick={addImageUrl}>+ Image</button>
                  <label className="btn btn-secondary" style={{ cursor: 'pointer', margin: 0 }}>
                    Uploader
                    <input type="file" accept={IMAGE_MIME.join(',')} multiple onChange={(e) => handleFileUpload(e, 'image')} style={{ display: 'none' }} />
                  </label>
                </div>
                <ErrMsg msg={errors.newImage} />

                {/* Add video URL */}
                <div style={{ display: 'flex', gap: 8, marginTop: 10, marginBottom: 8 }}>
                  <input
                    type="text"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addVideoUrl(); } }}
                    placeholder="URL vidéo (YouTube, Vimeo, .mp4…)"
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn btn-secondary" onClick={addVideoUrl}>+ Vidéo</button>
                  <label className="btn btn-secondary" style={{ cursor: 'pointer', margin: 0 }}>
                    Uploader
                    <input type="file" accept={VIDEO_MIME.join(',')} multiple onChange={(e) => handleFileUpload(e, 'video')} style={{ display: 'none' }} />
                  </label>
                </div>
                <ErrMsg msg={errors.newVideo} />
                <ErrMsg msg={errors.upload} />

                <div style={{ marginTop: 12 }}>
                  <SortableMediaList items={mediaItems} onChange={setMediaItems} />
                </div>
              </div>

              <div className="form-group">
                <label>URL du projet</label>
                <input type="text" value={formData.project_url} onChange={(e) => setFormData({ ...formData, project_url: e.target.value })} placeholder="https://exemple.com" />
                <ErrMsg msg={errors.project_url} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <option>webapp</option>
                    <option>ecommerce</option>
                    <option>coaching</option>
                    <option>formation</option>
                    <option>consulting</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tags (séparés par des virgules)</label>
                <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="React, Node.js, MongoDB" />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <Loader size={18} className="animate-spin" /> : 'Sauvegarder'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>Annuler</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading"><Loader size={40} className="animate-spin" /></div>
        ) : portfolios.length === 0 ? (
          <div className="empty-state"><p>Aucun portfolio</p></div>
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
                      <button onClick={() => toggleStatus(portfolio.id, portfolio.status)} className={`status-badge ${portfolio.status}`}>
                        {portfolio.status === 'published' ? (<><Eye size={14} />Publié</>) : (<><EyeOff size={14} />Brouillon</>)}
                      </button>
                    </td>
                    <td className="actions">
                      <button onClick={() => handleEdit(portfolio)} className="btn-icon edit" title="Modifier"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(portfolio.id)} className="btn-icon delete" title="Supprimer"><Trash2 size={16} /></button>
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

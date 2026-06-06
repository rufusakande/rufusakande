import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import { useBlogPostBySlug } from '../lib/useSupabase';
import { Loader, ArrowLeft } from 'lucide-react';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { blogPost, loading, error } = useBlogPostBySlug(slug);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex justify-center items-center min-h-[600px]">
          <Loader size={40} className="animate-spin text-brand-blue" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !blogPost) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-red-50 text-red-800 border border-red-100">
            <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 text-red-800 font-semibold mb-4">
              <ArrowLeft size={18} /> Retour au blog
            </button>
            <p>{error ? `Erreur: ${error}` : 'Article non trouvé'}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-white">
        <article>
          <div className="max-w-[1100px] mx-auto px-6">
            <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all mb-8">
              <ArrowLeft size={18} /> Retour au blog
            </button>

            {blogPost.cover_image_url && (
              <img src={blogPost.cover_image_url} alt={blogPost.title} className="w-full max-h-[480px] object-cover rounded-3xl shadow-card mb-10" />
            )}

            <div className="max-w-3xl mx-auto">
              {blogPost.category && (
                <span className="inline-flex px-3 py-1 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold text-[#1a1108] text-xs font-bold uppercase mb-4">
                  {blogPost.category}
                </span>
              )}
              <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold text-ink tracking-[-0.02em] leading-[1.15]">
                {blogPost.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
                <time>{new Date(blogPost.published_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {blogPost.reading_time && (
                  <span className="px-2.5 py-1 rounded-full bg-surface border border-line">{blogPost.reading_time} min de lecture</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-[1100px] mx-auto px-6 grid lg:grid-cols-[1fr_300px] gap-10">
            <div>
              {blogPost.excerpt && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-blue-soft/60 to-white border-l-4 border-brand-blue mb-8">
                  <p className="serif-italic text-ink text-lg">{blogPost.excerpt}</p>
                </div>
              )}

              <div className="prose prose-slate max-w-none text-ink-body leading-relaxed">
                {blogPost.content ? (
                  <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                ) : (
                  <p>Contenu non disponible</p>
                )}
              </div>

              {blogPost.tags?.length > 0 && (
                <div className="mt-10 pt-6 border-t border-line">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-brand-gold-deep mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold hover:bg-brand-blue hover:text-white cursor-pointer transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-5">
              <div className="bg-white rounded-2xl p-5 border border-line shadow-card border-l-4 border-l-brand-blue">
                <h3 className="font-bold text-ink mb-2">À propos</h3>
                <p className="text-sm text-ink-body">Retrouvez d'autres articles sur le développement web et l'entrepreneuriat numérique.</p>
                <a href="/blog" className="mt-3 inline-block text-brand-blue font-semibold text-sm">Voir tous les articles →</a>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-line shadow-card border-l-4 border-l-brand-gold">
                <h3 className="font-bold text-ink mb-3">Partager</h3>
                <div className="flex flex-col gap-2">
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blogPost.title}`} className="px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-semibold text-center hover:bg-brand-blue-deep transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} className="px-4 py-2 rounded-lg bg-brand-blue-accent text-white text-sm font-semibold text-center hover:bg-brand-blue transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default BlogPost;

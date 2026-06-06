import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import FinalCTA from '../sections/FinalCTA/FinalCTA';
import { useBlogPosts } from '../lib/useSupabase';
import { Loader, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Blog() {
  const { blogPosts, loading, error } = useBlogPosts();

  return (
    <>
      <Header />
      <main>
        <section className="relative pt-36 pb-20 bg-gradient-to-b from-white to-surface">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold uppercase tracking-[0.18em] mb-5">Blog</span>
              <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold text-ink tracking-[-0.02em]">
                Mon <span className="serif-italic text-gradient-gold">Blog</span>
              </h1>
              <p className="mt-5 text-lg text-ink-body">
                Conseils, tutoriels et réflexions sur le développement web et l'entrepreneuriat numérique.
              </p>
            </div>

            {loading && (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader size={40} className="animate-spin text-brand-blue" />
              </div>
            )}

            {error && (
              <div className="mt-8 p-5 rounded-2xl bg-red-50 text-red-800 border border-red-100">
                <p>Erreur lors du chargement des articles: {error}</p>
              </div>
            )}

            {!loading && blogPosts.length > 0 && (
              <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <article key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-line shadow-card hover:shadow-floating hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
                    {post.cover_image_url && (
                      <div className="aspect-[16/10] overflow-hidden bg-surface">
                        <img src={post.cover_image_url} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs">
                        {post.category && (
                          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold text-[#1a1108] font-bold uppercase">{post.category}</span>
                        )}
                        {post.reading_time && (
                          <span className="text-ink-muted">{post.reading_time} min de lecture</span>
                        )}
                      </div>
                      <h2 className="mt-3 text-lg font-bold text-ink group-hover:text-brand-blue transition-colors leading-tight">{post.title}</h2>
                      <p className="mt-2 text-sm text-ink-body leading-relaxed flex-1">
                        {post.excerpt || (post.content?.substring(0, 150) + '...')}
                      </p>
                      {post.tags?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {post.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full bg-brand-blue-soft text-brand-blue text-[11px] font-semibold">#{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
                        <time className="text-xs text-ink-muted">
                          {new Date(post.published_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-brand-blue font-semibold text-sm hover:gap-2 transition-all">
                          Lire <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading && blogPosts.length === 0 && !error && (
              <div className="text-center text-ink-muted py-16">
                <p>Aucun article disponible pour le moment</p>
              </div>
            )}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default Blog;

import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import FinalCTA from "../sections/FinalCTA/FinalCTA";
import { useBlogPosts } from '../lib/useSupabase';
import { Loader } from 'lucide-react';
import './Blog.css';
import { Link } from 'react-router-dom';

function Blog() {
  const { blogPosts, loading, error } = useBlogPosts();

  return (
    <>
      <Header />
      <main>
        <section className="blog-section" id="blog-articles">
          <div className="blog-container">
            <div className="blog-header">
              <h1 className="blog-title">
                Mon <span className="highlight">Blog</span>
              </h1>
              <p className="blog-subtitle">
                Conseils, tutoriels et réflexions sur le développement web et l'entrepreneuriat numérique
              </p>
            </div>

            {loading && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
              }}>
                <Loader size={40} className="animate-spin" style={{ color: '#3c44e9' }} />
              </div>
            )}

            {error && (
              <div style={{
                padding: '20px',
                backgroundColor: '#fee2e2',
                borderRadius: '8px',
                color: '#991b1b',
                marginBottom: '20px'
              }}>
                <p>Erreur lors du chargement des articles: {error}</p>
              </div>
            )}

            {!loading && blogPosts.length > 0 && (
              <div className="blog-grid">
                {blogPosts.map((post) => (
                  <article key={post.id} className="blog-card">
                    {post.cover_image_url && (
                      <div className="blog-image-container">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="blog-image"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="blog-card-content">
                      <div className="blog-meta">
                        {post.category && (
                          <span className="blog-category">{post.category}</span>
                        )}
                        {post.reading_time && (
                          <span className="reading-time">{post.reading_time} min de lecture</span>
                        )}
                      </div>
                      <h2 className="blog-post-title">{post.title}</h2>
                      <p className="blog-excerpt">
                        {post.excerpt || post.content?.substring(0, 150) + '...'}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="blog-tags">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="blog-tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="blog-footer">
                        <time className="publish-date">
                          {new Date(post.published_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <Link to={`/blog/${post.slug}`} className="read-more-btn">
                          Lire la suite →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading && blogPosts.length === 0 && !error && (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#666'
              }}>
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

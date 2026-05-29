import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import { useBlogPostBySlug } from '../lib/useSupabase';
import { Loader, ArrowLeft } from 'lucide-react';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { blogPost, loading, error } = useBlogPostBySlug(slug);

  if (loading) {
    return (
      <>
        <Header />
        <main style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '600px'
        }}>
          <Loader size={40} className="animate-spin" style={{ color: '#3c44e9' }} />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !blogPost) {
    return (
      <>
        <Header />
        <main style={{ padding: '40px 20px' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px',
            backgroundColor: '#fee2e2',
            borderRadius: '8px',
            color: '#991b1b'
          }}>
            <button
              onClick={() => navigate('/blog')}
              style={{
                background: 'none',
                border: 'none',
                color: '#991b1b',
                cursor: 'pointer',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem'
              }}
            >
              <ArrowLeft size={20} />
              Retour au blog
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
      <main>
        <article className="blog-post">
          <div className="blog-post-header">
            <button
              onClick={() => navigate('/blog')}
              className="back-button"
            >
              <ArrowLeft size={20} />
              Retour au blog
            </button>

            {blogPost.cover_image_url && (
              <img
                src={blogPost.cover_image_url}
                alt={blogPost.title}
                className="blog-post-cover"
              />
            )}

            <div className="blog-post-header-content">
              {blogPost.category && (
                <span className="blog-post-category">{blogPost.category}</span>
              )}
              <h1 className="blog-post-title">{blogPost.title}</h1>

              <div className="blog-post-meta">
                <time className="blog-post-date">
                  {new Date(blogPost.published_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {blogPost.reading_time && (
                  <span className="blog-post-reading-time">
                    {blogPost.reading_time} min de lecture
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="blog-post-body">
            <div className="blog-post-content">
              {blogPost.excerpt && (
                <div className="blog-post-excerpt">
                  <p>{blogPost.excerpt}</p>
                </div>
              )}

              <div className="blog-post-text">
                {blogPost.content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogPost.content
                    }}
                  />
                ) : (
                  <p>Contenu non disponible</p>
                )}
              </div>

              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="blog-post-tags">
                  <h3>Tags:</h3>
                  <div className="tags-list">
                    {blogPost.tags.map((tag, index) => (
                      <span key={index} className="blog-post-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="blog-post-sidebar">
              <div className="sidebar-widget">
                <h3>À propos</h3>
                <p>Retrouvez d'autres articles sur le développement web et l'entrepreneuriat numérique.</p>
                <a href="/blog" className="sidebar-link">Voir tous les articles →</a>
              </div>

              <div className="sidebar-widget">
                <h3>Partager</h3>
                <div className="share-buttons">
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blogPost.title}`} className="share-btn" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} className="share-btn" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
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

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import { supabase } from '@/integrations/supabase/client';
import { Loader, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import './PortfolioDetail.css';
import { Link } from 'react-router-dom';

function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('portfolio')
          .select('*')
          .eq('id', id)
          .eq('status', 'published')
          .maybeSingle();

        if (supabaseError) {
          throw supabaseError;
        }

        if (!data) {
          setError('Portfolio non trouvé');
        } else {
          setPortfolio(data);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du portfolio:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

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

  if (error || !portfolio) {
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
              onClick={() => navigate('/realisations')}
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
              Retour aux réalisations
            </button>
            <p>{error || 'Portfolio non trouvé'}</p>
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
        <article className="portfolio-detail">
          <div className="portfolio-header">
            <button
              onClick={() => navigate('/realisations')}
              className="back-button"
            >
              <ArrowLeft size={20} />
              Retour aux réalisations
            </button>

            {portfolio.image_url && (
              <div className="portfolio-hero-image">
                <img
                  src={portfolio.image_url}
                  alt={portfolio.title}
                  className="hero-image"
                />
              </div>
            )}
          </div>

          <div className="portfolio-body">
            <div className="portfolio-content">
              <div className="portfolio-meta">
                {portfolio.category && (
                  <span className="portfolio-category">{portfolio.category}</span>
                )}
              </div>

              <h1 className="portfolio-title">{portfolio.title}</h1>

              <div className="portfolio-actions">
                {portfolio.project_url && (
                  <Link 
                    to={portfolio.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button primary"
                  >
                    <ExternalLink size={18} />
                    Voir le projet
                  </Link>
                )}
              </div>

              <div className="portfolio-section">
                <h2>À propos du projet</h2>
                {portfolio.short_description && (
                  <p className="short-desc">{portfolio.short_description}</p>
                )}
                {portfolio.long_description && (
                  <div className="long-desc">
                    {portfolio.long_description.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>

              {portfolio.tags && portfolio.tags.length > 0 && (
                <div className="portfolio-section">
                  <h2>Technologies utilisées</h2>
                  <div className="technologies-grid">
                    {portfolio.tags.map((tag, index) => (
                      <div key={index} className="tech-item">
                        <span className="tech-badge">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="portfolio-section">
                <h2>Détails du projet</h2>
                <div className="details-grid">
                  <div className="detail-item">
                    <h3>Type de projet</h3>
                    <p>{portfolio.category || 'Non spécifié'}</p>
                  </div>
                  <div className="detail-item">
                    <h3>État</h3>
                    <p>{portfolio.status === 'published' ? 'Publié' : 'Brouillon'}</p>
                  </div>
                  <div className="detail-item">
                    <h3>Date de création</h3>
                    <p>{new Date(portfolio.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                  {portfolio.project_url && (
                    <div className="detail-item">
                      <h3>Lien du projet</h3>
                      <Link to={portfolio.project_url} target="_blank" rel="noopener noreferrer">
                        {portfolio.project_url}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside className="portfolio-sidebar">
              <div className="sidebar-widget">
                <h3>Partager ce projet</h3>
                <div className="share-buttons">
                  <Link 
                    to={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${portfolio.title}`}
                    className="share-btn twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </Link>
                  <Link 
                    to={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                    className="share-btn linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>

              <div className="sidebar-widget">
                <h3>Plus de projets</h3>
                <p>Découvrez mes autres réalisations</p>
                <Link to="/realisations" className="sidebar-link">
                  Voir tous les projets →
                </Link>
              </div>

              <div className="sidebar-widget">
                <h3>Intéressé?</h3>
                <p>Vous avez un projet similaire?</p>
                <Link to="/contact" className="sidebar-link primary">
                  Me contacter →
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default PortfolioDetail;

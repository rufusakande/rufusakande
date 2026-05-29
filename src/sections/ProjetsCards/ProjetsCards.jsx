import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Eye, Code, Palette, ShoppingCart, Heart, Users, Calendar, Loader } from 'lucide-react';
import './ProjetsCards.css';
import { usePortfolio } from '../../lib/useSupabase';

// Fallback images pour les projets sans image_url
import img1 from '../../assets/Images/Rufus Akande développeur web freelance22.png';
import img2 from '../../assets/Images/Rufus Akande développeur web freelance14.webp';
import img3 from '../../assets/Images/Rufus Akande développeur web freelance21.png';
import img4 from '../../assets/Images/Rufus Akande développeur web freelance12.png';
import img5 from '../../assets/Images/Rufus Akande développeur web freelance13.png';
import img6 from '../../assets/Images/Rufus Akande développeur web freelance15.png';

const fallbackImages = [img1, img2, img3, img4, img5, img6];

// Mapping des catégories aux couleurs et icônes
const categoryConfig = {
  coaching: { color: '#3c44e9', icon: Code },
  formation: { color: '#0206b7', icon: Palette },
  consulting: { color: '#6B7280', icon: Users },
  ecommerce: { color: '#0206b7', icon: ShoppingCart },
  webapp: { color: '#3c44e9', icon: Code },
  default: { color: '#3c44e9', icon: Code }
};

const ProjetsCards = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(new Set());
  const { portfolios, loading, error } = usePortfolio();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.project-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [portfolios]);

  const IconComponent = ({ icon: Icon, ...props }) => <Icon {...props} />;

  // Fonction pour obtenir la configuration de la catégorie
  const getCategoryConfig = (category) => {
    return categoryConfig[category?.toLowerCase()] || categoryConfig.default;
  };

  // Fonction pour obtenir l'image fallback
  const getFallbackImage = (index) => {
    return fallbackImages[index % fallbackImages.length];
  };

  return (
    <section 
      id="ProjetsCards" 
      ref={sectionRef}
      role="main"
      aria-labelledby="projets-section-title"
    >
      <div className="container">
        <div className="section-header">
          <h2 id="projets-section-title" className="section-title">
            Mes dernières <span className="highlight">réalisations</span>
          </h2>
          
          <div className="filter-tabs" role="tablist" aria-label="Filtrer les projets">
            <button className="filter-tab active" role="tab" aria-selected="true">
              Tous les projets
            </button>
            <button className="filter-tab" role="tab" aria-selected="false">
              Sites vitrines
            </button>
            <button className="filter-tab" role="tab" aria-selected="false">
              E-commerce
            </button>
            <button className="filter-tab" role="tab" aria-selected="false">
              Web Apps
            </button>
          </div>
        </div>

        <div className="projects-grid" role="list" aria-label="Liste des projets">
          {loading && (
            <div style={{ 
              gridColumn: '1 / -1', 
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
              gridColumn: '1 / -1', 
              padding: '20px',
              backgroundColor: '#fee2e2',
              borderRadius: '8px',
              color: '#991b1b'
            }}>
              <p>Erreur lors du chargement des projets: {error}</p>
            </div>
          )}

          {!loading && portfolios.length > 0 && portfolios.map((portfolio, index) => {
            const isVisible = visibleCards.has(portfolio.id);
            const categoryConfig = getCategoryConfig(portfolio.category);
            const projectImage = portfolio.image_url || getFallbackImage(index);
            
            return (
              <article 
                key={portfolio.id}
                className={`project-card ${isVisible ? 'visible' : ''}`}
                data-card-id={portfolio.id}
                role="listitem"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-image-container">
                  <img 
                    src={projectImage} 
                    alt={`Capture d'écran du projet ${portfolio.title}`}
                    className="card-image"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  <div className="image-overlay">
                    <div className="overlay-actions">
                      {portfolio.project_url && (
                        <a 
                          href={portfolio.project_url} 
                          className="action-btn site-btn"
                          aria-label={`Voir le site ${portfolio.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={18} aria-hidden="true" />
                          <span>Site</span>
                        </a>
                      )}
                      {portfolio.project_url && (
                        <a 
                          href={portfolio.project_url} 
                          className="action-btn demo-btn"
                          aria-label={`Voir la démo de ${portfolio.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye size={18} aria-hidden="true" />
                          <span>Démo</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div 
                    className="category-badge"
                    style={{ backgroundColor: categoryConfig.color }}
                  >
                    <IconComponent icon={categoryConfig.icon} size={16} aria-hidden="true" />
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="project-title">{portfolio.title}</h3>
                  <p className="project-description">{portfolio.short_description}</p>
                  
                  <div className="technologies" role="list" aria-label="Technologies utilisées">
                    {portfolio.tags && portfolio.tags.length > 0 ? (
                      portfolio.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="tech-tag"
                          role="listitem"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="tech-tag">Web</span>
                    )}
                  </div>

                  <div className="card-footer">
                    <button 
                      onClick={() => navigate(`/portfolio/${portfolio.id}`)}
                      className="voir-plus-btn"
                      aria-label={`Voir plus de détails sur ${portfolio.title}`}
                    >
                      <span>Voir plus</span>
                      <ExternalLink size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {!loading && portfolios.length === 0 && !error && (
            <div style={{ 
              gridColumn: '1 / -1', 
              padding: '40px 20px',
              textAlign: 'center',
              color: '#666'
            }}>
              <p>Aucun projet disponible pour le moment</p>
            </div>
          )}
        </div>

        <div className="section-footer">
          <p className="footer-text">
            Plus de projets disponibles sur demande
          </p>
          <button className="load-more-btn">
            Voir tous mes projets
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjetsCards;
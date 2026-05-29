import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import './FinalCTA.css'

// Hook pour détecter quand un élément entre dans le viewport
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Composant FinalCTA
const FinalCTA = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const benefits = [
    "Site responsive et optimisé",
    "Accompagnement personnalisé",
    "Support technique inclus",
    "Résultats mesurables"
  ];

  return (
    <section id="final-cta" className="final-cta-section" ref={ref} aria-labelledby="cta-title">
      <div className="final-cta-container">
        <div className="final-cta-content">
          <header className="final-cta-header">
            <h2 id="cta-title" className={`final-cta-title ${isVisible ? 'animate-fade-in' : ''}`}>
              Prêt à transformer votre présence digitale ?
            </h2>
            <p className={`final-cta-subtitle ${isVisible ? 'animate-fade-in-delay' : ''}`}>
              Discutons de votre projet et donnons vie à vos ambitions numériques
            </p>
          </header>

          <div className={`final-cta-benefits ${isVisible ? 'animate-slide-up' : ''}`}>
            <ul className="benefits-list" role="list">
              {benefits.map((benefit, index) => (
                <li key={index} className="benefit-item" role="listitem">
                  <CheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`final-cta-actions ${isVisible ? 'animate-bounce-in' : ''}`}>
            <Link 
              to="https://wa.me/22951080983" 
              className="cta-primary-button"
              role="button"
              target='blank'
              aria-label="Commencer votre projet maintenant"
            >
              Commencer mon projet
              <ArrowRight className="button-icon" aria-hidden="true" />
            </Link>
            
            <Link 
              to="/realisations" 
              className="cta-secondary-button"
              role="button"
              aria-label="Découvrir mes réalisations"
            >
              Voir mes réalisations
            </Link>
          </div>

          <p className="final-cta-guarantee">
            <strong>Satisfaction garantie</strong> - Échange gratuit pour discuter de votre projet
          </p>
        </div>

        <div className={`final-cta-visual ${isVisible ? 'animate-float' : ''}`} aria-hidden="true">
          <div className="cta-visual-circle circle-1"></div>
          <div className="cta-visual-circle circle-2"></div>
          <div className="cta-visual-circle circle-3"></div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
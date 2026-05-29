import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import './ContactHeroSection.css';
import { Link } from 'react-router-dom';

const ContactHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Animation d'entrée au montage du composant
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Effet de parallaxe léger au survol
    const handleMouseMove = (e) => {
      const rect = document.getElementById('ContactHeroSection')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50
        });
      }
    };

    const section = document.getElementById('ContactHeroSection');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      id="ContactHeroSection" 
      className={`contact-hero ${isVisible ? 'visible' : ''}`}
      role="banner"
      aria-labelledby="contact-hero-title"
    >
      {/* Éléments décoratifs animés */}
      <div className="decorative-elements" aria-hidden="true">
        <div 
          className="floating-shape shape-1"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
        <div 
          className="floating-shape shape-2"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`
          }}
        />
        <div 
          className="floating-shape shape-3"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`
          }}
        />
      </div>

      {/* Contenu principal */}
      <div className="container">
        <div className="content-wrapper">
          {/* Badge d'introduction */}
          <div className="intro-badge">
            <Sparkles className="badge-icon" size={16} aria-hidden="true" />
            <span>Transformons vos idées en réalité</span>
          </div>

          {/* Titre principal */}
          <h1 id="contact-hero-title" className="main-title">
            Un projet en tête ?
            <span className="highlight-text">
              Parlons-en.
              <MessageCircle className="title-icon" size={48} aria-hidden="true" />
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="subtitle">
            Échangeons sur votre vision, vos objectifs et créons ensemble 
            une solution web qui fait croître votre entreprise.
          </p>

          {/* CTA principal */}
          <div className="cta-wrapper">
            <Link to="https://wa.me/22951080983" target='blank' className="primary-cta" role="button" aria-label="Contactez-moi">
              <span>Commençons à discuter</span>
                <ArrowRight className="cta-icon" size={20} aria-hidden="true" />
            </Link>
          </div>

          {/* Indicateurs de confiance */}
          <div className="trust-indicators">
            <div className="indicator">
              <div className="indicator-value">{"<"} 24h</div>
              <div className="indicator-label">Réponse garantie</div>
            </div>
            <div className="indicator">
              <div className="indicator-value">100%</div>
              <div className="indicator-label">Gratuit & sans engagement</div>
            </div>
            <div className="indicator">
              <div className="indicator-value">+15</div>
              <div className="indicator-label">Projets réalisés</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="wave-decoration" aria-hidden="true">
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default ContactHeroSection;
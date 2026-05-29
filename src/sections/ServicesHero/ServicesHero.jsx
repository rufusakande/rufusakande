import React, { useEffect, useRef, useState } from 'react';
import { Users, Target, Zap, Star } from 'lucide-react';
import './ServicesHero.css';

const ServicesHero = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="ServicesHero" 
      ref={sectionRef}
      className={`services-hero ${isVisible ? 'animate-in' : ''}`}
      role="banner"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="content">
          <div className="title-wrapper">
            <h1 id="services-title" className="main-title">
              Mes Services
            </h1>
            <div className="title-decoration">
              <span className="decoration-line"></span>
              <Star className="decoration-icon" aria-hidden="true" />
              <span className="decoration-line"></span>
            </div>
          </div>

          <div className="subtitle-section">
            <p className="main-subtitle">
              Mes services s'adressent aux <strong>entrepreneurs</strong>, 
              <strong> petites entreprises</strong>, <strong>associations</strong> ou 
              <strong> indépendants</strong> qui veulent un site qui leur ressemble et qui performe.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Users aria-hidden="true" />
              </div>
              <h3 className="feature-title">Pour qui ?</h3>
              <p className="feature-text">
                Entrepreneurs & indépendants ambitieux
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Target aria-hidden="true" />
              </div>
              <h3 className="feature-title">Objectif</h3>
              <p className="feature-text">
                Sites qui vous ressemblent vraiment
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap aria-hidden="true" />
              </div>
              <h3 className="feature-title">Résultat</h3>
              <p className="feature-text">
                Performance & conversions garanties
              </p>
            </div>
          </div>

          <div className="cta-section">
            <div className="highlight-badge">
              <span className="badge-text">🚀 Solutions sur-mesure</span>
            </div>
          </div>
        </div>

        <div className="background-elements">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-grid"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
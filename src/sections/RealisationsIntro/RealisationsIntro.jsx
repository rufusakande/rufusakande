import React, { useEffect, useRef, useState } from 'react';
import { Code, Palette, Lightbulb } from 'lucide-react';
import './RealisationsIntro.css';

const RealisationsIntro = () => {
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
        id="RealisationsIntro" 
        ref={sectionRef}
        role="banner"
        aria-labelledby="realisations-title"
      >
        <div className="decorative-elements" aria-hidden="true">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>

        <div className="container">
          <div className={`content ${isVisible ? 'visible' : ''}`}>
            <div className="badge" role="img" aria-label="Portfolio">
              <Code size={16} aria-hidden="true" />
              <span>Portfolio</span>
            </div>

            <h1 id="realisations-title" className="title">
              Découvrez mes <span className="highlight">réalisations</span>
            </h1>

            <p className="subtitle">
              Chaque projet a été conçu avec soin pour répondre à des besoins précis. 
              Des solutions modernes, performantes et sur-mesure pour mes clients.
            </p>

            <div className="stats" role="list" aria-label="Statistiques du portfolio">
              <div className={`stat-item ${isVisible ? 'visible' : ''}`} role="listitem">
                <Code className="icon" aria-hidden="true" />
                <span className="text">Code sur-mesure</span>
              </div>
              <div className={`stat-item ${isVisible ? 'visible' : ''}`} role="listitem">
                <Palette className="icon" aria-hidden="true" />
                <span className="text">Design moderne</span>
              </div>
              <div className={`stat-item ${isVisible ? 'visible' : ''}`} role="listitem">
                <Lightbulb className="icon" aria-hidden="true" />
                <span className="text">Solutions innovantes</span>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default RealisationsIntro;
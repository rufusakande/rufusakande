import { useState, useEffect } from 'react';
import { ArrowRight, Play, Code, Palette, Zap } from 'lucide-react';
import './Heros.css';
import rufusImg from '../../assets/Images/rufus.webp'
import { Link } from 'react-router-dom';

const Heros = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const dynamicTexts = [
    "vous démarquent",
    "génèrent des opportunités",
    "convertissent vos visiteurs",
    "boostent votre activité"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        prevIndex === dynamicTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects-preview');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={`hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-background">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="hero-particles">
          {[...Array(50)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 5 + 1}`}></div>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">
              <span className="wave">👋</span>
              <span>Salut, je suis</span>
            </div>
            
            <h1 className="hero-title">
              <span className="title-name">Rufus Akande</span>
              <span className="title-subtitle">
                Je conçois des sites web qui{' '}
                <span className="dynamic-text">
                  {dynamicTexts[currentTextIndex]}
                </span>
              </span>
            </h1>

            <p className="hero-description">
              <strong>Développeur web fullstack freelance</strong>, J'aide les entrepreneurs et indépendants à développer leurs activités et générer des revenus en ligne graçe à des sites web performants et orientés conversion. 
              
            </p>

            <div className="hero-features">
              <div className="feature">
                <Code size={20} />
                <span>Code optimisé</span>
              </div>
              <div className="feature">
                <Palette size={20} />
                <span>Design moderne</span>
              </div>
              <div className="feature">
                <Zap size={20} />
                <span>Performance maximale</span>
              </div>
            </div>

            <div className="hero-cta">
              <Link
              to="/realisations" 
                className="cta-primary" 
                onClick={scrollToProjects}
                aria-label="Voir mes réalisations"
              >
                Voir mes réalisations
                <ArrowRight size={20} />
              </Link>
              
              <Link 
              to="https://wa.me/22951080983"
                className="cta-secondary" 
                onClick={scrollToContact}
                aria-label="Me contacter"
              >
                <Play size={18} />
                Me contacter
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">4+</span>
                <span className="stat-label">Années d'expérience</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Projets réalisés</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Clients satisfaits</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-container">
              <div className="profile-card">
                <div className="profile-image">
                  <img 
                    src={rufusImg}
                    alt="Rufus Akande - Développeur web fullstack" 
                    loading="eager"
                  />
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Disponible</span>
                  </div>
                </div>
                
                <div className="code-preview">
                  <div className="code-header">
                    <div className="code-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="code-title">portfolio.js</span>
                  </div>
                  <div className="code-content">
                    <p>
                        {`const developer = {`} <br />
                          <span>name: "Rufus Akande", <br /></span>
                          <span>skills: ["React", "Node.js"], <br /></span>
                          <span>passion: "Web Development", <br /></span>
                          <span>available: true <br /></span>
                        {`;}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="floating-elements">
                <div className="floating-tech tech-1">React</div>
                <div className="floating-tech tech-2">CSS3</div>
                <div className="floating-tech tech-3">Node.js</div>
                <div className="floating-tech tech-4">MySQL</div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span>Découvrir</span>
        </div>
      </div>
    </section>
  );
};

export default Heros;
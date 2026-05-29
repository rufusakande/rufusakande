import React, { useState, useEffect } from 'react';
import { User, Code, Heart, Award, MapPin, Mail, Github, Linkedin } from 'lucide-react';
import './AboutHero.css';
import rufusImg from '../../assets/Images/rufus.webp'
import { Link } from 'react-router-dom';

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);

  const skills = ['React', 'Node.js', 'MySQL', 'Vite', 'Express'];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
      <section id="AboutHero" role="banner" aria-labelledby="hero-title">
        <div className="floating-elements" aria-hidden="true">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        <div className="container">
          <div className="content">
            <div className="badge">
              <User size={16} aria-hidden="true" />
              <span>Développeur Web Freelance</span>
            </div>

            <h1 id="hero-title" className="title">
              Transformons vos <span className="highlight">idées</span> en solutions digitales
            </h1>

            <p className="subtitle">
              Je suis <strong className="highlight">Rufus Akande</strong>, développeur web freelance basé au Bénin. 
              Ma passion est de créer des interfaces claires, des fonctionnalités utiles et des sites performants 
              qui <em>convertissent vos visiteurs en clients</em>.
            </p>

            <div className="stats" role="group" aria-label="Statistiques professionnelles">
              <div className="stat">
                <span className="stat-number" aria-label="Plus de 5 ans">4+</span>
                <span className="stat-label">Années d'expérience</span>
              </div>
              <div className="stat">
                <span className="stat-number" aria-label="Plus de 30 projets">15+</span>
                <span className="stat-label">Projets réalisés</span>
              </div>
              <div className="stat">
                <span className="stat-number" aria-label="100 pourcent">100%</span>
                <span className="stat-label">Clients satisfaits</span>
              </div>
            </div>

            <div className="cta-buttons">
              <Link to="/realisations" className="btn-primary" aria-label="Découvrir mes réalisations">
                <Award size={20} aria-hidden="true" />
                Voir mes réalisations
              </Link>
              <Link to="/contact" className="btn-secondary" aria-label="Me contacter">
                <Mail size={20} aria-hidden="true" />
                Me contacter
              </Link>
            </div>
          </div>

          <div className="visual">
            <div className="profile-card">
              <div className="profile-image">
                {/* <User size={60} aria-hidden="true" /> */}
                <img src={rufusImg} alt="Rufus Akande développeur web" />
              </div>
              
              <h2 className="profile-name">Rufus Akande</h2>
              <p className="profile-role">Développeur Web Freelance</p>
              
              <div className="skills-showcase">
                <p className="skills-title">Spécialisé en</p>
                <div className="skill-display" aria-live="polite">
                  {skills[currentSkill]}
                </div>
              </div>

              <div className="social-links" role="group" aria-label="Liens réseaux sociaux">
                <Link to="mailto:akanderufus51@gmail.com" className="social-link" aria-label="Envoyer un email">
                  <Mail size={20} />
                </Link>
                <Link to="https://github.com/rufusakande" className="social-link" aria-label="Profil GitHub">
                  <Github size={20} />
                </Link >
                <Link to="https://www.linkedin.com/in/rufus-akande-freelance-developpeur-web/" className="social-link" aria-label="Profil LinkedIn">
                  <Linkedin size={20} />
                </Link>
                <Link to="#" className="social-link" aria-label="Localisation Parakou, Bénin">
                  <MapPin size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default AboutHero;
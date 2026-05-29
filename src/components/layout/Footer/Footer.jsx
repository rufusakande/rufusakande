import { Instagram, Linkedin, Mail, MapPin, Phone, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer" role="contentinfo">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            fill="#f5f7fa"
            fillOpacity="1"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-column brand-column">
              <Link to="/" className="footer-logo" aria-label="Rufus Akande - Accueil">
                <span className="footer-logo-text">Rufus<span className="footer-logo-highlight">Akande</span></span>
              </Link>
              <p className="footer-tagline">
                Des solutions web sur mesure pour vous démarquer et développer votre présence en ligne.
              </p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/rufus-akande-freelance-developpeur-web/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/rufusakande" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
                  <Github size={20} />
                </a>
                <a href="https://www.instagram.com/rufusakande_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="footer-column">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-links">
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/apropos">À propos</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/realisations">Réalisations</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="footer-column">
              <h3 className="footer-heading">Services</h3>
              <ul className="footer-links">
                <li><Link to="/services" onClick={(e) => { e.preventDefault(); window.location.hash = 'vitrine'; }}>Sites Vitrines</Link></li>
                <li><Link to="/services" onClick={(e) => { e.preventDefault(); window.location.hash = 'ecommerce'; }}>E-commerce</Link></li>
                <li><Link to="/services" onClick={(e) => { e.preventDefault(); window.location.hash = 'webapp'; }}>Applications Web</Link></li>
                <li><Link to="/services" onClick={(e) => { e.preventDefault(); window.location.hash = 'conseil'; }}>Conseil & Accompagnement</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer-column contact-column">
              <h3 className="footer-heading">Contact</h3>
              <ul className="contact-info">
                <li>
                  <Mail size={16} className="contact-icon" />
                  <a href="mailto:rufus.dev@mail.com">akanderufus51@gmail.com</a>
                </li>
                <li>
                  <Phone size={16} className="contact-icon" />
                  <a href="https://wa.me/22951080983">+229 01 51 08 09 83</a>
                </li>
                <li>
                  <MapPin size={16} className="contact-icon" />
                  <span>Parakou, Bénin</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              &copy; {currentYear} Rufus Akande. Tous droits réservés.
            </div>
            <div className="legal-links">
              <a href="/">Accueil</a>
              <span className="separator">|</span>
              <a href="/">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
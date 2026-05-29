 import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header id="header" className={`header ${scrolled ? 'scrolled' : ''}`} role="banner">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo" aria-label="Rufus Akande - Accueil">
            <span className="logo-text">Rufus<span className="logo-highlight">Akande</span></span>
          </Link>
        </div>

        <nav className={`nav-desktop ${isMenuOpen ? 'show' : ''}`} role="navigation" aria-label="Menu principal">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Accueil</Link>
            </li>
            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                onClick={() => toggleDropdown(0)}
                aria-expanded={activeDropdown === 0}
                aria-haspopup="true"
              >
                Services <ChevronDown size={16} />
              </button>
              <ul className={`dropdown-menu ${activeDropdown === 0 ? 'show' : ''}`}>
                <li><Link to="/services" >Sites Vitrines</Link></li>
                <li><Link to="/services" >E-commerce</Link></li>
                <li><Link to="/services" >Applications Web</Link></li>
                <li><Link to="/services" >Conseil & Accompagnement</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/realisations" className="nav-link">Réalisations</Link>
            </li>
            <li className="nav-item">
              <Link to="/apropos" className="nav-link">À propos</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="cta-container">
          <Link to="https://wa.me/22951080983" target="_blank" className="cta-button" aria-label="Me contacter">
            Me contacter
          </Link>
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-container">
          <ul className="mobile-nav-list">
            <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
            <li className="mobile-dropdown">
              <button 
                onClick={() => toggleDropdown(1)}
                aria-expanded={activeDropdown === 1}
              >
                Services <ChevronDown size={16} className={activeDropdown === 1 ? 'rotate' : ''} />
              </button>
              <ul className={`mobile-dropdown-menu ${activeDropdown === 1 ? 'show' : ''}`}>
                <li><Link to="/services" onClick={(e) => { e.preventDefault(); window.location.hash = 'vitrine'; closeMenu(); }}>Sites Vitrines</Link></li>
                <li><Link to="/services" onClick={(e) => { e.preventDefault(); window.location.hash = 'ecommerce'; closeMenu(); }}>E-commerce</Link></li>
                <li><Link to="/services" onClick={(e) => { e.preventDefault(); window.location.hash = 'webapp'; closeMenu(); }}>Applications Web</Link></li>
                <li><Link to="/services" onClick={(e) => { e.preventDefault(); window.location.hash = 'conseil'; closeMenu(); }}>Conseil & Accompagnement</Link></li>
              </ul>
            </li>
            <li><Link to="/realisations" onClick={closeMenu}>Réalisations</Link></li>
            <li><Link to="/apropos" onClick={closeMenu}>À propos</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
          <div className="mobile-contact-info">
            <p>Besoin d'un site web qui vous démarque ?</p>
            <Link to="/contact" className="mobile-cta-button" onClick={closeMenu}>Discutons de votre projet</Link>
            <div className="mobile-contact-details">
              <a href="mailto:rufus.dev@mail.com">rufus.dev@mail.com</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
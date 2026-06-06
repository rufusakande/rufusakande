import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const toggleDropdown = (index) =>
    setActiveDropdown(activeDropdown === index ? null : index);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navLinkClass =
    'text-ink-body hover:text-brand-blue font-medium text-[15px] transition-colors relative after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-[2px] after:bg-brand-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 py-4 mx-auto max-w-[1240px] px-4 sm:px-6 transition-all duration-300"
      role="banner"
    >
      <div
        className={`mx-auto max-w-[1240px] px-4 sm:px-6 flex items-center justify-between gap-4 rounded-full border border-line backdrop-blur-xl transition-all duration-300 ${
          scrolled ? 'bg-white/95 shadow-floating' : 'bg-white/80 shadow-card'
        }`}
        style={{ padding: '0.6rem 0.7rem 0.6rem 1.6rem' }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Rufus Akande - Accueil">
          <span className="text-xl font-extrabold tracking-[-0.02em] text-ink">
            Rufus
            <span className="text-gradient-blue">Akande</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Menu principal">
          <Link to="/" className={navLinkClass}>Accueil</Link>
          <div className="relative">
            <button
              onClick={() => toggleDropdown(0)}
              aria-expanded={activeDropdown === 0}
              className={`${navLinkClass} flex items-center gap-1`}
            >
              Services <ChevronDown size={16} />
            </button>
            {activeDropdown === 0 && (
              <ul className="absolute left-0 top-full mt-3 w-56 rounded-2xl border border-line bg-white shadow-card overflow-hidden">
                {['Sites Vitrines', 'E-commerce', 'Applications Web', 'Conseil & Accompagnement'].map((s) => (
                  <li key={s}>
                    <Link
                      to="/services"
                      className="block px-4 py-2.5 text-sm text-ink-body hover:bg-brand-blue-soft hover:text-brand-blue transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/realisations" className={navLinkClass}>Réalisations</Link>
          <Link to="/apropos" className={navLinkClass}>À propos</Link>
          <Link to="/contact" className={navLinkClass}>Contact</Link>
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center justify-left gap-2">
          <Link
            to="https://wa.me/22951080983"
            target="_blank"
            className="btn-gold premium-shine !py-2.5 !px-5 text-sm hidden sm:inline-flex"
          >
            Me contacter
          </Link>
          <button
            className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-full text-ink hover:bg-brand-blue-soft transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[80px] bottom-0 bg-surface transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-8 h-full overflow-y-auto">
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Accueil' },
              { to: '/realisations', label: 'Réalisations' },
              { to: '/apropos', label: 'À propos' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={closeMenu}
                  className="block py-3 text-lg font-semibold text-ink border-b border-line"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => toggleDropdown(1)}
                className="w-full flex items-center justify-between py-3 text-lg font-semibold text-ink border-b border-line"
              >
                Services
                <ChevronDown size={18} className={activeDropdown === 1 ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              {activeDropdown === 1 && (
                <ul className="pl-4 py-2 space-y-2">
                  {['Sites Vitrines', 'E-commerce', 'Applications Web', 'Conseil & Accompagnement'].map((s) => (
                    <li key={s}>
                      <Link to="/services" onClick={closeMenu} className="block py-1.5 text-ink-body">{s}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-deep text-white">
            <p className="text-sm">Besoin d'un site web qui vous démarque ?</p>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-4 inline-flex btn-gold premium-shine !py-2.5"
            >
              Discutons de votre projet
            </Link>
            <div className="mt-4 text-sm">
              <a href="mailto:akanderufus51@gmail.com" className="text-white/90 hover:text-white">
                akanderufus51@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

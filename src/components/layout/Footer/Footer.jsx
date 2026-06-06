import { Instagram, Linkedin, Mail, MapPin, Phone, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialClass =
    'w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:bg-brand-gold hover:text-[#1a1108] hover:border-brand-gold transition-all';

  return (
    <footer className="relative bg-gradient-to-b from-brand-blue-deep to-[#03081f] text-white pt-20 pb-8 mt-20" role="contentinfo">
      {/* halo gold */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,164,55,0.35), transparent 60%)', filter: 'blur(40px)' }}
      />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" aria-label="Rufus Akande - Accueil">
              <span className="text-2xl font-extrabold tracking-[-0.02em]">
                Rufus
                <span className="bg-gradient-to-r from-brand-gold-light to-brand-gold bg-clip-text text-transparent">
                  Akande
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/65 leading-relaxed">
              Des solutions web sur mesure pour vous démarquer et développer votre présence en ligne.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="https://www.linkedin.com/in/rufus-akande-freelance-developpeur-web/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialClass}><Linkedin size={18} /></a>
              <a href="https://github.com/rufusakande" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialClass}><Github size={18} /></a>
              <a href="https://www.instagram.com/rufusakande_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialClass}><Instagram size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-brand-gold-light font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              {[['/', 'Accueil'], ['/apropos', 'À propos'], ['/services', 'Services'], ['/realisations', 'Réalisations'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-white/70 hover:text-brand-gold-light transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-brand-gold-light font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {['Sites Vitrines', 'E-commerce', 'Applications Web', 'Conseil & Accompagnement'].map((s) => (
                <li key={s}><Link to="/services" className="text-white/70 hover:text-brand-gold-light transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-brand-gold-light font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-white/70">
                <Mail size={16} className="text-brand-gold-light" />
                <a href="mailto:akanderufus51@gmail.com" className="hover:text-white">akanderufus51@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone size={16} className="text-brand-gold-light" />
                <a href="https://wa.me/22951080983" className="hover:text-white">+229 01 51 08 09 83</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <MapPin size={16} className="text-brand-gold-light" />
                <span>Parakou, Bénin</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <div>&copy; {currentYear} Rufus Akande. Tous droits réservés.</div>
          <div className="flex items-center gap-3">
            <a href="/" className="hover:text-white">Accueil</a>
            <span className="opacity-50">|</span>
            <a href="/" className="hover:text-white">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

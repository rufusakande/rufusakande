import { useEffect, useRef, useState } from 'react';
import { Monitor, ShoppingCart, Smartphone, RotateCcw, Users, ArrowRight, CheckCircle, Zap, Palette, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { id: 'vitrine', title: 'Sites Vitrines', subtitle: 'Création de site vitrine', description: 'Donnez à votre activité une vitrine moderne, visible et convaincante qui reflète votre expertise.', icon: Monitor, features: ['Design sur-mesure et responsive', 'Optimisation SEO avancée', 'Formulaires de contact intégrés', 'Blog et gestion de contenu'] },
  { id: 'ecommerce', title: 'E-commerce', subtitle: 'Création de boutique en ligne', description: 'Vendez vos produits/services avec une plateforme fluide, sécurisée et évolutive.', icon: ShoppingCart, features: ['Catalogue produits complet', 'Paiement sécurisé intégré', 'Gestion des stocks', 'Tableau de bord marchand'] },
  { id: 'webapp', title: 'Applications Web', subtitle: "Développement d'application web", description: 'Gagnez du temps avec des outils personnalisés pensés pour vos besoins réels.', icon: Smartphone, features: ['Interface utilisateur intuitive', 'Fonctionnalités métier sur-mesure', 'Base de données sécurisée', 'API et intégrations'] },
  { id: 'refonte', title: 'Refonte de Site', subtitle: 'Refonte de site existant', description: 'Modernisez votre présence en ligne avec une refonte complète et performante.', icon: RotateCcw, features: ['Audit technique complet', 'Migration sécurisée', 'Amélioration des performances', 'Nouvelle identité visuelle'] },
  { id: 'conseil', title: 'Conseil & Accompagnement', subtitle: 'Accompagnement et consulting', description: 'Un partenaire technique fiable, à votre écoute, qui vous guide pas à pas.', icon: Users, features: ['Audit et conseils stratégiques', 'Formation et accompagnement', 'Maintenance et support', 'Évolution et améliorations'] },
];

const ServicesList = () => {
  const ref = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-card-id');
          setVisibleCards((prev) => (prev.includes(id) ? prev : [...prev, id]));
        }
      });
    }, { threshold: 0.15 });
    const cards = ref.current?.querySelectorAll('[data-card-id]');
    cards?.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-ink tracking-[-0.02em]">
            Mes <span className="serif-italic text-gradient-gold">Services</span>
          </h2>
          <p className="mt-5 text-lg text-ink-body">Des solutions complètes pour développer votre présence digitale</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            const isVisible = visibleCards.includes(s.id);
            return (
              <article
                key={s.id}
                id={s.id}
                data-card-id={s.id}
                className={`group bg-white rounded-3xl p-7 border border-line shadow-card hover:shadow-floating hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-deep scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="flex items-start justify-between gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-accent text-white flex items-center justify-center shadow-blue-glow">
                    <Icon size={26} />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-brand-gold/15 text-brand-gold-deep border border-brand-gold/30">
                    <Zap size={12} /> Populaire
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-blue font-semibold">{s.subtitle}</p>
                <p className="mt-3 text-sm text-ink-body leading-relaxed">{s.description}</p>

                <ul className="mt-5 space-y-2 flex-1">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink-body">
                      <CheckCircle size={16} className="text-brand-gold-deep mt-0.5 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-white font-semibold text-sm hover:bg-brand-blue transition-colors">
                  Demander un devis <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Palette, title: 'Design Personnalisé', text: 'Chaque projet est unique et reflète votre identité' },
            { icon: Code, title: 'Code Optimisé', text: 'Performance et sécurité au cœur du développement' },
          ].map((it) => (
            <div key={it.title} className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-line">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center flex-shrink-0">
                <it.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-ink">{it.title}</h4>
                <p className="text-sm text-ink-body">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;

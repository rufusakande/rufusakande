import { useEffect, useRef, useState } from 'react';
import { Monitor, ShoppingCart, Settings, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: Monitor, title: 'Sites vitrines & identités digitales', description: "Donnez à votre activité une vitrine moderne, visible et convaincante qui vous démarque de la concurrence." },
  { icon: ShoppingCart, title: 'Sites e-commerce sur-mesure', description: 'Vendez vos produits et services avec une plateforme fluide, sécurisée et évolutive qui convertit.' },
  { icon: Settings, title: 'Applications web personnalisées', description: 'Gagnez du temps avec des outils pensés pour vos besoins réels et optimisés pour votre workflow.' },
  { icon: Users, title: 'Accompagnement & conseils', description: "Un partenaire technique fiable, à votre écoute, qui vous guide pas à pas vers le succès digital." },
];

const WhatIOffer = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-white to-surface overflow-hidden" aria-labelledby="services-title">
      <div className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10), transparent 60%)', filter: 'blur(40px)' }} />
      <div className="pointer-events-none absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(212,164,55,0.10), transparent 60%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold uppercase tracking-[0.18em] mb-5">Services</span>
          <h2 id="services-title" className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-ink tracking-[-0.02em]">
            Ce que je vous <span className="serif-italic text-gradient-gold">propose</span>
          </h2>
          <p className="mt-5 text-ink-body text-lg leading-relaxed">
            Des solutions web complètes pour développer votre présence digitale et booster votre activité.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`group relative bg-white rounded-3xl p-7 border border-line shadow-card hover:shadow-floating hover:-translate-y-1.5 transition-all duration-500 overflow-hidden ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-deep scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue-soft to-white border border-line text-brand-blue inline-flex items-center justify-center mb-5 group-hover:from-brand-gold/20 group-hover:text-brand-gold-deep transition-colors">
                <s.icon size={26} />
              </div>
              <h3 className="text-lg font-bold text-ink leading-tight">{s.title}</h3>
              <p className="mt-3 text-ink-body text-sm leading-relaxed">{s.description}</p>
            </article>
          ))}
        </div>

        <div className={`mt-14 text-center transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <Link to="/services" className="btn-gold premium-shine">
            Découvrir tous mes services
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatIOffer;

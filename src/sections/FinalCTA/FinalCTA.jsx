import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  'Site responsive et optimisé',
  'Accompagnement personnalisé',
  'Support technique inclus',
  'Résultats mesurables',
];

const FinalCTA = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden" aria-labelledby="cta-title">
      <div className="relative max-w-[1100px] mx-auto px-6">
        <div className={`relative rounded-[2rem] overflow-hidden p-10 md:p-16 bg-gradient-to-br from-brand-blue-deep via-brand-blue to-brand-blue-deep shadow-floating transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(212,164,55,0.45), transparent 60%)', filter: 'blur(50px)' }} />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.45), transparent 60%)', filter: 'blur(50px)' }} />

          <div className="relative text-center max-w-2xl mx-auto text-white">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold-light text-xs font-semibold uppercase tracking-[0.18em] mb-5 border border-white/10">Démarrons</span>
            <h2 id="cta-title" className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-white">
              Prêt à transformer votre <span className="serif-italic bg-gradient-to-r from-brand-gold-light to-brand-gold bg-clip-text text-transparent">présence digitale</span> ?
            </h2>
            <p className="mt-5 text-white/75 text-lg leading-relaxed">
              Discutons de votre projet et donnons vie à vos ambitions numériques.
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-white/85 text-sm">
                  <CheckCircle size={18} className="text-brand-gold-light flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="https://wa.me/22951080983" target="_blank" className="btn-gold premium-shine">
                Commencer mon projet
                <ArrowRight size={18} />
              </Link>
              <Link to="/realisations" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
                Voir mes réalisations
              </Link>
            </div>

            <p className="mt-8 text-xs text-white/60">
              <strong className="text-white/90">Satisfaction garantie</strong> — Échange gratuit pour discuter de votre projet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

import { useEffect, useRef, useState } from 'react';
import { Users, Target, Zap, Star } from 'lucide-react';

const ServicesHero = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative pt-36 pb-20 bg-gradient-to-b from-white to-surface overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(212,164,55,0.18), transparent 60%)', filter: 'blur(50px)' }} />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18), transparent 60%)', filter: 'blur(50px)' }} />

      <div className={`relative max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink tracking-[-0.02em]">
          Mes <span className="serif-italic text-gradient-gold">Services</span>
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3 text-brand-gold">
          <span className="h-px w-12 bg-brand-gold/40" />
          <Star size={16} className="fill-brand-gold" />
          <span className="h-px w-12 bg-brand-gold/40" />
        </div>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-ink-body leading-relaxed">
          Mes services s'adressent aux <strong className="text-ink">entrepreneurs</strong>, <strong className="text-ink">petites entreprises</strong>, <strong className="text-ink">associations</strong> ou <strong className="text-ink">indépendants</strong> qui veulent un site qui leur ressemble et qui performe.
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {[
            { icon: Users, title: 'Pour qui ?', text: 'Entrepreneurs & indépendants ambitieux' },
            { icon: Target, title: 'Objectif', text: 'Sites qui vous ressemblent vraiment' },
            { icon: Zap, title: 'Résultat', text: 'Performance & conversions garanties' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-3xl p-6 border border-line shadow-card text-left">
              <div className="w-12 h-12 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="text-base font-bold text-ink">{f.title}</h3>
              <p className="mt-1 text-sm text-ink-body">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold text-[#1a1108] text-sm font-bold shadow-gold-glow">
            🚀 Solutions sur-mesure
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;

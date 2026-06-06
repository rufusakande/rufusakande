import { useEffect, useRef, useState } from 'react';
import { Award, Clock, TrendingUp } from 'lucide-react';

const WhyChooseMe = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState({ experience: 0, projects: 0, satisfaction: 0 });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); start(); }
    }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const start = () => {
    const targets = { experience: 4, projects: 15, satisfaction: 100 };
    const steps = 60, duration = 2000;
    Object.keys(targets).forEach((k) => {
      const target = targets[k];
      const inc = target / steps;
      let cur = 0;
      const timer = setInterval(() => {
        cur += inc;
        if (cur >= target) { cur = target; clearInterval(timer); }
        setCounters((p) => ({ ...p, [k]: Math.floor(cur) }));
      }, duration / steps);
    });
  };

  const items = [
    { icon: Award, n: counters.experience, suffix: '+ ans', title: "D'expérience", desc: 'Une expertise solide acquise sur de nombreux projets variés, des startups aux grandes entreprises.' },
    { icon: TrendingUp, n: counters.projects, suffix: '+ projets', title: 'Réalisés avec succès', desc: 'Des solutions web performantes qui ont aidé mes clients à atteindre leurs objectifs business.' },
    { icon: Clock, n: counters.satisfaction, suffix: '%', title: 'De satisfaction client', desc: "Réactif, à l'écoute et orienté résultats. Votre projet est ma priorité absolue." },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-surface to-white" aria-labelledby="advantages-title">
      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-gold-deep text-xs font-semibold uppercase tracking-[0.18em] mb-5">Mes atouts</span>
          <h2 id="advantages-title" className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-ink tracking-[-0.02em]">
            Pourquoi me faire <span className="serif-italic text-gradient-gold">confiance</span> ?
          </h2>
          <p className="mt-5 text-ink-body text-lg leading-relaxed">
            Des résultats concrets et une approche personnalisée pour chaque projet.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <article
              key={it.title}
              className={`relative bg-white border border-line rounded-3xl p-8 shadow-card hover:shadow-floating hover:-translate-y-1.5 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-accent text-white inline-flex items-center justify-center shadow-blue-glow mb-6">
                <it.icon size={28} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-gradient-gold leading-none">{it.n}</span>
                <span className="text-ink-body font-semibold">{it.suffix}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold text-ink">{it.title}</h3>
              <p className="mt-2 text-ink-body text-[15px] leading-relaxed">{it.desc}</p>
            </article>
          ))}
        </div>

        <div className={`mt-16 max-w-3xl mx-auto rounded-3xl p-8 md:p-10 bg-gradient-to-br from-brand-blue to-brand-blue-deep text-white shadow-floating relative overflow-hidden transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-brand-gold/20 blur-3xl" />
          <blockquote className="relative">
            <p className="text-lg md:text-xl serif-italic text-white/90 leading-relaxed">
              « Chaque projet est une nouvelle opportunité de créer quelque chose d'exceptionnel. Mon objectif : transformer vos idées en solutions web qui dépassent vos attentes. »
            </p>
            <cite className="mt-5 not-italic flex flex-col">
              <strong className="text-brand-gold-light">Rufus Akande</strong>
              <span className="text-white/60 text-sm">Développeur Web Freelance</span>
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;

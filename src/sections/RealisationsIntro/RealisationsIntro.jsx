import { useEffect, useRef, useState } from 'react';
import { Code, Palette, Lightbulb } from 'lucide-react';

const RealisationsIntro = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative pt-36 pb-20 bg-gradient-to-b from-white to-surface overflow-hidden" aria-labelledby="realisations-title">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(212,164,55,0.18), transparent 60%)', filter: 'blur(50px)' }} />
      <div className="pointer-events-none absolute top-20 -left-32 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18), transparent 60%)', filter: 'blur(50px)' }} />

      <div className={`relative max-w-3xl mx-auto px-6 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold uppercase tracking-[0.18em] mb-5">
          <Code size={14} /> Portfolio
        </span>
        <h1 id="realisations-title" className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold text-ink tracking-[-0.02em]">
          Découvrez mes <span className="serif-italic text-gradient-gold">réalisations</span>
        </h1>
        <p className="mt-5 text-lg text-ink-body leading-relaxed">
          Chaque projet a été conçu avec soin pour répondre à des besoins précis. Des solutions modernes, performantes et sur-mesure pour mes clients.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { icon: Code, label: 'Code sur-mesure' },
            { icon: Palette, label: 'Design moderne' },
            { icon: Lightbulb, label: 'Solutions innovantes' },
          ].map((it) => (
            <span key={it.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-line shadow-card text-ink-body text-sm font-medium">
              <it.icon size={16} className="text-brand-gold-deep" />
              {it.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealisationsIntro;

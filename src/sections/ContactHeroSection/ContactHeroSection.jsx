import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactHeroSection = () => {
  return (
    <section className="relative pt-36 pb-20 bg-gradient-to-b from-white to-surface overflow-hidden" aria-labelledby="contact-hero-title">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(212,164,55,0.2), transparent 60%)', filter: 'blur(50px)' }} />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18), transparent 60%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-gold-deep text-xs font-semibold uppercase tracking-[0.18em] mb-6">
          <Sparkles size={14} /> Transformons vos idées en réalité
        </span>

        <h1 id="contact-hero-title" className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold text-ink tracking-[-0.02em] leading-[1.1]">
          Un projet en tête ?<br />
          <span className="serif-italic text-gradient-gold inline-flex items-baseline gap-3">
            Parlons-en.
            <MessageCircle className="text-brand-gold w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
          </span>
        </h1>

        <p className="mt-6 text-lg text-ink-body leading-relaxed max-w-xl mx-auto">
          Échangeons sur votre vision, vos objectifs et créons ensemble une solution web qui fait croître votre entreprise.
        </p>

        <div className="mt-9">
          <Link to="https://wa.me/22951080983" target="_blank" className="btn-gold premium-shine">
            Commençons à discuter <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { v: '< 24h', l: 'Réponse garantie' },
            { v: '100%', l: 'Gratuit & sans engagement' },
            { v: '+15', l: 'Projets réalisés' },
          ].map((it) => (
            <div key={it.l} className="bg-white rounded-2xl p-5 border border-line shadow-card text-center">
              <div className="text-2xl font-extrabold text-gradient-gold">{it.v}</div>
              <div className="text-xs text-ink-muted mt-1">{it.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;

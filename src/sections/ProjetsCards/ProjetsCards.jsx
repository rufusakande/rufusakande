import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Eye, Code, Palette, ShoppingCart, Users, Loader, ArrowUpRight, Images, Play } from 'lucide-react';
import { usePortfolio } from '../../lib/useSupabase';

import img1 from '../../assets/Images/Rufus Akande développeur web freelance22.png';
import img2 from '../../assets/Images/Rufus Akande développeur web freelance14.webp';
import img3 from '../../assets/Images/Rufus Akande développeur web freelance21.png';
import img4 from '../../assets/Images/Rufus Akande développeur web freelance12.png';
import img5 from '../../assets/Images/Rufus Akande développeur web freelance13.png';
import img6 from '../../assets/Images/Rufus Akande développeur web freelance15.png';

const fallback = [img1, img2, img3, img4, img5, img6];

const categoryConfig = {
  coaching: { icon: Code },
  formation: { icon: Palette },
  consulting: { icon: Users },
  ecommerce: { icon: ShoppingCart },
  webapp: { icon: Code },
  default: { icon: Code },
};

const ProjetsCards = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(new Set());
  const { portfolios, loading, error } = usePortfolio();

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setVisibleCards((p) => new Set([...p, e.target.dataset.cardId]));
      });
    }, { threshold: 0.15 });
    const cards = ref.current?.querySelectorAll('[data-card-id]');
    cards?.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [portfolios]);

  return (
    <section ref={ref} className="relative py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-ink tracking-[-0.02em]">
            Mes dernières <span className="serif-italic text-gradient-gold">réalisations</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist">
            {['Tous les projets', 'Sites vitrines', 'E-commerce', 'Web Apps'].map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={i === 0}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  i === 0
                    ? 'bg-gradient-to-r from-brand-blue to-brand-blue-accent text-white shadow-blue-glow'
                    : 'bg-white border border-line text-ink-body hover:text-brand-blue hover:border-brand-blue'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader size={40} className="animate-spin text-brand-blue" />
          </div>
        )}

        {error && (
          <div className="p-5 rounded-2xl bg-red-50 text-red-800 border border-red-100">
            <p>Erreur lors du chargement des projets: {error}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && portfolios.map((p, i) => {
            const cfg = categoryConfig[p.category?.toLowerCase()] || categoryConfig.default;
            const gallery = (p.gallery || []).filter(Boolean);
            const videos = (p.videos || []).filter(Boolean);
            const allImages = [p.image_url, ...gallery].filter(Boolean);
            const cover = allImages[0] || fallback[i % fallback.length];
            const secondary = allImages[1];
            const totalMedia = allImages.length + videos.length;
            const isVisible = visibleCards.has(p.id);
            return (
              <article
                key={p.id}
                data-card-id={p.id}
                onClick={() => navigate(`/portfolio/${p.id}`)}
                className={`group relative bg-white rounded-3xl overflow-hidden border border-line shadow-card hover:shadow-floating hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Golden ring on hover */}
                <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-brand-gold/40 transition-all duration-500" />

                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  {/* Crossfade cover ↔ secondary on hover for a "multi-image" feel */}
                  <img
                    src={cover}
                    alt={p.title}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out ${secondary ? 'group-hover:opacity-0 group-hover:scale-110' : 'group-hover:scale-105'}`}
                  />
                  {secondary && (
                    <img
                      src={secondary}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-[1200ms] ease-out"
                    />
                  )}

                  {/* Bottom gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/85 via-brand-blue-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 gap-2">
                    {p.project_url && (
                      <a onClick={(e) => e.stopPropagation()} href={p.project_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 text-brand-blue text-xs font-semibold shadow-card hover:scale-105 transition-transform">
                        <ExternalLink size={14} /> Site
                      </a>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-gold text-[#1a1108] text-xs font-semibold shadow-gold-glow ml-auto">
                      <Eye size={14} /> Détails
                    </span>
                  </div>

                  {/* Category badge */}
                  <span className="absolute top-3 left-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-brand-gold-light to-brand-gold text-[#1a1108] shadow-gold-glow">
                    <cfg.icon size={16} />
                  </span>

                  {/* Media count badge */}
                  {totalMedia > 1 && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/55 text-white text-[11px] font-semibold backdrop-blur">
                      {videos.length > 0 ? <Play size={12} fill="currentColor" /> : <Images size={12} />}
                      {totalMedia}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-ink group-hover:text-brand-blue transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-body leading-relaxed flex-1 line-clamp-3">{p.short_description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(p.tags?.length ? p.tags : ['Web']).slice(0, 4).map((tag, k) => (
                      <span key={k} className="px-2.5 py-1 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Voir plus <ArrowUpRight size={16} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {!loading && portfolios.length === 0 && !error && (
          <div className="text-center text-ink-muted py-16">Aucun projet disponible pour le moment</div>
        )}
      </div>
    </section>
  );
};

export default ProjetsCards;

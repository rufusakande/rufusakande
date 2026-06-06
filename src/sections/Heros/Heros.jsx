import { ArrowUpRight, Search, RotateCw, TrendingUp, Wallet, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Heros = () => {
  return (
    <section
      id="home-hero"
      className="relative overflow-hidden bg-surface text-ink pt-32 md:pt-36 pb-24 md:pb-32"
    >
      {/* Ambient background — light premium */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-0 w-[55%] h-[45%] opacity-[0.6]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(11,42,107,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,42,107,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse at top left, #000 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top left, #000 30%, transparent 75%)',
          }}
        />
        <div
          className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full opacity-70"
          style={{
            background:
              'radial-gradient(circle at center, rgba(212,164,55,0.35) 0%, rgba(212,164,55,0.10) 35%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle at center, rgba(37,99,235,0.25) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-surface" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 mx-auto sm:px-12 flex flex-col items-center">
        {/* Pill badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-white/70 backdrop-blur-md text-[13px] text-ink-body shadow-card">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,164,55,0.8)]" />
            Pour entreprises qui veulent un site qui ramène des clients
          </div>
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-center font-display font-semibold tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,6.2vw,5.25rem)] text-ink max-w-[1050px]">
          Des sites web{' '}
          <span className="font-serif italic font-normal bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-deep bg-clip-text text-transparent">
            qui convertissent
          </span>{' '}
          vos visiteurs
          <br className="hidden md:block" />
          en clients fidèles
        </h1>

        <p className="mt-6 py-4 mx-auto max-w-3xl text-center text-ink-body text-base md:text-[17px] leading-relaxed">
          De la TPE à la PME, je conçois des sites web orientés conversion performants, élégants, et pensés pour transformer chaque visiteur en opportunité business.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/realisations" className="btn-gold premium-shine">
            Voir mes réalisations
            <ArrowUpRight size={18} />
          </Link>
          <Link to="/contact" className="btn-ghost">
            Discuter de mon projet
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Mockup central + floating cards */}
        <div className="relative mt-20 md:mt-24 mx-auto max-w-[920px] h-[460px] md:h-[520px]">
          {/* Phone frame */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[280px] md:w-[310px] h-[460px] md:h-[520px] rounded-[42px] bg-gradient-to-b from-brand-blue to-brand-blue-deep p-2 ring-1 ring-brand-gold/40 shadow-[0_40px_120px_-30px_rgba(11,42,107,0.45),0_20px_60px_-20px_rgba(11,42,107,0.35)]">
            <div className="relative w-full h-full rounded-[36px] bg-[#06122f] overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-4 text-[11px] text-white/80 font-medium">
                <span>9:41</span>
                <div className="absolute left-1/2 -translate-x-1/2 top-3 w-24 h-6 rounded-full bg-black" />
                <span className="flex items-center gap-1">
                  <span className="w-3 h-2.5 rounded-sm border border-white/60" />
                </span>
              </div>

              <div className="flex items-center justify-between px-5 mt-6">
                <h3 className="text-white text-xl font-semibold">Statistiques</h3>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Search size={14} className="text-white/70" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <RotateCw size={14} className="text-white/70" />
                  </button>
                </div>
              </div>

              <div className="mx-5 mt-4 flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-full p-1 text-[11px] font-medium">
                {['Jour', 'Semaine', 'Mois', 'Année'].map((p, i) => (
                  <button
                    key={p}
                    className={
                      i === 1
                        ? 'flex-1 py-1.5 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold text-[#1a1108]'
                        : 'flex-1 py-1.5 text-white/60'
                    }
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="px-5 mt-6 text-center">
                <p className="text-[11px] text-white/55">Conversions totales</p>
                <p className="mt-1 text-[26px] font-bold text-white tracking-tight">6 340</p>
                <span className="inline-block mt-2 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-gold/15 text-brand-gold-light border border-brand-gold/30">
                  +69%
                </span>
              </div>

              <div className="absolute bottom-6 left-4 right-4 h-24">
                <svg viewBox="0 0 280 96" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#F2C94C" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#F2C94C" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,70 C30,60 50,30 80,40 C110,50 130,75 160,55 C190,35 220,15 280,30 L280,96 L0,96 Z" fill="url(#chartFill)" />
                  <path d="M0,70 C30,60 50,30 80,40 C110,50 130,75 160,55 C190,35 220,15 280,30" fill="none" stroke="#F2C94C" strokeWidth="2" />
                  <circle cx="160" cy="55" r="4" fill="#F2C94C" />
                  <circle cx="160" cy="55" r="8" fill="#F2C94C" fillOpacity="0.25" />
                </svg>
              </div>
            </div>
          </div>

          {/* Floating card — Visiteurs */}
          <div className="hidden sm:block absolute left-0 md:left-4 top-16 md:top-24 w-[230px] rounded-2xl bg-white/90 backdrop-blur-xl border border-line p-4 shadow-floating animate-[premium-float_5s_ease-in-out_infinite]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-blue-soft flex items-center justify-center">
                  <TrendingUp size={14} className="text-brand-blue-accent" />
                </div>
                <span className="text-[12px] text-ink-body">Visiteurs / mois</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-deep border border-brand-gold/30 font-semibold">
                Voir
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-ink">18 060</p>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-brand-gold-deep font-semibold">
              <ArrowUpRight size={12} /> +2,8 %
            </div>
            <svg viewBox="0 0 180 40" className="mt-2 w-full h-8">
              <path d="M0,30 C20,28 40,18 60,22 C80,26 100,8 120,12 C140,16 160,4 180,10" fill="none" stroke="#D4A437" strokeWidth="2" />
            </svg>
          </div>

          {/* Floating card — Crypto */}
          <div className="hidden sm:flex absolute right-0 md:right-4 top-10 md:top-16 w-[240px] rounded-2xl bg-white/90 backdrop-blur-xl border border-line p-4 items-center gap-3 shadow-floating animate-[premium-float_6s_ease-in-out_infinite_0.5s]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold-light to-brand-gold-deep flex items-center justify-center text-[#1a1108] font-bold">
              €
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-ink">958 042</p>
                <span className="text-[10px] text-brand-gold-deep font-semibold">+14,7 %</span>
              </div>
              <p className="text-[11px] text-ink-muted truncate">Revenu total</p>
              <p className="text-[10px] text-ink-muted/70 truncate">  </p>
            </div>
          </div>

          {/* Floating card — Revenu */}
          <div className="hidden sm:block absolute right-0 md:right-2 bottom-6 md:bottom-12 w-[260px] rounded-2xl bg-white/90 backdrop-blur-xl border border-line p-4 shadow-floating animate-[premium-float_5.5s_ease-in-out_infinite_1s]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-gold/15 flex items-center justify-center">
                  <Wallet size={14} className="text-brand-gold-deep" />
                </div>
                <span className="text-[12px] text-ink-body">Revenu généré</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-gold-light to-brand-gold flex items-center justify-center">
                <ArrowUpRight size={14} className="text-[#1a1108]" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-2xl font-bold text-ink">48 650 €</p>
              <span className="text-[11px] text-brand-gold-deep font-semibold">+2,8 %</span>
            </div>
          </div>

          {/* Floating card — Taux conversion */}
          <div className="hidden md:flex absolute left-2 bottom-10 w-[180px] rounded-2xl bg-white/90 backdrop-blur-xl border border-line p-3 items-center gap-2 shadow-floating animate-[premium-float_4.5s_ease-in-out_infinite_1.5s]">
            <div className="w-8 h-8 rounded-lg bg-brand-blue-soft flex items-center justify-center">
              <BarChart3 size={14} className="text-brand-blue-accent" />
            </div>
            <div>
              <p className="text-[10px] text-ink-muted">Taux de conversion</p>
              <p className="text-sm font-bold text-ink">4,6 %</p>
            </div>
          </div>
        </div>

        {/* Trust row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-ink-muted text-xs uppercase tracking-[0.2em]">
          <span>+4 ans d'expérience</span>
          <span className="w-1 h-1 rounded-full bg-ink-muted/40" />
          <span>+15 projets livrés</span>
          <span className="w-1 h-1 rounded-full bg-ink-muted/40" />
          <span>100 % clients satisfaits</span>
        </div>
      </div>
    </section>
  );
};

export default Heros;

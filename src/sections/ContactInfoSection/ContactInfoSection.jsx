import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Linkedin, ExternalLink, Copy, Check, Globe, Star } from 'lucide-react';

const contactMethods = [
  { type: 'email', label: 'Email professionnel', value: 'akanderufus51@gmail.com', href: 'mailto:akanderufus51@gmail.com', icon: Mail, description: 'Réponse garantie sous 24h', copyable: true },
  { type: 'location', label: 'Localisation', value: 'Parakou, Bénin', href: 'https://maps.google.com/?q=Parakou,+Benin', icon: MapPin, description: 'Disponible pour projets locaux & internationaux', copyable: false },
];

const platforms = [
  { name: 'LinkedIn', description: 'Réseau professionnel', href: 'https://www.linkedin.com/in/rufus-akande-freelance-developpeur-web/', icon: Linkedin, badge: 'Profil vérifié' },
  { name: 'Comeup', description: 'Marketplace française', href: 'https://comeup.com/fr/@akande-rufus', icon: Globe, badge: 'Nouveau vendeur' },
  { name: 'Upwork', description: 'Plateforme internationale', href: 'https://www.upwork.com/freelancers/~01f235722f1321a00d?mp_source=share', icon: Star, badge: '100% satisfaction' },
];

const ContactInfoSection = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('akanderufus51@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section ref={ref} className="relative py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-ink tracking-[-0.02em]">
            Restons <span className="serif-italic text-gradient-gold">connectés</span>
          </h2>
          <p className="mt-4 text-ink-body text-lg">Choisissez le canal qui vous convient le mieux pour échanger</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {contactMethods.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={m.type}
                className={`bg-white rounded-3xl p-6 border border-line shadow-card hover:shadow-floating transition-all flex items-start gap-4 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 80}ms`, transitionDuration: '500ms' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-accent text-white flex items-center justify-center shadow-blue-glow flex-shrink-0">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-bold text-ink">{m.label}</h3>
                    <span className="text-xs text-ink-muted">{m.description}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <a href={m.href} target={m.type === 'location' ? '_blank' : '_self'} rel={m.type === 'location' ? 'noopener noreferrer' : undefined} className="text-brand-blue font-semibold hover:text-brand-blue-accent inline-flex items-center gap-1">
                      {m.value}
                      {m.type === 'location' && <ExternalLink size={14} />}
                    </a>
                    {m.copyable && (
                      <button onClick={copy} aria-label="Copier l'email" className="w-8 h-8 rounded-full bg-brand-blue-soft text-brand-blue hover:bg-brand-blue hover:text-white inline-flex items-center justify-center transition-colors">
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <h3 className="text-center text-xl font-bold text-ink">Mes plateformes professionnelles</h3>
          <div className="mt-8 grid sm:grid-cols-3 gap-5">
            {platforms.map((p, i) => {
              const Icon = p.icon;
              return (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-white rounded-3xl p-6 border border-line shadow-card hover:shadow-floating hover:-translate-y-1 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${(i + 2) * 80}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold-light to-brand-gold text-[#1a1108] flex items-center justify-center shadow-gold-glow">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-brand-blue-soft text-brand-blue">{p.badge}</span>
                  </div>
                  <h4 className="mt-4 font-bold text-ink">{p.name}</h4>
                  <p className="text-sm text-ink-body">{p.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Voir le profil <ExternalLink size={14} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto rounded-3xl p-6 bg-gradient-to-br from-brand-blue-deep to-brand-blue text-white shadow-floating text-center">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold-light">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-brand-gold-light opacity-60 animate-ping" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-brand-gold-light" />
            </span>
            Disponible pour nouveaux projets
          </div>
          <p className="mt-3 text-white/80 text-sm">
            Actuellement disponible pour de nouveaux projets. N'hésitez pas à me contacter pour discuter de vos besoins !
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;

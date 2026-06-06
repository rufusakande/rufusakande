import { useState, useEffect } from 'react';
import { User, Award, MapPin, Mail, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import rufusImg from '../../assets/Images/rufus.webp';

const skills = ['React', 'Node.js', 'MySQL', 'Vite', 'Express'];

const AboutHero = () => {
  const [currentSkill, setCurrentSkill] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrentSkill((p) => (p + 1) % skills.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative pt-36 pb-20 bg-gradient-to-b from-white to-surface overflow-hidden" aria-labelledby="about-hero-title">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(212,164,55,0.2), transparent 60%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            <User size={14} /> Développeur Web Freelance
          </span>
          <h1 id="about-hero-title" className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold text-ink tracking-[-0.02em] leading-[1.1]">
            Transformons vos <span className="serif-italic text-gradient-gold">idées</span> en solutions digitales
          </h1>
          <p className="mt-5 text-lg text-ink-body leading-relaxed">
            Je suis <strong className="text-ink">Rufus Akande</strong>, développeur web freelance basé au Bénin. Ma passion est de créer des interfaces claires, des fonctionnalités utiles et des sites performants qui <em className="serif-italic text-brand-gold-deep">convertissent vos visiteurs en clients</em>.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[['4+', "Années d'expérience"], ['15+', 'Projets réalisés'], ['100%', 'Clients satisfaits']].map(([n, l]) => (
              <div key={l} className="bg-white rounded-2xl p-4 border border-line shadow-card text-center">
                <div className="text-2xl font-extrabold text-gradient-gold">{n}</div>
                <div className="text-xs text-ink-muted mt-1">{l}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/realisations" className="btn-gold premium-shine">
              <Award size={18} /> Voir mes réalisations
            </Link>
            <Link to="/contact" className="btn-ghost">
              <Mail size={18} /> Me contacter
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative max-w-sm mx-auto bg-white rounded-3xl p-7 border border-line shadow-floating">
            <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden ring-4 ring-brand-gold/30 shadow-gold-glow">
              <img src={rufusImg} alt="Rufus Akande" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-ink text-center">Rufus Akande</h2>
            <p className="text-sm text-ink-body text-center">Développeur Web Freelance</p>

            <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-deep text-white p-4 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">Spécialisé en</p>
              <p className="mt-2 text-lg font-bold text-brand-gold-light">{skills[currentSkill]}</p>
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {[
                { to: 'mailto:akanderufus51@gmail.com', icon: Mail },
                { to: 'https://github.com/rufusakande', icon: Github },
                { to: 'https://www.linkedin.com/in/rufus-akande-freelance-developpeur-web/', icon: Linkedin },
                { to: '#', icon: MapPin },
              ].map((s, i) => (
                <Link key={i} to={s.to} className="w-10 h-10 rounded-full bg-brand-blue-soft text-brand-blue inline-flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors">
                  <s.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

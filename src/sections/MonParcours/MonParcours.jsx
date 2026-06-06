import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Code, Users, Target, Lightbulb, Calendar, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const experiences = [
  { id: 1, year: '2024-2026', title: 'Développeur Web Fullstack Freelance', company: 'Indépendant', location: 'Parakou, Bénin', description: 'Création de sites vitrines, e-commerce et applications web sur mesure pour entrepreneurs, ONG et professionnels.', achievements: ['15+ projets web réalisés avec succès', 'Spécialisation React, Node.js, MySQL', 'Accompagnement technique personnalisé', 'Taux de satisfaction client : 100%'], tech: ['React', 'Node.js', 'MySQL', 'Express', 'CSS'] },
  { id: 2, year: '2022-2024', title: 'Développeur Frontend Junior', company: 'Indépendant', location: 'Parakou, Bénin', description: "Développement d'interfaces utilisateur modernes et responsive.", achievements: ['Maîtrise des frameworks JavaScript modernes', 'Optimisation des performances web', 'Collaboration en équipe agile', 'Formation aux bonnes pratiques UX/UI'], tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery'] },
  { id: 3, year: '2021-2022', title: 'Développeur Web Junior', company: 'Rasipe ONG', location: 'Parakou, Bénin', description: 'Premiers pas dans le développement web professionnel, focus sur les technologies frontend.', achievements: ['Apprentissage des fondamentaux du web', 'Développement de sites vitrines', 'Formation aux outils de développement', 'Bases de la gestion de projets'], tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress'] },
];

const formations = [
  { id: 1, year: '2025-2026', title: "Formation en Création d'Agent IA", institution: 'Autodidacte & Cours en ligne', location: 'Parakou, Bénin', description: "Formation intensive en création d'agents IA et développement web moderne.", skills: ['Intelligence Artificielle & Machine Learning', "Création d'agents IA", 'Développement Frontend & Backend', 'Bases de données relationnelles', 'Méthodologies de développement', 'Gestion de projets web'] },
  { id: 2, year: '2021-2025', title: 'Autoformation Continue', institution: 'Plateformes en ligne', location: 'À distance', description: 'Apprentissage autodidacte des technologies web modernes via des cours en ligne et projets personnels.', skills: ['JavaScript ES6+', 'Frameworks modernes (React, Vue)', 'APIs REST & GraphQL', 'DevOps & Déploiement'] },
];

const valeurs = [
  { icon: Target, title: 'Orienté Résultats', description: 'Chaque projet est conçu pour atteindre vos objectifs business et convertir vos visiteurs en clients.' },
  { icon: Users, title: "À l'Écoute", description: 'Je prends le temps de comprendre vos besoins pour créer des solutions qui vous ressemblent.' },
  { icon: Lightbulb, title: 'Innovation', description: "J'utilise les dernières technologies pour vous offrir des solutions modernes et performantes." },
  { icon: CheckCircle, title: 'Qualité', description: 'Code propre, performances optimisées et respect des standards web pour un résultat professionnel.' },
];

const tabs = [
  { id: 'experience', icon: Briefcase, label: 'Expérience' },
  { id: 'formation', icon: GraduationCap, label: 'Formation' },
  { id: 'valeurs', icon: Target, label: 'Valeurs' },
];

const MonParcours = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            <GraduationCap size={14} /> Mon Histoire
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-ink tracking-[-0.02em]">
            Un parcours dédié à l'<span className="serif-italic text-gradient-gold">excellence</span> digitale
          </h2>
          <p className="mt-5 text-lg text-ink-body leading-relaxed">
            Découvrez mon évolution professionnelle, mes formations et les valeurs qui guident mon travail.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-surface border border-line shadow-card">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                aria-pressed={activeTab === t.id}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === t.id ? 'bg-gradient-to-r from-brand-blue to-brand-blue-accent text-white shadow-blue-glow' : 'text-ink-body hover:text-brand-blue'
                }`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          {activeTab === 'experience' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              {experiences.map((exp) => (
                <article key={exp.id} className="relative pl-8 sm:pl-12 border-l-2 border-brand-blue/15">
                  <span className="absolute -left-[11px] sm:-left-[13px] top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-brand-gold-light to-brand-gold flex items-center justify-center shadow-gold-glow">
                    <Briefcase size={11} className="text-[#1a1108]" />
                  </span>
                  <div className="bg-white rounded-3xl p-6 border border-line shadow-card">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                      <span className="inline-flex items-center gap-1"><Calendar size={12} /> {exp.year}</span>
                      <span className="inline-flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-ink">{exp.title}</h3>
                    <p className="text-sm text-brand-blue font-semibold">{exp.company}</p>
                    <p className="mt-3 text-sm text-ink-body leading-relaxed">{exp.description}</p>

                    <h4 className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-deep">Réalisations clés</h4>
                    <ul className="mt-3 space-y-1.5">
                      {exp.achievements.map((a, k) => (
                        <li key={k} className="flex gap-2 text-sm text-ink-body">
                          <CheckCircle size={16} className="text-brand-gold-deep mt-0.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'formation' && (
            <div className="grid md:grid-cols-2 gap-6">
              {formations.map((f) => (
                <article key={f.id} className="bg-white rounded-3xl p-6 border border-line shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-accent text-white flex items-center justify-center shadow-blue-glow flex-shrink-0">
                      <GraduationCap size={26} />
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted">{f.year} • {f.location}</p>
                      <h3 className="mt-1 text-lg font-bold text-ink">{f.title}</h3>
                      <p className="text-sm text-brand-blue font-semibold">{f.institution}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-ink-body leading-relaxed">{f.description}</p>
                  <h4 className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-deep">Compétences acquises</h4>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {f.skills.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold">
                        <Code size={11} /> {s}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'valeurs' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valeurs.map((v) => (
                <article key={v.title} className="bg-white rounded-3xl p-6 border border-line shadow-card hover:shadow-floating hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold-light to-brand-gold text-[#1a1108] flex items-center justify-center shadow-gold-glow mb-4">
                    <v.icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-body leading-relaxed">{v.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-ink">Prêt à donner vie à votre projet ?</h3>
          <p className="mt-3 text-ink-body">
            Forte de cette expérience, je suis prêt à mettre mes compétences au service de votre réussite digitale.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="https://wa.me/22951080983" target="_blank" className="btn-gold premium-shine">
              Démarrons ensemble <ArrowRight size={18} />
            </Link>
            <Link to="/realisations" className="btn-ghost">Voir mes réalisations</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonParcours;

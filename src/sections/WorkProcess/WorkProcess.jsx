import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Lightbulb, FileEdit, Code, Rocket } from 'lucide-react';

const steps = [
  { icon: MessageSquare, title: 'Prise de contact', description: "Échangeons sur vos besoins, vos objectifs et votre vision pour comprendre parfaitement votre projet." },
  { icon: Lightbulb, title: 'Compréhension du besoin', description: 'Analyse approfondie de vos exigences techniques et business pour définir la meilleure stratégie.' },
  { icon: FileEdit, title: 'Proposition sur mesure', description: "Présentation d'une solution personnalisée avec devis détaillé et planning de réalisation." },
  { icon: Code, title: 'Développement', description: 'Création de votre site avec des points réguliers pour valider chaque étape ensemble.' },
  { icon: Rocket, title: 'Livraison & accompagnement', description: 'Mise en ligne, formation et support technique pour assurer votre autonomie totale.' },
];

const WorkProcess = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white" aria-labelledby="process-title">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-semibold uppercase tracking-[0.18em] mb-5">Mon process</span>
          <h2 id="process-title" className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-ink tracking-[-0.02em]">
            Comment je travaille avec <span className="serif-italic text-gradient-gold">vous</span>
          </h2>
          <p className="mt-5 text-ink-body text-lg leading-relaxed">
            Un processus transparent et structuré pour transformer vos idées en réalité digitale.
          </p>
        </div>

        <div className="relative mt-16">
          {/* timeline line */}
          <div className="hidden lg:block absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <article
                key={s.title}
                className={`relative bg-white border border-line rounded-3xl p-6 shadow-card hover:shadow-floating hover:-translate-y-1 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="relative mx-auto w-20 h-20 mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-accent text-white flex items-center justify-center shadow-blue-glow">
                    <s.icon size={28} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold-light to-brand-gold text-[#1a1108] font-bold text-sm flex items-center justify-center ring-4 ring-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-ink text-center">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-body text-center leading-relaxed">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;

import { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Marie Dubois', role: 'Coach Bien-être', content: "Rufus a transformé ma vision en un site moderne, rapide et efficace. Mes clients trouvent facilement mes services et peuvent réserver en ligne. Le ROI est immédiat !", rating: 5, project: 'Site vitrine + système de réservation' },
  { name: 'Jean-Baptiste Kouassi', role: 'E-commerçant', content: 'Grâce au site e-commerce créé par Rufus, nos ventes ont augmenté de 150% en 6 mois. Interface intuitive, paiements sécurisés, tout fonctionne parfaitement.', rating: 5, project: 'Boutique e-commerce complète' },
  { name: 'Association ESPOIR', role: 'ONG', content: "Un travail professionnel et une écoute exceptionnelle. Notre nouveau site nous permet de mieux communiquer sur nos actions et d'attirer plus de donateurs.", rating: 5, project: 'Site institutionnel + donations' },
];

const Testimonials = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-br from-brand-blue-deep via-brand-blue to-brand-blue-deep text-white overflow-hidden" aria-labelledby="testimonials-title">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(212,164,55,0.4), transparent 60%)', filter: 'blur(60px)' }} />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.45), transparent 60%)', filter: 'blur(60px)' }} />

      <div className="relative max-w-[1100px] mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold-light text-xs font-semibold uppercase tracking-[0.18em] mb-5 border border-white/10">Témoignages</span>
          <h2 id="testimonials-title" className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-white">
            Ce que disent mes <span className="serif-italic bg-gradient-to-r from-brand-gold-light to-brand-gold bg-clip-text text-transparent">clients</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg leading-relaxed">
            Des témoignages authentiques de partenaires satisfaits.
          </p>
        </div>

        <div className="relative mt-14">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className={`max-w-3xl mx-auto rounded-3xl p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 shadow-floating relative transition-all duration-500 ${i === current ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}
            >
              <Quote size={42} className="text-brand-gold-light/40 mb-4" />
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, k) => <Star key={k} size={18} className="text-brand-gold-light fill-brand-gold-light" />)}
              </div>
              <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed serif-italic">
                « {t.content} »
              </blockquote>
              <footer className="mt-7 pt-6 border-t border-white/10">
                <cite className="not-italic">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-white/60">{t.role}</p>
                  <p className="text-xs text-brand-gold-light mt-1">{t.project}</p>
                </cite>
              </footer>
            </article>
          ))}

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Témoignage ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-brand-gold' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

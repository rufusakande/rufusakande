import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Marie Dubois', role: 'Coach Bien-être', content: "Rufus a transformé ma vision en un site moderne, rapide et efficace. Mes clients trouvent facilement mes services et peuvent réserver en ligne. Le ROI est immédiat !", rating: 5, project: 'Site vitrine + système de réservation' },
  { name: 'Jean-Baptiste Kouassi', role: 'E-commerçant', content: 'Grâce au site e-commerce créé par Rufus, nos ventes ont augmenté de 150% en 6 mois. Interface intuitive, paiements sécurisés, tout fonctionne parfaitement.', rating: 5, project: 'Boutique e-commerce complète' },
  { name: 'Association ESPOIR', role: 'ONG', content: "Un travail professionnel et une écoute exceptionnelle. Notre nouveau site nous permet de mieux communiquer sur nos actions et d'attirer plus de donateurs.", rating: 5, project: 'Site institutionnel + donations' },
];

// On duplique les témoignages pour créer une boucle infinie fluide (seamless loop)
// On les multiplie suffisamment de fois pour remplir largement un écran ultra-large (x4)
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-blue-deep via-brand-blue to-brand-blue-deep text-white overflow-hidden" aria-labelledby="testimonials-title">
      {/* Effets de lumière en arrière-plan */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(212,164,55,0.4), transparent 60%)', filter: 'blur(60px)' }} />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.45), transparent 60%)', filter: 'blur(60px)' }} />

      <div className="relative max-w-[1400px] mx-auto px-6 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold-light text-xs font-semibold uppercase tracking-[0.18em] mb-5 border border-white/10">Témoignages</span>
          <h2 id="testimonials-title" className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-white">
            Ce que disent mes <span className="serif-italic bg-gradient-to-r from-brand-gold-light to-brand-gold bg-clip-text text-transparent">clients</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg leading-relaxed">
            Des témoignages authentiques de partenaires satisfaits.
          </p>
        </div>
      </div>

      {/* Conteneur du Marquee (Carrousel infini) */}
      <div className="relative flex overflow-hidden">
        {/* Masques dégradés pour adoucir les bords du défilement */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-brand-blue-deep to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-brand-blue-deep to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 35, 
            repeat: Infinity 
          }}
        >
          {duplicatedTestimonials.map((t, i) => (
            <article
              key={i}
              className="w-[320px] md:w-[450px] shrink-0 rounded-3xl p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col group cursor-default"
            >
              <Quote size={36} className="text-brand-gold-light/30 mb-6 group-hover:text-brand-gold-light/60 transition-colors" />
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, k) => (
                  <Star key={k} size={16} className="text-brand-gold-light fill-brand-gold-light" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed serif-italic mb-8 grow">
                « {t.content} »
              </blockquote>
              <footer className="mt-auto pt-6 border-t border-white/10">
                <cite className="not-italic block">
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-sm text-brand-gold-light mt-1 font-medium">{t.role}</p>
                  <p className="text-xs text-white/50 mt-1">{t.project}</p>
                </cite>
              </footer>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

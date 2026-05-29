import { useState, useEffect, useRef } from 'react';
import {
  Star,
  Quote
} from 'lucide-react';
import './Testimonials.css';

// Hook pour détecter quand un élément entre dans le viewport
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Composant Testimonials
const Testimonials = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Coach Bien-être",
      content: "Rufus a transformé ma vision en un site moderne, rapide et efficace. Mes clients trouvent facilement mes services et peuvent réserver en ligne. Le ROI est immédiat !",
      rating: 5,
      project: "Site vitrine + système de réservation"
    },
    {
      name: "Jean-Baptiste Kouassi",
      role: "E-commerçant",
      content: "Grâce au site e-commerce créé par Rufus, nos ventes ont augmenté de 150% en 6 mois. Interface intuitive, paiements sécurisés, tout fonctionne parfaitement.",
      rating: 5,
      project: "Boutique e-commerce complète"
    },
    {
      name: "Association ESPOIR",
      role: "ONG",
      content: "Un travail professionnel et une écoute exceptionnelle. Notre nouveau site nous permet de mieux communiquer sur nos actions et d'attirer plus de donateurs.",
      rating: 5,
      project: "Site institutionnel + donations"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="testimonials-section" ref={ref} aria-labelledby="testimonials-title">
      <div className="testimonials-container">
        <header className="testimonials-header">
          <h2 id="testimonials-title" className={`testimonials-title ${isVisible ? 'animate-fade-in' : ''}`}>
            Ce que disent mes clients
          </h2>
          <p className={`testimonials-subtitle ${isVisible ? 'animate-fade-in-delay' : ''}`}>
            Des témoignages authentiques de partenaires satisfaits
          </p>
        </header>

        <div className="testimonials-carousel" role="region" aria-label="Témoignages clients">
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <article 
                key={index}
                className={`testimonial-card ${index === currentSlide ? 'active' : ''} ${isVisible ? 'animate-scale-in' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="testimonial-quote-icon" aria-hidden="true">
                  <Quote className="quote-icon" />
                </div>
                
                <div className="testimonial-rating" role="img" aria-label={`${testimonial.rating} étoiles sur 5`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon filled" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="testimonial-content">
                  {testimonial.content}
                </blockquote>

                <footer className="testimonial-author">
                  <div className="testimonial-author-info">
                    <cite className="testimonial-name">{testimonial.name}</cite>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <p className="testimonial-project">{testimonial.project}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>

          <div className="testimonials-indicators" role="tablist" aria-label="Navigation témoignages">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
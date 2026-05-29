import React, { useEffect, useRef, useState } from 'react';
import { Award, Clock, TrendingUp } from 'lucide-react';
import './WhyChooseMe.css';

const WhyChooseMe = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounters();
        }
      },
      {
        threshold: 0.3,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startCounters = () => {
    const targets = { experience: 4, projects: 15, satisfaction: 100 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach(key => {
      const target = targets[key];
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    });
  };

  const advantages = [
    {
      icon: <Award size={48} />,
      number: counters.experience,
      suffix: "+ ans",
      title: "D'expérience",
      description: "Une expertise solide acquise sur de nombreux projets variés, des startups aux grandes entreprises.",
      color: "#007BFF"
    },
    {
      icon: <TrendingUp size={48} />,
      number: counters.projects,
      suffix: "+ projets",
      title: "Réalisés avec succès",
      description: "Des solutions web performantes qui ont aidé mes clients à atteindre leurs objectifs business.",
      color: "#E4B31A"
    },
    {
      icon: <Clock size={48} />,
      number: counters.satisfaction,
      suffix: "%",
      title: "De satisfaction client",
      description: "Réactif, à l'écoute et orienté résultats. Votre projet est ma priorité absolue.",
      color: "#007BFF"
    }
  ];

  return (
    <section 
      id="why-choose-me" 
      className={`why-choose-me ${isVisible ? 'animate' : ''}`}
      ref={sectionRef}
      aria-labelledby="advantages-title"
    >
      <div className="why-choose-me__container">
        <div className="why-choose-me__header">
          <h2 id="advantages-title" className="why-choose-me__title">
            Pourquoi me faire confiance ?
          </h2>
          <p className="why-choose-me__subtitle">
            Des résultats concrets et une approche personnalisée pour chaque projet
          </p>
        </div>
        
        <div className="why-choose-me__grid">
          {advantages.map((advantage, index) => (
            <article 
              key={index}
              className="why-choose-me__card"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                '--card-color': advantage.color
              }}
              tabIndex="0"
              role="article"
              aria-labelledby={`advantage-${index}-title`}
            >
              <div className="why-choose-me__card-icon" aria-hidden="true">
                {advantage.icon}
              </div>
              <div className="why-choose-me__card-number">
                <span className="why-choose-me__counter" aria-live="polite">
                  {advantage.number}
                </span>
                <span className="why-choose-me__suffix">{advantage.suffix}</span>
              </div>
              <div className="why-choose-me__card-content">
                <h3 id={`advantage-${index}-title`} className="why-choose-me__card-title">
                  {advantage.title}
                </h3>
                <p className="why-choose-me__card-description">
                  {advantage.description}
                </p>
              </div>
              <div className="why-choose-me__card-glow" aria-hidden="true"></div>
            </article>
          ))}
        </div>
        
        <div className="why-choose-me__testimonial">
          <blockquote className="why-choose-me__quote">
            <p className="why-choose-me__quote-text">
              "Chaque projet est une nouvelle opportunité de créer quelque chose d'exceptionnel. 
              Mon objectif : transformer vos idées en solutions web qui dépassent vos attentes."
            </p>
            <cite className="why-choose-me__quote-author">
              <strong>Rufus Akande</strong>
              <span>Développeur Web Freelance</span>
            </cite>
          </blockquote>
        </div>
      </div>
      
      <div className="why-choose-me__background-pattern" aria-hidden="true"></div>
    </section>
  );
};

export default WhyChooseMe;
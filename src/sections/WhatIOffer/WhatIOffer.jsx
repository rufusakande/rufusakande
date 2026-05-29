import React, { useEffect, useRef, useState } from 'react';
import { Monitor, ShoppingCart, Settings, Users } from 'lucide-react';
import './WhatIOffer.css';
import { Link } from 'react-router-dom';

const WhatIOffer = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Monitor size={48} />,
      title: "Sites vitrines & identités digitales",
      description: "Donnez à votre activité une vitrine moderne, visible et convaincante qui vous démarque de la concurrence.",
      delay: "0.1s"
    },
    {
      icon: <ShoppingCart size={48} />,
      title: "Sites e-commerce sur-mesure",
      description: "Vendez vos produits et services avec une plateforme fluide, sécurisée et évolutive qui convertit.",
      delay: "0.2s"
    },
    {
      icon: <Settings size={48} />,
      title: "Applications web personnalisées",
      description: "Gagnez du temps avec des outils pensés pour vos besoins réels et optimisés pour votre workflow.",
      delay: "0.3s"
    },
    {
      icon: <Users size={48} />,
      title: "Accompagnement & conseils",
      description: "Un partenaire technique fiable, à votre écoute, qui vous guide pas à pas vers le succès digital.",
      delay: "0.4s"
    }
  ];

  return (
    <section 
      id="what-i-offer" 
      className={`what-i-offer ${isVisible ? 'animate' : ''}`}
      ref={sectionRef}
      aria-labelledby="services-title"
    >
      <div className="what-i-offer__container">
        <div className="what-i-offer__header">
          <h2 id="services-title" className="what-i-offer__title">
            Ce que je vous propose
          </h2>
          <p className="what-i-offer__subtitle">
            Des solutions web complètes pour développer votre présence digitale et booster votre activité
          </p>
        </div>
        
        <div className="what-i-offer__grid">
          {services.map((service, index) => (
            <article 
              key={index}
              className="what-i-offer__card"
              style={{ animationDelay: service.delay }}
              tabIndex="0"
              role="article"
              aria-labelledby={`service-${index}-title`}
            >
              <div className="what-i-offer__card-icon" aria-hidden="true">
                {service.icon}
              </div>
              <div className="what-i-offer__card-content">
                <h3 id={`service-${index}-title`} className="what-i-offer__card-title">
                  {service.title}
                </h3>
                <p className="what-i-offer__card-description">
                  {service.description}
                </p>
              </div>
              <div className="what-i-offer__card-overlay" aria-hidden="true"></div>
            </article>
          ))}
        </div>
        
        <div className="what-i-offer__cta">
          <Link 
            to="/services" 
            className="what-i-offer__btn"
            aria-label="Voir tous mes services en détail"
          >
            Découvrir tous mes services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatIOffer;
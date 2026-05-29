import React, { useEffect, useRef, useState } from 'react';
import { 
  Monitor, 
  ShoppingCart, 
  Smartphone, 
  RotateCcw, 
  Users, 
  ArrowRight,
  CheckCircle,
  Zap,
  Palette,
  Code
} from 'lucide-react';
import './ServicesList.css';
import { Link } from 'react-router-dom';

const ServicesList = () => {
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId && !visibleCards.includes(cardId)) {
              setVisibleCards(prev => [...prev, cardId]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [visibleCards]);

  const services = [
    {
      id: 'vitrine',
      title: 'Sites Vitrines',
      subtitle: 'Création de site vitrine',
      description: 'Donnez à votre activité une vitrine moderne, visible et convaincante qui reflète votre expertise.',
      icon: Monitor,
      features: [
        'Design sur-mesure et responsive',
        'Optimisation SEO avancée',
        'Formulaires de contact intégrés',
        'Blog et gestion de contenu'
      ],
      color: '#0206b7',
      delay: '0s'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      subtitle: 'Création de boutique en ligne',
      description: 'Vendez vos produits/services avec une plateforme fluide, sécurisée et évolutive.',
      icon: ShoppingCart,
      features: [
        'Catalogue produits complet',
        'Paiement sécurisé intégré',
        'Gestion des stocks',
        'Tableau de bord marchand'
      ],
      color: '#059669',
      delay: '0.1s'
    },
    {
      id: 'webapp',
      title: 'Applications Web',
      subtitle: 'Développement d\'application web',
      description: 'Gagnez du temps avec des outils personnalisés pensés pour vos besoins réels.',
      icon: Smartphone,
      features: [
        'Interface utilisateur intuitive',
        'Fonctionnalités métier sur-mesure',
        'Base de données sécurisée',
        'API et intégrations'
      ],
      color: '#7c3aed',
      delay: '0.2s'
    },
    {
      id: 'refonte',
      title: 'Refonte de Site',
      subtitle: 'Refonte de site existant',
      description: 'Modernisez votre présence en ligne avec une refonte complète et performante.',
      icon: RotateCcw,
      features: [
        'Audit technique complet',
        'Migration sécurisée',
        'Amélioration des performances',
        'Nouvelle identité visuelle'
      ],
      color: '#dc2626',
      delay: '0.3s'
    },
    {
      id: 'conseil',
      title: 'Conseil & Accompagnement',
      subtitle: 'Accompagnement et consulting',
      description: 'Un partenaire technique fiable, à votre écoute, qui vous guide pas à pas.',
      icon: Users,
      features: [
        'Audit et conseils stratégiques',
        'Formation et accompagnement',
        'Maintenance et support',
        'Évolution et améliorations'
      ],
      color: '#ea580c',
      delay: '0.4s'
    }
  ];

  return (
    <section 
      id="ServicesList" 
      ref={sectionRef}
      className="services-list"
      role="main"
      aria-labelledby="services-list-title"
    >
      <div className="container">
        <div className="section-header">
          <h2 id="services-list-title" className="section-title">
            Mes Services
          </h2>
          <p className="section-subtitle">
            Des solutions complètes pour développer votre présence digitale
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`service-card ${visibleCards.includes(service.id) ? 'animate-in' : ''}`}
              data-card-id={service.id}
              style={{ animationDelay: service.delay }}
              role="article"
              aria-labelledby={`${service.id}-title`}
            >
              <div className="card-header">
                <div className="service-icon" style={{ backgroundColor: service.color }}>
                  <service.icon aria-hidden="true" />
                </div>
                <div className="service-badge">
                  <Zap className="badge-icon" aria-hidden="true" />
                  <span>Populaire</span>
                </div>
              </div>

              <div className="card-content">
                <h3 id={`${service.id}-title`} className="service-title">
                  {service.title}
                </h3>
                <p className="service-subtitle">
                  {service.subtitle}
                </p>
                <p className="service-description">
                  {service.description}
                </p>

                <ul className="features-list" role="list">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item" role="listitem">
                      <CheckCircle className="check-icon" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <Link 
                  to="/contact" 
                  className="cta-button"
                  aria-label={`Demander un devis pour ${service.title}`}
                >
                  <span>Demander un devis</span>
                  <ArrowRight className="arrow-icon" aria-hidden="true" />
                </Link>
              </div>

              <div className="card-decoration">
                <div className="decoration-element decoration-1"></div>
                <div className="decoration-element decoration-2"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <div className="additional-info">
            <div className="info-item">
              <Palette className="info-icon" aria-hidden="true" />
              <div className="info-content">
                <h4>Design Personnalisé</h4>
                <p>Chaque projet est unique et reflète votre identité</p>
              </div>
            </div>
            <div className="info-item">
              <Code className="info-icon" aria-hidden="true" />
              <div className="info-content">
                <h4>Code Optimisé</h4>
                <p>Performance et sécurité au cœur du développement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="background-patterns">
        <div className="pattern pattern-1"></div>
        <div className="pattern pattern-2"></div>
      </div>
    </section>
  );
};

export default ServicesList;
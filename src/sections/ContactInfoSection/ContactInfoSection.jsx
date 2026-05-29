import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  ExternalLink, 
  Copy, 
  Check,
  Globe,
  Star
} from 'lucide-react';
import './ContactInfoSection.css';

const ContactInfoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Intersection Observer pour l'animation au scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('akanderufus51@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      // Fallback pour les navigateurs qui ne supportent pas clipboard API
      console.log('Clipboard API non supportée');
    }
  };

  const contactMethods = [
    {
      type: 'email',
      label: 'Email professionnel',
      value: 'akanderufus51@gmail.com',
      href: 'mailto:akanderufus51@gmail.com',
      icon: Mail,
      description: 'Réponse garantie sous 24h',
      color: 'email',
      copyable: true
    },
    {
      type: 'location',
      label: 'Localisation',
      value: 'Parakou, Bénin',
      href: 'https://maps.google.com/?q=Parakou,+Benin',
      icon: MapPin,
      description: 'Disponible pour projets locaux & internationaux',
      color: 'location',
      copyable: false
    }
  ];

  const platforms = [
    {
      name: 'LinkedIn',
      description: 'Réseau professionnel',
      href: 'https://www.linkedin.com/in/rufus-akande-freelance-developpeur-web/',
      icon: Linkedin,
      color: 'linkedin',
      badge: 'Profil vérifié'
    },
    {
      name: 'Comeup',
      description: 'Marketplace française',
      href: 'https://comeup.com/fr/@akande-rufus',
      icon: Globe,
      color: 'comeup',
      badge: 'Nouveau vendeur'
    },
    {
      name: 'Upwork',
      description: 'Plateforme internationale',
      href: 'https://www.upwork.com/freelancers/~01f235722f1321a00d?mp_source=share',
      icon: Star,
      color: 'upwork',
      badge: '100% satisfaction'
    }
  ];

  return (
    <section 
      id="ContactInfoSection" 
      ref={sectionRef}
      className={`contact-info ${isVisible ? 'visible' : ''}`}
      role="region"
      aria-labelledby="contact-info-title"
    >
      <div className="container">
        {/* En-tête de section */}
        <div className="section-header">
          <h2 id="contact-info-title" className="section-title">
            Restons connectés
          </h2>
          <p className="section-subtitle">
            Choisissez le canal qui vous convient le mieux pour échanger
          </p>
        </div>

        {/* Informations de contact directes */}
        <div className="contact-methods">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div 
                key={method.type}
                className={`contact-method ${method.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="method-icon">
                  <IconComponent size={28} aria-hidden="true" />
                </div>
                
                <div className="method-content">
                  <div className="method-header">
                    <h3 className="method-label">{method.label}</h3>
                    <span className="method-description">{method.description}</span>
                  </div>
                  
                  <div className="method-value-wrapper">
                    <a 
                      href={method.href}
                      className="method-value"
                      target={method.type === 'location' ? '_blank' : '_self'}
                      rel={method.type === 'location' ? 'noopener noreferrer' : undefined}
                      aria-label={`${method.label}: ${method.value}`}
                    >
                      {method.value}
                      {method.type === 'location' && (
                        <ExternalLink size={16} className="external-icon" aria-hidden="true" />
                      )}
                    </a>
                    
                    {method.copyable && (
                      <button 
                        onClick={handleEmailCopy}
                        className="copy-button"
                        aria-label="Copier l'adresse email"
                        title="Copier l'email"
                      >
                        {copiedEmail ? (
                          <Check size={16} className="check-icon" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plateformes professionnelles */}
        <div className="platforms-section">
          <h3 className="platforms-title">
            Mes plateformes professionnelles
          </h3>
          
          <div className="platforms-grid">
            {platforms.map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`platform-card ${platform.color}`}
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                  aria-label={`Visiter mon profil ${platform.name} - ${platform.description}`}
                >
                  <div className="platform-header">
                    <div className="platform-icon">
                      <IconComponent size={24} aria-hidden="true" />
                    </div>
                    <div className="platform-badge">
                      {platform.badge}
                    </div>
                  </div>
                  
                  <div className="platform-content">
                    <h4 className="platform-name">{platform.name}</h4>
                    <p className="platform-description">{platform.description}</p>
                  </div>
                  
                  <div className="platform-action">
                    <span>Voir le profil</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Message de disponibilité */}
        <div className="availability-notice">
          <div className="availability-indicator">
            <div className="status-dot" aria-hidden="true"></div>
            <span className="status-text">Disponible pour nouveaux projets</span>
          </div>
          <p className="availability-text">
            Actuellement disponible pour de nouveaux projets. 
            N'hésitez pas à me contacter pour discuter de vos besoins !
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Code, 
  Users, 
  Target, 
  Lightbulb,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import './MonParcours.css';
import { Link } from 'react-router-dom';

const MonParcours = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeTab, setActiveTab] = useState('experience');
  const sectionRef = useRef(null);

  const experiences = [
    {
      id: 1,
      year: '2024-2026',
      title: 'Développeur Web Fullstack Freelance',
      company: 'Indépendant',
      location: 'Parakou, Bénin',
      description: 'Création de sites vitrines, e-commerce et applications web sur mesure pour entrepreneurs, ONG et professionnels.',
      achievements: [
        '15+ projets web réalisés avec succès',
        'Spécialisation React, Node.js, MySQL',
        'Accompagnement technique personnalisé',
        'Taux de satisfaction client : 100%'
      ],
      tech: ['React', 'Node.js', 'MySQL', 'Express', 'CSS']
    },
    {
      id: 2,
      year: '2022-2024',
      title: 'Développeur Frontend Junior',
      company: 'Indépendant',
      location: 'Parakou, Bénin',
      description: 'Développement d\'interfaces utilisateur modernes et responsive.',
      achievements: [
        'Maîtrise des frameworks JavaScript modernes',
        'Optimisation des performances web',
        'Collaboration en équipe agile',
        'Formation aux bonnes pratiques UX/UI'
      ],
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery']
    },
    {
      id: 3,
      year: '2021-2022',
      title: 'Développeur Web Junior',
      company: 'Rasipe ONG',
      location: 'Parakou, Bénin',
      description: 'Premiers pas dans le développement web professionnel, focus sur les technologies frontend.',
      achievements: [
        'Apprentissage des fondamentaux du web',
        'Développement de sites vitrines',
        'Formation aux outils de développement',
        'Bases de la gestion de projets'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress']
    }
  ];

  const formations = [
    {
      id: 1,
      year: '2025-2026',
      title: 'Formation en Création d\'Agent IA',
      institution: 'Autodidacte & Cours en ligne',
      location: 'Parakou, Bénin',
      description: 'Formation intensive en création d\'agents IA et développement web moderne.',
      skills: [
        'Intelligence Artificielle & Machine Learning',
        'Création d\'agents IA',
        'Développement Frontend & Backend',
        'Bases de données relationnelles',
        'Méthodologies de développement',
        'Gestion de projets web'
      ]
    },
    {
      id: 2,
      year: '2021-2025',
      title: 'Autoformation Continue',
      institution: 'Plateformes en ligne',
      location: 'À distance',
      description: 'Apprentissage autodidacte des technologies web modernes via des cours en ligne et projets personnels.',
      skills: [
        'JavaScript ES6+',
        'Frameworks modernes (React, Vue)',
        'APIs REST & GraphQL',
        'DevOps & Déploiement'
      ]
    }
  ];

  const valeurs = [
    {
      icon: <Target size={24} />,
      title: 'Orienté Résultats',
      description: 'Chaque projet est conçu pour atteindre vos objectifs business et convertir vos visiteurs en clients.'
    },
    {
      icon: <Users size={24} />,
      title: 'À l\'Écoute',
      description: 'Je prends le temps de comprendre vos besoins pour créer des solutions qui vous ressemblent.'
    },
    {
      icon: <Lightbulb size={24} />,
      title: 'Innovation',
      description: 'J\'utilise les dernières technologies pour vous offrir des solutions modernes et performantes.'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Qualité',
      description: 'Code propre, performances optimisées et respect des standards web pour un résultat professionnel.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-item-id');
            if (itemId) {
              setVisibleItems(prev => new Set([...prev, itemId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const items = sectionRef.current?.querySelectorAll('[data-item-id]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const isVisible = (itemId) => visibleItems.has(itemId);

  return (
    <section id="MonParcours" ref={sectionRef} role="region" aria-labelledby="parcours-title">
      <div className="container">
        {/* En-tête de section */}
        <div className="section-header" data-item-id="header">
          <div className={`badge ${isVisible('header') ? 'visible' : ''}`}>
            <GraduationCap size={16} aria-hidden="true" />
            <span>Mon Histoire</span>
          </div>
          
          <h2 id="parcours-title" className={`section-title ${isVisible('header') ? 'visible' : ''}`}>
            Un parcours dédié à l'<span className="highlight">excellence</span> digitale
          </h2>
          
          <p className={`section-subtitle ${isVisible('header') ? 'visible' : ''}`}>
            Découvrez mon évolution professionnelle, mes formations et les valeurs qui guident mon travail au quotidien.
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="tabs-navigation" data-item-id="tabs">
          <div className={`tabs-container ${isVisible('tabs') ? 'visible' : ''}`}>
            <button
              className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
              aria-pressed={activeTab === 'experience'}
            >
              <Briefcase size={20} aria-hidden="true" />
              <span>Expérience</span>
            </button>
            <button
              className={`tab-button ${activeTab === 'formation' ? 'active' : ''}`}
              onClick={() => setActiveTab('formation')}
              aria-pressed={activeTab === 'formation'}
            >
              <GraduationCap size={20} aria-hidden="true" />
              <span>Formation</span>
            </button>
            <button
              className={`tab-button ${activeTab === 'valeurs' ? 'active' : ''}`}
              onClick={() => setActiveTab('valeurs')}
              aria-pressed={activeTab === 'valeurs'}
            >
              <Target size={20} aria-hidden="true" />
              <span>Valeurs</span>
            </button>
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="tabs-content">
          {/* Onglet Expérience */}
          {activeTab === 'experience' && (
            <div className="timeline-container" role="tabpanel" aria-labelledby="experience-tab">
              <div className="timeline">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`timeline-item ${isVisible(`exp-${exp.id}`) ? 'visible' : ''}`}
                    data-item-id={`exp-${exp.id}`}
                  >
                    <div className="timeline-marker">
                      <div className="timeline-dot">
                        <Briefcase size={16} aria-hidden="true" />
                      </div>
                      <div className="timeline-line" aria-hidden="true"></div>
                    </div>
                    
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <div className="timeline-meta">
                          <span className="timeline-year">
                            <Calendar size={14} aria-hidden="true" />
                            {exp.year}
                          </span>
                          <span className="timeline-location">
                            <MapPin size={14} aria-hidden="true" />
                            {exp.location}
                          </span>
                        </div>
                        <h3 className="timeline-title">{exp.title}</h3>
                        <p className="timeline-company">{exp.company}</p>
                      </div>
                      
                      <p className="timeline-description">{exp.description}</p>
                      
                      <div className="timeline-achievements">
                        <h4>Réalisations clés :</h4>
                        <ul>
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>
                              <CheckCircle size={16} aria-hidden="true" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="timeline-tech">
                        <span className="tech-label">Technologies :</span>
                        <div className="tech-tags">
                          {exp.tech.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onglet Formation */}
          {activeTab === 'formation' && (
            <div className="formation-container" role="tabpanel" aria-labelledby="formation-tab">
              <div className="formation-grid">
                {formations.map((formation) => (
                  <div
                    key={formation.id}
                    className={`formation-card ${isVisible(`form-${formation.id}`) ? 'visible' : ''}`}
                    data-item-id={`form-${formation.id}`}
                  >
                    <div className="formation-header">
                      <div className="formation-icon">
                        <GraduationCap size={32} aria-hidden="true" />
                      </div>
                      <div className="formation-meta">
                        <span className="formation-year">{formation.year}</span>
                        <span className="formation-location">{formation.location}</span>
                      </div>
                    </div>
                    
                    <h3 className="formation-title">{formation.title}</h3>
                    <p className="formation-institution">{formation.institution}</p>
                    <p className="formation-description">{formation.description}</p>
                    
                    <div className="formation-skills">
                      <h4>Compétences acquises :</h4>
                      <div className="skills-list">
                        {formation.skills.map((skill, idx) => (
                          <span key={idx} className="skill-badge">
                            <Code size={14} aria-hidden="true" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onglet Valeurs */}
          {activeTab === 'valeurs' && (
            <div className="valeurs-container" role="tabpanel" aria-labelledby="valeurs-tab">
              <div className="valeurs-grid">
                {valeurs.map((valeur, index) => (
                  <div
                    key={index}
                    className={`valeur-card ${isVisible(`val-${index}`) ? 'visible' : ''}`}
                    data-item-id={`val-${index}`}
                  >
                    <div className="valeur-icon">
                      {valeur.icon}
                    </div>
                    <h3 className="valeur-title">{valeur.title}</h3>
                    <p className="valeur-description">{valeur.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA de fin de section */}
        <div className="section-cta" data-item-id="cta">
          <div className={`cta-content ${isVisible('cta') ? 'visible' : ''}`}>
            <h3 className="cta-title">
              Prêt à donner vie à votre projet ?
            </h3>
            <p className="cta-description">
              Forte de cette expérience, je suis prêt à mettre mes compétences au service de votre réussite digitale.
            </p>
            <div className="cta-buttons">
              <Link to="https://wa.me/22951080983" target="_blank" className="btn-primary">
                Démarrons ensemble
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link to="/realisations" className="btn-secondary">
                Voir mes réalisations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonParcours;
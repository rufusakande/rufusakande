import { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Lightbulb,
  FileEdit,
  Code,
  Rocket
} from 'lucide-react';
import './WorkProcess.css';

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

// Composant WorkProcess
const WorkProcess = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const processSteps = [
    {
      icon: <MessageSquare className="process-icon" />,
      title: "Prise de contact",
      description: "Échangeons sur vos besoins, vos objectifs et votre vision pour comprendre parfaitement votre projet."
    },
    {
      icon: <Lightbulb className="process-icon" />,
      title: "Compréhension du besoin",
      description: "Analyse approfondie de vos exigences techniques et business pour définir la meilleure stratégie."
    },
    {
      icon: <FileEdit className="process-icon" />,
      title: "Proposition sur mesure",
      description: "Présentation d'une solution personnalisée avec devis détaillé et planning de réalisation."
    },
    {
      icon: <Code className="process-icon" />,
      title: "Développement",
      description: "Création de votre site avec des points réguliers pour valider chaque étape ensemble."
    },
    {
      icon: <Rocket className="process-icon" />,
      title: "Livraison & accompagnement",
      description: "Mise en ligne, formation et support technique pour assurer votre autonomie totale."
    }
  ];

  return (
    <section id="work-process" className="work-process-section" ref={ref} aria-labelledby="process-title">
      <div className="work-process-container">
        <header className="work-process-header">
          <h2 id="process-title" className={`work-process-title ${isVisible ? 'animate-fade-in' : ''}`}>
            Comment je travaille avec vous
          </h2>
          <p className={`work-process-subtitle ${isVisible ? 'animate-fade-in-delay' : ''}`}>
            Un processus transparent et structuré pour transformer vos idées en réalité digitale
          </p>
        </header>

        <div className="work-process-steps" role="list">
          {processSteps.map((step, index) => (
            <article 
              key={index}
              className={`work-process-step ${isVisible ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
            >
              <div className="work-process-step-number" aria-hidden="true">
                {index + 1}
              </div>
              <div className="work-process-step-icon" aria-hidden="true">
                {step.icon}
              </div>
              <div className="work-process-step-content">
                <h3 className="work-process-step-title">{step.title}</h3>
                <p className="work-process-step-description">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
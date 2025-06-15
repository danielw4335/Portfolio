import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../data/translations'
import { useState, useEffect, useRef } from 'react'

const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '50px'
      }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);const skills = Object.values(t.about.skills);

  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <h3>{t.about.title}</h3>        {t.about.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        
        <div className="experience-section">
          <h4>{t.about.experience.title}</h4>
          {t.about.experience.items.map((item, index) => (
            <div key={index} className="experience-item">
              <h5>{item.title}</h5>
              <span className="date">{item.period}</span>
              {item.description && <p className="course-description">{item.description}</p>}
            </div>
          ))}        </div>
        <div className="skills-section" ref={skillsRef}>
          <h4>{language === 'he' ? 'כישורים וטכנולוגיות' : 'Skills & Technologies'}</h4>
          <div className={`skills-grid ${isVisible ? 'animate-in' : ''}`}>
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <h4>{skill.title}</h4>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

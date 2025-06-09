import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../data/translations'
import profileImg from '../../assets/svg/profile.png'
import { useState, useEffect } from 'react'

const HeroSection = ({ onViewProjects }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'CSS3'];
  const [currentSkill, setCurrentSkill] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [skills.length]);
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="floating-elements">
          <div className="floating-icon">💻</div>
          <div className="floating-icon">🚀</div>
          <div className="floating-icon">⚡</div>
          <div className="floating-icon">🎯</div>
        </div>
      </div>
      
      <div className="hero-content">
        <div className={`hero-text ${isVisible ? 'animate-in' : ''}`}>
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>{language === 'he' ? 'מפתח Full Stack' : 'Full Stack Developer'}</span>
          </div>
          
          <h1 className="hero-title">
            {language === 'he' ? 'שלום, אני ' : 'Hello, I\'m '}
            <span className="gradient-text">Daniel Wallache</span>
          </h1>
          
          <h2 className="hero-subtitle">
            {language === 'he' ? 'בונה אפליקציות עם ' : 'Building applications with '}
            <span className="skill-rotator">{skills[currentSkill]}</span>
          </h2>
            <p className="hero-description">{t.heroDescription}</p>
          
          <div className="hero-buttons">
            <button className="btn-primary hero-cta" onClick={onViewProjects}>
              <span className="btn-text">{t.viewMyWork}</span>
              <span className="btn-icon">🚀</span>
            </button>
            <a href="#contact" className="btn-secondary hero-contact">
              <span className="btn-text">{t.contactMe}</span>
              <span className="btn-icon">💬</span>
            </a>
          </div>
        </div>
        
        <div className={`hero-image ${isVisible ? 'animate-in' : ''}`}>
          <div className="profile-container">
            <div className="profile-background"></div>
            <div className="profile-image">
              <img src={profileImg} alt="Daniel Wallache" />
            </div>
            <div className="tech-orbits">
              <div className="orbit orbit-1">
                <div className="tech-icon">⚛️</div>
              </div>
              <div className="orbit orbit-2">
                <div className="tech-icon">🟢</div>
              </div>
              <div className="orbit orbit-3">
                <div className="tech-icon">🍃</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

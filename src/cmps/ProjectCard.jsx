import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

const ProjectCard = ({ project }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const { title, description, image, technologies, demoLink, codeLink, codeLinks, featured } = project;

  return (
    <div className={`project-card ${featured ? 'featured' : ''}`}>
      <div className="project-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="project-overlay">
          <div className="project-actions">
            <a 
              href={demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link primary"
              title={t.projects.cta.demo}
            >
              <span className="link-icon">🚀</span>
              <span className="link-text">{t.projects.cta.demo}</span>
            </a>
            {codeLinks ? (
              <div className="code-links">
                <a 
                  href={codeLinks.frontend} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link secondary"
                  title={`${t.projects.cta.code} - ${t.projects.cta.frontend}`}
                >
                  <span className="link-icon">💻</span>
                  <span className="link-text">{t.projects.cta.frontend}</span>
                </a>
                <a 
                  href={codeLinks.backend} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link secondary"
                  title={`${t.projects.cta.code} - ${t.projects.cta.backend}`}
                >
                  <span className="link-icon">⚙️</span>
                  <span className="link-text">{t.projects.cta.backend}</span>
                </a>
              </div>
            ) : (
              <a 
                href={codeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link secondary"
                title={t.projects.cta.code}
              >
                <span className="link-icon">📝</span>
                <span className="link-text">{t.projects.cta.code}</span>
              </a>
            )}
          </div>
        </div>
        {featured && <div className="featured-badge">{language === 'he' ? 'מובלט' : 'Featured'}</div>}
      </div>
        <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        
        <div className="tech-stack">
          {technologies.map((technology, index) => (
            <span key={index} className="tech-tag">
              {technology}
            </span>
          ))}
        </div>
        
        <div className="project-footer">
          <div className="project-links-inline">
            <a 
              href={demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link-small primary"
            >
              {t.projects.cta.demo}
            </a>
            {codeLinks ? (
              <>
                <a 
                  href={codeLinks.frontend} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link-small secondary"
                >
                  Frontend
                </a>
                <a 
                  href={codeLinks.backend} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link-small secondary"
                >
                  Backend
                </a>
              </>
            ) : (
              <a 
                href={codeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link-small secondary"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
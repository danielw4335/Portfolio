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
              title={t.viewDemo}
            >
              <span className="link-icon">🚀</span>
              <span className="link-text">{t.viewDemo}</span>
            </a>
            {codeLinks ? (
              <div className="code-links">
                <a 
                  href={codeLinks.frontend} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link secondary"
                  title={`${t.viewCode} - ${t.viewFrontend}`}
                >
                  <span className="link-icon">💻</span>
                  <span className="link-text">{t.viewFrontend}</span>
                </a>
                <a 
                  href={codeLinks.backend} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link secondary"
                  title={`${t.viewCode} - ${t.viewBackend}`}
                >
                  <span className="link-icon">⚙️</span>
                  <span className="link-text">{t.viewBackend}</span>
                </a>
              </div>
            ) : (
              <a 
                href={codeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link secondary"
                title={t.viewCode}
              >
                <span className="link-icon">📝</span>
                <span className="link-text">{t.viewCode}</span>
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
              {t.viewDemo}
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
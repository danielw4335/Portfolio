import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="main-footer">
      <div className="footer-content">        <div className="footer-section">
          <h4>{t.footer.title}</h4>
          <p>{t.footer.description}</p>
          <p>Negohot | 058-7621874</p>
        </div>
        
        <div className="footer-section">
          <h4>{t.footer.quickLinks}</h4>
          <ul>
            <li><a href="/">{t.nav.home}</a></li>
            <li><a href="/projects">{t.nav.projects}</a></li>
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#contact">{t.nav.contact}</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>{t.footer.socialNetworks}</h4>
          <div className="social-links">
            <a href="https://github.com/danielw4335" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/daniel-wallache/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:daniel.wallache@gmail.com">
              Email
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Daniel Wallache. {t.footer.allRightsReserved}.</p>
      </div>
    </footer>
  );
}

export default Footer;
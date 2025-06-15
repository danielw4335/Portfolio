import { Link } from 'react-router-dom'
import { useLanguage, useTheme } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { useState } from 'react'
import hamburgerIcon from '../assets/svg/icon-hamburger.svg';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationItems = [
    { path: '/', label: t.nav.home },
    { path: '/projects', label: t.nav.projects },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact }
  ];

  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h2>Daniel Wallache</h2>
        </Link>        <button
          className="menu-toggle"
          aria-label={menuOpen ? t.nav.closeMenu || 'Close menu' : t.nav.openMenu || 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img src={hamburgerIcon} alt="menu" style={{width: 28, height: 28}} />
        </button>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`}>
          {navigationItems.map((item, index) => (
            item.path ? (
              <Link key={index} to={item.path} className="nav-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <a key={index} href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            )
          ))}
          <button 
            className="language-toggle"
            onClick={toggleLanguage}
            title={language === 'en' ? 'Switch to Hebrew' : 'עבור לאנגלית'}
          >
            {language === 'en' ? 'עב' : 'EN'}
          </button>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? t.theme.switchToDark : t.theme.switchToLight}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link to="/admin" className="admin-link" title="Admin Login" onClick={() => setMenuOpen(false)}>
            🔐
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
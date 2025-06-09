import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const AdminPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects'); // projects, content, personal
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // טופס הוספת פרויקט
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    demoLink: '',
    frontendLink: '',
    backendLink: '',
    featured: false
  });
  // נתונים אישיים לעריכה
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Daniel Wallache',
    title: 'Full-Stack Developer',
    description: 'I create modern applications and websites with the latest technologies. Experienced in React, Node.js, and other advanced technologies.',
    email: 'danielw4335@gmail.com',
    phone: '+972-50-123-4567',
    linkedin: 'https://linkedin.com/in/daniel-wallache',
    github: 'https://github.com/danielw4335',
    location: 'Israel'
  });
  // תוכן כללי לעריכה
  const [siteContent, setSiteContent] = useState({
    heroTitle: 'Hello, I\'m Daniel Wallache',
    heroSubtitle: 'Full-Stack Developer',
    heroDescription: 'I create modern applications and websites with the latest technologies. Experienced in React, Node.js, and other advanced technologies.',
    aboutText: 'I\'m Daniel Wallache, a Full-Stack developer with hands-on experience in React, Vue, and Node.js. I specialize in designing, developing, and implementing modern end-to-end web solutions, including both frontend and backend development. Graduate of the Full Stack Development program at Coding Academy Israel.',
    skillsIntro: 'Full Stack Development Graduate - Coding Academy Israel. Intensive 640-hour Full Stack development program covering JavaScript, HTML5/CSS3, React, Vue.js, Node.js, MongoDB, REST APIs, WebSockets, Git, and modern development practices.'
  });
  useEffect(() => {
    // בדוק אם המשתמש כבר מחובר
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    // טען פרויקטים מה-localStorage
    const savedProjects = localStorage.getItem('adminProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    // טען נתונים אישיים
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    if (savedPersonalInfo) {
      setPersonalInfo(JSON.parse(savedPersonalInfo));
    }

    // טען תוכן האתר
    const savedSiteContent = localStorage.getItem('siteContent');
    if (savedSiteContent) {
      setSiteContent(JSON.parse(savedSiteContent));
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // סימולציה של זמן טעינה
    setTimeout(() => {
      if (password === '6543355') {
        setIsLoggedIn(true);
        localStorage.setItem('adminLoggedIn', 'true');
        setPassword('');
        showNotification(language === 'he' ? 'התחברת בהצלחה!' : 'Login successful!', 'success');
      } else {
        showNotification(language === 'he' ? 'סיסמה שגויה' : 'Wrong password', 'error');
      }
      setIsLoading(false);
    }, 1000);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };
  const handleAddProject = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // סימולציה של זמן עיבוד
    setTimeout(() => {
      try {
        const project = {
          id: Date.now(),
          title: newProject.title,
          description: newProject.description,
          image: newProject.image || 'https://via.placeholder.com/400x250/4F46E5/ffffff?text=Project',
          technologies: newProject.technologies.split(',').map(tech => tech.trim()),
          demoLink: newProject.demoLink,
          codeLinks: {
            frontend: newProject.frontendLink,
            backend: newProject.backendLink
          },
          featured: newProject.featured
        };

        const updatedProjects = [...projects, project];
        setProjects(updatedProjects);
        localStorage.setItem('adminProjects', JSON.stringify(updatedProjects));
        
        // איפוס הטופס
        setNewProject({
          title: '',
          description: '',
          image: '',
          technologies: '',
          demoLink: '',
          frontendLink: '',
          backendLink: '',
          featured: false
        });
        
        setShowAddProject(false);
        showNotification(language === 'he' ? '✅ פרויקט נוסף בהצלחה!' : '✅ Project added successfully!', 'success');
      } catch (error) {
        showNotification(language === 'he' ? '❌ שגיאה בהוספת הפרויקט' : '❌ Error adding project', 'error');
      }
      setIsLoading(false);
    }, 800);
  };
  const handleDeleteProject = (projectId) => {
    if (window.confirm(language === 'he' ? 'האם אתה בטוח שברצונך למחוק את הפרויקט?' : 'Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      localStorage.setItem('adminProjects', JSON.stringify(updatedProjects));
      showNotification(language === 'he' ? '🗑️ פרויקט נמחק בהצלחה!' : '🗑️ Project deleted successfully!', 'success');
    }
  };

  const handleSavePersonalInfo = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
      showNotification(language === 'he' ? '💾 פרטים אישיים נשמרו!' : '💾 Personal info saved!', 'success');
      setIsLoading(false);
    }, 500);
  };

  const handleSaveSiteContent = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('siteContent', JSON.stringify(siteContent));
      showNotification(language === 'he' ? '💾 תוכן האתר נשמר!' : '💾 Site content saved!', 'success');
      setIsLoading(false);
    }, 500);
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <h1>{language === 'he' ? 'כניסת מנהל' : 'Admin Login'}</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>{language === 'he' ? 'סיסמה:' : 'Password:'}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'he' ? 'הכנס סיסמה' : 'Enter password'}
                required
              />
            </div>            <button type="submit" className={`btn-primary ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? '' : (language === 'he' ? 'התחבר' : 'Login')}
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>{language === 'he' ? 'פאנל ניהול' : 'Admin Panel'}</h1>
        <div className="admin-actions">
          <button className="btn-secondary" onClick={handleLogout}>
            {language === 'he' ? 'התנתק' : 'Logout'} 🚪
          </button>
        </div>
      </div>

      {/* טאבים */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          📁 {language === 'he' ? 'פרויקטים' : 'Projects'}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          👤 {language === 'he' ? 'פרטים אישיים' : 'Personal Info'}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          📝 {language === 'he' ? 'תוכן האתר' : 'Site Content'}
        </button>
      </div>

      {/* תוכן הטאבים */}
      {activeTab === 'projects' && (
        <div className="admin-content">
          <div className="section-header">
            <h2>{language === 'he' ? 'ניהול פרויקטים' : 'Project Management'}</h2>
            <button 
              className="btn-primary"
              onClick={() => setShowAddProject(!showAddProject)}
            >
              {showAddProject ? '❌ ' : '➕ '}
              {showAddProject 
                ? (language === 'he' ? 'ביטול' : 'Cancel')
                : (language === 'he' ? 'הוסף פרויקט' : 'Add Project')
              }
            </button>
          </div>

          {/* טופס הוספת פרויקט */}
          {showAddProject && (
            <div className="add-project-form">
              <h3>📝 {language === 'he' ? 'פרויקט חדש' : 'New Project'}</h3>
              <form onSubmit={handleAddProject}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>📝 {language === 'he' ? 'שם הפרויקט' : 'Project Title'}</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      placeholder={language === 'he' ? 'הכנס שם פרויקט' : 'Enter project title'}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>🖼️ {language === 'he' ? 'קישור לתמונה' : 'Image URL'}</label>
                    <input
                      type="url"
                      value={newProject.image}
                      onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                    {newProject.image && (
                      <div className="image-preview">
                        <img src={newProject.image} alt="Preview" />
                      </div>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label>📄 {language === 'he' ? 'תיאור הפרויקט' : 'Project Description'}</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder={language === 'he' ? 'תאר את הפרויקט' : 'Describe the project'}
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>⚙️ {language === 'he' ? 'טכנולוגיות' : 'Technologies'}</label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                      placeholder="React, Node.js, MongoDB"
                      required
                    />
                    <small>{language === 'he' ? 'הפרד בפסיקים' : 'Separate with commas'}</small>
                  </div>

                  <div className="form-group">
                    <label>🚀 {language === 'he' ? 'קישור הדמו' : 'Demo Link'}</label>
                    <input
                      type="url"
                      value={newProject.demoLink}
                      onChange={(e) => setNewProject({...newProject, demoLink: e.target.value})}
                      placeholder="https://project-demo.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>💻 {language === 'he' ? 'קוד Frontend' : 'Frontend Code'}</label>
                    <input
                      type="url"
                      value={newProject.frontendLink}
                      onChange={(e) => setNewProject({...newProject, frontendLink: e.target.value})}
                      placeholder="https://github.com/username/frontend"
                    />
                  </div>

                  <div className="form-group">
                    <label>⚡ {language === 'he' ? 'קוד Backend' : 'Backend Code'}</label>
                    <input
                      type="url"
                      value={newProject.backendLink}
                      onChange={(e) => setNewProject({...newProject, backendLink: e.target.value})}
                      placeholder="https://github.com/username/backend"
                    />
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newProject.featured}
                        onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                      />
                      ⭐ {language === 'he' ? 'פרויקט מומלץ' : 'Featured Project'}
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className={`btn-primary ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? '' : `💾 ${language === 'he' ? 'שמור פרויקט' : 'Save Project'}`}
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowAddProject(false)}
                  >
                    ❌ {language === 'he' ? 'ביטול' : 'Cancel'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* רשימת פרויקטים */}
          <div className="projects-list">
            <h3>📂 {language === 'he' ? 'פרויקטים קיימים' : 'Existing Projects'}</h3>
            {projects.length === 0 ? (
              <p className="no-projects">{language === 'he' ? 'אין פרויקטים' : 'No projects yet'}</p>
            ) : (
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project.id} className="project-item">
                    <div className="project-preview">
                      <img src={project.image} alt={project.title} />
                      <div className="project-overlay">
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <div className="project-actions">
                          <button 
                            className="btn-danger"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            🗑️ {language === 'he' ? 'מחק' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* טאב פרטים אישיים */}
      {activeTab === 'personal' && (
        <div className="admin-content">
          <div className="section-header">
            <h2>👤 {language === 'he' ? 'פרטים אישיים' : 'Personal Information'}</h2>
          </div>
          <div className="personal-form">
            <div className="form-grid">
              <div className="form-group">
                <label>👤 {language === 'he' ? 'שם מלא' : 'Full Name'}</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                  placeholder={language === 'he' ? 'השם המלא שלך' : 'Your full name'}
                />
              </div>

              <div className="form-group">
                <label>💼 {language === 'he' ? 'תפקיד' : 'Job Title'}</label>
                <input
                  type="text"
                  value={personalInfo.title}
                  onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                  placeholder={language === 'he' ? 'התפקיד שלך' : 'Your job title'}
                />
              </div>

              <div className="form-group">
                <label>📧 {language === 'he' ? 'אימייל' : 'Email'}</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label>📱 {language === 'he' ? 'טלפון' : 'Phone'}</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                  placeholder="+972-50-123-4567"
                />
              </div>              <div className="form-group">
                <label>📍 {language === 'he' ? 'מיקום' : 'Location'}</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                  placeholder={language === 'he' ? 'המיקום שלך' : 'Your location'}
                />
              </div>

              <div className="form-group">
                <label>💼 {language === 'he' ? 'לינקדאין' : 'LinkedIn'}</label>
                <input
                  type="url"
                  value={personalInfo.linkedin}
                  onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="form-group">
                <label>💻 {language === 'he' ? 'גיטהאב' : 'GitHub'}</label>
                <input
                  type="url"
                  value={personalInfo.github}
                  onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                  placeholder="https://github.com/username"
                />
              </div><div className="form-group full-width">
                <label>📝 {language === 'he' ? 'תיאור מקצועי' : 'Professional Description'}</label>
                <textarea
                  value={personalInfo.description}
                  onChange={(e) => setPersonalInfo({...personalInfo, description: e.target.value})}
                  placeholder={language === 'he' ? 'תאר את עצמך מקצועית...' : 'Describe yourself professionally...'}
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                className={`btn-primary ${isLoading ? 'loading' : ''}`}
                onClick={handleSavePersonalInfo}
                disabled={isLoading}
              >
                {isLoading ? '' : `💾 ${language === 'he' ? 'שמור שינויים' : 'Save Changes'}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* טאב תוכן האתר */}
      {activeTab === 'content' && (
        <div className="admin-content">
          <div className="section-header">
            <h2>📝 {language === 'he' ? 'תוכן האתר' : 'Site Content'}</h2>
          </div>
          <div className="content-form">
            <div className="form-grid">
              <div className="form-group">
                <label>🏠 {language === 'he' ? 'כותרת ראשית' : 'Hero Title'}</label>
                <input
                  type="text"
                  value={siteContent.heroTitle}
                  onChange={(e) => setSiteContent({...siteContent, heroTitle: e.target.value})}
                  placeholder={language === 'he' ? 'הכותרת הראשית' : 'Main hero title'}
                />
              </div>              <div className="form-group">
                <label>🎯 {language === 'he' ? 'תת כותרת' : 'Hero Subtitle'}</label>
                <input
                  type="text"
                  value={siteContent.heroSubtitle}
                  onChange={(e) => setSiteContent({...siteContent, heroSubtitle: e.target.value})}
                  placeholder={language === 'he' ? 'תת הכותרת' : 'Hero subtitle'}
                />
              </div>

              <div className="form-group full-width">
                <label>📝 {language === 'he' ? 'תיאור בעמוד הבית' : 'Hero Description'}</label>
                <textarea
                  value={siteContent.heroDescription}
                  onChange={(e) => setSiteContent({...siteContent, heroDescription: e.target.value})}
                  placeholder={language === 'he' ? 'התיאור בחלק הבית' : 'Hero section description'}
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label>ℹ️ {language === 'he' ? 'טקסט אודות' : 'About Text'}</label>
                <textarea
                  value={siteContent.aboutText}
                  onChange={(e) => setSiteContent({...siteContent, aboutText: e.target.value})}
                  placeholder={language === 'he' ? 'הטקסט בחלק אודות' : 'About section text'}
                  rows="4"
                />
              </div>

              <div className="form-group full-width">
                <label>🛠️ {language === 'he' ? 'הקדמה לכישורים' : 'Skills Introduction'}</label>
                <textarea
                  value={siteContent.skillsIntro}
                  onChange={(e) => setSiteContent({...siteContent, skillsIntro: e.target.value})}
                  placeholder={language === 'he' ? 'הקדמה לחלק הכישורים' : 'Skills section introduction'}
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                className={`btn-primary ${isLoading ? 'loading' : ''}`}
                onClick={handleSaveSiteContent}
                disabled={isLoading}
              >
                {isLoading ? '' : `💾 ${language === 'he' ? 'שמור תוכן' : 'Save Content'}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* התראות */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>✖</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

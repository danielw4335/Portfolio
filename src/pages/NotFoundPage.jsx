import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useState, useEffect } from 'react'

const NotFoundPage = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  const content = {
    en: {
      title: "404",
      subtitle: "Oops! Page not found",
      description: "The page you're looking for seems to have taken a coffee break. Let's get you back on track!",
      homeButton: "Back to Home",
      projectsButton: "View Projects",
      contactButton: "Get in Touch"
    },
    he: {
      title: "404",
      subtitle: "אופס! הדף לא נמצא",
      description: "נראה שהדף שאתה מחפש יצא להפסקת קפה. בואו נחזיר אותך למסלול!",
      homeButton: "חזרה לעמוד הראשי",
      projectsButton: "צפה בפרויקטים",
      contactButton: "צור קשר"
    }
  }

  const handleGoHome = () => navigate('/')
  const handleGoProjects = () => navigate('/projects')
  const handleContact = () => navigate('/#contact')

  return (
    <div className="not-found-page">
      {/* Animated Background */}
      <div className="bg-animation">
        <div 
          className="floating-shape shape-1"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
        <div 
          className="floating-shape shape-2"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.8}px)`
          }}
        />
        <div 
          className="floating-shape shape-3"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * -0.4}px)`
          }}
        />
      </div>

      <div className="container">
        <div className={`not-found-content ${isAnimating ? 'animate-in' : ''}`}>
          {/* 404 Title with glitch effect */}
          <div className="error-number">
            <h1 className="glitch-text" data-text="404">
              {content[language].title}
            </h1>
          </div>

          {/* Robot/Character Animation */}
          <div className="error-character">
            <div className="robot">
              <div className="robot-head">
                <div className="robot-eyes">
                  <div className="eye left-eye"></div>
                  <div className="eye right-eye"></div>
                </div>
                <div className="robot-mouth"></div>
              </div>
              <div className="robot-body">
                <div className="robot-screen">
                  <div className="screen-lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="error-text">
            <h2 className="error-subtitle">{content[language].subtitle}</h2>
            <p className="error-description">{content[language].description}</p>
          </div>

          <div className="error-actions">
            <button 
              onClick={handleGoHome}
              className="action-btn primary"
            >
              <span className="btn-text">{content[language].homeButton}</span>
              <div className="btn-glow"></div>
            </button>
            
            <button 
              onClick={handleGoProjects}
              className="action-btn secondary"
            >
              <span className="btn-text">{content[language].projectsButton}</span>
              <div className="btn-glow"></div>
            </button>
            
            <button 
              onClick={handleContact}
              className="action-btn tertiary"
            >
              <span className="btn-text">{content[language].contactButton}</span>
              <div className="btn-glow"></div>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="decorative-elements">
            <div className="code-snippets">
              <div className="code-line">{'<div className="lost">'}</div>
              <div className="code-line">{'  // Page not found'}</div>
              <div className="code-line">{'</div>'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Effect */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default NotFoundPage

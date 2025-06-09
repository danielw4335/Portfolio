import { useLanguage } from '../../contexts/LanguageContext'
import { useState, useEffect, useRef } from 'react'

const SkillsSection = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skills = {
    en: {
      frontend: {
        title: "Frontend Development",
        description: "Creating beautiful, responsive, and interactive user interfaces",
        skills: [
          { name: "React", level: 95, icon: "⚛️", color: "#61DAFB" },
          { name: "Vue.js", level: 90, icon: "🖖", color: "#4FC08D" },
          { name: "TypeScript", level: 92, icon: "📝", color: "#3178C6" },
          { name: "Next.js", level: 88, icon: "▲", color: "#000000" },
          { name: "CSS/SCSS", level: 96, icon: "🎨", color: "#1572B6" },
          { name: "Tailwind", level: 90, icon: "🎨", color: "#06B6D4" }
        ]
      },
      backend: {
        title: "Backend Development",
        description: "Building robust, scalable server-side applications and APIs",
        skills: [
          { name: "Node.js", level: 94, icon: "🟢", color: "#339933" },
          { name: "Express.js", level: 92, icon: "🚀", color: "#000000" },
          { name: "MongoDB", level: 90, icon: "🍃", color: "#47A248" },
          { name: "PostgreSQL", level: 85, icon: "🐘", color: "#336791" },
          { name: "Redis", level: 80, icon: "🔴", color: "#DC382D" },
          { name: "GraphQL", level: 78, icon: "🕸️", color: "#E10098" }
        ]
      },
      tools: {
        title: "Tools & DevOps",
        description: "Modern development workflow and deployment solutions",
        skills: [
          { name: "Git", level: 95, icon: "🌿", color: "#F05032" },
          { name: "Docker", level: 85, icon: "🐳", color: "#2496ED" },
          { name: "AWS", level: 82, icon: "☁️", color: "#FF9900" },
          { name: "Webpack", level: 88, icon: "📦", color: "#8DD6F9" },
          { name: "Jest", level: 90, icon: "🧪", color: "#C21325" },
          { name: "Figma", level: 85, icon: "🎨", color: "#F24E1E" }
        ]
      }
    },
    he: {
      frontend: {
        title: "פיתוח Frontend",
        description: "יצירת ממשקי משתמש יפים, רספונסיביים ואינטראקטיביים",
        skills: [
          { name: "React", level: 95, icon: "⚛️", color: "#61DAFB" },
          { name: "Vue.js", level: 90, icon: "🖖", color: "#4FC08D" },
          { name: "TypeScript", level: 92, icon: "📝", color: "#3178C6" },
          { name: "Next.js", level: 88, icon: "▲", color: "#000000" },
          { name: "CSS/SCSS", level: 96, icon: "🎨", color: "#1572B6" },
          { name: "Tailwind", level: 90, icon: "🎨", color: "#06B6D4" }
        ]
      },
      backend: {
        title: "פיתוח Backend",
        description: "בניית אפליקציות שרת חזקות, מדרגות וממשקי API",
        skills: [
          { name: "Node.js", level: 94, icon: "🟢", color: "#339933" },
          { name: "Express.js", level: 92, icon: "🚀", color: "#000000" },
          { name: "MongoDB", level: 90, icon: "🍃", color: "#47A248" },
          { name: "PostgreSQL", level: 85, icon: "🐘", color: "#336791" },
          { name: "Redis", level: 80, icon: "🔴", color: "#DC382D" },
          { name: "GraphQL", level: 78, icon: "🕸️", color: "#E10098" }
        ]
      },
      tools: {
        title: "כלים ו-DevOps",
        description: "זרימות עבודה מודרניות ופתרונות פריסה",
        skills: [
          { name: "Git", level: 95, icon: "🌿", color: "#F05032" },
          { name: "Docker", level: 85, icon: "🐳", color: "#2496ED" },
          { name: "AWS", level: 82, icon: "☁️", color: "#FF9900" },
          { name: "Webpack", level: 88, icon: "📦", color: "#8DD6F9" },
          { name: "Jest", level: 90, icon: "🧪", color: "#C21325" },
          { name: "Figma", level: 85, icon: "🎨", color: "#F24E1E" }
        ]
      }
    }
  }

  const headings = {
    en: {
      title: "Technical Expertise",
      subtitle: "Comprehensive skills across the full development stack"
    },
    he: {
      title: "מומחיות טכנית",
      subtitle: "כישורים מקיפים לאורך כל מחסנית הפיתוח"
    }
  }

  return (
    <section ref={sectionRef} className="skills-section">
      <div className="container">
        <div className="skills-header">
          <h2 className="skills-title">{headings[language].title}</h2>
          <p className="skills-subtitle">{headings[language].subtitle}</p>
        </div>

        <div className="skills-categories">
          {Object.entries(skills[language]).map(([key, category], categoryIndex) => (
            <div 
              key={key} 
              className={`skill-category ${isVisible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="category-header">
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
              </div>

              <div className="skills-grid">
                {category.skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={`skill-item ${isVisible ? 'animate-bar' : ''}`}
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (index * 0.1)}s` }}
                    onMouseEnter={() => setHoveredSkill(`${key}-${index}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="skill-header">
                      <div className="skill-icon" style={{ color: skill.color }}>
                        {skill.icon}
                      </div>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    
                    <div className="skill-bar">
                      <div 
                        className="skill-fill"
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          backgroundColor: skill.color,
                          boxShadow: hoveredSkill === `${key}-${index}` 
                            ? `0 0 20px ${skill.color}40` 
                            : 'none'
                        }}
                      />
                      <div className="skill-glow" style={{ backgroundColor: skill.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tech Stack Visualization */}
        <div className="tech-stack-viz">
          <h3 className="viz-title">
            {language === 'en' ? 'My Tech Stack' : 'המחסנית הטכנולוגית שלי'}
          </h3>
          <div className="tech-orbits">
            <div className="orbit orbit-1">
              <div className="tech-node react">React</div>
            </div>
            <div className="orbit orbit-2">
              <div className="tech-node node">Node.js</div>
              <div className="tech-node mongo">MongoDB</div>
            </div>
            <div className="orbit orbit-3">
              <div className="tech-node ts">TypeScript</div>
              <div className="tech-node aws">AWS</div>
              <div className="tech-node docker">Docker</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection

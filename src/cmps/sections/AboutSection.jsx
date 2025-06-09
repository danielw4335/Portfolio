import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../data/translations'

const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const skills = [
    {
      title: t.frontendDev,
      description: t.frontendDesc
    },
    {
      title: t.backendDev,
      description: t.backendDesc
    },
    {
      title: t.toolsTech,
      description: t.toolsDesc
    },
    {
      title: t.projectManagement,
      description: t.projectManagementDesc
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <h3>{t.aboutTitle}</h3>
        <p>{t.aboutDescription1}</p>        
        <p>{t.aboutDescription2}</p>
        
        <div className="experience-section">
          <h4>{t.educationExperience}</h4>          <div className="experience-item">
            <h5>{t.fullStackGraduate}</h5>
            <span className="date">{t.fullStackDate}</span>
            {t.fullStackDesc && <p className="course-description">{t.fullStackDesc}</p>}
          </div>
          <div className="experience-item">
            <h5>{t.projectManager}</h5>
            <span className="date">{t.projectManagerDate}</span>
            <p>{t.projectManagerDesc}</p>
          </div>
          <div className="experience-item">
            <h5>{t.combatMedic}</h5>
            <span className="date">{t.combatMedicDate}</span>
          </div>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <h4>{skill.title}</h4>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

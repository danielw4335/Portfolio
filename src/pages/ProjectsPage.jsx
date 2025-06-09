import ProjectCard from '../cmps/ProjectCard'
import { projectsData } from '../data/projects-simple'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

const ProjectsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const projects = projectsData[language];

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>{t.projectsTitle}</h1>
        <p>{t.projectsSubtitle}</p>
      </div>
      
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
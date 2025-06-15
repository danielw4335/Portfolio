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
      <div className="projects-header">        <h1>{t.projects.title}</h1>
        <p>{t.projects.subtitle}</p>
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
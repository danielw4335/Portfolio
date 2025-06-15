import { useNavigate } from 'react-router-dom'
import HeroSection from '../cmps/sections/HeroSection'
import AboutSection from '../cmps/sections/AboutSection'
import BlogSection from '../cmps/sections/BlogSection'
import ContactSection from '../cmps/sections/ContactSection'

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewProjects = () => {
    navigate('/projects');
  };  return (
    <div className="home-page compact-text">
      <HeroSection onViewProjects={handleViewProjects} />
      <AboutSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
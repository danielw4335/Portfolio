import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/LanguageContext'
import Header from './cmps/Header'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'
import Footer from './cmps/Footer'

// Import all CSS files
import './styles/global.css'
import './styles/responsive.css'
import './styles/components/header.css'
import './styles/components/footer.css'
import './styles/components/project-card.css'
import './styles/components/contact.css'
import './styles/components/hero-section.css'
import './styles/components/skills.css'
import './styles/pages/home.css'
import './styles/pages/projects.css'
import './styles/pages/admin.css'
import './styles/pages/not-found.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="main-layout">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

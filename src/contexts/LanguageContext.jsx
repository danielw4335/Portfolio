import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const LanguageContext = createContext(null)
const ThemeContext = createContext(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const STORAGE_KEYS = {
  LANGUAGE: 'preferred-language',
  THEME: 'preferred-theme'
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE)
    return saved || 'en'
  })

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'he' : 'en')
  }

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    isRTL: language === 'he'
  }), [language])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language)
    
    document.documentElement.lang = language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
    
    if (language === 'he') {
      document.documentElement.style.fontFamily = "'Assistant', 'Segoe UI', system-ui, sans-serif"
    } else {
      document.documentElement.style.fontFamily = ''
    }
  }, [language])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME)
    if (saved) return saved
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  }), [theme])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
    document.documentElement.setAttribute('data-theme', theme)
    
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME)
    if (savedTheme) {
      if (savedTheme === 'dark') {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.body.classList.add('dark')
      }
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

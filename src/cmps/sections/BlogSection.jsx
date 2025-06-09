import { useLanguage } from '../../contexts/LanguageContext'

const BlogSection = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: "Latest Articles & Insights",
      subtitle: "Coming Soon",
      description: "I'm working on creating valuable content about web development, best practices, and technology insights. Stay tuned for upcoming articles!"
    },
    he: {
      title: "מאמרים ותובנות אחרונות",
      subtitle: "בקרוב",
      description: "אני עובד על יצירת תוכן איכותי על פיתוח אתרים, שיטות עבודה מומלצות ותובנות טכנולוגיות. הישארו מעודכנים למאמרים הקרובים!"
    }
  }

  const t = translations[language]

  return (
    <section className="blog-section" id="blog">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">{t.title}</h2>
          <p className="blog-subtitle">{t.subtitle}</p>
          <p className="blog-description">{t.description}</p>
        </div>
      </div>
    </section>
  )
}

export default BlogSection

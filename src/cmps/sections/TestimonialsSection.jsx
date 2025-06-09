import { useLanguage } from '../../contexts/LanguageContext'
import { useState, useEffect } from 'react'

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = {
    en: [
      {
        id: 1,
        name: "Sarah Chen",
        position: "Senior Project Manager",
        company: "Tech Solutions Ltd",
        image: "https://images.unsplash.com/photo-1494790108755-2616b332c913?w=150&h=150&fit=crop&crop=face",
        text: "Daniel delivered exceptional results on our web application project. His technical skills and attention to detail are outstanding.",
        rating: 5
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        position: "CTO",
        company: "StartupFlow",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        text: "Working with Daniel was a pleasure. He brought innovative solutions and delivered high-quality code on time.",
        rating: 5
      },
      {
        id: 3,
        name: "Emma Thompson",
        position: "Lead Developer",
        company: "Digital Innovations",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        text: "Daniel's expertise in full-stack development helped us launch our platform successfully. Highly recommended!",
        rating: 5
      }
    ],
    he: [
      {
        id: 1,
        name: "שרה כהן",
        position: "מנהלת פרויקטים בכירה",
        company: "Tech Solutions Ltd",
        image: "https://images.unsplash.com/photo-1494790108755-2616b332c913?w=150&h=150&fit=crop&crop=face",
        text: "דניאל סיפק תוצאות יוצאות דופן בפרויקט אפליקציית הווב שלנו. הכישורים הטכניים שלו ותשומת הלב לפרטים מעולים.",
        rating: 5
      },
      {
        id: 2,
        name: "מיכאל רודריגז",
        position: "מנהל טכנולוגיות",
        company: "StartupFlow",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        text: "העבודה עם דניאל הייתה תענוג. הוא הביא פתרונות חדשניים וסיפק קוד איכותי בזמן.",
        rating: 5
      },
      {
        id: 3,
        name: "אמה תומפסון",
        position: "מפתחת מובילה",
        company: "Digital Innovations",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        text: "המומחיות של דניאל בפיתוח full-stack עזרה לנו להשיק את הפלטפורמה בהצלחה. מומלץ בחום!",
        rating: 5
      }
    ]
  };

  const currentTestimonials = testimonials[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % currentTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonials.length]);

  const renderStars = (rating) => {
    return Array(rating).fill(0).map((_, i) => (
      <span key={i} className="star">⭐</span>
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-content">
        <div className="section-header">
          <h3 className="section-title">
            {language === 'he' ? 'מה אומרים עליי' : 'What People Say'}
          </h3>
          <p className="section-subtitle">
            {language === 'he' ? 'המלצות מלקוחות ועמיתים' : 'Testimonials from clients and colleagues'}
          </p>
        </div>

        <div className="testimonials-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                {currentTestimonials[currentTestimonial].text}
              </p>
              <div className="rating">
                {renderStars(currentTestimonials[currentTestimonial].rating)}
              </div>
            </div>
            
            <div className="testimonial-author">
              <img 
                src={currentTestimonials[currentTestimonial].image} 
                alt={currentTestimonials[currentTestimonial].name}
                className="author-image"
              />
              <div className="author-info">
                <h4 className="author-name">
                  {currentTestimonials[currentTestimonial].name}
                </h4>
                <p className="author-position">
                  {currentTestimonials[currentTestimonial].position}
                </p>
                <p className="author-company">
                  {currentTestimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
          </div>

          <div className="testimonials-dots">
            {currentTestimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

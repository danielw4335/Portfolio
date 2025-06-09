import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../data/translations'

const ContactSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const phoneNumber = "0587621874";
  const whatsappMessage = encodeURIComponent(
    language === 'he' 
      ? "שלום דניאל, ראיתי את הפורטפוליו שלך ואשמח לדבר איתך על הזדמנויות עבודה"
      : "Hi Daniel, I saw your portfolio and would like to discuss job opportunities with you"
  );

  const contactLinks = [
    {
      icon: "📧",
      text: "daniel.wallache@gmail.com",
      href: "mailto:daniel.wallache@gmail.com",
      label: t.email
    },
    {
      icon: "📱",
      text: "WhatsApp",
      href: `https://wa.me/972${phoneNumber.substring(1)}?text=${whatsappMessage}`,
      label: t.whatsapp
    },
    {
      icon: "💼",
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/daniel-wallache/",
      label: t.linkedin
    },
    {
      icon: "🐱",
      text: "GitHub", 
      href: "https://github.com/danielw4335",
      label: t.github
    },
    {
      icon: "📄",
      text: t.downloadCV,
      href: "/daniel-wallache-cv.pdf",
      label: t.resume,
      download: true
    }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <h3>{t.contactTitle}</h3>
        <p>{t.contactDesc}</p>        <div className="contact-links">
          {contactLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className="contact-link"
              target={link.href.startsWith('http') ? "_blank" : undefined}
              rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
              download={link.download}
              title={link.label}
            >
              <span className="contact-icon">{link.icon}</span>
              <span className="contact-text">{link.text}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

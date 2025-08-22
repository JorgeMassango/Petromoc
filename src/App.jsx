import React, { useState, useEffect } from 'react';
import './App.css';

// Ícones SVG customizados
const Icons = {
  ChevronDown: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
  ),
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5,3 19,12 5,21"></polygon>
    </svg>
  ),
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  MessageCircle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  ),
  ExternalLink: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15,3 21,3 21,9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  ),
  MapPin: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Leaf: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8c0 8-7 15-7 15s-7-7-7-15a7.5 7.5 0 0 1 7.5-7.5c1.8 0 3.5.6 4.9 1.6"></path>
      <path d="M8.35 13.5c.25-1.5 1.25-3 2.15-4"></path>
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Award: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"></polyline>
    </svg>
  )
};

const App = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = (type) => {
    switch(type) {
      case 'email':
        window.open('mailto:info@petromoc.co.mz');
        break;
      case 'whatsapp':
        window.open('https://wa.me/258843000000');
        break;
      case 'phone':
        window.open('tel:+258843000000');
        break;
      default:
        break;
    }
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section 
        id="hero" 
        className={`hero ${isVisible.hero ? 'animate-fade-in' : ''}`}
      >
        <div className="hero-bg"></div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-logo">
            <div className="logo-circle">
              <img src="/petromoc-logo.png" alt="Petromoc Logo" className="logo-img" />
            </div>
          </div>
          
          <h1 className="hero-title animate-slide-up">
            Bem-vindo ao nosso
            <span className="hero-title-accent">Stand</span>
          </h1>
          
          <p className="hero-subtitle animate-slide-up-delayed">
            A Energia que Move Moçambique
          </p>
          
          <button 
            onClick={() => scrollToSection('showreel')}
            className="hero-cta animate-bounce-subtle"
          >
            <Icons.Play />
            ShowReel
          </button>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className={`about ${isVisible.about ? 'animate-slide-up' : 'opacity-0'}`}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Quem Somos</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              A Petromoc é líder em soluções energéticas em Moçambique, comprometida em fornecer energia sustentável 
              e inovadora que impulsiona o desenvolvimento do país. Com décadas de experiência, somos a força motriz 
              por trás do progresso energético nacional.
            </p>
          </div>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon sustainability">
                <Icons.Leaf />
              </div>
              <h3 className="value-title">Sustentabilidade</h3>
              <p className="value-description">Energia limpa para um futuro sustentável</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon innovation">
                <Icons.Users />
              </div>
              <h3 className="value-title">Inovação</h3>
              <p className="value-description">Tecnologia de ponta em soluções energéticas</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon trust">
                <Icons.Shield />
              </div>
              <h3 className="value-title">Confiança</h3>
              <p className="value-description">Parceiro confiável há décadas</p>
            </div>
          </div>
          
          <div className="about-cta">
            <button 
              onClick={() => window.open('https://petromoc.co.mz', '_blank')}
              className="btn-secondary"
            >
              Saiba mais sobre a Petromoc
            </button>
          </div>
        </div>
      </section>

      {/* Showreel Section */}
      <section 
        id="showreel" 
        className={`showreel ${isVisible.showreel ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="container">
          <h2 className="section-title">Nossa História</h2>
          <p className="section-description">
            Assista em 1 minuto como movemos Moçambique
          </p>
          
          <div className="video-container">
            {!showVideo ? (
              <div 
                onClick={() => setShowVideo(true)}
                className="video-preview"
              >
                <div className="video-overlay"></div>
                <div className="video-play-button">
                  <div className="play-icon">
                    <Icons.Play />
                  </div>
                  <p className="play-text">Clique para assistir</p>
                </div>
              </div>
            ) : (
              <iframe
                width="100%"
                height="400"
                src="https://player.vimeo.com/video/912160339"
                title="Petromoc Showreel"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              />
            )}
          </div>
        </div>
      </section>

      {/* FACIM Section */}
      <section 
        id="facim" 
        className={`facim ${isVisible.facim ? 'animate-slide-up' : 'opacity-0'}`}
      >
        <div className="container">
          <div className="facim-content">
            <div className="facim-text">
              <h2 className="section-title">FACIM | Edição 60</h2>
              <p className="facim-description">
                Estamos orgulhosos de participar da 60ª edição da FACIM, a maior feira comercial e industrial de Moçambique. 
                Venha nos visitar em nosso stand e descubra as últimas inovações em soluções energéticas.
              </p>
              <div className="facim-location">
                <Icons.MapPin />
                <span>Encontre-nos no pavilhão principal</span>
              </div>
            </div>
            <div className="facim-card">
              <div className="facim-card-inner">
                <h3 className="facim-card-title">Visite nosso Stand</h3>
                <p className="facim-card-subtitle">
                  Demonstrações ao vivo, networking e oportunidades de negócio
                </p>
                <div className="facim-schedule">
                  <p className="schedule-title">Horário de funcionamento:</p>
                  <p className="schedule-item">Segunda a Sexta: 9h às 18h</p>
                  <p className="schedule-item">Sábado: 9h às 15h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section 
        id="certifications" 
        className={`certifications ${isVisible.certifications ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Certificações</h2>
            <p className="section-description">Compromisso com a excelência e qualidade</p>
          </div>
          
          <div className="certifications-grid">
            <div className="certification-card">
              <div className="certification-icon quality">
                <Icons.Award />
              </div>
              <h3 className="certification-title">ISO 9001</h3>
              <p className="certification-description">Sistema de Gestão da Qualidade certificado internacionalmente</p>
            </div>
            
            <div className="certification-card">
              <div className="certification-icon environment">
                <Icons.Leaf />
              </div>
              <h3 className="certification-title">ISO 14001</h3>
              <p className="certification-description">Gestão Ambiental comprometida com a sustentabilidade</p>
            </div>
            
            <div className="certification-card">
              <div className="certification-icon safety">
                <Icons.Shield />
              </div>
              <h3 className="certification-title">ISO 45001</h3>
              <p className="certification-description">Saúde e Segurança Ocupacional em primeiro lugar</p>
            </div>

            <div className="certification-card">
              <div className="certification-icon safet">
                <Icons.Users />
              </div>
              <h3 className="certification-title">JIG MEMBER 2023</h3>
              <p className="certification-description">Membro oficial do Joint Inspection Group, referência global em padrões de segurança e qualidade no setor de combustíveis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`contact ${isVisible.contact ? 'animate-slide-up' : 'opacity-0'}`}
      >
        <div className="container">
          <h2 className="section-title">Entre em Contacto</h2>
          <p className="section-description">
            Pronto para uma conversa? Escolha a forma mais conveniente para si
          </p>
          
          <div className="contact-grid">
            <button 
              onClick={() => handleContact('email')}
              className="contact-card"
            >
              <Icons.Mail />
              <h3 className="contact-title">Email</h3>
              <p className="contact-info">info@petromoc.co.mz</p>
            </button>
            
            <button 
              onClick={() => handleContact('whatsapp')}
              className="contact-card"
            >
              <Icons.MessageCircle />
              <h3 className="contact-title">WhatsApp</h3>
              <p className="contact-info">Mensagem direta</p>
            </button>
            
            <button 
              onClick={() => handleContact('phone')}
              className="contact-card"
            >
              <Icons.Phone />
              <h3 className="contact-title">Telefone</h3>
              <p className="contact-info">+258 84 300 0000</p>
            </button>
          </div>
        </div>
      </section>

      {/* Website CTA */}
      <section 
        id="website" 
        className={`website-cta ${isVisible.website ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="container">
          <h2 className="cta-title">Descubra Mais</h2>
          <p className="cta-description">
            Explore todas as nossas soluções e serviços no nosso website oficial
          </p>
          <button 
            onClick={() => window.open('https://www.petromoc.co.mz/', '_blank')}
            className="btn-website"
          >
            Visitar Website Oficial
            <Icons.ExternalLink />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/petromoc-logo.png" alt="Petromoc Logo" className="logo-img" />
            </div>
            <p className="footer-copyright">
              © 2025 Petromoc. Todos os direitos reservados.
            </p>
            <p className="footer-slogan">
              A Energia que Move Moçambique - Inovação, Sustentabilidade, Confiança
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
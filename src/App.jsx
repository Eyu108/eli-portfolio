import { ChevronDown, Download, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Check which sections are visible with more granular detection
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      const newVisible = new Set();
      
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Trigger animation when element is 70% visible
          const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
          if (isVisible) newVisible.add(id);
        }
      });
      
      setVisibleSections(newVisible);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '/Eyuel_Elijah_K_Resume.pdf'; // You'll need to add your PDF to the public folder
    link.download = 'Eyuel_Elijah_K_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show confirmation
    setShowResumeDialog(true);
    setTimeout(() => setShowResumeDialog(false), 3000);
  };

  return (
    <div style={{ background: '#0a1628', minHeight: '100vh', color: '#ffffff' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        background: scrolled ? 'rgba(10, 22, 40, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(74, 158, 255, 0.2)' : 'none',
        transition: 'all 0.5s ease'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.00rem', fontWeight: 'bold', color: '#ffffff' }}>
            EK
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section.toLowerCase())}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e0e0e0',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.target.style.color = '#4a9eff'}
                onMouseLeave={(e) => e.target.style.color = '#e0e0e0'}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section with Matrix Animation */}
      <HeroSection scrollToSection={scrollToSection} isVisible={visibleSections.has('hero')} onDownloadResume={handleDownloadResume} />

      {/* Resume Download Notification */}
      {showResumeDialog && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          background: 'rgba(74, 158, 255, 0.95)',
          color: 'white',
          padding: '20px 30px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          zIndex: 1000,
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Download size={24} />
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Resume Download Started</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Your download will begin shortly</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* About Section with Floating Particles */}
      <AboutSection isVisible={visibleSections.has('about')} />

      {/* Experience Section */}
      <ExperienceSection isVisible={visibleSections.has('experience')} />

      {/* Projects Section with Particle Network */}
      <ProjectsSection isVisible={visibleSections.has('projects')} />

      {/* Skills Section with Gradient Orbs */}
      <SkillsSection isVisible={visibleSections.has('skills')} />

      {/* Contact Section with Waves */}
      <ContactSection isVisible={visibleSections.has('contact')} />

      {/* Footer */}
      <footer style={{
        padding: '30px 40px',
        background: '#0a1628',
        borderTop: '1px solid rgba(74, 158, 255, 0.2)',
        textAlign: 'center',
        color: '#999',
        fontSize: '0.9rem'
      }}>
        <p>© 2025 Elijah.K. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

// Hero Section with Matrix + Data Analytics Animation
function HeroSection({ scrollToSection, isVisible, onDownloadResume }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix Rain Setup
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = '012345678910091008ABCDEFGHIJKLMNOPQRSTUVWXYZqrstuvwxyz$€¥£₿%';

    // Candlestick Setup (positioned higher)
    const candlesticks = [];
    for (let i = 0; i < 10; i++) {
      candlesticks.push({
        x: (i / 9) * canvas.width * 0.7 + canvas.width * 0.15,
        y: canvas.height * 0.2, // Position at top 20% of screen
        open: Math.random() * 80 + 150,
        close: Math.random() * 80 + 150,
        high: 0,
        low: 0,
        speed: Math.random() * 0.4 + 0.3,
        opacity: 0.6 + Math.random() * 0.4
      });
    }
    
    // Bar Charts Setup
    const bars = [];
    for (let i = 0; i < 15; i++) {
      bars.push({
        x: (i / 14) * canvas.width * 0.8 + canvas.width * 0.1,
        height: Math.random() * canvas.height * 0.25 + 40,
        targetHeight: Math.random() * canvas.height * 0.25 + 40,
        speed: 0.015
      });
    }

    function animate() {
      // Layer 1: Matrix Rain Background
      ctx.fillStyle = 'rgba(10, 22, 40, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = drops[i] * fontSize < 100 ? 200 : Math.max(80, 200 - (drops[i] * fontSize - 100) / 4);
        ctx.fillStyle = `rgba(74, 158, 255, ${brightness / 255 * 0.4})`;
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Layer 2: Candlesticks (overlaid on matrix, positioned high)
      candlesticks.forEach(candle => {
        // Animate candlestick values
        candle.open += (Math.random() - 0.5) * candle.speed;
        candle.close += (Math.random() - 0.5) * candle.speed;
        
        // Keep values in reasonable range
        candle.open = Math.max(100, Math.min(300, candle.open));
        candle.close = Math.max(100, Math.min(300, candle.close));
        
        candle.high = Math.max(candle.open, candle.close) + Math.random() * 15;
        candle.low = Math.min(candle.open, candle.close) - Math.random() * 15;
        
        const isGreen = candle.close > candle.open;
        const color = isGreen ? `rgba(56, 239, 125, ${candle.opacity})` : `rgba(255, 107, 53, ${candle.opacity})`;
        const outlineColor = isGreen ? `rgba(56, 239, 125, ${candle.opacity + 0.2})` : `rgba(255, 107, 53, ${candle.opacity + 0.2})`;
        
        const bodyHeight = Math.abs(candle.close - candle.open);
        const bodyY = candle.y + (300 - Math.max(candle.open, candle.close));
        
        // Draw wick (high-low line)
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(candle.x, candle.y + (300 - candle.high));
        ctx.lineTo(candle.x, candle.y + (300 - candle.low));
        ctx.stroke();
        
        // Draw body (open-close rectangle) with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = isGreen ? 'rgba(56, 239, 125, 0.5)' : 'rgba(255, 107, 53, 0.5)';
        ctx.fillStyle = color;
        ctx.fillRect(
          candle.x - 18,
          bodyY,
          36,
          bodyHeight || 3
        );
        ctx.shadowBlur = 0;
        
        // Draw outline
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          candle.x - 18,
          bodyY,
          36,
          bodyHeight || 3
        );
      });

      // Layer 3: Bar Charts at bottom
      bars.forEach((bar, idx) => {
        bar.height += (bar.targetHeight - bar.height) * bar.speed;
        
        if (Math.random() < 0.008) {
          bar.targetHeight = Math.random() * canvas.height * 0.25 + 40;
        }
        
        const gradient = ctx.createLinearGradient(0, canvas.height - bar.height, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(74, 158, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(74, 158, 255, 0.15)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          bar.x - 25,
          canvas.height - bar.height,
          50,
          bar.height
        );
        
        // Draw subtle border
        ctx.strokeStyle = 'rgba(74, 158, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.strokeRect(
          bar.x - 25,
          canvas.height - bar.height,
          50,
          bar.height
        );
        
        // Draw value on top (every other bar)
        if (idx % 3 === 0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.font = 'bold 11px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(
            `${Math.floor(bar.height)}`,
            bar.x,
            canvas.height - bar.height - 8
          );
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '100px 40px 80px',
      background: '#0a1628'
    }}>
      {/* Combined Matrix + Data Analytics Canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.5
      }} />
      
      {/* Dark overlay for better text contrast */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, rgba(10, 22, 40, 0.2) 0%, rgba(10, 22, 40, 0.6) 100%)',
        zIndex: 2
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '900px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1s ease-out'
      }}>
        {/* Profile Picture Placeholder */}
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          margin: '0 auto 30px',
          border: '4px solid #4a9eff',
          background: 'rgba(15, 35, 66, 0.9)',
          boxShadow: '0 0 40px rgba(74, 158, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Profile Image - Replace src with your image URL */}
          <img 
            src="/profile-picture.jpg" 
            alt="Elijah K Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              // Fallback if image doesn't load - shows initials
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: bold; color: white;">EK</div>';
            }}
          />
        </div>

        <h1 style={{
          fontSize: '3rem',
          marginBottom: '15px',
          fontWeight: 'bold',
          color: '#ffffff',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)'
        }}>
          Elijah.K
        </h1>

        <div style={{
          fontSize: '1.5rem',
          marginBottom: '20px',
          color: '#e0e0e0',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          Data Analyst & Software Developer
        </div>

        <p style={{
          fontSize: '1.1rem',
          marginBottom: '40px',
          lineHeight: '1.6',
          color: '#e0e0e0',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          Applying analytical techniques and technical expertise in <span style={{ color: '#4a9eff', fontWeight: '600' }}>Python, SQL, and cloud technologies</span> to extract actionable insights from complex datasets
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Button onClick={() => scrollToSection('projects')} primary>View Projects</Button>
          <Button onClick={() => scrollToSection('contact')}>Get in Touch</Button>
          <Button onClick={onDownloadResume}><Download size={20} style={{ marginRight: '8px' }} />Resume</Button>
        </div>

        <div onClick={() => scrollToSection('about')} style={{
          marginTop: '60px',
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
          color: '#4a9eff'
        }}>
          <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Scroll to explore</div>
          <ChevronDown size={24} />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </section>
  );
}

// About Section with Floating Particles
function AboutSection({ isVisible }) {
  const highlights = [
    { metric: "25-40%", label: "Processing Efficiency" },
    { metric: "30%", label: "Engagement Increase" },
    { metric: "Python | SQL | AWS", label: "Core Stack" }
  ];

  return (
    <section id="about" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #0a1628 0%, #0d1a2d 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <FloatingParticles />
      
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <h2 style={{
          fontSize: '2.0rem',
          marginBottom: '60px',
          fontWeight: 'bold',
          color: '#ffffff',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}>
          About
        </h2>

        <div style={{ fontSize: '1.00rem', lineHeight: '2', color: '#e0e0e0' }}>
          {[
            "I'm a Data Analyst and Software Developer with technical expertise in Python, SQL, and R, specializing in extracting actionable insights from complex datasets in energy and financial sectors. Currently pursuing Computer Science at the University of Calgary with proven experience in building analytics platforms that drive business decisions.",
            "My work combines data engineering, statistical modeling, and full-stack development to deliver measurable impact. I've architected systems that process real-time market data, perform risk analysis, and deliver insights through interactive dashboards achieving 25-40% improvements in processing efficiency and 30% increases in user engagement across multiple projects.",
            "I excel at creating data visualizations using Tableau, Plotly, and Matplotlib that improve decision-making and communicate complex findings to diverse audiences. My technical toolkit includes Python, SQL, AWS cloud services, machine learning pipelines, and modern development frameworks — enabling me to build end-to-end data solutions from ETL to deployment.",
            "Seeking opportunities to apply data analytics and development expertise to solve complex problems in energy, finance, or technology sectors."
          ].map((text, index) => (
            <p key={index} style={{
              marginBottom: '35px',
              opacity: isVisible ? 0.95 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: `all 0.8s ease-out ${index * 0.15}s`
            }}>
              {text.split('data engineering').length > 1 ? (
                <>
                  {text.split('data engineering')[0]}
                  <span style={{ color: '#4a9eff', fontWeight: '600' }}>data engineering, statistical modeling, and full-stack development</span>
                  {text.split('data engineering')[1].split('statistical modeling, and full-stack development')[1]}
                </>
              ) : text.split('25-40%').length > 1 ? (
                <>
                  {text.split('25-40%')[0]}
                  <span style={{ color: '#4a9eff', fontWeight: '600' }}>25-40% improvements in processing efficiency</span>
                  {text.split('improvements in processing efficiency')[1]}
                </>
              ) : text.split('creating data visualizations').length > 1 ? (
                <>
                  {text.split('creating data visualizations')[0]}
                  <span style={{ color: '#4a9eff', fontWeight: '600' }}>creating data visualizations using Tableau, Plotly, and Matplotlib</span>
                  {text.split('using Tableau, Plotly, and Matplotlib')[1]}
                </>
              ) : text.split('Data Analyst').length > 1 ? (
                <>
                  {text.split('Data Analyst')[0]}
                  <span style={{ color: '#4a9eff', fontWeight: '600' }}>Data Analyst and Software Developer</span>
                  {text.split('and Software Developer')[1]}
                </>
              ) : (
                <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '1.3rem' }}>
                  {text}
                </span>
              )}
            </p>
          ))}
        </div>

        {/* Key Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '25px',
          marginTop: '60px'
        }}>
          {highlights.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '30px',
                background: 'rgba(74, 158, 255, 0.1)',
                border: '2px solid rgba(74, 158, 255, 0.3)',
                borderRadius: '15px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                transitionDelay: `${0.6 + index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(74, 158, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#4a9eff',
                marginBottom: '10px'
              }}>
                {item.metric}
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: '#e0e0e0',
                opacity: 0.9
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection({ isVisible }) {
  const experiences = [
    {
      role: "Educational Technology Researcher",
      company: "University of Calgary",
      location: "Calgary, Alberta",
      period: "May 2024 - August 2024",
      highlights: [
        "Conducted statistical analysis of learning outcomes data, identifying significant correlations between technology integration and student engagement",
        "Created data visualizations and interactive dashboards that effectively communicated research findings to non-technical audiences",
        "Applied machine learning techniques to analyze patterns in educational data, developing insights that informed system improvements",
        "Designed and implemented A/B testing methodologies, analyzing results with 95% confidence intervals to validate effectiveness of educational tools"
      ]
    },
    {
      role: "Junior Software Developer",
      company: "Freelance for Pre-IB",
      location: "Remote",
      period: "January 2023 - April 2023",
      highlights: [
        "Analyzed website usage data to identify user behavior patterns, implementing data-driven improvements that increased engagement metrics by 30%",
        "Created automated data collection and reporting systems to track key performance indicators across web platforms",
        "Developed data visualization components that effectively communicated complex information to users, improving information retention",
        "Conducted A/B testing of interface elements, analyzing results to optimize user experience based on quantitative metrics"
      ]
    }
  ];

  return (
    <section id="experience" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #0d1a2d 0%, #0a1628 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Subtle particle effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 50%, rgba(74, 158, 255, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        width: '100%'
      }}>
        <h2 style={{
          fontSize: '2.00rem',
          marginBottom: '60px',
          fontWeight: 'bold',
          color: '#ffffff',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}>
          Experience
        </h2>

        <div style={{ display: 'grid', gap: '40px' }}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: `all 0.8s ease-out ${index * 0.2}s`
              }}
            >
              <ExperienceCard experience={exp} />
            </div>
          ))}
        </div>

        {/* Awards & Recognition */}
        <div style={{
          marginTop: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out 0.6s'
        }}>
          <h3 style={{
            fontSize: '2rem',
            marginBottom: '30px',
            fontWeight: 'bold',
            color: '#4a9eff'
          }}>
            Awards & Recognition
          </h3>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.6s ease-out 0.8s'
            }}>
              <AwardCard
                title="PURE Research Award"
                organization="Cenovus Energy"
                year="2024"
                description="Recognized for innovative data analysis contributions in computational approaches to equity-focused STEM education"
              />
            </div>
            <div style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.6s ease-out 0.9s'
            }}>
              <AwardCard
                title="Researcher Skills Badge"
                organization="University of Calgary"
                year="2024"
                description="Demonstrated excellence in quantitative research methodologies and data analysis techniques"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '40px',
        borderRadius: '20px',
        border: '2px solid rgba(74, 158, 255, 0.3)',
        background: 'rgba(74, 158, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateX(10px)' : 'translateX(0)',
        borderColor: isHovered ? 'rgba(74, 158, 255, 0.5)' : 'rgba(74, 158, 255, 0.3)',
        boxShadow: isHovered ? '0 15px 50px rgba(74, 158, 255, 0.15)' : 'none'
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '8px'
        }}>
          {experience.role}
        </h3>
        <div style={{
          fontSize: '1.1rem',
          color: '#4a9eff',
          fontWeight: '600',
          marginBottom: '5px'
        }}>
          {experience.company}
        </div>
        <div style={{
          fontSize: '0.95rem',
          color: '#e0e0e0',
          opacity: 0.7
        }}>
          {experience.location} • {experience.period}
        </div>
      </div>

      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}>
        {experience.highlights.map((highlight, i) => (
          <li key={i} style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: '#e0e0e0',
            opacity: 0.9,
            marginBottom: '12px',
            paddingLeft: '25px',
            position: 'relative'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#4a9eff',
              fontWeight: 'bold'
            }}>▹</span>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AwardCard({ title, organization, year, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '25px 30px',
        borderRadius: '15px',
        background: 'rgba(74, 158, 255, 0.08)',
        border: '2px solid rgba(74, 158, 255, 0.2)',
        transition: 'all 0.3s',
        borderColor: isHovered ? 'rgba(74, 158, 255, 0.4)' : 'rgba(74, 158, 255, 0.2)',
        transform: isHovered ? 'translateX(5px)' : 'translateX(0)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
        <div>
          <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '5px' }}>
            {title}
          </h4>
          <div style={{ fontSize: '1rem', color: '#4a9eff', fontWeight: '500' }}>
            {organization}
          </div>
        </div>
        <div style={{
          padding: '5px 15px',
          background: 'rgba(74, 158, 255, 0.2)',
          borderRadius: '20px',
          fontSize: '0.9rem',
          color: '#4a9eff',
          fontWeight: '600'
        }}>
          {year}
        </div>
      </div>
      <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#e0e0e0', opacity: 0.8, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// Floating Particles Component
function FloatingParticles() {
  const particlesRef = useRef([]);

  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5
      });
    }
    particlesRef.current = particles;
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particlesRef.current.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: '#4a9eff',
            borderRadius: '50%',
            opacity: 0.4,
            animation: `float${i} ${p.duration}s infinite ease-in-out ${p.delay}s`,
            boxShadow: '0 0 10px rgba(74, 158, 255, 0.5)'
          }}
        />
      ))}
      <style>{`
        ${particlesRef.current.map((_, i) => `
          @keyframes float${i} {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(30px, -30px) scale(1.2); }
            50% { transform: translate(-25px, -55px) scale(0.8); }
            75% { transform: translate(-45px, -25px) scale(1.1); }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

// Projects Section with Particle Network
function ProjectsSection({ isVisible }) {
  const canvasRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 22, 40, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = 'rgba(74, 158, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.4;
            ctx.strokeStyle = `rgba(74, 158, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      name: "Market Risk & Portfolio Analyzer",
      description: "Professional-grade portfolio and market risk analytics platform with real-time data visualization, performance metrics, and comprehensive risk assessment tools.",
      detailedDescription: "Built a comprehensive analytics platform that processes real-time market data and performs sophisticated risk calculations. Features include portfolio optimization, Value at Risk (VaR) calculations, Monte Carlo simulations, and interactive visualizations for tracking performance metrics.",
      tech: ["Python", "Streamlit", "Plotly", "Pandas", "NumPy", "yfinance"],
      features: ["Real-time market data integration", "Risk metrics calculation (VaR, CVaR)", "Portfolio optimization algorithms", "Interactive performance dashboards", "Historical backtesting"],
      demo: "https://market-risk-portfolio-analyzer.streamlit.app",
      github: "https://github.com/Eyu108/Market-Risk-Portfolio-Analyzer",
      image: "https://via.placeholder.com/800x450/1e3c72/4a9eff?text=Market+Risk+Analyzer"
    },
    {
      name: "Trading Strategy Backtester",
      description: "Interactive simulation platform for evaluating momentum and mean-reversion trading strategies with advanced performance metrics including Sharpe and Sortino ratios.",
      detailedDescription: "Developed a sophisticated backtesting engine that allows traders to test and validate trading strategies against historical data. Implements multiple strategy types with comprehensive performance analytics and risk-adjusted returns calculations.",
      tech: ["Python", "Pandas", "NumPy", "Plotly", "Streamlit"],
      features: ["Multiple strategy implementations", "Sharpe & Sortino ratio calculations", "Drawdown analysis", "Strategy comparison tools", "Performance visualization"],
      demo: "https://tradingstrategy-backtester.streamlit.app",
      github: "https://github.com/Eyu108/Trading-Strategy-Backtester",
      image: "https://via.placeholder.com/800x450/2a5298/4a9eff?text=Trading+Backtester"
    },
    {
      name: "Energy Market Analyzer",
      description: "Data-driven dashboard for energy price analytics and predictive modeling, featuring ML-powered forecasting and comprehensive market trend analysis.",
      detailedDescription: "Created an analytics platform for energy market professionals to analyze price trends, forecast future prices using machine learning models, and identify market opportunities. Integrates multiple data sources and provides actionable insights for decision-making.",
      tech: ["Python", "Streamlit", "scikit-learn", "Pandas", "Plotly"],
      features: ["Price forecasting with ML models", "Market trend analysis", "Data aggregation from multiple sources", "Predictive analytics", "Interactive dashboards"],
      demo: null,
      github: "https://github.com/Eyu108/Energy-Market-Analyzer",
      image: "https://via.placeholder.com/800x450/1e3c72/38ef7d?text=Energy+Market+Analyzer"
    }
  ];

  return (
    <section id="projects" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #0d1a2d 0%, #0a1628 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh'
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.6
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <h2 style={{
          fontSize: '2.00rem',
          marginBottom: '60px',
          fontWeight: 'bold',
          color: '#ffffff',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}>
          Featured Projects
        </h2>

        <div style={{ display: 'grid', gap: '30px' }}>
          {projects.map((project, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.8s ease-out ${index * 0.2}s`
              }}
            >
              <ProjectCard 
                project={project} 
                index={index}
                onViewDetails={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}

function ProjectCard({ project, index, onViewDetails }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '0',
        borderRadius: '20px',
        border: '2px solid rgba(74, 158, 255, 0.3)',
        background: 'rgba(74, 158, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.5s ease',
        transform: isHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        borderColor: isHovered ? 'rgba(74, 158, 255, 0.6)' : 'rgba(74, 158, 255, 0.3)',
        boxShadow: isHovered ? '0 20px 60px rgba(74, 158, 255, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden'
      }}
    >
      {/* Project Image/Preview */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        background: `url(${project.image}) center/cover`,
        cursor: 'pointer'
      }}
      onClick={onViewDetails}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 22, 40, 0.9) 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '30px',
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.3s'
        }}>
          <div style={{
            background: 'rgba(74, 158, 255, 0.9)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ExternalLink size={16} />
            Click to view details
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div style={{ padding: '40px' }}>
        <h3 style={{
          fontSize: '2rem',
          marginBottom: '20px',
          color: '#ffffff',
          fontWeight: 'bold'
        }}>
          {project.name}
        </h3>

        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          marginBottom: '25px',
          color: '#e0e0e0',
          opacity: 0.9
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '25px' }}>
          {project.tech.map((tech, i) => (
            <span
              key={i}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                border: '1px solid rgba(74, 158, 255, 0.4)',
                background: 'rgba(74, 158, 255, 0.15)',
                color: '#a8d4ff',
                fontWeight: '500'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '25px' }}>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#4a9eff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600',
                fontSize: '1.05rem',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#6bb0ff'}
              onMouseLeave={(e) => e.target.style.color = '#4a9eff'}
            >
              <ExternalLink size={20} />
              View Live
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#e0e0e0',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '1.05rem',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = '#e0e0e0'}
          >
            <Github size={20} />
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
}

// Project Details Modal
function ProjectModal({ project, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #0d1a2d 0%, #0a1628 100%)',
          borderRadius: '24px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          border: '2px solid rgba(74, 158, 255, 0.3)',
          boxShadow: '0 25px 100px rgba(0, 0, 0, 0.5)',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        {/* Modal Header Image */}
        <div style={{
          width: '100%',
          height: '300px',
          background: `url(${project.image}) center/cover`,
          borderRadius: '24px 24px 0 0',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 0, 0, 0.7)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '40px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '20px'
          }}>
            {project.name}
          </h2>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: '1.8',
            color: '#e0e0e0',
            marginBottom: '30px',
            opacity: 0.95
          }}>
            {project.detailedDescription}
          </p>

          {/* Features */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#4a9eff',
              marginBottom: '15px'
            }}>
              Key Features
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              display: 'grid',
              gap: '12px'
            }}>
              {project.features.map((feature, i) => (
                <li key={i} style={{
                  fontSize: '1.05rem',
                  color: '#e0e0e0',
                  paddingLeft: '30px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#4a9eff',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#4a9eff',
              marginBottom: '15px'
            }}>
              Technologies Used
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '10px',
                    background: 'rgba(74, 158, 255, 0.2)',
                    border: '2px solid rgba(74, 158, 255, 0.4)',
                    color: '#ffffff',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(74, 158, 255, 0.2)'
          }}>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: '16px',
                  background: 'linear-gradient(135deg, #4a9eff, #2563eb)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <ExternalLink size={20} />
                View Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: '16px',
                background: 'rgba(74, 158, 255, 0.15)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1.05rem',
                border: '2px solid rgba(74, 158, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(74, 158, 255, 0.25)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(74, 158, 255, 0.15)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Github size={20} />
              View Source Code
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Skills Section with Gradient Orbs
function SkillsSection({ isVisible }) {
  const skillCategories = [
    { 
      title: "Data Analytics & Engineering", 
      skills: ["Python", "SQL", "Pandas", "NumPy", "Data Modeling", "ETL Pipelines", "Statistical Analysis"]
    },
    { 
      title: "Visualization & BI Tools", 
      skills: ["Plotly", "Streamlit", "Tableau", "Matplotlib", "Power BI", "Interactive Dashboards"]
    },
    { 
      title: "Cloud & DevOps", 
      skills: ["AWS (EC2, S3, Lambda)", "Docker", "Git/GitHub", "CI/CD", "Linux", "Cloud Architecture"]
    },
    { 
      title: "Development & Frameworks", 
      skills: ["React", "Flask", "REST APIs", "JavaScript", "Java", "C++", "Full-Stack Development"]
    },
    { 
      title: "Machine Learning & AI", 
      skills: ["scikit-learn", "TensorFlow", "Predictive Modeling", "Time Series Analysis", "Feature Engineering"]
    },
    { 
      title: "Domain Expertise", 
      skills: ["Financial Analytics", "Energy Markets", "Risk Management", "Quantitative Analysis", "Trading Systems"]
    }
  ];

  return (
    <section id="skills" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #0a1628 0%, #0d1a2d 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <GradientOrbs />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        width: '100%'
      }}>
        <h2 style={{
          fontSize: '2.00rem',
          marginBottom: '60px',
          fontWeight: 'bold',
          color: '#ffffff',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}>
          Skills & Technologies
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {skillCategories.map((category, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease-out ${index * 0.15}s`
              }}
            >
              <SkillCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '35px',
        borderRadius: '20px',
        border: '2px solid rgba(74, 158, 255, 0.3)',
        background: 'rgba(74, 158, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        borderColor: isHovered ? 'rgba(74, 158, 255, 0.5)' : 'rgba(74, 158, 255, 0.3)',
        boxShadow: isHovered ? '0 20px 50px rgba(74, 158, 255, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '25px',
        color: '#4a9eff',
        letterSpacing: '-0.5px'
      }}>
        {category.title}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {category.skills.map((skill, i) => (
          <span
            key={i}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#e0e0e0',
              fontSize: '0.95rem',
              fontWeight: '500',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(74, 158, 255, 0.2)';
              e.target.style.color = '#ffffff';
              e.target.style.borderColor = 'rgba(74, 158, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#e0e0e0';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function GradientOrbs() {
  const orbsRef = useRef([]);

  useEffect(() => {
    const colors = ['#4a9eff', '#2563eb', '#3b82f6', '#1e40af'];
    orbsRef.current = colors.map((color, i) => ({
      color,
      size: Math.random() * 250 + 300,
      left: Math.random() * 70 + 15,
      top: Math.random() * 70 + 15,
      duration: 10 + i * 2
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {orbsRef.current.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color}, transparent)`,
            filter: 'blur(60px)',
            opacity: 0.25,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            animation: `pulse${i} ${orb.duration}s infinite ease-in-out`
          }}
        />
      ))}
      <style>{`
        ${orbsRef.current.map((_, i) => `
          @keyframes pulse${i} {
            0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.25; }
            50% { transform: scale(1.3) translate(20px, -20px); opacity: 0.4; }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

// Contact Section with Waves
function ContactSection({ isVisible }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();

    let offset = 0;

    function drawWaves() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x < canvas.width; x += 3) {
          const y = canvas.height - 120 - Math.sin((x + offset + i * 60) * 0.008) * 40 - i * 50;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const opacity = 0.04 + i * 0.03;
        ctx.fillStyle = `rgba(74, 158, 255, ${opacity})`;
        ctx.fill();
      }

      offset += 0.8;
      requestAnimationFrame(drawWaves);
    }

    drawWaves();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="contact" style={{
      padding: '120px 40px 100px',
      background: 'linear-gradient(180deg, #0d1a2d 0%, #0a1628 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.8
      }} />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        width: '100%'
      }}>
        <h2 style={{
          fontSize: '2.00rem',
          marginBottom: '30px',
          fontWeight: 'bold',
          color: '#ffffff',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}>
          Get in Touch
        </h2>

        <p style={{
          fontSize: '1.3rem',
          marginBottom: '60px',
          color: '#e0e0e0',
          lineHeight: '1.8',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out 0.2s'
        }}>
          Open to opportunities in <span style={{ color: '#4a9eff', fontWeight: '600' }}>Data Analytics, Software Development, Energy Analysis, Quantitative Analysis, and Cloud Engineering</span>. Let's connect to discuss how I can contribute to your team.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '25px'
        }}>
          {[
            { href: "https://www.linkedin.com/in/eli-k-7496632a3", icon: <Linkedin size={32} />, title: "LinkedIn", subtitle: "Connect with me" },
            { href: "https://github.com/Eyu108", icon: <Github size={32} />, title: "GitHub", subtitle: "View my code" },
            { href: "mailto:elikahsa@gmail.com", icon: <Mail size={32} />, title: "Email", subtitle: "elikahsa@gmail.com" }
          ].map((contact, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                transition: `all 0.6s ease-out ${0.4 + index * 0.15}s`
              }}
            >
              <ContactCard {...contact} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCard({ href, icon, title, subtitle }) {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    padding: '30px',
    background: 'rgba(74, 158, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(74, 158, 255, 0.3)',
    borderRadius: '16px',
    textDecoration: 'none',
    color: '#ffffff',
    transition: 'all 0.4s ease',
    borderColor: isHovered ? 'rgba(74, 158, 255, 0.6)' : 'rgba(74, 158, 255, 0.3)',
    backgroundColor: isHovered ? 'rgba(74, 158, 255, 0.15)' : 'rgba(74, 158, 255, 0.08)',
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 15px 40px rgba(74, 158, 255, 0.2)' : '0 5px 20px rgba(0, 0, 0, 0.1)',
    cursor: href ? 'pointer' : 'default'
  };

  const content = (
    <>
      <div style={{ color: '#4a9eff' }}>{icon}</div>
      <div>
        <div style={{ fontWeight: '700', fontSize: '1.15rem', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '0.95rem', opacity: 0.8, color: '#e0e0e0' }}>{subtitle}</div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </a>
    );
  }

  return <div style={style}>{content}</div>;
}

function Button({ children, onClick, primary }) {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    padding: '16px 38px',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1.05rem',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    ...(primary ? {
      background: isHovered ? '#3a8eef' : '#4a9eff',
      border: 'none',
      color: '#ffffff',
      boxShadow: isHovered ? '0 8px 25px rgba(74, 158, 255, 0.4)' : '0 4px 15px rgba(74, 158, 255, 0.3)',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
    } : {
      background: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
      border: '2px solid rgba(255,255,255,0.3)',
      borderColor: isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)',
      color: '#ffffff',
      backdropFilter: 'blur(10px)'
    })
  };

  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}
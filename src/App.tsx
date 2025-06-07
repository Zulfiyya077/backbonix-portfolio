// src/App.tsx
import { useState, useEffect } from 'react';
import type { Language } from './types';
import { useTheme } from './hooks/useTheme';

// Components
import LoadingSplashScreen from './components/common/LoadingSplashScreen';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { VendorExperience } from './components/sections/VendorExperience'
import { Portfolio } from './components/sections/Portfolio';
import { Contact } from './components/sections/Contact';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 saniyə loading

    return () => clearTimeout(timer);
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // Height of fixed navbar
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'vendors', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    // Optional: Save to localStorage
    localStorage.setItem('preferred-language', lang);
  };

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang && ['az', 'en', 'es'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  return (
    <>
      {/* Loading Splash Screen */}
      {isLoading && <LoadingSplashScreen />}
      
      {/* Main App Content */}
      <div 
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
        } ${isLoading ? 'overflow-hidden' : ''}`}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {/* Navigation */}
        <Navbar
          currentLang={currentLang}
          onLangChange={handleLanguageChange}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero
            currentLang={currentLang}
            isDark={isDark}
            onContactClick={() => scrollToSection('contact')}
          />

          {/* About Section */}
          <About
            currentLang={currentLang}
            isDark={isDark}
          />

          {/* Services Section */}
          <Services
            currentLang={currentLang}
            isDark={isDark}
          />

          {/* Vendor Experience Section */}
          <VendorExperience
            currentLang={currentLang}
            isDark={isDark}
          />

          {/* Portfolio Section */}
          <Portfolio
            currentLang={currentLang}
            isDark={isDark}
          />

          {/* Contact Section */}
          <Contact
            currentLang={currentLang}
            isDark={isDark}
          />
        </main>

        {/* Footer */}
        <Footer
          currentLang={currentLang}
          isDark={isDark}
          onNavigate={scrollToSection}
        />
      </div>
    </>
  );
}

export default App;
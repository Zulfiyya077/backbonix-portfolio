// src/components/common/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface NavbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLangChange,
  isDark,
  onThemeToggle,
  activeSection,
  onNavigate
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = translations[currentLang];

  // Simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { key: 'home', label: currentLang === 'az' ? 'Ana Səhifə' : currentLang === 'en' ? 'Home' : 'Inicio' },
    { key: 'about', label: t.nav.about },
    { key: 'services', label: t.nav.services },
    { key: 'vendors', label: currentLang === 'az' ? 'Vendorlar' : currentLang === 'en' ? 'Vendors' : 'Proveedores' },
    { key: 'portfolio', label: t.nav.portfolio },
    { key: 'contact', label: t.nav.contact }
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar - Always solid background */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900 shadow-2xl border-b border-gray-700/50' 
          : 'bg-white shadow-2xl border-b border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-3">
            
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gradient-animated group-hover:scale-105 transition-transform duration-300">
                BackBonix
              </h1>
              <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 transition-all duration-300" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`group relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === item.key
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg scale-105'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {item.label}
                  
                  {/* Hover effect */}
                  {activeSection !== item.key && (
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-600/10 to-emerald-600/10" />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Controls - Only Language and Theme */}
            <div className="hidden md:flex items-center space-x-3">
              
              {/* Language Selector */}
              <div className="relative group">
                <select
                  value={currentLang}
                  onChange={(e) => onLangChange(e.target.value as Language)}
                  className={`appearance-none bg-transparent border-2 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer ${
                    isDark 
                      ? 'border-gray-600 text-white hover:border-emerald-500 focus:border-emerald-500' 
                      : 'border-gray-300 text-gray-900 hover:border-blue-500 focus:border-blue-500'
                  }`}
                >
                  <option value="az" className="bg-white text-gray-900">AZ</option>
                  <option value="en" className="bg-white text-gray-900">EN</option>
                  <option value="es" className="bg-white text-gray-900">ES</option>
                </select>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={onThemeToggle}
                className={`p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-gray-700/50 text-yellow-400 hover:bg-yellow-400/20 shadow-lg' 
                    : 'bg-gray-100/50 text-gray-600 hover:bg-blue-100/50 shadow-lg'
                }`}
              >
                {isDark ? 
                  <Sun size={20} className="drop-shadow-lg" /> : 
                  <Moon size={20} className="drop-shadow-lg" />
                }
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'hover:bg-gray-700/50' 
                    : 'hover:bg-gray-100/50'
                }`}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                  }`} />
                  <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-2 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`px-4 py-6 space-y-3 ${
            isDark ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-200'
          }`}>
            {navItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-102 ${
                  activeSection === item.key
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Contact Button */}
            <div className="pt-4 border-t border-gray-300/20">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full btn-modern text-white px-6 py-3 rounded-xl font-semibold text-center"
              >
                {currentLang === 'az' ? 'Bizimlə Əlaqə' : currentLang === 'en' ? 'Contact Us' : 'Contáctanos'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Floating Controls for Tablet/Mobile - Bottom Left */}
      <div className="md:hidden fixed bottom-6 left-6 z-50 flex flex-col space-y-3">
        
        {/* Language Selector - Floating */}
        <div className="relative group">
          <button className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700`}>
            <Globe className="w-5 h-5" />
          </button>
          
          {/* Language Options */}
          <div className={`absolute bottom-full left-0 mb-2 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } rounded-xl shadow-xl border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          } opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100`}>
            <div className="p-2 space-y-1">
              {['az', 'en', 'es'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLangChange(lang as Language)}
                  className={`block w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    currentLang === lang
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                      : isDark
                      ? 'text-gray-300 hover:bg-gray-700/50'
                      : 'text-gray-700 hover:bg-gray-100/50'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle - Floating */}
        <button
          onClick={onThemeToggle}
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-yellow-400 hover:from-purple-700 hover:to-indigo-700' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
          }`}
        >
          {isDark ? 
            <Sun className="w-5 h-5 drop-shadow-lg" /> : 
            <Moon className="w-5 h-5 drop-shadow-lg" />
          }
        </button>
      </div>
    </>
  );
};
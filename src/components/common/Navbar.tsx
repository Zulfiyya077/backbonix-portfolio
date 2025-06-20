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
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

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
        setIsMobileLangOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileLangOpen && !target.closest('.mobile-lang-menu')) {
        setIsMobileLangOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileLangOpen]);

  const navItems = [
    { key: 'home', label: currentLang === 'en' ? 'Home' : currentLang === 'az' ? 'Ana Səhifə' : 'Inicio' },
    { key: 'about', label: t.nav.about },
    { key: 'services', label: t.nav.services },
    { key: 'vendors', label: currentLang === 'en' ? 'Vendors' : currentLang === 'az' ? 'Vendorlar' : 'Proveedores' },
    { key: 'portfolio', label: t.nav.portfolio },
    { key: 'contact', label: t.nav.contact }
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  const handleMobileLangClick = () => {
    setIsMobileLangOpen(!isMobileLangOpen);
  };

  const handleMobileLangChange = (lang: Language) => {
    onLangChange(lang);
    setIsMobileLangOpen(false);
  };

  return (
    <>
      {/* Navbar - Always solid background */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark
        ? 'bg-gray-900 shadow-2xl border-b border-gray-700/50'
        : 'bg-white shadow-2xl border-b border-gray-200/50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-3">

            {/* Logo - Düzəldilmiş versiya */}
            <div
              className="flex-shrink-0 cursor-pointer group flex items-center"
              onClick={() => handleNavClick('home')}
            >
              {/* Logo şəkli */}
              <div className="relative mr-3">

                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="80" height="60" viewBox="0 -70 50 500" preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,777.000000) scale(0.050000,-0.050000)" fill="#44cad5" stroke="none"> <path d="M4375 14849 c-102 -56 -140 -182 -86 -287 28 -54 21 -73 -195 -531 l-224 -476 -83 -5 c-46 -4 -101 -16 -123 -28 -77 -41 -1222 491 -1223 569 -3 249 -322 420 -517 275 -361 -267 8 -791 380 -539 l71 48 561 -250 c498 -223 560 -255 543 -287 -26 -48 -24 -231 3 -282 20 -37 -9 -72 -285 -349 -331 -331 -318 -323 -419 -273 -215 108 -517 21 -661 -190 l-32 -45 -437 198 -438 199 -16 83 c-45 224 -313 305 -476 142 -238 -238 107 -598 383 -399 35 26 946 -374 926 -407 -28 -45 19 -237 84 -345 l69 -115 -203 -302 c-245 -366 -251 -373 -311 -373 -170 0 -243 -207 -118 -332 146 -146 340 -52 343 165 1 151 398 762 477 737 167 -54 354 -28 498 66 l76 51 124 -87 c68 -48 187 -133 264 -190 l140 -103 -7 -105 c-26 -387 498 -526 664 -176 31 66 39 70 621 251 685 213 616 202 697 110 126 -143 336 -186 512 -107 l87 40 268 -252 c212 -200 268 -264 268 -305 0 -167 194 -285 348 -213 226 108 149 450 -102 450 -54 0 -108 -10 -121 -23 -18 -18 -545 439 -545 473 0 3 14 37 30 77 91 219 -22 481 -245 566 l-85 32 0 677 0 676 69 33 69 33 504 -297 504 -297 427 -595 c350 -488 427 -607 427 -661 0 -166 200 -225 291 -85 55 84 -1 203 -110 231 -22 6 -217 260 -449 584 l-410 575 371 315 c296 252 382 315 424 312 213 -18 272 2 344 120 107 175 -23 394 -233 394 -152 0 -285 -148 -262 -292 11 -66 5 -72 -379 -399 l-390 -332 -494 291 -494 290 -2 77 c-5 196 -177 328 -367 280 -38 -10 -83 -19 -100 -21 -73 -6 -900 685 -900 753 0 158 -182 259 -325 182z m672 -738 l437 -349 3 -109 c3 -127 50 -206 149 -253 l63 -30 1 -681 0 -680 -59 -22 c-79 -30 -1462 1145 -1482 1259 -11 60 -50 143 -102 216 -19 27 18 120 195 500 222 474 232 488 338 495 11 1 217 -155 457 -346z m-252 -1698 l643 -558 -40 -54 c-22 -29 -50 -107 -63 -172 l-22 -119 -580 -179 c-319 -99 -583 -171 -587 -160 -65 195 -289 294 -476 211 -52 -23 -105 -35 -117 -28 -26 16 -351 248 -445 318 l-63 46 28 106 c32 120 21 224 -36 355 l-38 89 308 309 308 308 101 -26 c125 -32 234 -5 330 80 78 70 -10 132 749 -526z" /> </g> </svg>

              </div>

              {/* Logo mətni */}
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-animated group-hover:scale-105 transition-transform duration-300">
                  BackBonix
                </h1>

              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`group relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeSection === item.key
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
                  className={`appearance-none bg-transparent border-2 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer ${isDark
                    ? 'border-gray-600 text-white hover:border-emerald-500 focus:border-emerald-500'
                    : 'border-gray-300 text-gray-900 hover:border-blue-500 focus:border-blue-500'
                    }`}
                >
                  <option value="en" className="bg-white text-gray-900">EN</option>
                  <option value="az" className="bg-white text-gray-900">AZ</option>
                  <option value="es" className="bg-white text-gray-900">ES</option>
                </select>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={onThemeToggle}
                className={`p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark
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
                className={`p-2 rounded-xl transition-all duration-300 ${isDark
                  ? 'hover:bg-gray-700/50'
                  : 'hover:bg-gray-100/50'
                  }`}
                data-mobile-menu
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                    }`} />
                  <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-2 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`} />
                  <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'
                    }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className={`px-4 py-6 space-y-3 ${isDark ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-200'
            }`}>
            {navItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-102 ${activeSection === item.key
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
                {currentLang === 'en' ? 'Contact Us' : currentLang === 'az' ? 'Bizimlə Əlaqə' : 'Contáctanos'}
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

        {/* Language Selector - Fixed Mobile Version */}
        <div className="relative mobile-lang-menu">
          <button
            onClick={handleMobileLangClick}
            className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700 active:scale-95 ${isMobileLangOpen ? 'scale-110 ring-4 ring-blue-400/50' : 'hover:scale-110'
              }`}
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* Language Options - Click-based instead of hover */}
          <div className={`absolute bottom-full left-0 mb-2 ${isDark ? 'bg-gray-800' : 'bg-white'
            } rounded-xl shadow-xl border ${isDark ? 'border-gray-600' : 'border-gray-200'
            } transition-all duration-300 transform ${isMobileLangOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
            }`}>
            <div className="p-2 space-y-1">
              {(['en', 'az', 'es'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleMobileLangChange(lang)}
                  className={`block w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 min-w-[60px] text-center active:scale-95 ${currentLang === lang
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-700/50 active:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100/50 active:bg-gray-100'
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
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center active:scale-95 hover:scale-110 ${isDark
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

      {/* Mobile Language Menu Backdrop */}
      {isMobileLangOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMobileLangOpen(false)}
        />
      )}
    </>
  );
};
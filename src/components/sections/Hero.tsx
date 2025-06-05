// src/components/sections/Hero.tsx
import React, { useEffect, useState } from 'react';
import { ArrowRight, Network, Shield, Server, ChevronDown, Wifi, Database, Globe, Monitor, Cpu, HardDrive, Router, Lock } from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface HeroProps {
  currentLang: Language;
  isDark: boolean;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  currentLang, 
  isDark, 
  onContactClick 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const t = translations[currentLang];

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 30,
        y: (e.clientY - window.innerHeight / 2) / 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating IT icons with different positions and delays
  const floatingIcons = [
    { icon: Wifi, size: 'w-6 h-6', position: 'top-20 left-16', delay: '0s', color: 'text-blue-400' },
    { icon: Database, size: 'w-5 h-5', position: 'top-32 right-20', delay: '1s', color: 'text-emerald-400' },
    { icon: Globe, size: 'w-7 h-7', position: 'top-48 left-32', delay: '2s', color: 'text-indigo-400' },
    { icon: Monitor, size: 'w-6 h-6', position: 'bottom-32 right-16', delay: '0.5s', color: 'text-cyan-400' },
    { icon: Cpu, size: 'w-5 h-5', position: 'bottom-48 left-20', delay: '1.5s', color: 'text-purple-400' },
    { icon: HardDrive, size: 'w-6 h-6', position: 'top-64 right-32', delay: '2.5s', color: 'text-teal-400' },
    { icon: Router, size: 'w-5 h-5', position: 'bottom-20 left-40', delay: '3s', color: 'text-blue-300' },
    { icon: Lock, size: 'w-4 h-4', position: 'top-40 left-64', delay: '0.8s', color: 'text-emerald-300' },
  ];

  return (
    <section 
      id="home" 
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background with animated elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-emerald-900/10' 
            : 'bg-gradient-to-br from-blue-50 via-white to-emerald-50'
        }`} />
        
        {/* Floating background orbs */}
        <div 
          className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-blue-500' : 'bg-blue-300'
          }`}
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div 
          className={`absolute w-48 h-48 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}
          style={{
            bottom: '20%',
            right: '15%',
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />

        {/* Floating IT Icons */}
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} opacity-30 pointer-events-none hidden lg:block`}
            style={{ 
              animationDelay: item.delay,
              animation: 'float 6s ease-in-out infinite'
            }}
          >
            <div className={`${item.color} drop-shadow-lg transform hover:scale-110 transition-transform duration-300`}>
              <item.icon className={item.size} />
            </div>
          </div>
        ))}

        {/* Mobile floating icons (simplified) */}
        <div className="lg:hidden">
          <div className="absolute top-20 right-8 opacity-20 animate-pulse">
            <Wifi className="w-5 h-5 text-blue-400" />
          </div>
          <div className="absolute bottom-32 left-8 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="absolute top-48 right-16 opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>
            <Globe className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gradient-animated">
              {t.hero.title}
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl md:text-2xl font-medium mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t.hero.subtitle}
          </p>
          
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {t.hero.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={onContactClick}
            className="btn-modern text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold group transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>{t.hero.cta}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-500/10' 
                : 'border-blue-500 text-blue-600 hover:bg-blue-500/10'
            }`}
          >
            {currentLang === 'az' ? 'Ətraflı' : currentLang === 'en' ? 'Learn More' : 'Más'}
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {[
            { 
              icon: Network, 
              title: currentLang === 'az' ? 'Şəbəkə' : currentLang === 'en' ? 'Network' : 'Red',
              color: 'from-blue-500 to-cyan-600'
            },
            { 
              icon: Shield, 
              title: currentLang === 'az' ? 'Təhlükəsizlik' : currentLang === 'en' ? 'Security' : 'Seguridad',
              color: 'from-emerald-500 to-teal-600'
            },
            { 
              icon: Server, 
              title: currentLang === 'az' ? 'İnfrastruktur' : currentLang === 'en' ? 'Infrastructure' : 'Infraestructura',
              color: 'from-indigo-500 to-purple-600'
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`card-3d p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              }`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}>
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className={`text-sm sm:text-base font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
      </div>
    </section>
  );
};
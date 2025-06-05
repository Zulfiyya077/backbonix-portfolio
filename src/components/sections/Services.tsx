// src/components/sections/Services.tsx
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Network, 
  Server, 
  Camera, 
  Cable, 
  Wifi, 
  ArrowRight, 
  Settings,
  Monitor,
  HardDrive,
  Router,
  Lock
} from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface ServicesProps {
  currentLang: Language;
  isDark: boolean;
}

export const Services: React.FC<ServicesProps> = ({ currentLang, isDark }) => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const t = translations[currentLang];

  // Mouse tracking for 3D effects (same as Hero)
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

  const services = [
    { 
      icon: Shield, 
      title: t.services.items[0].title, 
      description: t.services.items[0].description,
      color: 'from-blue-600 to-blue-700'
    },
    { 
      icon: Network, 
      title: t.services.items[1].title, 
      description: t.services.items[1].description,
      color: 'from-emerald-600 to-emerald-700'
    },
    { 
      icon: Server, 
      title: t.services.items[2].title, 
      description: t.services.items[2].description,
      color: 'from-indigo-600 to-indigo-700'
    },
    { 
      icon: Camera, 
      title: t.services.items[3].title, 
      description: t.services.items[3].description,
      color: 'from-cyan-600 to-cyan-700'
    },
    { 
      icon: Cable, 
      title: t.services.items[4].title, 
      description: t.services.items[4].description,
      color: 'from-teal-600 to-teal-700'
    },
    { 
      icon: Wifi, 
      title: t.services.items[5].title, 
      description: t.services.items[5].description,
      color: 'from-purple-600 to-purple-700'
    }
  ];

  // Floating IT icons (same as Hero)
  const floatingIcons = [
    { icon: Monitor, size: 'w-6 h-6', position: 'top-20 left-16', delay: '0s', color: 'text-cyan-400' },
    { icon: HardDrive, size: 'w-5 h-5', position: 'top-32 right-20', delay: '1.5s', color: 'text-purple-400' },
    { icon: Router, size: 'w-6 h-6', position: 'bottom-32 left-20', delay: '2s', color: 'text-blue-400' },
    { icon: Lock, size: 'w-4 h-4', position: 'bottom-48 right-32', delay: '0.8s', color: 'text-emerald-400' },
  ];

  return (
    <section 
      id="services" 
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background with animated elements (SAME AS HERO) */}
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
            <item.icon className={`${item.size} ${item.color} drop-shadow-lg`} />
          </div>
        ))}

        {/* Mobile floating icons */}
        <div className="lg:hidden">
          <div className="absolute top-20 right-8 opacity-20 animate-pulse">
            <Monitor className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="absolute bottom-32 left-8 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
            <Router className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center min-h-screen">
        <div className="w-full py-10">
        
        {/* Header (same style as Hero) */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="text-gradient-animated">
              {t.services.title}
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gradient-blue-green mb-6">
            {t.services.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-3d group relative p-4 lg:p-6 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              }`}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Service Icon */}
              <div className="mb-4">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <service.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-sm" />
                </div>
              </div>

              {/* Service Content */}
              <div className="space-y-3">
                <h3 className={`text-base lg:text-lg font-bold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                
                <p className={`text-sm leading-relaxed line-clamp-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>

                {/* CTA */}
                <div className="pt-2">
                  <div className={`flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    <span className="text-xs font-medium">
                      {currentLang === 'az' ? 'Ətraflı öyrən' : currentLang === 'en' ? 'Learn more' : 'Saber más'}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${service.color} blur-xl -z-10`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-modern text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-all duration-300 hover:scale-105"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>
              {currentLang === 'az' ? 'Təklif İstəyin' : currentLang === 'en' ? 'Get Quote' : 'Solicitar Cotización'}
            </span>
          </button>
        </div>
        </div>
      </div>
    </section>
  );
};
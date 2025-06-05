// src/components/sections/About.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, Clock, Shield, Network, CheckCircle, Zap, Globe, Target } from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface AboutProps {
  currentLang: Language;
  isDark: boolean;
}

export const About: React.FC<AboutProps> = ({ currentLang, isDark }) => {
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const statsRef = useRef<HTMLDivElement>(null);

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

  // Features with Hero-style design
  const features = [
    {
      icon: Users,
      title: currentLang === 'az' ? 'Peşəkar Komanda' : currentLang === 'en' ? 'Expert Team' : 'Equipo Experto',
      description: currentLang === 'az' ? '10+ il təcrübə' : currentLang === 'en' ? '10+ years experience' : '10+ años experiencia',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Award,
      title: currentLang === 'az' ? 'Keyfiyyət' : currentLang === 'en' ? 'Quality' : 'Calidad',
      description: currentLang === 'az' ? '100% zəmanət' : currentLang === 'en' ? '100% guarantee' : '100% garantía',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Clock,
      title: currentLang === 'az' ? '24/7 Dəstək' : currentLang === 'en' ? '24/7 Support' : 'Soporte 24/7',
      description: currentLang === 'az' ? 'Həmişə hazırıq' : currentLang === 'en' ? 'Always ready' : 'Siempre listos',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Shield,
      title: currentLang === 'az' ? 'Etibarlılıq' : currentLang === 'en' ? 'Reliability' : 'Confiabilidad',
      description: currentLang === 'az' ? 'Güvənli həllər' : currentLang === 'en' ? 'Secure solutions' : 'Soluciones seguras',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  // Stats with animation
  const stats = [
    { number: 250, suffix: '+', label: currentLang === 'az' ? 'Layihə' : 'Projects', icon: Target },
    { number: 500, suffix: '+', label: currentLang === 'az' ? 'Müştəri' : 'Clients', icon: Users },
    { number: 24, suffix: '/7', label: currentLang === 'az' ? 'Dəstək' : 'Support', icon: Clock },
    { number: 10, suffix: '+', label: currentLang === 'az' ? 'İl' : 'Years', icon: Award }
  ];

  // Floating IT icons (like Hero)
  const floatingIcons = [
    { icon: Zap, size: 'w-5 h-5', position: 'top-20 left-16', delay: '0s', color: 'text-yellow-400' },
    { icon: Globe, size: 'w-6 h-6', position: 'top-32 right-20', delay: '1.5s', color: 'text-blue-400' },
    { icon: Network, size: 'w-5 h-5', position: 'bottom-32 left-20', delay: '2.5s', color: 'text-emerald-400' },
    { icon: CheckCircle, size: 'w-4 h-4', position: 'bottom-48 right-32', delay: '1s', color: 'text-green-400' },
  ];

  // Number animation
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        stats.forEach((stat, index) => {
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * stat.number);
            
            setAnimatedNumbers(prev => {
              const newNumbers = [...prev];
              newNumbers[index] = current;
              return newNumbers;
            });
            
            if (progress < 1) requestAnimationFrame(animate);
          };
          
          setTimeout(() => requestAnimationFrame(animate), index * 200);
        });
      }
    }, { threshold: 0.3 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [stats]);

  return (
    <section 
      id="about" 
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background with animated elements (SAME AS HERO) */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-tr from-gray-900 via-blue-900/20 to-emerald-900/10' 
            : 'bg-gradient-to-tr from-blue-50 via-white to-emerald-50'
        }`} />
        
        {/* Floating background orbs */}
        <div 
          className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-blue-500' : 'bg-blue-300'
          }`}
          style={{
            top: '15%',
            left: '10%',
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
        <div 
          className={`absolute w-48 h-48 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}
          style={{
            bottom: '15%',
            right: '15%',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
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
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="absolute bottom-32 left-8 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center min-h-screen">
        <div className="w-full py-10">
        
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="text-gradient-animated">
                {t.about.title}
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gradient-blue-green mb-6">
              {t.about.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Features */}
            <div className="space-y-8">
              <p className={`text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t.about.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`card-3d p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'glass-effect-dark border border-gray-700/50' 
                        : 'glass-effect border border-white/20 shadow-lg'
                    }`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 mb-3 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className={`text-sm sm:text-base font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-xs sm:text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Stats */}
            <div ref={statsRef} className="space-y-6">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`card-3d-lift text-center p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'glass-effect-dark border border-gray-700/50' 
                        : 'glass-effect border border-white/20 shadow-lg'
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center`}>
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-blue-green mb-2">
                      {animatedNumbers[index] || 0}{stat.suffix}
                    </div>
                    <div className={`text-xs sm:text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Visual Card */}
              <div className={`card-3d p-6 sm:p-8 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              }`}>
                <Network className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                } transition-all duration-300 hover:scale-110`} />
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  BackBonix Team
                </h3>
                <p className={`text-sm sm:text-base ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                } mb-3`}>
                  Professional IT Solutions
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className={`text-xs sm:text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {currentLang === 'az' ? 'Sertifikatlaşmış Mütəxəssislər' : currentLang === 'en' ? 'Certified Specialists' : 'Especialistas Certificados'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
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
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Visibility observer for box animations - REPEATABLE
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation when scrolling away
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '-10% 0px -10% 0px' // More sensitive detection
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Features with Hero-style design
  const features = [
    {
      icon: Award,
      title: currentLang === 'en' ? 'Quality' : currentLang === 'az' ? 'Keyfiyyət' : 'Calidad',
      description: currentLang === 'en' ? '100% guarantee' : currentLang === 'az' ? '100% zəmanət' : '100% garantía',
      color: 'from-emerald-500 to-teal-600',
      animationClass: 'animate-slide-in-left'
    },
    {
      icon: Clock,
      title: currentLang === 'en' ? '24/7 Support' : currentLang === 'az' ? '24/7 Dəstək' : 'Soporte 24/7',
      description: currentLang === 'en' ? 'Always ready' : currentLang === 'az' ? 'Həmişə hazırıq' : 'Siempre listos',
      color: 'from-indigo-500 to-blue-600',
      animationClass: 'animate-slide-in-right'
    },
    {
      icon: Shield,
      title: currentLang === 'en' ? 'Reliability' : currentLang === 'az' ? 'Etibarlılıq' : 'Confiabilidad',
      description: currentLang === 'en' ? 'Secure solutions' : currentLang === 'az' ? 'Güvənli həllər' : 'Soluciones seguras',
      color: 'from-blue-500 to-indigo-600',
      animationClass: 'animate-slide-in-bottom'
    }
  ];

  // Stats with animation - FIXED: moved outside useEffect
  const stats = [
    { 
      number: 250, 
      suffix: '+', 
      label: currentLang === 'en' ? 'Projects' : currentLang === 'az' ? 'Layihə' : 'Proyectos', 
      icon: Target,
      animationClass: 'animate-scale-in'
    },
    { 
      number: 500, 
      suffix: '+', 
      label: currentLang === 'en' ? 'Clients' : currentLang === 'az' ? 'Müştəri' : 'Clientes', 
      icon: Users,
      animationClass: 'animate-slide-in-right'
    },
    { 
      number: 24, 
      suffix: '/7', 
      label: currentLang === 'en' ? 'Support' : currentLang === 'az' ? 'Dəstək' : 'Soporte', 
      icon: Clock,
      animationClass: 'animate-bounce-in'
    }
  ];

  // Floating IT icons (like Hero)
  const floatingIcons = [
    { icon: Zap, size: 'w-5 h-5', position: 'top-20 left-16', delay: '0s', color: 'text-yellow-400' },
    { icon: Globe, size: 'w-6 h-6', position: 'top-32 right-20', delay: '1.5s', color: 'text-blue-400' },
    { icon: Network, size: 'w-5 h-5', position: 'bottom-32 left-20', delay: '2.5s', color: 'text-emerald-400' },
    { icon: CheckCircle, size: 'w-4 h-4', position: 'bottom-48 right-32', delay: '1s', color: 'text-green-400' },
  ];

  // Number animation - REPEATABLE: reset hasAnimated when leaving section
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        
        // Initialize array with zeros
        setAnimatedNumbers(new Array(stats.length).fill(0));
        
        stats.forEach((stat, index) => {
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
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          // Start animation with delay for each stat
          setTimeout(() => {
            requestAnimationFrame(animate);
          }, index * 200);
        });
      } else if (!entry.isIntersecting) {
        // Reset animation when scrolling away
        setHasAnimated(false);
        setAnimatedNumbers(new Array(stats.length).fill(0));
      }
    }, { 
      threshold: 0.3,
      rootMargin: '-10% 0px -10% 0px'
    });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []); // Remove hasAnimated dependency to allow reset

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-100px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slideInTop {
            from { opacity: 0; transform: translateY(-80px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideInBottom {
            from { opacity: 0; transform: translateY(80px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
          
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Repeatable animations - reset when not visible */
          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-slide-in-top {
            animation: slideInTop 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-slide-in-bottom {
            animation: slideInBottom 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-scale-in {
            animation: scaleIn 0.6s ease-out forwards;
            opacity: 0;
          }
          
          .animate-bounce-in {
            animation: bounceIn 0.9s ease-out forwards;
            opacity: 0;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.7s ease-out forwards;
            opacity: 0;
          }
          
          /* Reset animations when not visible */
          .animation-reset {
            opacity: 0 !important;
            transform: none !important;
            animation: none !important;
          }
          
          .animate-with-delay-1 { animation-delay: 0.1s; }
          .animate-with-delay-2 { animation-delay: 0.2s; }
          .animate-with-delay-3 { animation-delay: 0.3s; }
          .animate-with-delay-4 { animation-delay: 0.4s; }
          .animate-with-delay-5 { animation-delay: 0.5s; }
        `
      }} />

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
            } ${isVisible ? 'animate-fade-in-up animate-with-delay-1' : 'animation-reset'}`}>
              <span className="text-gradient-animated">
                {t.about.title}
              </span>
            </h2>
            <p className={`text-lg sm:text-xl md:text-2xl font-medium text-gradient-blue-green mb-6 ${
              isVisible ? 'animate-fade-in-up animate-with-delay-2' : 'animation-reset'
            }`}>
              {t.about.subtitle}
            </p>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full ${
              isVisible ? 'animate-scale-in animate-with-delay-3' : 'animation-reset'
            }`} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left - Description Only */}
            <div className="space-y-6">
              <p className={`text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              } ${isVisible ? 'animate-slide-in-left animate-with-delay-2' : 'animation-reset'}`}>
                {t.about.description}
              </p>
            </div>

            {/* Right - Company Card */}
            <div ref={statsRef} className="flex items-center justify-center lg:justify-start">
              {/* Company Visual Card - Enhanced */}
              <div className={`card-3d p-8 lg:p-12 rounded-2xl text-center transition-all duration-300 hover:scale-105 w-full max-w-md ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              } ${isVisible ? 'animate-scale-in animate-with-delay-5' : 'animation-reset'}`}>
                
                {/* Company Logo/Icon */}
                <div className="mb-6">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg mb-4">
                    <Network className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                </div>

                {/* Company Info */}
                <div className="text-center">
                  <h3 className={`text-2xl lg:text-3xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    BackBonix
                  </h3>
                  <p className={`text-lg lg:text-xl font-medium mb-4 text-gradient-blue-green`}>
                    IT Infrastructure Excellence
                  </p>
                  <p className={`text-base lg:text-lg ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  } mb-6`}>
                    Professional IT Solutions
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className={`text-sm lg:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {currentLang === 'en' ? 'Expert Team' : currentLang === 'az' ? 'Peşəkar Komanda' : 'Equipo Experto'}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className={`text-sm lg:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {currentLang === 'en' ? '24/7 Support' : currentLang === 'az' ? '24/7 Dəstək' : 'Soporte 24/7'}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className={`text-sm lg:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {currentLang === 'en' ? 'Quality Solutions' : currentLang === 'az' ? 'Keyfiyyətli Həllər' : 'Soluciones de Calidad'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
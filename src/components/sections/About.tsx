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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Visibility observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating IT icons
  const floatingIcons = [
    { icon: Zap, size: 'w-5 h-5', position: 'top-20 left-16', delay: '0s', color: 'text-yellow-400' },
    { icon: Globe, size: 'w-6 h-6', position: 'top-32 right-20', delay: '1.5s', color: 'text-blue-400' },
    { icon: Network, size: 'w-5 h-5', position: 'bottom-32 left-20', delay: '2.5s', color: 'text-emerald-400' },
    { icon: CheckCircle, size: 'w-4 h-4', position: 'bottom-48 right-32', delay: '1s', color: 'text-green-400' },
  ];

  // About content based on language
  const aboutContent = {
    en: {
      title: "About BackBonix",
      subtitle: "Professional IT Infrastructure Solutions",
      paragraph1: "At BackBonix, we specialize in delivering comprehensive IT infrastructure solutions for businesses of all sizes. Our core services include network design and configuration, structured cabling, security implementation, wireless access point deployment, and high-performance IP camera surveillance systems. With a focus on reliability, performance, and scalability, we tailor each project to meet our clients' specific operational needs.",
      paragraph2: "We bring deep technical expertise and industry-standard best practices to every job—whether it's setting up a secure firewall, configuring enterprise-grade switches, or managing multi-site connectivity. Our infrastructure cabling solutions ensure clean, organized, and future-ready environments. We understand that uptime and data security are vital, which is why we treat every setup with precision and care.",
      paragraph3: "BackBonix is committed to long-term partnerships, offering ongoing support and maintenance to keep your systems running at their best. From startups to established enterprises, our goal is to build the digital backbone of your business—securely and efficiently.",
      cta: "Let us power your business with infrastructure you can trust."
    },
    az: {
      title: "BackBonix Haqqında",
      subtitle: "Professional IT İnfrastruktur Həlləri",
      paragraph1: "BackBonix olaraq, bütün ölçülü bizneslərgə hərtərəfli IT infrastruktur həlləri təqdim etməkdə ixtisaslaşırıq. Əsas xidmətlərimizə şəbəkə dizaynı və konfiqurasiyası, strukturlaşdırılmış kablaj, təhlükəsizlik tətbiqi, simsiz giriş nöqtələrinin yerləşdirilməsi və yüksək performanslı IP kamera nəzarət sistemləri daxildir.",
      paragraph2: "Hər işə dərin texniki təcrübə və sənaye standartı ən yaxşı təcrübələr gətiririk - təhlükəsiz firewall quraşdırılması, müəssisə səviyyəli switchlərin konfiqurasiyası və ya çoxsaytlı əlaqənin idarə edilməsi olsun. İnfrastruktur kablaj həllərimiz təmiz, mütəşəkkil və gələcəyə hazır mühitlər təmin edir.",
      paragraph3: "BackBonix uzunmüddətli tərəfdaşlıqlara sadiqdir, sistemlərinizin ən yaxşı vəziyyətdə işləməsini təmin etmək üçün davamlı dəstək və baxım təklif edir. Startaplardan tutmuş qurulmuş müəssisələrə qədər, məqsədimiz biznesinizin rəqəmsal arxa hissəsini təhlükəsiz və səmərəli şəkildə qurmaqdir.",
      cta: "Biznesinizi etibar edə biləcəyiniz infrastrukturla gücləndirək."
    },
    es: {
      title: "Acerca de BackBonix",
      subtitle: "Soluciones Profesionales de Infraestructura IT",
      paragraph1: "En BackBonix, nos especializamos en entregar soluciones integrales de infraestructura IT para empresas de todos los tamaños. Nuestros servicios principales incluyen diseño y configuración de redes, cableado estructurado, implementación de seguridad, despliegue de puntos de acceso inalámbrico y sistemas de vigilancia de cámaras IP de alto rendimiento.",
      paragraph2: "Aportamos profunda experiencia técnica y mejores prácticas estándar de la industria a cada trabajo, ya sea configurando un firewall seguro, configurando switches de nivel empresarial o gestionando conectividad multisitio. Nuestras soluciones de cableado de infraestructura aseguran entornos limpios, organizados y preparados para el futuro.",
      paragraph3: "BackBonix está comprometido con asociaciones a largo plazo, ofreciendo soporte continuo y mantenimiento para mantener sus sistemas funcionando en su mejor estado. Desde startups hasta empresas establecidas, nuestro objetivo es construir la columna vertebral digital de su negocio de manera segura y eficiente.",
      cta: "Permítanos potenciar su negocio con infraestructura en la que pueda confiar."
    }
  };

  const content = aboutContent[currentLang];

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
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
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
          
          .animate-fade-in-up {
            animation: fadeInUp 0.7s ease-out forwards;
            opacity: 0;
          }
          
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
          .animate-with-delay-6 { animation-delay: 0.6s; }
        `
      }} />

      {/* Background with animated elements */}
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
                {content.title}
              </span>
            </h2>
            <p className={`text-lg sm:text-xl md:text-2xl font-medium text-gradient-blue-green mb-6 ${
              isVisible ? 'animate-fade-in-up animate-with-delay-2' : 'animation-reset'
            }`}>
              {content.subtitle}
            </p>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full ${
              isVisible ? 'animate-scale-in animate-with-delay-3' : 'animation-reset'
            }`} />
          </div>

          {/* Content Section */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              
              {/* Paragraph 1 */}
              <div className={`p-6 lg:p-8 rounded-2xl ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              } ${isVisible ? 'animate-slide-in-left animate-with-delay-3' : 'animation-reset'}`}>
                <p className={`text-lg md:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {content.paragraph1}
                </p>
              </div>

              {/* Paragraph 2 */}
              <div className={`p-6 lg:p-8 rounded-2xl ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              } ${isVisible ? 'animate-slide-in-right animate-with-delay-4' : 'animation-reset'}`}>
                <p className={`text-lg md:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {content.paragraph2}
                </p>
              </div>

              {/* Paragraph 3 */}
              <div className={`p-6 lg:p-8 rounded-2xl ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              } ${isVisible ? 'animate-slide-in-left animate-with-delay-5' : 'animation-reset'}`}>
                <p className={`text-lg md:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {content.paragraph3}
                </p>
              </div>

              {/* CTA Section */}
              <div className={`text-center p-6 lg:p-8 rounded-2xl ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border border-blue-500/20' 
                  : 'bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200'
              } ${isVisible ? 'animate-scale-in animate-with-delay-6' : 'animation-reset'}`}>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className={`text-xl lg:text-2xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  BackBonix
                </h3>
                <p className={`text-lg lg:text-xl font-medium ${
                  isDark ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  {content.cta}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
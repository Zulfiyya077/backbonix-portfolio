// src/components/sections/VendorExperience.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Award, Star, Shield, Network, Settings, Trophy, Target, Cpu, Server, Monitor } from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface VendorExperienceProps {
  currentLang: Language;
  isDark: boolean;
}

export const VendorExperience: React.FC<VendorExperienceProps> = ({ 
  currentLang, 
  isDark 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
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

  // Floating IT icons (same style as Hero)
  const floatingIcons = [
    { icon: Trophy, size: 'w-5 h-5', position: 'top-20 left-16', delay: '0s', color: 'text-yellow-400' },
    { icon: Target, size: 'w-6 h-6', position: 'top-32 right-20', delay: '1.5s', color: 'text-blue-400' },
    { icon: Cpu, size: 'w-5 h-5', position: 'bottom-32 left-20', delay: '2s', color: 'text-emerald-400' },
    { icon: Server, size: 'w-4 h-4', position: 'bottom-48 right-32', delay: '0.8s', color: 'text-purple-400' },
    { icon: Monitor, size: 'w-6 h-6', position: 'top-48 left-32', delay: '2.5s', color: 'text-cyan-400' },
  ];

  // Vendor SVG Logos
  const FortinetLogo = () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect x="5" y="15" width="90" height="10" fill="#E31E24" rx="2"/>
      <text x="50" y="24" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">FORTINET</text>
      <circle cx="15" cy="8" r="3" fill="#E31E24"/>
      <circle cx="25" cy="8" r="3" fill="#E31E24"/>
      <circle cx="35" cy="8" r="3" fill="#E31E24"/>
    </svg>
  );

  const CiscoLogo = () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <text x="50" y="25" textAnchor="middle" fill="#1BA0D7" fontSize="12" fontWeight="bold">cisco</text>
      <g fill="#1BA0D7">
        <rect x="10" y="5" width="2" height="8"/>
        <rect x="15" y="3" width="2" height="12"/>
        <rect x="20" y="2" width="2" height="14"/>
        <rect x="25" y="4" width="2" height="10"/>
        <rect x="73" y="4" width="2" height="10"/>
        <rect x="78" y="2" width="2" height="14"/>
        <rect x="83" y="3" width="2" height="12"/>
        <rect x="88" y="5" width="2" height="8"/>
      </g>
    </svg>
  );

  const ArubaLogo = () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <circle cx="20" cy="20" r="12" fill="#FF6900"/>
      <path d="M25 15 L35 25 L30 25 L25 20 L20 25 L15 25 Z" fill="#FF6900"/>
      <text x="55" y="25" textAnchor="middle" fill="#FF6900" fontSize="10" fontWeight="bold">aruba</text>
    </svg>
  );

  const HPLogo = () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <circle cx="50" cy="20" r="18" fill="#0096D6"/>
      <text x="50" y="28" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">hp</text>
    </svg>
  );

  const TPLinkLogo = () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect x="5" y="12" width="90" height="16" fill="#4CAF50" rx="8"/>
      <text x="50" y="23" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">TP-LINK</text>
      <circle cx="20" cy="8" r="2" fill="#4CAF50"/>
      <circle cx="30" cy="8" r="2" fill="#4CAF50"/>
      <circle cx="40" cy="8" r="2" fill="#4CAF50"/>
      <path d="M15 32 Q50 28 85 32" stroke="#4CAF50" strokeWidth="2" fill="none"/>
    </svg>
  );

  const JuniperLogo = () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect x="10" y="10" width="80" height="20" fill="#84BD00" rx="10"/>
      <text x="50" y="23" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">JUNIPER</text>
      <path d="M20 5 L25 10 L20 15 L15 10 Z" fill="#84BD00"/>
      <path d="M80 5 L85 10 L80 15 L75 10 Z" fill="#84BD00"/>
    </svg>
  );

  const HuaweiLogo = () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <circle cx="50" cy="20" r="16" fill="#FF0000"/>
      <path d="M40 12 Q50 8 60 12 Q50 16 40 12" fill="white"/>
      <path d="M40 28 Q50 32 60 28 Q50 24 40 28" fill="white"/>
      <text x="50" y="24" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">HUAWEI</text>
    </svg>
  );

  const vendors = [
    { 
      name: 'Fortinet', 
      logo: <img src="https://exceldisc.com/_next/image?url=https%3A%2F%2Fapiv2.exceldisc.com%2Fmedia%2F135327%2FFortinet-logo.png&w=3840&q=75" alt="Fortinet" className="w-full h-full object-contain" />,
      color: 'from-red-500 to-red-600',
      animationClass: 'animate-slide-in-left'
    },
    { 
      name: 'Cisco', 
      logo: <img src="https://brandlogos.net/wp-content/uploads/2021/11/cisco_systems-logo.png" alt="Cisco" className="w-full h-full object-contain" />,
      color: 'from-blue-500 to-blue-600',
      animationClass: 'animate-slide-in-top'
    },
    { 
      name: 'Aruba', 
      logo: <img src="https://www.svgrepo.com/show/354803/aruba.svg" alt="Aruba" className="w-full h-full object-contain" />,
      color: 'from-orange-500 to-orange-600',
      animationClass: 'animate-bounce-in'
    },
    { 
      name: 'HP', 
      logo: <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/HP_logo_2008.svg" alt="HP" className="w-full h-full object-contain" />,
      color: 'from-indigo-500 to-indigo-600',
      animationClass: 'animate-scale-in'
    },
    { 
      name: 'TP-Link', 
      logo: <img src="https://brandlogos.net/wp-content/uploads/2020/12/tp-link-logo-300x300.png" alt="TP-Link" className="w-full h-full object-contain" />,
      color: 'from-green-500 to-green-600',
      animationClass: 'animate-slide-in-right'
    },
    { 
      name: 'Juniper', 
      logo: <img src="https://cdn.freebiesupply.com/logos/thumbs/1x/juniper-networks-logo.png" alt="Juniper" className="w-full h-full object-contain" />,
      color: 'from-teal-500 to-teal-600',
      animationClass: 'animate-rotate-in'
    },
    { 
      name: 'Huawei', 
      logo: <img src="https://icon2.cleanpng.com/20180920/aib/kisspng-logo-huawei-169126-network-2311cxh-bc2mfgec-sm212-huawei-logo-vector-ai-svg-eps-pdf-free-graphic-1713938787603.webp" alt="Huawei" className="w-full h-full object-contain" />,
      color: 'from-purple-500 to-purple-600',
      animationClass: 'animate-fade-in-up'
    }
  ];

  const features = [
    {
      icon: Settings,
      title: currentLang === 'en' ? 'Continuous Support' : currentLang === 'az' ? 'Davamlı Dəstək' : 'Soporte Continuo',
      description: currentLang === 'en' ? 'Continuous technical support after installation' : currentLang === 'az' ? 'Quraşdırılmadan sonra davamlı texniki dəstək' : 'Soporte técnico continuo después de la instalación',
      color: 'from-green-500 to-green-600',
      animationClass: 'animate-scale-in'
    }
  ];

  const stats = [
    {
      number: '50+',
      label: currentLang === 'en' ? 'Projects' : currentLang === 'az' ? 'Layihə' : 'Proyectos',
      icon: Target,
      animationClass: 'animate-bounce-in'
    },
    {
      number: '24/7',
      label: currentLang === 'en' ? 'Support' : currentLang === 'az' ? 'Dəstək' : 'Soporte',
      icon: Settings,
      animationClass: 'animate-scale-in'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="vendors" 
      className="py-20 relative overflow-hidden"
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
          
          @keyframes rotateIn {
            from { opacity: 0; transform: rotate(-180deg) scale(0.5); }
            to { opacity: 1; transform: rotate(0deg) scale(1); }
          }
          
          @keyframes flipIn {
            from { opacity: 0; transform: rotateY(-90deg); }
            to { opacity: 1; transform: rotateY(0); }
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
          
          .animate-rotate-in {
            animation: rotateIn 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-flip-in {
            animation: flipIn 0.8s ease-out forwards;
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
          .animate-with-delay-6 { animation-delay: 0.6s; }
          .animate-with-delay-7 { animation-delay: 0.7s; }
          .animate-with-delay-8 { animation-delay: 0.8s; }
          .animate-with-delay-9 { animation-delay: 0.9s; }
          .animate-with-delay-10 { animation-delay: 1.0s; }
          .animate-with-delay-11 { animation-delay: 1.1s; }
          .animate-with-delay-12 { animation-delay: 1.2s; }
          .animate-with-delay-13 { animation-delay: 1.3s; }
          .animate-with-delay-14 { animation-delay: 1.4s; }
          .animate-with-delay-15 { animation-delay: 1.5s; }
        `
      }} />

      {/* Background with animated elements (SAME AS OTHER SECTIONS) */}
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
            right: '10%',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div 
          className={`absolute w-48 h-48 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}
          style={{
            bottom: '15%',
            left: '15%',
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
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="absolute bottom-32 left-8 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
            <Target className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (same style as Hero) */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          } ${isVisible ? 'animate-fade-in-up animate-with-delay-1' : 'animation-reset'}`}>
            <span className="text-gradient-animated">
              {t.vendors.title}
            </span>
          </h2>
          <p className={`text-lg sm:text-xl md:text-2xl font-medium text-gradient-blue-green mb-6 ${
            isVisible ? 'animate-fade-in-up animate-with-delay-2' : 'animation-reset'
          }`}>
            {t.vendors.subtitle}
          </p>
          <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full ${
            isVisible ? 'animate-scale-in animate-with-delay-3' : 'animation-reset'
          }`} />
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          } ${isVisible ? 'animate-fade-in-up animate-with-delay-4' : 'animation-reset'}`}>
            {t.vendors.description}
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 mb-16">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              className={`card-3d group p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              } ${isVisible ? `${vendor.animationClass} animate-with-delay-${index + 5}` : 'animation-reset'}`}
            >
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-200">
                  {vendor.logo}
                </div>
                <h3 className={`text-xs sm:text-sm font-bold mb-1 group-hover:text-blue-500 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {vendor.name}
                </h3>
                <p className={`text-xs opacity-70 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                 
                </p>
              </div>
              
              {/* Corner Star */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
              </div>
            </div>
          ))}
        </div>

        {/* Features and Stats Section - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Features Section - Takes 1 column */}
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`card-3d text-center p-6 lg:p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              } ${isVisible ? `${feature.animationClass} animate-with-delay-12` : 'animation-reset'}`}
            >
              <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg`}>
                <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              
              <h3 className={`text-lg lg:text-xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              
              <p className={`text-sm lg:text-base leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}

          {/* Stats Section - Takes 2 columns */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`card-3d text-center p-6 lg:p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'glass-effect-dark border border-gray-700/50' 
                    : 'glass-effect border border-white/20 shadow-lg'
                } ${isVisible ? `${stat.animationClass} animate-with-delay-${index + 10}` : 'animation-reset'}`}
              >
                <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-blue-green mb-2">
                  {stat.number}
                </div>
                <div className={`text-sm lg:text-base font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center ${isVisible ? 'animate-scale-in animate-with-delay-15' : 'animation-reset'}`}>
          <div className={`inline-flex items-center justify-center p-6 lg:p-8 rounded-2xl max-w-4xl mx-auto ${
            isDark 
              ? 'glass-effect-dark border border-gray-700/50' 
              : 'glass-effect border border-white/20 shadow-lg'
          }`}>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Trophy className={`w-8 h-8 mr-3 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-500'
                }`} />
                <h3 className={`text-xl lg:text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentLang === 'en' 
                    ? 'We can work with your vendor products too' 
                    : currentLang === 'az' 
                    ? 'Sizin vendor məhsullarınızla da işləyə bilərik'
                    : 'También podemos trabajar con sus productos de proveedores'
                  }
                </h3>
              </div>
              <p className={`text-base lg:text-lg mb-6 max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentLang === 'en' 
                  ? 'We can work with vendor products not listed here. Contact us to discuss your project.' 
                  : currentLang === 'az' 
                  ? 'Siyahıda olmayan vendor məhsulları ilə də işləyə bilirik. Bizimlə əlaqə saxlayın və layihənizi müzakirə edək.'
                  : 'Podemos trabajar con productos de proveedores que no están listados aquí. Contáctanos para discutir tu proyecto.'
                }
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-modern text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                {currentLang === 'en' ? 'Get Consultation' : currentLang === 'az' ? 'Məsləhət Alın' : 'Obtener Consulta'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
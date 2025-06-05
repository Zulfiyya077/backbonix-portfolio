// src/components/sections/VendorExperience.tsx
import React, { useState, useEffect } from 'react';
import { Award, Star, Shield, Network, Settings, Trophy, Target, Users, Cpu, Server, Monitor } from 'lucide-react';
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

  // Floating IT icons (same style as Hero)
  const floatingIcons = [
    { icon: Trophy, size: 'w-5 h-5', position: 'top-20 left-16', delay: '0s', color: 'text-yellow-400' },
    { icon: Target, size: 'w-6 h-6', position: 'top-32 right-20', delay: '1.5s', color: 'text-blue-400' },
    { icon: Cpu, size: 'w-5 h-5', position: 'bottom-32 left-20', delay: '2s', color: 'text-emerald-400' },
    { icon: Server, size: 'w-4 h-4', position: 'bottom-48 right-32', delay: '0.8s', color: 'text-purple-400' },
    { icon: Monitor, size: 'w-6 h-6', position: 'top-48 left-32', delay: '2.5s', color: 'text-cyan-400' },
  ];

  const vendors = [
    { 
      name: 'Fortinet', 
      logo: 'FORTINET',
      description: currentLang === 'az' ? 'Şəbəkə təhlükəsizliyi' : currentLang === 'en' ? 'Network Security' : 'Seguridad de Red',
      color: 'from-red-500 to-red-600'
    },
    { 
      name: 'Cisco', 
      logo: 'CISCO',
      description: currentLang === 'az' ? 'Şəbəkə infrastrukturu' : currentLang === 'en' ? 'Network Infrastructure' : 'Infraestructura de Red',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Aruba', 
      logo: 'ARUBA',
      description: currentLang === 'az' ? 'Simsiz həllər' : currentLang === 'en' ? 'Wireless Solutions' : 'Soluciones Inalámbricas',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      name: 'HP', 
      logo: 'HP',
      description: currentLang === 'az' ? 'Server və şəbəkə' : currentLang === 'en' ? 'Server & Network' : 'Servidor y Red',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      name: 'TP-Link', 
      logo: 'TP-LINK',
      description: currentLang === 'az' ? 'Şəbəkə avadanlıqları' : currentLang === 'en' ? 'Network Equipment' : 'Equipos de Red',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Juniper', 
      logo: 'JUNIPER',
      description: currentLang === 'az' ? 'Korporativ şəbəkə' : currentLang === 'en' ? 'Enterprise Network' : 'Red Empresarial',
      color: 'from-teal-500 to-teal-600'
    },
    { 
      name: 'Huawei', 
      logo: 'HUAWEI',
      description: currentLang === 'az' ? 'Telekom həlləri' : currentLang === 'en' ? 'Telecom Solutions' : 'Soluciones de Telecomunicaciones',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const features = [
    {
      icon: Award,
      title: currentLang === 'az' ? 'Sertifikatlaşmış Mütəxəssislər' : currentLang === 'en' ? 'Certified Specialists' : 'Especialistas Certificados',
      description: currentLang === 'az' ? 'Hər vendor üzrə sertifikatlaşmış mühəndislər' : currentLang === 'en' ? 'Certified engineers for each vendor' : 'Ingenieros certificados para cada proveedor',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Shield,
      title: currentLang === 'az' ? 'Geniş Təcrübə' : currentLang === 'en' ? 'Extensive Experience' : 'Amplia Experiencia',
      description: currentLang === 'az' ? '10+ il müxtəlif vendor məhsulları ilə işləmə təcrübəsi' : currentLang === 'en' ? '10+ years experience with various vendor products' : '10+ años de experiencia con productos de varios proveedores',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Settings,
      title: currentLang === 'az' ? 'Davamlı Dəstək' : currentLang === 'en' ? 'Continuous Support' : 'Soporte Continuo',
      description: currentLang === 'az' ? 'Quraşdırılmadan sonra davamlı texniki dəstək' : currentLang === 'en' ? 'Continuous technical support after installation' : 'Soporte técnico continuo después de la instalación',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section 
      id="vendors" 
      className="py-20 relative overflow-hidden"
    >
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
          }`}>
            <span className="text-gradient-animated">
              {t.vendors.title}
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gradient-blue-green mb-6">
            {t.vendors.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
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
              }`}
            >
              <div className="text-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${vendor.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Network className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className={`text-xs sm:text-sm font-bold mb-1 group-hover:text-blue-500 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {vendor.logo}
                </h3>
                <p className={`text-xs opacity-70 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {vendor.description}
                </p>
              </div>
              
              {/* Corner Star */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`card-3d text-center p-6 lg:p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              }`}
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
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {[
            {
              number: '7+',
              label: currentLang === 'az' ? 'Vendor Ortağı' : currentLang === 'en' ? 'Vendor Partners' : 'Socios Proveedores',
              icon: Network
            },
            {
              number: '50+',
              label: currentLang === 'az' ? 'Sertifikat' : currentLang === 'en' ? 'Certifications' : 'Certificaciones',
              icon: Award
            },
            {
              number: '100+',
              label: currentLang === 'az' ? 'Layihə' : currentLang === 'en' ? 'Projects' : 'Proyectos',
              icon: Target
            },
            {
              number: '24/7',
              label: currentLang === 'az' ? 'Dəstək' : currentLang === 'en' ? 'Support' : 'Soporte',
              icon: Settings
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`card-3d text-center p-6 lg:p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'glass-effect-dark border border-gray-700/50' 
                  : 'glass-effect border border-white/20 shadow-lg'
              }`}
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

        {/* Call to Action */}
        <div className="text-center">
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
                  {currentLang === 'az' 
                    ? 'Sizin vendor məhsullarınızla da işləyə bilərik' 
                    : currentLang === 'en' 
                    ? 'We can work with your vendor products too' 
                    : 'También podemos trabajar con sus productos de proveedores'
                  }
                </h3>
              </div>
              <p className={`text-base lg:text-lg mb-6 max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentLang === 'az' 
                  ? 'Siyahıda olmayan vendor məhsulları ilə də işləyə bilirik. Bizimlə əlaqə saxlayın və layihənizi müzakirə edək.' 
                  : currentLang === 'en' 
                  ? 'We can work with vendor products not listed here. Contact us to discuss your project.' 
                  : 'Podemos trabajar con productos de proveedores que no están listados aquí. Contáctanos para discutir tu proyecto.'
                }
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-modern text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                {currentLang === 'az' ? 'Məsləhət Alın' : currentLang === 'en' ? 'Get Consultation' : 'Obtener Consulta'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
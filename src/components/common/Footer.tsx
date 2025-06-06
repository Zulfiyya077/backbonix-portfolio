// src/components/common/Footer.tsx
import React from 'react';
import { Mail, Phone, MapPin, Network, ExternalLink, Linkedin, MessageSquare, Send, Instagram } from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface FooterProps {
  currentLang: Language;
  isDark: boolean;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, isDark, onNavigate }) => {
  const t = translations[currentLang];
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: currentLang === 'en' ? 'Company' : currentLang === 'az' ? 'Şirkət' : 'Empresa',
      links: [
        { name: t.nav.about, action: () => onNavigate('about') },
        { name: t.nav.services, action: () => onNavigate('services') },
        { name: t.nav.portfolio, action: () => onNavigate('portfolio') },
        { name: currentLang === 'en' ? 'Team' : currentLang === 'az' ? 'Komanda' : 'Equipo', action: () => onNavigate('about') }
      ]
    },
    {
      title: currentLang === 'en' ? 'Services' : currentLang === 'az' ? 'Xidmətlər' : 'Servicios',
      links: [
        { name: currentLang === 'en' ? 'Network Security' : currentLang === 'az' ? 'Şəbəkə Təhlükəsizliyi' : 'Seguridad de Red', action: () => onNavigate('services') },
        { name: currentLang === 'en' ? 'IT Infrastructure' : currentLang === 'az' ? 'IT İnfrastruktur' : 'Infraestructura IT', action: () => onNavigate('services') },
        { name: currentLang === 'en' ? 'Video Surveillance' : currentLang === 'az' ? 'Video Nəzarət' : 'Video Vigilancia', action: () => onNavigate('services') },
        { name: currentLang === 'en' ? 'Network Setup' : currentLang === 'az' ? 'Şəbəkə Quraşdırılması' : 'Configuración de Red', action: () => onNavigate('services') }
      ]
    },
    {
      title: currentLang === 'en' ? 'Support' : currentLang === 'az' ? 'Dəstək' : 'Soporte',
      links: [
        { name: t.nav.contact, action: () => onNavigate('contact') },
        { name: currentLang === 'en' ? 'Technical Support' : currentLang === 'az' ? 'Texniki Dəstək' : 'Soporte Técnico', action: () => onNavigate('contact') },
        { name: currentLang === 'en' ? 'FAQ' : currentLang === 'az' ? 'Sual-Cavab' : 'FAQ', action: () => onNavigate('contact') },
        { name: currentLang === 'en' ? 'Documentation' : currentLang === 'az' ? 'Sənədlər' : 'Documentación', action: () => onNavigate('contact') }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      href: '#', 
      icon: Linkedin,
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-100 text-blue-600'
    },
    { 
      name: 'WhatsApp', 
      href: '#', 
      icon: MessageSquare,
      color: 'hover:bg-green-600 hover:text-white',
      bgColor: 'bg-green-100 text-green-600'
    },
    { 
      name: 'Telegram', 
      href: '#', 
      icon: Send,
      color: 'hover:bg-blue-500 hover:text-white',
      bgColor: 'bg-blue-100 text-blue-500'
    },
    { 
      name: 'Instagram', 
      href: '#', 
      icon: Instagram,
      color: 'hover:bg-pink-600 hover:text-white',
      bgColor: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <footer className={`relative overflow-hidden ${
      isDark 
        ? 'border-gray-700' 
        : 'border-gray-200'
    } border-t`}>
      {/* Background with animated elements (SAME AS OTHER SECTIONS) */}
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
          }}
        />
        <div 
          className={`absolute w-48 h-48 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}
          style={{
            bottom: '20%',
            right: '15%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gradient-animated">
                  BackBonix
                </h3>
              </div>
              
              <p className={`text-sm leading-relaxed mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentLang === 'en' 
                  ? 'Preparing your business for the future with professional IT infrastructure solutions.'
                  : currentLang === 'az' 
                  ? 'Professional IT infrastruktur həlləri ilə biznesinizi gələcəyə hazırlayırıq.'
                  : 'Preparando su negocio para el futuro con soluciones profesionales de infraestructura IT.'
                }
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    info@backbonix.com
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Virginia, USA
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className={`font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={link.action}
                        className={`text-sm transition-colors duration-200 hover:text-blue-500 ${
                          isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={`py-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className={`font-semibold mb-1 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {currentLang === 'en' 
                  ? 'Subscribe for updates' 
                  : currentLang === 'az' 
                  ? 'Yeniliklər üçün abunə olun'
                  : 'Suscríbete para actualizaciones'
                }
              </h4>
              <p className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentLang === 'en' 
                  ? 'Get notified about new services' 
                  : currentLang === 'az' 
                  ? 'Yeni xidmətlər haqqında məlumat alın'
                  : 'Recibe notificaciones sobre servicios'
                }
              </p>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder={currentLang === 'en' ? 'Email' : currentLang === 'az' ? 'E-mail' : 'Email'}
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1">
                <span className="text-sm">{currentLang === 'en' ? 'Subscribe' : currentLang === 'az' ? 'Abunə ol' : 'Suscribirse'}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={`py-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            {/* Copyright */}
            <div className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © {currentYear} BackBonix. {
                currentLang === 'en' 
                  ? 'All rights reserved.' 
                  : currentLang === 'az' 
                  ? 'Bütün hüquqlar qorunur.'
                  : 'Todos los derechos reservados.'
              }
            </div>

            {/* Social Links - Modern Icons */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    isDark 
                      ? `bg-gray-800/50 hover:bg-gray-700 text-gray-300 ${social.color}` 
                      : `${social.bgColor} ${social.color}`
                  }`}
                  title={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Additional Links */}
            <div className="flex space-x-4">
              <button className={`text-xs transition-colors duration-200 ${
                isDark 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}>
                {currentLang === 'en' ? 'Privacy' : currentLang === 'az' ? 'Məxfilik' : 'Privacidad'}
              </button>
              <button className={`text-xs transition-colors duration-200 ${
                isDark 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}>
                {currentLang === 'en' ? 'Terms' : currentLang === 'az' ? 'Şərtlər' : 'Términos'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
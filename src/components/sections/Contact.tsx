// src/components/sections/Contact.tsx
import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, User, Building, 
  MessageSquare, Clock, ExternalLink, Globe, Zap, Linkedin, Instagram, 
  Github, Twitter 
} from 'lucide-react';
import type { Language, FormData } from '../../types';
import { translations } from '../../i18n/translations';

interface ContactProps {
  currentLang: Language;
  isDark: boolean;
}

export const Contact: React.FC<ContactProps> = ({ currentLang, isDark }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  // Floating IT icons
  const floatingIcons = [
    { icon: Mail, size: 'w-5 h-5', position: 'top-20 left-16', delay: '0s', color: 'text-blue-400' },
    { icon: Phone, size: 'w-4 h-4', position: 'top-32 right-20', delay: '1.5s', color: 'text-emerald-400' },
    { icon: MapPin, size: 'w-5 h-5', position: 'bottom-32 left-20', delay: '2s', color: 'text-purple-400' },
    { icon: Zap, size: 'w-4 h-4', position: 'bottom-48 right-32', delay: '0.8s', color: 'text-cyan-400' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Improved email functionality
      const emailBody = `
Yeni müştəri müraciəti:

Ad: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone}
Şirkət: ${formData.company}

Mesaj:
${formData.message}
      `;

      // Open email client with pre-filled data
      const mailtoLink = `mailto:info@backbonix.com?subject=Yeni müraciət: ${formData.name}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      console.error('Email xətası:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: currentLang === 'az' ? 'Telefon' : currentLang === 'en' ? 'Phone' : 'Teléfono',
      value: '+994 55 123 45 67',
      href: 'tel:+994551234567',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@backbonix.com',
      href: 'mailto:info@backbonix.com',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: MapPin,
      label: currentLang === 'az' ? 'Ünvan' : currentLang === 'en' ? 'Address' : 'Dirección',
      value: 'Bakı, Azərbaycan',
      href: 'https://maps.google.com',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: '#', 
      color: 'hover:bg-blue-600',
      bgColor: isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
    },
    { 
      name: 'WhatsApp', 
      icon: MessageSquare, 
      href: '#', 
      color: 'hover:bg-green-600',
      bgColor: isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-600 border border-green-200'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: '#', 
      color: 'hover:bg-pink-600',
      bgColor: isDark ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'bg-pink-50 text-pink-600 border border-pink-200'
    },
    { 
      name: 'GitHub', 
      icon: Github, 
      href: '#', 
      color: 'hover:bg-gray-600',
      bgColor: isDark ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20' : 'bg-gray-50 text-gray-600 border border-gray-200'
    },
  ];

  return (
    <section 
      id="contact" 
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background with animated elements (SAME AS OTHER SECTIONS) */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-emerald-900/10 via-blue-900/20 to-gray-900' 
            : 'bg-gradient-to-br from-emerald-50 via-white to-blue-50'
        }`} />
        
        {/* Floating background orbs */}
        <div 
          className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-blue-500' : 'bg-blue-300'
          }`}
          style={{
            top: '20%',
            right: '10%',
            transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div 
          className={`absolute w-48 h-48 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}
          style={{
            bottom: '20%',
            left: '15%',
            transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)`,
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
            <Mail className="w-5 h-5 text-blue-400" />
          </div>
          <div className="absolute bottom-32 left-8 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
            <Phone className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="text-gradient-animated">
              {t.contact.title}
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gradient-blue-green mb-6">
            {t.contact.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form - Compact Design */}
          <div className={`card-3d p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'glass-effect-dark border border-gray-700/50' 
              : 'glass-effect border border-white/20 shadow-lg'
          }`}>
            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {currentLang === 'az' ? 'Bizə Yazın' : currentLang === 'en' ? 'Write to Us' : 'Escríbenos'}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentLang === 'az' ? 'Tezliklə əlaqə saxlayacağıq' : currentLang === 'en' ? 'We will contact you soon' : 'Te contactaremos pronto'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className={`block text-xs font-medium mb-1 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.contact.form.name} *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      focusedField === 'name' 
                        ? 'text-blue-500' 
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder={currentLang === 'az' ? 'Adınız' : currentLang === 'en' ? 'Your name' : 'Tu nombre'}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className={`block text-xs font-medium mb-1 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.contact.form.email} *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      focusedField === 'email' 
                        ? 'text-blue-500' 
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Company Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className={`block text-xs font-medium mb-1 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.contact.form.phone}
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      focusedField === 'phone' 
                        ? 'text-blue-500' 
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder={currentLang === 'az' ? 'Telefon' : currentLang === 'en' ? 'Phone' : 'Teléfono'}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className={`block text-xs font-medium mb-1 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.contact.form.company}
                  </label>
                  <div className="relative">
                    <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      focusedField === 'company' 
                        ? 'text-blue-500' 
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder={currentLang === 'az' ? 'Şirkət' : currentLang === 'en' ? 'Company' : 'Empresa'}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <label className={`block text-xs font-medium mb-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.contact.form.message} *
                </label>
                <div className="relative">
                  <MessageSquare className={`absolute left-3 top-3 w-4 h-4 ${
                    focusedField === 'message' 
                      ? 'text-blue-500' 
                      : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className={`w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder={currentLang === 'az' ? 'Mesajınız...' : currentLang === 'en' ? 'Your message...' : 'Tu mensaje...'}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-modern flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t.contact.form.sending}</span>
                  </>
                ) : (
                  <>
                    <span>{t.contact.form.send}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2 p-3 bg-emerald-100 border border-emerald-200 rounded-lg text-emerald-800">
                  <CheckCircle className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">{t.contact.form.success}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-2 p-3 bg-red-100 border border-red-200 rounded-lg text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">{t.contact.form.error}</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className={`card-3d-lift block group p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'glass-effect-dark border border-gray-700/50' 
                      : 'glass-effect border border-white/20 shadow-lg'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {info.label}
                      </h3>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {info.value}
                      </p>
                    </div>
                    <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media Links - Modern Icons */}
            <div className={`p-4 rounded-xl ${
              isDark 
                ? 'glass-effect-dark border border-gray-700/50' 
                : 'glass-effect border border-white/20 shadow-lg'
            }`}>
              <h3 className={`font-bold mb-3 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <Globe className="w-5 h-5 mr-2 text-blue-500" />
                {currentLang === 'az' ? 'Sosial Şəbəkələr' : currentLang === 'en' ? 'Social Media' : 'Redes Sociales'}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${social.bgColor} ${social.color} hover:text-white`}
                  >
                    <social.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours Compact */}
            <div className={`p-4 rounded-xl ${
              isDark 
                ? 'glass-effect-dark border border-gray-700/50' 
                : 'glass-effect border border-white/20 shadow-lg'
            }`}>
              <div className="flex items-center mb-3">
                <Clock className={`w-5 h-5 mr-2 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} />
                <h3 className={`font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentLang === 'az' ? 'İş Saatları' : currentLang === 'en' ? 'Business Hours' : 'Horario de Trabajo'}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {currentLang === 'az' ? 'B.e - Cümə' : currentLang === 'en' ? 'Mon - Fri' : 'Lun - Vie'}
                  </span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {currentLang === 'az' ? 'Şənbə' : currentLang === 'en' ? 'Saturday' : 'Sábado'}
                  </span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>09:00 - 14:00</span>
                </div>
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className={`p-4 rounded-xl text-center ${
              isDark 
                ? 'bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border border-blue-500/20' 
                : 'bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200'
            }`}>
              <h3 className={`font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {currentLang === 'az' ? 'Təcili Dəstək' : currentLang === 'en' ? 'Urgent Support' : 'Soporte Urgente'}
              </h3>
              <a
                href="tel:+994551234567"
                className="btn-modern inline-flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>{currentLang === 'az' ? 'Zəng Et' : currentLang === 'en' ? 'Call Now' : 'Llamar'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
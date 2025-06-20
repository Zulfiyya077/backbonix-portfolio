// src/components/sections/Portfolio.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, ChevronLeft, ChevronRight, Play, Pause, Target, Briefcase } from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface PortfolioProps {
  currentLang: Language;
  isDark: boolean;
}

export const Portfolio: React.FC<PortfolioProps> = ({ currentLang, isDark }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
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

  // Project images from Supabase
  const projectImages = {
    data: 'https://dgtlinfra.com/wp-content/uploads/2023/11/Data-Center-Migration-Move-Moving-Plan-Strategy.jpg',
    government: 'https://www.channelnomics.com/hubfs/Imported_Blog_Media/iStock-1960986400.jpg',
    cop29: 'https://xdzksswqqqoonxbwcmup.supabase.co/storage/v1/object/sign/Images/cop29.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMDY5ODU4NC04NThmLTRiNDItYjU4Zi1lNWQ5YzIxY2NlOTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvY29wMjkuanBnIiwiaWF0IjoxNzQ5MjIxOTI0LCJleHAiOjE3ODA3NTc5MjR9.1noOXCWqEUGpLJWjpb-PDvaA7WDU6Hhbef2dF2iEtYc',
    astronavtika: 'https://xdzksswqqqoonxbwcmup.supabase.co/storage/v1/object/sign/Images/astro2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMDY5ODU4NC04NThmLTRiNDItYjU4Zi1lNWQ5YzIxY2NlOTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvYXN0cm8yLmpwZyIsImlhdCI6MTc0OTIyMzE2OSwiZXhwIjoxNzgwNzU5MTY5fQ.xvqdqbPeW8GuxyH4Er0m0xGVmzrDO_SY_qUTr5LS6lk',
    visa: 'https://xdzksswqqqoonxbwcmup.supabase.co/storage/v1/object/sign/Images/visa.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMDY5ODU4NC04NThmLTRiNDItYjU4Zi1lNWQ5YzIxY2NlOTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdmlzYS53ZWJwIiwiaWF0IjoxNzQ5MjIzMjM0LCJleHAiOjE3ODA3NTkyMzR9.evj0eU7aQoiLpe5Dboa2XJH8LP2Tf2qglVCK1aoPBm8',
    chess: 'https://xdzksswqqqoonxbwcmup.supabase.co/storage/v1/object/sign/Images/chess.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMDY5ODU4NC04NThmLTRiNDItYjU4Zi1lNWQ5YzIxY2NlOTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvY2hlc3MucG5nIiwiaWF0IjoxNzQ5MjIzMzMyLCJleHAiOjE3ODA3NTkzMzJ9.kw_WIOPTQWoa7RdzIlU-PNfY5zn6McInZRy0kCRG-4E'
  };

  const projects = t.portfolio.projects.map((project, index) => {
    // Debug üçün console log
    console.log(`Project ${index}:`, project.title);
    
    // Düzgün ardıcıllıqla şəkil təyin edirik
    let imageUrl;
    switch(index) {
      case 0:
        imageUrl = projectImages.astronavtika;   // 1-ci: Astronautika Konqresi
        break;
      case 1:
        imageUrl = projectImages.cop29;          // 2-ci: COP29 Layihəsi
        break;
      case 2:
        imageUrl = projectImages.chess;          // 3-cü: Şahmat Çempionatı
        break;
      case 3:
        imageUrl = projectImages.government;          // 4-cü: Dövlət Şirkətləri (default)
        break;
      case 4:
        imageUrl = projectImages.data;          // 5-ci: Data Center (default)
        break;
      case 5:
        imageUrl = projectImages.visa;           // 6-cı: Mastercard və Visa
        break;
      default:
        imageUrl = projectImages.cop29;          // Default
    }
    
    return {
      ...project,
      imageUrl: imageUrl,
      category: index < 2 ? 'Enterprise' : index < 4 ? 'Government' : 'Migration',
      year: '2023-2024',
      duration: currentLang === 'az' ? '3-6 ay' : currentLang === 'en' ? '3-6 months' : '3-6 meses',
      team: '5-15',
      status: 'completed',
      satisfaction: 98
    };
  });

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, projects.length]);

  // Floating IT icons (same style as Hero)
  const floatingIcons = [
    { icon: Target, size: 'w-5 h-5', position: 'top-20 left-16', delay: '0s', color: 'text-indigo-400' },
    { icon: Briefcase, size: 'w-6 h-6', position: 'top-32 right-20', delay: '1.5s', color: 'text-emerald-400' },
    { icon: Award, size: 'w-5 h-5', position: 'bottom-32 left-20', delay: '2s', color: 'text-blue-400' },
    { icon: Calendar, size: 'w-4 h-4', position: 'bottom-48 right-32', delay: '0.8s', color: 'text-cyan-400' },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <section 
      id="portfolio" 
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
            <Target className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="absolute bottom-32 left-8 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
            <Award className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center min-h-screen">
        <div className="w-full py-10">
        
        {/* Header (same style as Hero) */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="text-gradient-animated">
              {t.portfolio.title}
            </span>
          </h2>
          <p className="text-lg sm:text-xl font-medium text-gradient-blue-green mb-4">
            {t.portfolio.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Featured Project Carousel */}
        <div className="relative">
          <div className={`relative rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'glass-effect-dark border border-gray-700/50' 
              : 'glass-effect border border-white/20 shadow-xl'
          }`}>
            
            {/* Carousel Controls */}
            <div className="absolute top-4 right-4 z-20 flex space-x-2">
              <button
                onClick={toggleAutoPlay}
                className={`p-2 lg:p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'glass-effect-dark text-white hover:bg-gray-700' 
                    : 'glass-effect text-gray-900 hover:bg-white shadow-lg'
                }`}
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              
              <div className={`px-3 py-2 lg:py-3 rounded-lg text-sm font-medium ${
                isDark ? 'glass-effect-dark text-white' : 'glass-effect text-gray-900'
              }`}>
                {currentProject + 1} / {projects.length}
              </div>
            </div>

            {/* Project Content */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
              
              {/* Left Content */}
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDark 
                      ? 'bg-blue-900/50 text-blue-300 border border-blue-500/30' 
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {projects[currentProject].category}
                  </span>
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {projects[currentProject].year}
                  </span>
                </div>

                <h3 className={`text-xl lg:text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {projects[currentProject].title}
                </h3>

                <p className={`text-sm lg:text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {projects[currentProject].description}
                </p>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                  <div className={`text-center p-3 rounded-lg ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/50 border border-gray-200'
                  }`}>
                    
                  </div>
                </div>
              </div>

              {/* Right Content - Visual with Images */}
              <div className="relative">
                <div className={`aspect-[4/3] rounded-xl overflow-hidden relative group ${
                  isDark ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  {/* Project Image */}
                  {projects[currentProject].imageUrl ? (
                    <>
                      <img 
                        src={projects[currentProject].imageUrl} 
                        alt={projects[currentProject].title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                        onError={(e) => {
                          // Şəkil yüklənməyibsə default view göstər
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      
                      {/* Fallback content */}
                      <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                        <div className={`text-center transition-all duration-500 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Award className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                          <p className="font-medium">{projects[currentProject].title}</p>
                          <p className="text-sm mt-1">{projects[currentProject].category}</p>
                        </div>
                      </div>
                      
                      {/* Gradient overlay for images */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Project info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-medium text-sm">{projects[currentProject].title}</p>
                        <p className="text-xs opacity-80">{projects[currentProject].category}</p>
                      </div>
                    </>
                  ) : (
                    // Default view (şəkil yoxdursa)
                    <div className="w-full h-full flex items-center justify-center">
                      <div className={`text-center transition-all duration-500 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Award className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                        <p className="font-medium">{projects[currentProject].title}</p>
                        <p className="text-sm mt-1">{projects[currentProject].category}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevProject}
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'glass-effect-dark text-white hover:bg-gray-700' 
                      : 'glass-effect text-gray-900 hover:bg-white shadow-lg'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextProject}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'glass-effect-dark text-white hover:bg-gray-700' 
                      : 'glass-effect text-gray-900 hover:bg-white shadow-lg'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center space-x-2 pb-4 lg:pb-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`transition-all duration-300 ${
                    index === currentProject
                      ? 'w-6 h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full'
                      : 'w-2 h-2 rounded-full hover:scale-125'
                  } ${
                    index === currentProject 
                      ? '' 
                      : isDark
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-modern text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-all duration-300 hover:scale-105"
          >
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>
              {currentLang === 'az' ? 'Layihə Başlayaq' : currentLang === 'en' ? 'Start Project' : 'Comenzar Proyecto'}
            </span>
          </button>
        </div>
        </div>
      </div>
    </section>
  );
};
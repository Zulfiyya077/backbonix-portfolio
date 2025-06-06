import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Server, 
  Shield, 
  Monitor, 
  Database, 
  Cloud, 
  Cpu, 
  HardDrive,
  Network,
  Router,
  Smartphone,
  Globe
} from 'lucide-react';

const LoadingSplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');

  // Loading texts
  const loadingTexts = [
    'Initializing Systems...',
    'Connecting Networks...',
    'Loading Infrastructure...',
    'Preparing BackBonix...',
    'Almost Ready...'
  ];

  // Tech icons for animation
  const techIcons = [
    { Icon: Wifi, delay: 0, color: 'text-blue-400' },
    { Icon: Server, delay: 200, color: 'text-emerald-400' },
    { Icon: Shield, delay: 400, color: 'text-purple-400' },
    { Icon: Monitor, delay: 600, color: 'text-cyan-400' },
    { Icon: Database, delay: 800, color: 'text-indigo-400' },
    { Icon: Cloud, delay: 1000, color: 'text-blue-500' },
    { Icon: Cpu, delay: 1200, color: 'text-orange-400' },
    { Icon: HardDrive, delay: 1400, color: 'text-green-400' },
    { Icon: Network, delay: 1600, color: 'text-pink-400' },
    { Icon: Router, delay: 1800, color: 'text-yellow-400' },
    { Icon: Smartphone, delay: 2000, color: 'text-red-400' },
    { Icon: Globe, delay: 2200, color: 'text-teal-400' }
  ];

  // Loading simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  // Text animation
  useEffect(() => {
    const textTimer = setInterval(() => {
      const textIndex = Math.floor(loadingProgress / 20);
      if (textIndex < loadingTexts.length) {
        setCurrentText(loadingTexts[textIndex]);
      }
    }, 1200);

    return () => clearInterval(textTimer);
  }, [loadingProgress]);

  if (!isVisible) return null;

  return (
    <>
      {/* Global styles */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes rotate-around {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(-30px) translateX(0px); }
          75% { transform: translateY(-15px) translateX(-10px); }
        }
        
        .animate-twinkle {
          animation: twinkle 2s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-rotate-around {
          animation: rotate-around 8s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 overflow-hidden">
        
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          
          {/* Company logo/name */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                BackBonix
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 animate-fade-in">
              IT Infrastructure Excellence
            </p>
          </div>

          {/* Animated tech icons circle */}
          <div className="relative w-60 h-60 sm:w-80 sm:h-80 mx-auto mb-12">
            {techIcons.map(({ Icon, delay, color }, index) => {
              const angle = (index * 360) / techIcons.length;
              const radius = window.innerWidth < 640 ? 80 : 120; // Responsive radius
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={index}
                  className={`absolute w-8 h-8 sm:w-12 sm:h-12 ${color} flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-float animate-rotate-around`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    animationDelay: `${delay}ms`,
                  }}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              );
            })}
            
            {/* Center pulsing dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full animate-ping" />
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full absolute top-0" />
            </div>
          </div>

          {/* Loading progress */}
          <div className="w-72 sm:w-80 mx-auto mb-6 px-4">
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-2">
              <span>0%</span>
              <span className="font-medium text-white">{Math.round(loadingProgress)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Loading text */}
          <p className="text-base sm:text-lg text-gray-300 animate-pulse px-4">
            {currentText}
          </p>

          {/* Tech keywords floating */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            {['Network', 'Security', 'Infrastructure', 'Cloud', 'Support'].map((text, i) => (
              <div
                key={text}
                className="absolute text-xs sm:text-sm text-gray-500/30 animate-float-slow"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.8}s`,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSplashScreen;
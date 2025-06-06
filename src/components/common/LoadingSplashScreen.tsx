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
  const [spineProgress, setSpineProgress] = useState(0);

  // Loading texts
  const loadingTexts = [
    'Initializing Systems...',
    'Building Infrastructure...',
    'Connecting Networks...',
    'Strengthening Backbone...',
    'Powering Connections...',
    'Almost Ready...'
  ];

  // Tech icons for floating animation
  const techIcons = [
    { Icon: Wifi, delay: 0, color: 'text-blue-400' },
    { Icon: Server, delay: 300, color: 'text-emerald-400' },
    { Icon: Shield, delay: 600, color: 'text-purple-400' },
    { Icon: Monitor, delay: 900, color: 'text-cyan-400' },
    { Icon: Database, delay: 1200, color: 'text-indigo-400' },
    { Icon: Cloud, delay: 1500, color: 'text-blue-500' }
  ];

  // Real spine vertebrae - more anatomical
  const spineSegments = [
    // Cervical vertebrae (Boyun fəqərələri) - 7 pieces
    ...Array.from({ length: 7 }, (_, i) => ({
      id: `cervical-${i}`,
      type: 'cervical' as const,
      size: 'small' as const,
      position: i * 3, // 0-18%
      delay: i * 150
    })),
    // Thoracic vertebrae (Döş qoğası) - 12 pieces  
    ...Array.from({ length: 12 }, (_, i) => ({
      id: `thoracic-${i}`,
      type: 'thoracic' as const, 
      size: 'medium' as const,
      position: 21 + (i * 3.5), // 21-59.5%
      delay: (7 + i) * 150
    })),
    // Lumbar vertebrae (Bel fəqərələri) - 5 pieces
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `lumbar-${i}`,
      type: 'lumbar' as const,
      size: 'large' as const, 
      position: 63 + (i * 4), // 63-79%
      delay: (19 + i) * 150
    })),
    // Sacrum (Sacrum sümüyü) - 1 piece
    {
      id: 'sacrum',
      type: 'sacrum' as const,
      size: 'xlarge' as const,
      position: 85,
      delay: 24 * 150
    },
    // Coccyx (Quyruq sümüyü) - 1 piece  
    {
      id: 'coccyx',
      type: 'coccyx' as const,
      size: 'small' as const,
      position: 92,
      delay: 25 * 150
    }
  ];

  // Loading simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  // Spine building animation
  useEffect(() => {
    const spineTimer = setInterval(() => {
      setSpineProgress(prev => Math.min(prev + 1.5, 100));
    }, 80);

    return () => clearInterval(spineTimer);
  }, []);

  // Text animation
  useEffect(() => {
    const textTimer = setInterval(() => {
      const textIndex = Math.floor(loadingProgress / 17);
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
        @keyframes vertebra-grow {
          0% { 
            transform: scale(0) rotateY(90deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotateY(45deg);
            opacity: 0.8;
          }
          100% { 
            transform: scale(1) rotateY(0deg);
            opacity: 1;
          }
        }
        
        @keyframes spine-glow {
          0%, 100% { 
            box-shadow: 
              0 0 15px rgba(59, 130, 246, 0.3),
              inset 0 0 15px rgba(16, 185, 129, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 30px rgba(59, 130, 246, 0.8),
              0 0 50px rgba(16, 185, 129, 0.5),
              inset 0 0 20px rgba(139, 92, 246, 0.3);
          }
        }
        
        @keyframes neural-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.15);
            opacity: 1;
          }
        }
        
        @keyframes spinal-cord-flow {
          0% { 
            stroke-dasharray: 0 1000;
            opacity: 0.3;
          }
          100% { 
            stroke-dasharray: 1000 0;
            opacity: 0.8;
          }
        }
        
        @keyframes float-tech {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
          }
          25% { 
            transform: translateY(-10px) translateX(5px);
          }
          50% { 
            transform: translateY(-20px) translateX(0px);
          }
          75% { 
            transform: translateY(-10px) translateX(-5px);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-vertebra-grow {
          animation: vertebra-grow 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-spine-glow {
          animation: spine-glow 2s ease-in-out infinite;
        }
        
        .animate-neural-pulse {
          animation: neural-pulse 1.8s ease-in-out infinite;
        }
        
        .animate-spinal-cord-flow {
          animation: spinal-cord-flow 3s linear infinite;
        }
        
        .animate-float-tech {
          animation: float-tech 4s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 overflow-hidden">
        
        {/* Background particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* REAL BACKBONE SPINE - Center on mobile, left on larger screens */}
        <div className="absolute left-1/2 transform -translate-x-1/2 sm:-translate-x-40 md:-translate-x-60 lg:-translate-x-80 top-1/2 -translate-y-1/2">
          
          {/* Spinal cord (omurilik) - curved like real spine */}
          <svg 
            width="60" 
            height="500" 
            className="absolute left-4"
            style={{ top: '-250px' }}
          >
            <defs>
              <linearGradient id="spinalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                <stop offset="30%" stopColor="rgba(16, 185, 129, 0.6)" />
                <stop offset="70%" stopColor="rgba(139, 92, 246, 0.5)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
              </linearGradient>
            </defs>
            
            {/* Natural spine curve - S-shaped */}
            <path
              d="M 25 20 Q 20 80 30 140 Q 35 200 25 260 Q 20 320 30 380 Q 25 440 25 480"
              stroke="url(#spinalGradient)"
              strokeWidth="4"
              fill="none"
              className="animate-spinal-cord-flow"
              style={{ 
                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
                strokeDasharray: '1000',
                strokeDashoffset: '1000',
                animation: 'spinal-cord-flow 3s ease-out forwards'
              }}
            />
          </svg>

          {/* Vertebrae (fəqərələr) - curved positioning */}
          {spineSegments.map((vertebra, index) => {
            const isVisible = spineProgress > (index * 3.8);
            const normalizedPos = vertebra.position / 100; // 0 to 1
            const yPosition = -240 + (normalizedPos * 480); // Spread along 480px height
            
            // Natural spine curvature - S-curve
            let xOffset = 0;
            if (normalizedPos < 0.2) {
              // Cervical curve - forward
              xOffset = Math.sin(normalizedPos * Math.PI * 2.5) * -8;
            } else if (normalizedPos < 0.6) {
              // Thoracic curve - backward  
              xOffset = Math.sin((normalizedPos - 0.2) * Math.PI * 1.25) * 12;
            } else if (normalizedPos < 0.85) {
              // Lumbar curve - forward
              xOffset = Math.sin((normalizedPos - 0.6) * Math.PI * 2) * -10;
            } else {
              // Sacral curve - slight backward
              xOffset = Math.sin((normalizedPos - 0.85) * Math.PI * 3) * 6;
            }
            
            // Vertebra sizes - more realistic
            const sizeClasses: Record<'small' | 'medium' | 'large' | 'xlarge', string> = {
              small: 'w-8 h-5',      // Cervical & Coccyx  
              medium: 'w-10 h-6',    // Thoracic
              large: 'w-12 h-8',     // Lumbar
              xlarge: 'w-14 h-10'    // Sacrum
            };
            
            const colorClasses: Record<'cervical' | 'thoracic' | 'lumbar' | 'sacrum' | 'coccyx', string> = {
              cervical: 'from-blue-300 to-blue-500',
              thoracic: 'from-emerald-300 to-emerald-500', 
              lumbar: 'from-purple-300 to-purple-500',
              sacrum: 'from-cyan-300 to-cyan-500',
              coccyx: 'from-pink-300 to-pink-500'
            };

            return (
              <div key={vertebra.id} className="absolute">
                
                {/* Main vertebra body - more detailed */}
                <div
                  className={`${sizeClasses[vertebra.size]} ${
                    isVisible ? 'animate-vertebra-grow animate-spine-glow' : 'opacity-0'
                  } relative`}
                  style={{
                    left: `${20 + xOffset}px`,
                    top: `${yPosition}px`,
                    animationDelay: `${vertebra.delay}ms`,
                  }}
                >
                  {/* Vertebra main body - kidney-shaped like real vertebra */}
                  <div className={`w-full h-full bg-gradient-to-br ${colorClasses[vertebra.type]} rounded-2xl border-2 border-white/20 sm:border-white/40 shadow-lg relative overflow-hidden opacity-40 sm:opacity-100`}>
                    
                    {/* Vertebral foramen (central hole) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-2 bg-black/50 rounded-full border border-white/20" />
                    
                    {/* Inner bone texture */}
                    <div className="absolute inset-1 bg-white/15 rounded-xl" />
                    <div className="absolute inset-2 bg-gradient-to-br from-white/10 to-transparent rounded-lg" />
                    
                    {/* Neural foramen (nerve holes) */}
                    <div className="absolute -left-1 top-1/3 w-2 h-1 bg-black/40 rounded-full" />
                    <div className="absolute -left-1 bottom-1/3 w-2 h-1 bg-black/40 rounded-full" />
                    <div className="absolute -right-1 top-1/3 w-2 h-1 bg-black/40 rounded-full" />
                    <div className="absolute -right-1 bottom-1/3 w-2 h-1 bg-black/40 rounded-full" />
                  </div>

                  {/* Spinous process (back projection) - more prominent */}
                  <div className={`absolute -right-3 top-1/2 transform -translate-y-1/2 w-4 h-3 bg-gradient-to-r ${colorClasses[vertebra.type]} rounded-r-xl border border-white/20 sm:border-white/30 shadow-md opacity-40 sm:opacity-100`}>
                    <div className="absolute inset-0.5 bg-white/10 rounded-r-lg" />
                  </div>
                  
                  {/* Transverse processes (side projections) - bilateral */}
                  <div className={`absolute -top-2 left-1/4 w-3 h-3 bg-gradient-to-t ${colorClasses[vertebra.type]} rounded-t-xl border border-white/30 shadow-sm transform -rotate-12`} />
                  <div className={`absolute -top-2 right-1/4 w-3 h-3 bg-gradient-to-t ${colorClasses[vertebra.type]} rounded-t-xl border border-white/30 shadow-sm transform rotate-12`} />
                  <div className={`absolute -bottom-2 left-1/4 w-3 h-3 bg-gradient-to-b ${colorClasses[vertebra.type]} rounded-b-xl border border-white/30 shadow-sm transform rotate-12`} />
                  <div className={`absolute -bottom-2 right-1/4 w-3 h-3 bg-gradient-to-b ${colorClasses[vertebra.type]} rounded-b-xl border border-white/30 shadow-sm transform -rotate-12`} />

                  {/* Ribs for thoracic vertebrae - more realistic */}
                  {vertebra.type === 'thoracic' && (
                    <>
                      <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-1 bg-gradient-to-l from-emerald-400 via-emerald-300 to-transparent rounded-full shadow-lg" 
                           style={{ transform: 'translateY(-50%) rotate(-15deg)' }} />
                      <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-1 bg-gradient-to-l from-emerald-400 via-emerald-300 to-transparent rounded-full shadow-lg"
                           style={{ transform: 'translateY(-50%) rotate(15deg)' }} />
                      <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent rounded-full shadow-lg"
                           style={{ transform: 'translateY(-50%) rotate(15deg)' }} />
                      <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent rounded-full shadow-lg"
                           style={{ transform: 'translateY(-50%) rotate(-15deg)' }} />
                    </>
                  )}

                  {/* Special sacrum shape */}
                  {vertebra.type === 'sacrum' && (
                    <>
                      <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-b ${colorClasses[vertebra.type]} rounded-b-2xl border border-white/30`} />
                      <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gradient-to-b ${colorClasses[vertebra.type]} rounded-b-xl border border-white/20 opacity-80`} />
                    </>
                  )}
                </div>

                {/* Nerve connections - more realistic */}
                {index < spineSegments.length - 1 && isVisible && (
                  <>
                    <div 
                      className="absolute w-0.5 h-6 bg-gradient-to-b from-yellow-400/80 to-yellow-300/40 animate-neural-pulse rounded-full"
                      style={{ 
                        left: `${25 + xOffset}px`, 
                        top: `${yPosition + 25}px`,
                        filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.6))'
                      }}
                    />
                    <div 
                      className="absolute w-0.5 h-6 bg-gradient-to-b from-yellow-400/60 to-transparent animate-neural-pulse rounded-full"
                      style={{ 
                        left: `${35 + xOffset}px`, 
                        top: `${yPosition + 25}px`,
                        animationDelay: '0.3s'
                      }}
                    />
                  </>
                )}
              </div>
            );
          })}

          {/* Intervertebral discs (fəqərəarası disklər) - more realistic */}
          {spineSegments.slice(0, -1).map((_, index) => {
            const isVisible = spineProgress > (index * 3.8 + 2);
            const normalizedPos = spineSegments[index].position / 100;
            const yPosition = -240 + (normalizedPos * 480) + 20;
            
            // Same curve calculation as vertebrae
            let xOffset = 0;
            if (normalizedPos < 0.2) {
              xOffset = Math.sin(normalizedPos * Math.PI * 2.5) * -8;
            } else if (normalizedPos < 0.6) {
              xOffset = Math.sin((normalizedPos - 0.2) * Math.PI * 1.25) * 12;
            } else if (normalizedPos < 0.85) {
              xOffset = Math.sin((normalizedPos - 0.6) * Math.PI * 2) * -10;
            } else {
              xOffset = Math.sin((normalizedPos - 0.85) * Math.PI * 3) * 6;
            }
            
            return (
              <div
                key={`disc-${index}`}
                className={`absolute w-9 h-3 ${
                  isVisible ? 'animate-neural-pulse' : 'opacity-0'
                }`}
                style={{ 
                  left: `${19 + xOffset}px`,
                  top: `${yPosition}px` 
                }}
              >
                <div className="w-full h-full bg-gradient-radial from-gray-200 via-gray-300 to-gray-400 rounded-full border-2 border-white/50 relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0.5 bg-white/40 rounded-full" />
                  <div className="absolute inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                  {/* Nucleus pulposus (inner gel) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-1.5 bg-blue-200/60 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating tech icons - background scattered */}
        <div className="absolute inset-0">
          {techIcons.map(({ Icon, delay, color }, index) => {
            // Scatter icons across different areas of the screen
            const positions = [
              { x: 15, y: 20 },  // Top left
              { x: 85, y: 25 },  // Top right
              { x: 10, y: 50 },  // Middle left
              { x: 90, y: 55 },  // Middle right
              { x: 20, y: 80 },  // Bottom left
              { x: 80, y: 85 }   // Bottom right
            ];
            const position = positions[index] || { x: 50, y: 50 };
            
            return (
              <div
                key={index}
                className={`absolute w-6 h-6 ${color} flex items-center justify-center rounded-lg bg-black/10 backdrop-blur-sm border border-white/10 animate-float-tech opacity-40`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  animationDelay: `${delay + 2000}ms`,
                }}
              >
                <Icon className="w-3 h-3" />
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          
          {/* Company logo/name */}
          <div className="mb-12">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 animate-slide-up">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                Back
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Bonix
              </span>
            </h1>
            <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-xl sm:text-2xl text-gray-300 mb-2">
                IT Infrastructure Excellence
              </p>
              <p className="text-lg sm:text-xl text-emerald-300 font-medium animate-neural-pulse">
                "Powering Your Connection"
              </p>
            </div>
          </div>

          {/* Loading text */}
          <p className="text-lg text-gray-300 animate-neural-pulse px-4 mb-6">
            {currentText}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoadingSplashScreen;
import React, { useState, useEffect } from 'react';
import { Server, Network, Shield } from 'lucide-react';

const LoadingSplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
 
  const [currentText, setCurrentText] = useState('');

  // Simple loading texts
  const loadingTexts = [
    'Starting up...',
    'Loading systems...',
    'Preparing BackBonix...',
    'Almost ready...'
  ];


  if (!isVisible) return null;

  return (
    <>
      {/* Simple 3D styles */}
      <style>{`
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          25% { transform: rotateX(15deg) rotateY(90deg); }
          50% { transform: rotateX(0deg) rotateY(180deg); }
          75% { transform: rotateX(-15deg) rotateY(270deg); }
          100% { transform: rotateX(0deg) rotateY(360deg); }
        }
        
        @keyframes float3d {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(10deg); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-rotate3d {
          animation: rotate3d 4s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        .animate-float3d {
          animation: float3d 3s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .text-shadow-3d {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 overflow-hidden">
        
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          
          {/* Company logo */}
          <div className="mb-16">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 text-shadow-3d animate-fadeIn">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-emerald-400 bg-clip-text text-transparent">
                BackBonix
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-emerald-300 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              IT Infrastructure Excellence
            </p>
            <p className="text-base sm:text-lg text-gray-300 font-medium animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              "Powering Your Connection"
            </p>
          </div>

          {/* 3D Floating Elements */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-16">
            
            {/* Central 3D Box */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 glass-effect rounded-xl animate-rotate3d flex items-center justify-center">
                <Server className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              </div>
            </div>

            {/* Floating Side Elements */}
            <div className="absolute top-8 left-8 animate-float3d" style={{ animationDelay: '0.5s' }}>
              <div className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <div className="absolute top-8 right-8 animate-float3d" style={{ animationDelay: '1s' }}>
              <div className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float3d" style={{ animationDelay: '1.5s' }}>
              <div className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

 

          {/* Loading text */}
          <p className="text-base sm:text-lg text-gray-300 px-4">
            {currentText}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoadingSplashScreen;
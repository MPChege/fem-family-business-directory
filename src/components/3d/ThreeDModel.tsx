
import React from 'react';

// Interface for component props
interface ThreeDModelProps {
  type?: 'city' | 'globe';
  className?: string;
}

/**
 * A simplified placeholder for 3D visualization using CSS and HTML
 * This replaces the Three.js implementation until we properly set up the required dependencies
 */
export function ThreeDModel({ type = 'city', className = '' }: ThreeDModelProps) {
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      {/* Stylized background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fem-navy/80 to-fem-navy/90 z-0"></div>
      
      {/* Dynamic content based on type */}
      {type === 'city' ? (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="grid grid-cols-5 gap-2">
            {/* Generate stylized "buildings" using CSS */}
            {Array.from({ length: 20 }).map((_, i) => {
              const height = 40 + Math.random() * 120;
              const color = i % 3 === 0 ? '#C84B31' : i % 3 === 1 ? '#1A1F2C' : '#FFBD59';
              
              return (
                <div 
                  key={i} 
                  className="w-8 rounded-sm animate-float" 
                  style={{ 
                    height: `${height}px`,
                    backgroundColor: color,
                    animationDelay: `${i * 0.1}s`,
                    transform: `translateY(${Math.sin(i) * 5}px)`
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* Simple globe visualization using CSS */}
          <div 
            className="w-48 h-48 rounded-full bg-fem-gold/80 animate-float-slow shadow-lg"
            style={{ 
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,189,89,0.8) 50%, rgba(200,75,49,0.5) 100%)',
              boxShadow: '0 0 40px rgba(255, 189, 89, 0.4)'
            }}
          >
            {/* Add some "continents" as divs */}
            <div className="absolute w-12 h-8 bg-fem-terracotta/40 rounded-full top-10 left-8 transform rotate-12"></div>
            <div className="absolute w-10 h-14 bg-fem-terracotta/40 rounded-full top-20 left-20"></div>
            <div className="absolute w-16 h-10 bg-fem-terracotta/40 rounded-full bottom-10 right-10 transform -rotate-12"></div>
          </div>
        </div>
      )}
      
      {/* Add some particle effects */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ThreeDModel;

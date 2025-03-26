
import React from 'react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  imageSrc?: string; // Added for backward compatibility
  children?: React.ReactNode;
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  imageSrc, // Accept imageSrc but use backgroundImage internally
  children,
}) => {
  // Use imageSrc as fallback if backgroundImage is not provided
  const bgImage = backgroundImage || imageSrc;
  
  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background */}
      {bgImage ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10 blur-sm"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white dark:from-black/80 dark:to-black" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      )}
      
      {/* Content */}
      <div className="relative container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-down">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
          
          {children && (
            <div className="mt-8 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default PageBanner;

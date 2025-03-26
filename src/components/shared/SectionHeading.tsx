
import React from 'react';
import { useRevealOnScroll } from '@/lib/animations';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  alignment?: string; // Added for backward compatibility
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align,
  alignment, // Accept alignment but use align internally
  className = '',
}) => {
  const { ref, isVisible } = useRevealOnScroll();
  
  // Use alignment as fallback if align is not provided
  const finalAlign = align || alignment || 'center';
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>} 
      className={`max-w-3xl ${alignmentClasses[finalAlign as keyof typeof alignmentClasses]} mb-12 ${className} ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
    >
      {subtitle && (
        <p className="text-sm font-medium uppercase tracking-wider text-primary dark:text-white/70 mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="w-20 h-1 bg-primary mt-4 mb-2 rounded-full opacity-70 transform transition-all duration-300 ease-in-out hover:w-24 hover:opacity-100" style={{ 
        marginLeft: finalAlign === 'center' ? 'auto' : undefined,
        marginRight: finalAlign === 'center' ? 'auto' : undefined,
      }} />
    </div>
  );
};

export default SectionHeading;

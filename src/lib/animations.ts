
import { useEffect, useRef, useState } from 'react';

// For elements that should reveal when scrolled into view
export const useRevealOnScroll = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);
  
  return { ref, isVisible };
};

// For staggered animations of multiple elements
export const useStaggeredAnimation = (itemCount: number, delayIncrement = 0.1, initialDelay = 0) => {
  return Array.from({ length: itemCount }).map((_, i) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
      delay: initialDelay + i * delayIncrement 
    }
  }));
};

// For text reveal animations
export function useTextReveal() {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return { ref, isRevealed };
}

// For manual control of hover effects
export function useHoverEffect() {
  const [isHovered, setIsHovered] = useState(false);
  
  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false)
  };
  
  return { isHovered, hoverProps };
}

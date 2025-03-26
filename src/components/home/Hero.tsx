import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import InnovationVisualization from './InnovationVisualization'; // Import the new component

const heroImages = [
  '/images/services/web-development.jpg',
  '/images/services/mobile-development.jpg',
  '/images/services/ui-ux.jpg',
];


const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Images with Smooth Transition */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${image})`,
              opacity: currentImageIndex === index ? 0.15 : 0,
            }}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80 dark:from-background dark:via-background/90 dark:to-background/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          <span className="inline-block py-1 px-3 rounded-full text-xs sm:text-sm font-medium text-primary bg-primary/10 dark:bg-primary/5 dark:text-white mb-4 sm:mb-6 animate-fade-in">
            Digital Excellence Redefined
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-4 sm:mb-6">
            <span className="block overflow-hidden">
              <span className="block transform animate-text-reveal">Crafting Digital</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block transform animate-text-reveal" style={{ animationDelay: '0.1s' }}>
                Experiences That
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block transform animate-text-reveal bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-white dark:to-white/80"
                style={{ animationDelay: '0.2s' }}
              >
                Elevate Brands
              </span>
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            We merge cutting-edge technology with exceptional design to create digital solutions that deliver real business results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl button-glow text-sm sm:text-base"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-3 border border-primary/20 dark:border-white/10 text-primary dark:text-white rounded-lg font-medium transition-all hover:bg-primary/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive 3D Visualization */}
      <InnovationVisualization />

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="absolute right-10 bottom-10 lg:right-20 lg:bottom-20 w-16 sm:w-24 h-16 sm:h-24 md:w-32 md:h-32 rounded-full border border-primary/30 dark:border-white/10 opacity-80 animate-spin-slow" />

      <div
        className="absolute right-20 bottom-20 lg:right-40 lg:bottom-40 w-10 sm:w-16 h-10 sm:h-16 md:w-20 md:h-20 rounded-full border border-primary/20 dark:border-white/5 opacity-60 animate-spin-slow"
        style={{ animationDirection: 'reverse' }}
      />

      <div className="absolute right-40 bottom-10 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-primary/30 dark:bg-white/20 animate-pulse" />
    </div>
  );
};

export default Hero;






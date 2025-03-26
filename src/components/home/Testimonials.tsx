import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import testimonialData from '@/data/testimonials.json';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const testimonials = testimonialData.testimonials;

  const nextTestimonial = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAnimating]);

  return (
    <section className="py-20 overflow-hidden bg-gray-50 dark:bg-gray-900 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-primary/5 dark:bg-white/5" />
        <div className="absolute top-1/3 right-0 w-32 h-32 rounded-full bg-primary/5 dark:bg-white/5" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-primary/5 dark:bg-white/5" />
      </div>

      <div className="hidden md:block"> 
  <div className="container mx-auto px-6 relative z-10">
    <SectionHeading title="What Our Clients Say" subtitle="Testimonials" />

    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={resetAnimation}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="w-full flex-shrink-0 px-8"
              style={{ height: '450px', overflowY: 'auto' }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg">
                {/* Quote icon */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Quote className="h-6 w-6 text-primary dark:text-white" />
                </div>
                
                {/* Testimonial text */}
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Rating */}
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                
                {/* Author info */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button
    className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition-transform hover:scale-110 active:scale-95"
    onClick={prevTestimonial}
    aria-label="Previous testimonial"
  >
    <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
  </button>

  <button
    className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition-transform hover:scale-110 active:scale-95"
    onClick={nextTestimonial}
    aria-label="Next testimonial"
  >
    <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
  </button>

      {/* Pagination dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
            onClick={() => {
              setDirection(i > currentIndex ? 'right' : 'left');
              setCurrentIndex(i);
            }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</div>

      <div className="block md:hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="What Our Clients Say" subtitle="Testimonials" />
          <div className="max-w-4xl mx-auto px-4 md:px-0">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTransitionEnd={resetAnimation}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 md:px-8 px-0">
                    <div
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg h-[400px] md:h-[450px] max-h-[500px] overflow-y-auto"
                    >
                      {/* Quote Icon */}
                      <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                        <Quote className="h-5 w-5 text-primary dark:text-white" />
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Rating */}
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            fill={i < testimonial.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center mt-4">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {testimonial.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows - Moved below for mobile */}
            <div className="flex justify-center mt-4 md:hidden space-x-4">
              <button
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition-transform hover:scale-110 active:scale-95"
                onClick={() => {
                  setIsAnimating(false);  // Force reset animation state
                  prevTestimonial();
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition-transform hover:scale-110 active:scale-95"
                onClick={() => {
                  setIsAnimating(false);  // Force reset animation state
                  nextTestimonial();
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>

            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
                  onClick={() => {
                    setDirection(i > currentIndex ? 'right' : 'left');
                    setCurrentIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

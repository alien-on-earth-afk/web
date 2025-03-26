import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRevealOnScroll } from '@/lib/animations';

const CTA = () => {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section className="py-10 md:py-20 relative overflow-hidden" ref={ref as React.RefObject<HTMLDivElement>}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-gray-800 dark:to-gray-900" />

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-primary/10 dark:bg-white/5 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 md:w-96 md:h-96 bg-primary/10 dark:bg-white/5 rounded-full transform -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative h-40 md:h-auto">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/cta-image.jpg')" }} />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-8">
                <h3 className="text-lg md:text-xl font-bold text-white">Ready to elevate your digital presence?</h3>
              </div>
            </div>

            {/* Content side */}
            <div className="p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Create Something <span className="text-primary dark:text-white">Extraordinary</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
                Whether you're looking to build a new website, develop a mobile app, or create engaging content, our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-primary text-white dark:text-black rounded-lg font-medium transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl button-glow text-sm md:text-base"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-4 py-2 md:px-5 md:py-2.5 border border-primary/20 dark:border-white/10 text-primary dark:text-white rounded-lg font-medium transition-all hover:bg-primary/5 dark:hover:bg-white/5 text-sm md:text-base"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

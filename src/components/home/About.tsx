
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Check, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useRevealOnScroll } from '@/lib/animations';

const values = [
  {
    title: "Innovation",
    description: "We constantly explore new technologies and approaches to deliver cutting-edge solutions.",
  },
  {
    title: "Quality",
    description: "We're committed to excellence in everything we create, from code to design.",
  },
  {
    title: "Collaboration",
    description: "We work closely with our clients, treating their challenges as our own.",
  },
  {
    title: "Transparency",
    description: "We maintain clear, honest communication throughout every project.",
  },
];

const About = () => {
  const { ref, isVisible } = useRevealOnScroll();
  const imageReveal = useRevealOnScroll();
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.8 });

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div ref={ref as React.RefObject<HTMLDivElement>} className={isVisible ? 'animate-slide-right' : 'opacity-0'}>
            <div className="inline-block py-1 px-3 rounded-full text-sm font-medium text-primary bg-primary/10 dark:bg-primary/5 dark:text-white mb-4">
              About WebARK
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 500 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Digital Craftsmanship <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                With Purpose
              </span>
            </motion.h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Founded in 2015, WebARK has grown from a small team of passionate digital creators to a full-service agency delivering exceptional digital experiences for clients worldwide. Our approach combines technical expertise with creative vision to build solutions that drive real business results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={isInView ? { opacity: 1, rotateX: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>

            <Link
              to="/about"
              className="inline-flex items-center text-primary dark:text-white font-medium hover:underline"
            >
              Learn more about us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>


          <motion.div
            initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
            animate={isInView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative perspective"
          >
            {/* Image */}
            <div
              ref={imageReveal.ref as React.RefObject<HTMLDivElement>}
              className={`relative ${imageReveal.isVisible ? 'animate-slide-left' : 'opacity-0'}`}
            >
              <div className="relative perspective">
                <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden preserve-3d transform hover:rotate-y-5 transition-transform duration-500">
                  <img
                    src="/images/team/team-group.jpg"
                    alt="WebARK Team"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for placeholder
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <span className="text-sm font-medium">Our Team</span>
                    <h3 className="text-xl font-bold">Passionate experts creating digital magic</h3>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-primary/30 dark:border-white/10" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-2 border-primary/20 dark:border-white/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

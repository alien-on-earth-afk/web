
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import About from '@/components/home/About';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Initialize reveal on scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealElementsOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('revealed');
        }
      }
    };

    window.addEventListener('scroll', revealElementsOnScroll);
    revealElementsOnScroll(); // Check elements on initial load
    
    return () => window.removeEventListener('scroll', revealElementsOnScroll);
  }, []);
  
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default Index;

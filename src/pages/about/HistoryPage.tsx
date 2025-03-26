
import { useEffect } from 'react';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { useRevealOnScroll } from '@/lib/animations';

const HistoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <PageBanner
        title="Our History"
        subtitle="The journey that shaped WebARK's path to excellence"
        imageSrc="/images/team/history-banner.jpg"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl leading-relaxed">
                WebARK's story is one of vision, perseverance, and a relentless commitment to digital excellence. From humble beginnings to becoming a recognized industry leader, our journey reflects our passion for innovation and client success.
              </p>
            </div>
            
            <div className="mt-16 space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-700 before:to-transparent">
              <TimelineItem 
                year="2016" 
                title="The Beginning" 
                content="WebARK was founded by Sarah Johnson and Michael Chen in a small co-working space in San Francisco. With just three team members, the company focused initially on web design services for local businesses."
                alignment="left"
                index={0}
              />
              
              <TimelineItem 
                year="2017" 
                title="Expanding Our Expertise" 
                content="As demand grew, we expanded our services to include mobile app development and hired our first dedicated UI/UX designer. By the end of the year, our team had grown to eight members and we moved into our first official office."
                alignment="right"
                index={1}
              />
              
              <TimelineItem 
                year="2018" 
                title="First Major Clients" 
                content="WebARK secured its first enterprise clients, including a Fortune 500 technology company. We completed our 50th project and established our core methodology for delivering consistent, high-quality work."
                alignment="left"
                index={2}
              />
              
              <TimelineItem 
                year="2019" 
                title="Growing Recognition" 
                content="Our work began receiving industry recognition, winning three prestigious design awards. We expanded our service offerings to include video production and editing, meeting the growing demand for multimedia content."
                alignment="right"
                index={3}
              />
              
              <TimelineItem 
                year="2020" 
                title="Navigating Challenges" 
                content="Despite the global pandemic, WebARK adapted quickly to remote work and helped numerous clients transition to digital-first operations. We launched our internal training program to nurture talent and maintain our high standards."
                alignment="left"
                index={4}
              />
              
              <TimelineItem 
                year="2021" 
                title="International Expansion" 
                content="WebARK opened its first international office in London, expanding our reach to European markets. Our team grew to over 20 members, and we celebrated our 150th completed project."
                alignment="right"
                index={5}
              />
              
              <TimelineItem 
                year="2022" 
                title="Innovation Focus" 
                content="We formed our Innovation Lab, a dedicated team exploring emerging technologies including AR/VR experiences, AI-driven design, and blockchain applications for our clients."
                alignment="left"
                index={6}
              />
              
              <TimelineItem 
                year="2023" 
                title="WebARK Today" 
                content="Today, WebARK stands as a full-service digital agency with over 25 team members across two offices, serving clients worldwide. We remain committed to our founding principles of creativity, technical excellence, and exceptional client service."
                alignment="right"
                index={7}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const TimelineItem = ({ year, title, content, alignment, index }: { year: string; title: string; content: string; alignment: 'left' | 'right'; index: number }) => {
  const { ref, isVisible } = useRevealOnScroll();
  
  return (
    <div 
      //@ts-ignore - ref is correctly typed in the hook
      ref={ref}
      className={`relative grid items-center grid-cols-1 gap-4 md:grid-cols-2 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`} 
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`flex items-center ${alignment === 'right' ? 'md:justify-end' : ''} ${alignment === 'right' ? 'md:col-start-2' : ''}`}>
        <div className="w-full md:w-auto">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-white dark:bg-gray-900 z-10">
              <span className="text-primary font-bold">{year}</span>
            </div>
            <div className={`h-px w-8 bg-gray-300 dark:bg-gray-700 ${alignment === 'right' ? 'order-first' : ''}`}></div>
          </div>
          <div className={`mt-4 ${alignment === 'right' ? 'text-right' : ''}`}>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{content}</p>
          </div>
        </div>
      </div>
      
      <div className={`hidden md:block ${alignment === 'left' ? 'md:col-start-2' : ''}`}>
        {/* This column intentionally left empty for layout purposes */}
      </div>
    </div>
  );
};

export default HistoryPage;

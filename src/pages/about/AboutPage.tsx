
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRevealOnScroll } from '@/lib/animations';

const AboutPage = () => {
  const { ref: statsRef, isVisible: statsVisible } = useRevealOnScroll();
  const { ref: missionRef, isVisible: missionVisible } = useRevealOnScroll();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <PageBanner
        title="About WebARK"
        subtitle="Learn more about our company, mission, and the team behind our success"
        backgroundImage="/images/team/team-banner.jpg"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Founded in 2025, WebARK started with a simple mission: to help businesses and individuals thrive in the digital landscape through premimum digital services
                </p>
                <p>
                  What began as a small team of passionate designers and developers has grown into a full-service digital agency with a reputation for excellence and creativity.
                </p>
                <p>
                  We've helped clients across industries transform their ideas into compelling digital experiences that engage, inspire, and convert.
                </p>
              </div>
              
              <Tabs defaultValue="approach" className="mt-10">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="approach">Our Approach</TabsTrigger>
                  <TabsTrigger value="values">Our Values</TabsTrigger>
                  <TabsTrigger value="difference">Our Difference</TabsTrigger>
                </TabsList>
                
                <TabsContent value="approach" className="mt-6 space-y-4">
                  <p>
                    We believe that great design and technology should work together seamlessly to solve real business problems. Our approach combines strategic thinking, user-centered design, and technical expertise to create solutions that are both beautiful and functional.
                  </p>
                  <p>
                    Every project begins with a deep understanding of your business goals, target audience, and competitive landscape. We then collaborate closely with you at every stage to ensure the final product exceeds expectations.
                  </p>
                </TabsContent>
                
                <TabsContent value="values" className="mt-6 space-y-4">
                  <ul className="space-y-2">
                    <li><strong>Excellence:</strong> We're committed to delivering the highest quality work in everything we do.</li>
                    <li><strong>Innovation:</strong> We constantly explore new technologies and approaches to stay ahead of the curve.</li>
                    <li><strong>Collaboration:</strong> We believe the best results come from true partnership with our clients.</li>
                    <li><strong>Integrity:</strong> We're honest, transparent, and always act in our clients' best interests.</li>
                    <li><strong>Growth:</strong> We're dedicated to continuous learning and improvement.</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="difference" className="mt-6 space-y-4">
                  <p>
                    What sets WebARK apart is our unique blend of creative talent and technical expertise. Unlike agencies that focus solely on aesthetics or function, we ensure that every solution we create is both visually stunning and functionally better.
                  </p>
                  <p>
                    Our team's diverse backgrounds across design, development, marketing, and strategy allow us to approach problems from multiple angles and create truly integrated solutions.
                  </p>
                  <p>
                    We also pride ourselves on our personalized service. When you work with WebARK, you're not just another project number – you're a valued partner.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/images/team/about-image.jpg" 
                  alt="WebARK team in office"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="absolute -bottom-12 -left-12 hidden lg:block">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-xs">
                  <blockquote className="text-lg italic">
                    "We're obsessed with creating digital experiences through content and projects that not only look amazing but also deliver real results for our clients."
                  </blockquote>
                  <p className="mt-4 font-medium">— Akash, Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div 
            //@ts-ignore - ref is correctly typed in the hook
            ref={missionRef}
            className={`transition-all duration-1000 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <SectionHeading
              title="Our Mission & Vision"
              subtitle="Driving digital excellence and innovation"
              align="center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-lg">
                    To empower businesses of all sizes with innovative digital solutions that drive growth, enhance user experiences, and create lasting value.
                  </p>
                  <p className="text-lg mt-4">
                    We're committed to combining cutting-edge technology with exceptional design to help our clients stand out in an increasingly competitive digital landscape.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg">
                    To be the leading digital agency known for creating transformative digital experiences that set new standards for creativity, functionality, and user engagement.
                  </p>
                  <p className="text-lg mt-4">
                    We aspire to be a catalyst for digital innovation, helping businesses and individuals leverage technology to achieve their fullest potential.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div 
            //@ts-ignore - ref is correctly typed in the hook
            ref={statsRef}
            className={`transition-all duration-1000 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1+</div>
                <p className="text-lg text-gray-600 dark:text-gray-400">Years in Business</p>
              </div>
              
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
                <p className="text-lg text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3</div>
                <p className="text-lg text-gray-600 dark:text-gray-400">Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading
            title="Meet Our Team"
            subtitle="The creative minds behind WebARK"
            align="center"
          />
          
          <div className="mt-8">
            <Link to="/about/team">
              <Button size="lg">
                View Team Page <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Our History"
            subtitle="The journey that shaped who we are today"
            align="center"
          />
          
          <div className="mt-12">
            <Link to="/about/history">
              <Button variant="outline" size="lg" className="mx-auto flex">
                Explore Our History <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

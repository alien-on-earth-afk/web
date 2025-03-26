import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import servicesData from '@/data/services.json';
import { ArrowRight } from 'lucide-react';
import { useRevealOnScroll } from '@/lib/animations';
import Darkreader from 'react-darkreader';



const ServicesPage = () => {
  const services = Array.isArray(servicesData) ? servicesData : servicesData.services || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive digital solutions tailored for your business needs"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {services.map((service, index) => {
              const { ref, isVisible } = useRevealOnScroll();
              return (
                <div
                  key={service.id}
                  //@ts-ignore - ref is correctly typed in the hook
                  ref={ref}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group border-2 overflow-hidden card-animated">
                    <CardHeader className="relative p-4 sm:p-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 transform group-hover:scale-110 transition-transform duration-500 -z-10"></div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 dark:bg-primary/5 flex items-center justify-center mb-2 sm:mb-4">
                        <img
                          src={service.icon || "/placeholder.svg"}
                          alt={service.title}
                          className="w-5 h-5 sm:w-6 sm:h-6"
                        />
                      </div>
                      <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                      <p className="text-sm sm:text-base text-muted-foreground mt-2">{service.shortDescription}</p>
                    </CardHeader>

                    <CardContent className="p-4 sm:p-6 text-sm text-muted-foreground">
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 text-primary text-lg">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="p-4 sm:p-6">
                      <Link to={`/services/${service.id}`} className="w-full">
                        <Button
                          variant="outline"
                          className="w-full group text-sm sm:text-base"
                        >
                          <span>Learn More</span>
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRevealOnScroll } from '@/lib/animations';
import { Service, getServices } from '@/lib/admin-service';

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const { ref, isVisible } = useRevealOnScroll();
  
  return (
    <div 
      //@ts-ignore - ref is correctly typed in the hook
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 group border-2 overflow-hidden card-animated transform-gpu hover:scale-[1.03] relative">
        <CardHeader className="relative overflow-hidden">
          {/* Animated Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 transform group-hover:scale-110 transition-transform duration-500 -z-10"></div>
          
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/5 flex items-center justify-center mb-4">
            <img 
              src={service.icon || "/placeholder.svg"} 
              alt={service.title || "Service"} 
              className="w-6 h-6"
            />
          </div>

          <CardTitle className="text-xl">{service.title || "Untitled Service"}</CardTitle>
          <CardDescription className="mt-2">{service.shortDescription || "No description available"}</CardDescription>
        </CardHeader>
        
        <CardContent className="text-sm text-muted-foreground mt-4">
          <ul className="space-y-2">
            {(service.features || []).slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-primary text-lg">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter>
          <Link to={`/services/${service.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full group"
            >
              <span>Learn More</span>
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const items = await getServices();
        console.log('Fetched services:', items);
        setServices(items);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
    window.scrollTo(0, 0);
  }, []);

  // Debug log
  console.log('Current state:', { services, isLoading, error });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageBanner
        title="Our Services"
        subtitle="Comprehensive digital solutions tailored for your business needs"
        backgroundImage="/images/services/services-banner.jpg"
      />
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="What We Offer"
            subtitle="Explore the range of services we provide"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

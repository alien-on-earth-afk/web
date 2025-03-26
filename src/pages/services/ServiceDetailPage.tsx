import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ExternalLink, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useRevealOnScroll } from '@/lib/animations';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  portfolioItems: {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
}

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { ref, isVisible } = useRevealOnScroll();
  
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://webark-backend.onrender.com/api/services/');
        const services = response.data.services || [];
        const foundService = services.find(s => s.id === serviceId);
        
        if (foundService) {
          setService(foundService);
        } else {
          navigate('/services');
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Failed to load service details');
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
    window.scrollTo(0, 0);
  }, [serviceId, navigate]);
  
  if (isLoading) {
    return <div className="container mx-auto px-6 py-12 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }
  
  return (
    <>
      <PageBanner
        title={service?.title}
        subtitle={service?.shortDescription}
        backgroundImage={service?.image}
      />
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Link to="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
              
              <div 
                //@ts-ignore - ref is correctly typed in the hook
                ref={ref}
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <p className="text-lg leading-relaxed">{service?.description}</p>
                </div>
                
                <Tabs defaultValue="features" className="mt-12">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="features">Features & Benefits</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="features" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service?.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="mt-1 mr-3 bg-primary/10 rounded-full p-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <p>{feature}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="portfolio" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service?.portfolioItems && service.portfolioItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all card-animated">
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={item.image || "/images/portfolio/placeholder.jpg"}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary inline-flex items-center hover:underline"
                            >
                              View Project <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card className="card-animated">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Service Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Starting from</span>
                        <span className="font-bold">$99</span>
                      </div>
                      
                      <Link to="/contact" className="block w-full">
                        <Button className="w-full">
                          Contact Us
                        </Button>
                      </Link>
                      
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Custom pricing available for specific requirements
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="card-animated">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                      <Badge variant="outline">Firebase</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="card-animated">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Have questions about this service or need a custom solution?
                    </p>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full">
                        Contact Us
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ExternalLink } from 'lucide-react';
import { WorkItem } from '@/types/admin';
import { getWorkItems } from '@/lib/admin-service';
import servicesData from 'public/data/services.json';
import { useRevealOnScroll } from '@/lib/animations';

const WorkPage = () => {
  console.log('WorkPage rendering'); // Debug log
  
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Debug log the services data
  console.log('Services data:', servicesData);
  const services = Array.isArray(servicesData.services) ? servicesData.services : [];
  
  useEffect(() => {
    const loadWorkItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const items = await getWorkItems();
        console.log('Loaded work items:', items); // Debug log
        setWorkItems(items);
      } catch (error) {
        console.error('Error loading work items:', error);
        setError('Failed to load portfolio items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkItems();
  }, []);
  
  // Debug log the current state
  console.log('Current state:', { workItems, selectedService, isLoading, error });
  
  const filteredItems = selectedService === 'all'
    ? workItems
    : workItems.filter(item => item.serviceId === selectedService);
  
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Early return for error state
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

  // Wrap the entire return in error boundary
  try {
    return (
      <div className="min-h-screen"> {/* Add min-height to ensure visibility */}
        <PageBanner
          title="Our Work"
          subtitle="Explore our latest projects and success stories"
          backgroundImage="/images/work/work-banner.jpg"
        />
        
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6">
            <SectionHeading
              title="Portfolio"
              subtitle="Featured Projects"
              align="center"
            />
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <Button
                variant={selectedService === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedService('all')}
                className="rounded-full"
              >
                All Projects
              </Button>
              {services.map(service => (
                <Button
                  key={service.id}
                  variant={selectedService === service.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedService(service.id)}
                  className="rounded-full"
                >
                  {service.title}
                </Button>
              ))}
            </div>
            
            {/* Content Section */}
            <div className="min-h-[200px]"> {/* Minimum height to ensure visibility */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-4">Loading projects...</p>
                </div>
              ) : sortedItems.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No portfolio items yet</h3>
                  <p className="text-muted-foreground">
                    {selectedService === 'all'
                      ? 'There are no portfolio items available yet.'
                      : `There are no items in the "${services.find(s => s.id === selectedService)?.title || selectedService}" category.`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedItems.map((item, index) => {
                    const service = services.find(s => s.id === item.serviceId);
                    
                    return (
                      <Card key={item.id} className="h-full overflow-hidden">
                        {item.featured && (
                          <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                        <div className="h-56 overflow-hidden">
                          <img
                            src={item.image || '/placeholder.svg'}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>
                              {new Date(item.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short'
                              })}
                            </span>
                            {service && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{service.title}</span>
                              </>
                            )}
                          </div>
                          <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm line-clamp-3">
                            {item.description}
                          </p>
                        </CardContent>
                        {item.link && (
                          <CardFooter className="pt-0">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary hover:underline text-sm"
                            >
                              View Project
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </CardFooter>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact us today to discuss how we can help bring your vision to life with our expert team and proven process.
              </p>
              <Link to="/contact">
                <Button size="lg" className="button-glow">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Render error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-600">We're having trouble displaying this page.</p>
        </div>
      </div>
    );
  }
};

export default WorkPage;



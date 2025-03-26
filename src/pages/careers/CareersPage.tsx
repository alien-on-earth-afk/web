
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  GraduationCap, 
  Rocket, 
  Coffee, 
  Lightbulb
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CareerPosting } from '@/types/admin';
import { getCareerPostings } from '@/lib/admin-service';
import { useRevealOnScroll } from '@/lib/animations';

const CareersPage = () => {
  const [jobs, setJobs] = useState<CareerPosting[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load job postings from admin service
    const postings = getCareerPostings().filter(job => job.isActive);
    setJobs(postings);
  }, []);
  
  // Get unique departments for filtering
  const departments = Array.from(new Set(jobs.map(job => job.department)));
  
  // Filter jobs based on selected type and department
  const filteredJobs = jobs.filter(job => {
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    return matchesType && matchesDepartment;
  });
  
  const { ref: heroRef, isVisible: heroVisible } = useRevealOnScroll();
  
  return (
    <>
      <PageBanner
        title="Join Our Team"
        subtitle="Explore careers and opportunities at WebARK"
        backgroundImage="/images/careers/careers-banner.jpg"
      />
      
      <section 
        className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900"
        // @ts-ignore - ref is correctly typed in the hook
        ref={heroRef}
      >
        <div className="container mx-auto px-6">
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At WebARK, we're building the future of digital experiences. Join our team of passionate innovators
                and problem-solvers in crafting solutions that make a difference.
              </p>
              <p className="mb-8">
                We believe in fostering a collaborative, inclusive, and growth-oriented environment where creative minds thrive.
              </p>
              <div className="space-y-4">
                <div className="flex">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Innovative Projects</p>
                    <p className="text-sm text-muted-foreground">Work on cutting-edge technologies and challenging projects</p>
                  </div>
                </div>
                <div className="flex">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Remote-First Culture</p>
                    <p className="text-sm text-muted-foreground">Flexible work arrangements that prioritize work-life balance</p>
                  </div>
                </div>
                <div className="flex">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Growth Opportunities</p>
                    <p className="text-sm text-muted-foreground">Continuous learning, mentorship, and career advancement</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md flex flex-col items-center text-center card-animated">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Collaborative Culture</h3>
                <p className="text-xs text-muted-foreground">Work with talented professionals in a supportive environment</p>
              </div>
              <div className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md flex flex-col items-center text-center card-animated">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Continuous Learning</h3>
                <p className="text-xs text-muted-foreground">Professional development budget and learning opportunities</p>
              </div>
              <div className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md flex flex-col items-center text-center card-animated">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Career Growth</h3>
                <p className="text-xs text-muted-foreground">Clear paths for advancement and professional development</p>
              </div>
              <div className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md flex flex-col items-center text-center card-animated">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Coffee className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Work-Life Balance</h3>
                <p className="text-xs text-muted-foreground">Flexible scheduling and generous PTO policy</p>
              </div>
              <div className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md flex flex-col items-center text-center card-animated">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Innovation Focus</h3>
                <p className="text-xs text-muted-foreground">Freedom to experiment and contribute creative solutions</p>
              </div>
              <div className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md flex flex-col items-center text-center card-animated">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Competitive Benefits</h3>
                <p className="text-xs text-muted-foreground">Comprehensive health, retirement, and wellness programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Open Positions"
            subtitle="Join Our Team"
            align="center"
          />
          
          <div className="mb-8">
            <Tabs defaultValue="all" onValueChange={setFilterType}>
              <div className="flex justify-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Types</TabsTrigger>
                  <TabsTrigger value="full-time">Full Time</TabsTrigger>
                  <TabsTrigger value="part-time">Part Time</TabsTrigger>
                  <TabsTrigger value="contract">Contract</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Button
                  variant={filterDepartment === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterDepartment('all')}
                  className="rounded-full"
                >
                  All Departments
                </Button>
                {departments.map(department => (
                  <Button
                    key={department}
                    variant={filterDepartment === department ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterDepartment(department)}
                    className="rounded-full"
                  >
                    {department}
                  </Button>
                ))}
              </div>
              
              <TabsContent value="all" className="mt-0">
                {renderJobList(filteredJobs)}
              </TabsContent>
              <TabsContent value="full-time" className="mt-0">
                {renderJobList(filteredJobs)}
              </TabsContent>
              <TabsContent value="part-time" className="mt-0">
                {renderJobList(filteredJobs)}
              </TabsContent>
              <TabsContent value="contract" className="mt-0">
                {renderJobList(filteredJobs)}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* No Positions Message */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="bg-primary/10 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No open positions</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We don't have any openings matching your criteria at the moment. Please check back later or send us your resume for future opportunities.
              </p>
              <Link to="/contact">
                <Button variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          )}
          
          {/* Still Interested CTA */}
          <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Don't See a Suitable Position?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume, and we'll keep it on file for future opportunities.
            </p>
            <Link to="/contact">
              <Button>
                Send Your Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

// Helper function to render job listings
const renderJobList = (jobs: CareerPosting[]) => {
  if (jobs.length === 0) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {jobs.map((job, index) => {
        const { ref, isVisible } = useRevealOnScroll();
        
        return (
          <div 
            key={job.id}
            // @ts-ignore - ref is correctly typed in the hook
            ref={ref}
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Card className="h-full card-animated hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">
                    {job.type === 'full-time' ? 'Full-time' : job.type === 'part-time' ? 'Part-time' : 'Contract'}
                  </Badge>
                  <Badge variant="secondary">{job.department}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-start">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <span>Apply by {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3 mt-4">
                  {job.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link to={`/contact?job=${encodeURIComponent(job.title)}`} className="w-full">
                  <Button variant="outline" className="w-full group">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CareersPage;


import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Twitter, Mail } from 'lucide-react';
import teamData from '@/data/team.json';
import { useRevealOnScroll } from '@/lib/animations';

const TeamPage = () => {
  const team = Array.isArray(teamData) ? teamData : teamData.team || [];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <PageBanner
        title="Our Team"
        subtitle="Meet the talented individuals who make WebARK exceptional"
        backgroundImage="/images/team/team-banner.jpg"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Leadership Team"
            subtitle="The visionaries guiding our company"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {team
              .filter(member => member.title && (member.title.includes('Chief') || member.title.includes('Director') || member.id.includes('1') || member.id.includes('2') || member.id.includes('3')))
              .map((leader, index) => {
                const { ref, isVisible } = useRevealOnScroll();
                return (
                  <div
                    key={leader.id}
                    //@ts-ignore - ref is correctly typed in the hook
                    ref={ref}
                    className={`transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Card className="overflow-hidden group">
                      <div className="relative overflow-hidden">
                        <img
                          src={leader.image || `/images/team/placeholder.jpg`}
                          alt={leader.name}
                          className="w-full aspect-square object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full flex justify-center space-x-4">
                            {leader.socialLinks?.twitter && (
                              <a
                                href={leader.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-primary transition-colors"
                              >
                                <Twitter size={20} />
                              </a>
                            )}
                            {leader.socialLinks?.linkedin && (
                              <a
                                href={leader.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-primary transition-colors"
                              >
                                <Linkedin size={20} />
                              </a>
                            )}
                            {leader.socialLinks?.facebook && (
                              <a
                                href={leader.socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-primary transition-colors"
                              >
                                <Facebook size={20} />
                              </a>
                            )}
                            {leader.email && (
                              <a
                                href={`mailto:${leader.email}`}
                                className="text-white hover:text-primary transition-colors"
                              >
                                <Mail size={20} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardContent className="text-center py-6">
                        <h3 className="font-bold text-xl">{leader.name}</h3>
                        <p className="text-primary mt-1">{leader.title}</p>
                        <p className="text-muted-foreground mt-3 text-sm line-clamp-2">{leader.bio}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Design & Development"
            subtitle="The creative minds behind our projects"
            align="center"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 mt-12">
            {team
              .filter(member => member.title && !member.title.includes('Chief') && !member.title.includes('Director') && !member.id.includes('1') && !member.id.includes('2') && !member.id.includes('3'))
              .map((member, index) => {
                const { ref, isVisible } = useRevealOnScroll();
                return (
                  <div
                    key={member.id}
                    //@ts-ignore - ref is correctly typed in the hook
                    ref={ref}
                    className={`transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="text-center group">
                      <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                        <img
                          src={member.image || `/images/team/placeholder.jpg`}
                          alt={member.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-primary text-sm">{member.title}</p>
                      <div className="mt-3 flex justify-center space-x-3">
                        {member.socialLinks?.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                          >
                            <Mail size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented and passionate individuals to join our team. Check out our current openings and see if there's a match for your skills and interests.
            </p>
            <Link to="/careers">
              <Button size="lg">View Open Positions</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;

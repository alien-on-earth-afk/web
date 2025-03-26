
import { useEffect, useState } from 'react';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import emailjs from '@emailjs/browser';


import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useRevealOnScroll } from '@/lib/animations';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });

  const { toast } = useToast();
  const { ref: formRef, isVisible: formVisible } = useRevealOnScroll();
  const { ref: mapRef, isVisible: mapVisible } = useRevealOnScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: false });

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        service: formData.service,
      };

      const result = await emailjs.send(
        'service_5swvvmq',      
        'template_mnzvcws',   
        templateParams,
        'h0SY__TQ2KCYuhqGy'       
      );

      if (result.status === 200) {
        setFormStatus({ submitting: false, submitted: true, error: false });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          service: ''
        });

        toast({
          title: "Message Sent",
          description: "We've received your message and will get back to you soon.",
          duration: 5000,
        });
      }
    } catch (error) {
      setFormStatus({ submitting: false, submitted: false, error: true });

      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        duration: 5000,
      });
    }
  };


  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with our team for any inquiries or project discussions"
        backgroundImage="/images/contact-banner.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className="lg:order-2"
              //@ts-ignore - ref is correctly typed in the hook
              ref={formRef}
            >
              <div className={`transition-all duration-1000 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                <div className="bg-card border rounded-xl p-8 shadow-sm">
                  {formStatus.submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                      <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        Your message has been successfully sent. We'll get back to you as soon as possible.
                      </p>
                      <Button
                        onClick={() => {
                          window.open(`https://wa.me/917011109849`, '_blank');
                        }}
                        variant="outline"
                      >
                        Contact On WhatsApp
                      </Button>

                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Your Name</Label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+0 (555) 000-0000"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="service">Service Interested In</Label>
                              <Select
                                value={formData.service}
                                onValueChange={handleSelectChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="web-development">Web Development</SelectItem>
                                  <SelectItem value="app-development">App Development</SelectItem>
                                  <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                                  <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                                  <SelectItem value="branding">Branding</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell us about your project or inquiry..."
                              rows={5}
                              required
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full md:w-auto"
                            disabled={formStatus.submitting}
                          >
                            {formStatus.submitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              className="lg:order-1"
              //@ts-ignore - ref is correctly typed in the hook
              ref={mapRef}
            >
              <div className={`transition-all duration-1000 ${mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have a question, project idea, or want to discuss how we can help your business?
                  Our team is ready to help you find the perfect solution for your needs.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Our Location</h3>
                      <p className="text-muted-foreground">New Delhi, India</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">+91 7011109849</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">info@webark.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden h-64 md:h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130391732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1636451204700!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Connect With Us"
            subtitle="Follow us on social media"
            align="center"
          />

          <div className="flex justify-center space-x-4 mt-8">
            <a href="#" className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Facebook className="h-6 w-6 text-primary" />
            </a>
            <a href="#" className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Twitter className="h-6 w-6 text-primary" />
            </a>
            <a href="#" className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Instagram className="h-6 w-6 text-primary" />
            </a>
            <a href="#" className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Linkedin className="h-6 w-6 text-primary" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Looking for Jobs?</h3>
                <p className="text-muted-foreground mb-6">
                  We're always looking for talented individuals to join our team. Check out our open positions.
                </p>
                <Button variant="outline" className="mt-2 group">
                  <span>View Careers</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Need Support?</h3>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you with any technical issues or questions.
                </p>
                <Button variant="outline" className="mt-2 group">
                  <span>Get Support</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
                <p className="text-muted-foreground mb-6">
                  Interested in our services? Let's discuss your project and explore how we can help.
                </p>
                <Button className="mt-2 group">
                  <span>Request a Quote</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;


import { useEffect } from 'react';
import PageBanner from '@/components/shared/PageBanner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <PageBanner
        title="Privacy Policy"
        subtitle="Learn how we collect, use, and protect your information"
        backgroundImage="/images/policies/privacy-banner.jpg"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="lead">
                This Privacy Policy describes how WebARK ("we", "our", or "us") collects, uses, and shares your information when you use our website and services.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, fill out a form, or communicate with us. The types of information we may collect include your name, email address, postal address, phone number, and any other information you choose to provide.
              </p>
              <p>
                We also automatically collect certain information when you use our website, including:
              </p>
              <ul>
                <li>Log information (IP address, browser type, pages viewed, time spent)</li>
                <li>Device information (hardware model, operating system)</li>
                <li>Cookies and similar technologies</li>
                <li>Usage data (features used, interaction patterns)</li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>
                We may use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address fraud and other illegal activities</li>
                <li>Personalize and improve your experience</li>
              </ul>
              
              <h2>Sharing Your Information</h2>
              <p>
                We may share your information as follows:
              </p>
              <ul>
                <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                <li>In response to a request for information if we believe disclosure is required by law</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies</li>
                <li>In connection with a merger, sale of company assets, financing, or acquisition</li>
              </ul>
              
              <h2>Data Retention</h2>
              <p>
                We retain personal information we collect from you for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              
              <h2>Your Choices</h2>
              <p>
                You have several choices regarding the use of information on our service:
              </p>
              <ul>
                <li>Account Information: You may update, correct or delete your account information at any time by logging into your account or contacting us</li>
                <li>Cookies: Most web browsers accept cookies by default. You can set your browser to remove or reject cookies</li>
                <li>Promotional Communications: You may opt out of receiving promotional emails from us by following the instructions in those emails</li>
              </ul>
              
              <h2>Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>
              
              <h2>International Data Transfers</h2>
              <p>
                We may transfer information that we collect to locations outside your jurisdiction, including the United States, which may have data protection laws that are different from those in your country.
              </p>
              
              <h2>Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under 16 years of age. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we will take steps to remove that information.
              </p>
              
              <h2>Changes to this Policy</h2>
              <p>
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, provide additional notice.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@webark.com<br />
                Address: 123 Innovation Way, Tech City, CA 90210<br />
                Phone: +1 (555) 123-4567
              </p>
              
              <div className="mt-12 border-t pt-8">
                <p className="text-sm text-muted-foreground">
                  Last Updated: November 1, 2023
                </p>
              </div>
            </div>
            
            <div className="mt-10 flex justify-center">
              <Link to="/policies/terms">
                <Button variant="outline">View Terms of Service</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;

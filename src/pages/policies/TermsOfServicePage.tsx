
import { useEffect } from 'react';
import PageBanner from '@/components/shared/PageBanner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <PageBanner
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
        backgroundImage="/images/policies/terms-banner.jpg"
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
                These Terms of Service ("Terms") govern your access to and use of WebARK's website and services. Please read these Terms carefully before using our services.
              </p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our services.
              </p>
              
              <h2>2. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website or sending you a notification. Your continued use of our services after such modifications will constitute your acknowledgment of the modified Terms and agreement to abide by them.
              </p>
              
              <h2>3. Services and Description</h2>
              <p>
                WebARK provides digital design, development, and marketing services for businesses and individuals. The specific deliverables, timelines, and costs for each project will be outlined in a separate agreement or statement of work.
              </p>
              
              <h2>4. Account Registration</h2>
              <p>
                Some features of our services require you to register for an account. When you register, you agree to provide accurate, current, and complete information and to update this information to keep it accurate, current, and complete. You are responsible for safeguarding your account information and for all activities that occur under your account.
              </p>
              
              <h2>5. Intellectual Property Rights</h2>
              <p>
                <strong>5.1 Our Content:</strong> Unless otherwise indicated, our website and services, including content such as text, graphics, logos, images, and software, are owned by or licensed to WebARK and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                <strong>5.2 Your Content:</strong> You retain ownership of any content you provide to us in connection with our services. By providing content to us, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection with providing our services to you.
              </p>
              <p>
                <strong>5.3 Client Work:</strong> Upon full payment of all invoices, the client will own the deliverables produced as part of the services, except for any third-party materials or WebARK's proprietary tools, frameworks, or methodologies.
              </p>
              
              <h2>6. User Conduct</h2>
              <p>
                When using our services, you agree not to:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe the intellectual property rights of others</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to any part of our services</li>
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Harass, abuse, or harm another person</li>
                <li>Transmit any malware, viruses, or other harmful code</li>
              </ul>
              
              <h2>7. Payment Terms</h2>
              <p>
                <strong>7.1 Fees:</strong> Fees for our services will be specified in the agreement or statement of work between WebARK and the client.
              </p>
              <p>
                <strong>7.2 Invoicing:</strong> Unless otherwise specified, payment is due within 30 days of the invoice date. Late payments may be subject to a late fee.
              </p>
              <p>
                <strong>7.3 Taxes:</strong> All fees are exclusive of taxes. You are responsible for paying all applicable taxes.
              </p>
              
              <h2>8. Termination</h2>
              <p>
                <strong>8.1 By You:</strong> You may terminate your account or engagement with us at any time by providing written notice. You remain liable for all amounts due up to and including the date of termination.
              </p>
              <p>
                <strong>8.2 By Us:</strong> We may terminate or suspend your account or engagement at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
              
              <h2>9. Disclaimer of Warranties</h2>
              <p>
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              
              <h2>10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WEBARK BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              
              <h2>11. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless WebARK and its officers, directors, employees, agents, and representatives from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of our services or your violation of these Terms.
              </p>
              
              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
              
              <h2>13. Dispute Resolution</h2>
              <p>
                Any dispute arising from these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in Los Angeles, California.
              </p>
              
              <h2>14. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between you and WebARK regarding your use of our services and supersede all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning our services.
              </p>
              
              <div className="mt-12 border-t pt-8">
                <p className="text-sm text-muted-foreground">
                  Last Updated: November 1, 2023
                </p>
              </div>
            </div>
            
            <div className="mt-10 flex justify-center">
              <Link to="/policies/privacy">
                <Button variant="outline">View Privacy Policy</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfServicePage;

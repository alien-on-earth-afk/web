import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-6 pb-3 border-t border-gray-200 dark:border-gray-800 text-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Company Info */}
          <div className="space-y-2">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-white dark:to-white/80">
                Web<span className="font-extrabold">ARK</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              Crafting digital experiences with cutting-edge technology and exceptional design.
            </p>
            <div className="flex space-x-3 pt-1">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links & Services (Side by Side on Mobile) */}
          <div className="grid grid-cols-2 gap-6">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Quick Links</h3>
              <ul className="space-y-2">
                {['Services', 'About Us', 'Case Studies', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary dark:hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Services</h3>
              <ul className="space-y-2">
                {['Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design', 'Video Editing'].map((item) => (
                  <li key={item}>
                    <Link to={`/services/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary dark:hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={14} className="text-primary dark:text-white mr-2" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={14} className="text-primary dark:text-white mr-2" />
                <a href="tel:+917011109849">+91 7011109849</a>
              </li>
              <li className="flex items-center">
                <Mail size={14} className="text-primary dark:text-white mr-2" />
                <a href="mailto:info@webark.com">info@webark.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {currentYear} WebARK. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

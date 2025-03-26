import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext'; // Adjust import path as needed
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingCart, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Services', path: '/services' },
  { title: 'Our Work', path: '/work' },
  { title: 'About Us', path: '/about' },
  { title: 'Careers', path: '/careers' },
  { title: 'Contact Us', path: '/contact' },
  { title: 'Our Team', path: '/about/team' }
];

// Enhanced Theme Toggle Component
const EnhancedThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner overflow-hidden"
      aria-label="Toggle dark mode"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >

      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md transition-all duration-300 ease-in-out 
         ${theme === 'dark'
            ? 'translate-x-6 bg-gradient-to-br from-indigo-500 to-purple-500'
            : 'translate-x-1 bg-gradient-to-br from-yellow-400 to-orange-500'}`}
        initial={false}
        animate={{
          x: theme === 'dark' ? 24 : 4,
          background: theme === 'dark'
            ? 'linear-gradient(to bottom right, #6366f1, #8b5cf6)'
            : 'linear-gradient(to bottom right, #fbbf24, #f97316)'
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          top: '10%',
          left: theme === 'dark' ? '2px' : '-3px'
        }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 30 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"

              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop: '-10px',  // Slight vertical adjustment
                marginLeft: '-4px' // Slight horizontal adjustment
              }}
            >
              <Moon size={14} className="text-white opacity-80" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -30 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"

              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop: '-10px',  // Slight vertical adjustment
                marginRight: '4px'  // Slight horizontal adjustment
              }}
            >
              <Sun size={14} className="text-white opacity-140 w-40 h-40" strokeWidth={5.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  // Improved scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Reduced threshold to make header more responsive
      setIsScrolled(window.scrollY > 0);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page loads with scroll
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-2 shadow-md'
          : 'bg-white dark:bg-gray-600 py-2'
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-12">
        {/* Logo with hover effect */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="flex items-center"
            aria-label="WebARK Home"
          >
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-white dark:to-white/80">
              Web<span className="font-extrabold">ARK</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1 items-center">
          <AnimatePresence>
            {navItems.map(item => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`nav-link px-3 py-1 text-sm ${location.pathname === item.path
                      ? 'text-primary dark:text-white font-semibold'
                      : 'text-gray-600 dark:text-gray-300'
                    } hover:text-primary dark:hover:text-white transition-colors`}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Enhanced Theme Toggle */}
          <div className="ml-2">
            <EnhancedThemeToggle />
          </div>
        </nav>
       {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <EnhancedThemeToggle />

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
     {/* Animated Mobile Menu */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div 
      id="mobile-menu"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: "tween" }}
      className="fixed inset-0 bg-white dark:bg-black z-40 md:hidden overflow-y-auto"
      style={{ 
        top: '48px',
        height: 'calc(100vh - 48px)',
        position: 'fixed'
      }}
    >
      <nav 
        className="h-full flex flex-col pt-3 pb-20 px-4 overflow-y-auto"
        style={{ 
          maxHeight: '100%',
          overscrollBehavior: 'contain' 
        }}
      >
        <AnimatePresence>
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.3 
              }}
            >
              <Link
                to={item.path}
                className={`py-3 text-sm border-b border-gray-100 dark:border-gray-800 block ${
                  location.pathname === item.path 
                    ? 'text-primary dark:text-white font-semibold' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </nav>
    </motion.div>
  )}
</AnimatePresence>
    </motion.header>
  );
};

export default Header;
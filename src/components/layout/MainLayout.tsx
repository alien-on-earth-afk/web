
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

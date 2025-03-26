
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';


interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-800 p-4 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight logo-animate">
            WebARK Admin
          </span>
        </Link>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10">
        <div className="flex flex-col flex-grow overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight logo-animate">
                WebARK Admin
              </span>
            </Link>
          </div>
          <div className="flex flex-col flex-grow px-4 pt-5">
            <nav className="flex-1 space-y-1">
              <Link
                to="/admin/dashboard"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/admin/dashboard')
                    ? 'bg-primary text-white dark:bg-primary dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/admin/blog"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/admin/blog')
                    ? 'bg-primary text-white dark:bg-primary dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                Blog Posts
              </Link>
              <Link
                to="/admin/work"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/admin/work')
                    ? 'bg-primary text-white dark:bg-primary dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Portfolio Work
              </Link>
              <Link
                to="/admin/careers"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/admin/careers')
                    ? 'bg-primary text-white dark:bg-primary dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Career Postings
              </Link>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-lg transform transition ease-in-out duration-300">
            <div className="flex-1 overflow-y-auto pt-5 pb-4">
              <nav className="px-4 space-y-1">
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive('/admin/dashboard')
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                  <ChevronRight className="ml-auto h-5 w-5" />
                </Link>
                <Link
                  to="/admin/blog"
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive('/admin/blog')
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FileText className="mr-3 h-5 w-5" />
                  Blog Posts
                  <ChevronRight className="ml-auto h-5 w-5" />
                </Link>
                <Link
                  to="/admin/work"
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive('/admin/work')
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Briefcase className="mr-3 h-5 w-5" />
                  Portfolio Work
                  <ChevronRight className="ml-auto h-5 w-5" />
                </Link>
                <Link
                  to="/admin/careers"
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive('/admin/careers')
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Career Postings
                  <ChevronRight className="ml-auto h-5 w-5" />
                </Link>
              </nav>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

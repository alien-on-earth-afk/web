
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 text-center">
        <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-primary dark:text-white">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-primary/20 dark:border-white/10 text-primary dark:text-white rounded-lg font-medium transition-all hover:bg-primary/5 dark:hover:bg-white/5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

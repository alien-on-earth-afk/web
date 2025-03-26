
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full flex items-center transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark p-1"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
      }}
    >
      <span 
        className="absolute left-0 transform transition-transform duration-300 ease-spring"
        style={{
          transform: theme === 'dark' ? 'translateX(6px)' : 'translateX(30px)'
        }}
      >
        {theme === 'dark' ? (
          <Moon size={16} className="text-white" />
        ) : (
          <Sun size={16} className="text-black" />
        )}
      </span>
      <span 
        className="w-5 h-5 rounded-full bg-white dark:bg-zinc-900 shadow-md transform transition-transform duration-500 ease-spring"
        style={{
          transform: theme === 'dark' ? 'translateX(0)' : 'translateX(24px)'
        }}
      />
    </button>
  );
};


/**
 * Helper functions for handling placeholder images and lazy loading
 */

// Default placeholder images by category
export const getPlaceholderImage = (category: string): string => {
  const placeholders: Record<string, string> = {
    service: '/placeholder.svg',
    team: '/placeholder.svg',
    blog: '/placeholder.svg',
    portfolio: '/placeholder.svg',
    testimonial: '/placeholder.svg',
    caseStudy: '/placeholder.svg',
    generic: '/placeholder.svg',
  };
  
  return placeholders[category] || placeholders.generic;
};

// Function to handle image loading errors
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, category: string = 'generic'): void => {
  e.currentTarget.src = getPlaceholderImage(category);
};

// Generate background gradient placeholders
export const getGradientPlaceholder = (index: number): string => {
  const gradients = [
    'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
    'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%)',
  ];
  
  return gradients[index % gradients.length];
};

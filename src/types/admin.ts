export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  author: string;
  date: string;
  tags: string[];
  featured: boolean;
}

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  serviceId: string;
  link: string;
  image: string;
  date: string;
  featured: boolean;
  client: string;
  technologies: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  date: string;
  active: boolean;
}

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
  name?: string;
  email?: string;
}

export interface CareerPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  posted: string;
  deadline: string;
  isActive: boolean;
}

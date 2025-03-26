import { BlogPost, WorkItem, JobPosting, CareerPosting } from '@/types/admin';
import axios from 'axios';

const API_URL = 'https://webark-backend.onrender.com/api';

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    content: `
      <p>Web development is constantly evolving, with new technologies emerging at a rapid pace. In this article, we explore the most promising trends that will shape the web development landscape in the coming years.</p>
      <h2>1. WebAssembly</h2>
      <p>WebAssembly (Wasm) is revolutionizing what's possible on the web, enabling high-performance applications that previously could only exist as native apps.</p>
      <h2>2. Edge Computing</h2>
      <p>Edge computing brings computation and data storage closer to the location where it's needed, improving response times and saving bandwidth.</p>
      <h2>3. AI-Driven Development</h2>
      <p>Artificial intelligence is increasingly being used to automate aspects of web development, from code generation to testing and optimization.</p>
    `,
    excerpt: 'Web development is evolving rapidly. Learn about the technologies that will define the next generation of web applications.',
    featuredImage: '/images/blog/future-web.jpg',
    category: 'Technology',
    author: 'Jane Smith',
    date: '2023-06-15',
    tags: ['WebAssembly', 'Edge Computing', 'AI', 'Future Tech'],
    featured: true
  },
  {
    id: '2',
    title: 'Optimizing Web Performance',
    slug: 'optimizing-web-performance',
    content: `
      <p>Website performance has a direct impact on user experience and conversion rates. In this comprehensive guide, we'll explore proven strategies to optimize your web applications for speed and efficiency.</p>
      <h2>Understanding Performance Metrics</h2>
      <p>Before diving into optimization techniques, it's crucial to understand what we're measuring. Key performance indicators like First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Time to Interactive (TTI) provide valuable insights into different aspects of performance.</p>
      <h2>Image Optimization</h2>
      <p>Images often account for the majority of a webpage's size. Implementing techniques like lazy loading, proper formatting, compression, and responsive images can significantly reduce load times.</p>
      <h2>Code Splitting and Bundling</h2>
      <p>Modern JavaScript frameworks offer tools for splitting your code into smaller chunks that can be loaded on demand, rather than forcing users to download the entire application upfront.</p>
    `,
    excerpt: 'Learn how to significantly improve your website\'s loading speed and overall performance with these battle-tested techniques.',
    featuredImage: '/images/blog/web-performance.jpg',
    category: 'Development',
    author: 'Michael Johnson',
    date: '2023-05-22',
    tags: ['Performance', 'Optimization', 'Web Development'],
    featured: false
  }
];

// Mock data for job postings
const jobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    description: `
      <h3>About the Role</h3>
      <p>We're looking for an experienced Frontend Developer to join our growing team. You'll be responsible for building responsive and interactive web applications using modern JavaScript frameworks.</p>
      
      <h3>Responsibilities</h3>
      <ul>
        <li>Develop new user-facing features using React.js</li>
        <li>Build reusable components and libraries for future use</li>
        <li>Optimize applications for maximum speed and scalability</li>
        <li>Collaborate with back-end developers and web designers</li>
      </ul>
      
      <h3>Requirements</h3>
      <ul>
        <li>3+ years experience with React.js</li>
        <li>Strong proficiency in JavaScript, including DOM manipulation and ES6+</li>
        <li>Experience with state management libraries (Redux, MobX, etc.)</li>
        <li>Familiarity with modern front-end build pipelines and tools</li>
        <li>Experience with common front-end development tools</li>
      </ul>
    `,
    requirements: ['3+ years React experience', 'TypeScript proficiency', 'CSS expertise'],
    date: '2023-06-30',
    active: true
  }
];

// Auth check for mock admin login
const checkAuth = (username: string, password: string): boolean => {
  return username === 'admin' && password === 'admin123';
};

// Function to get all blog posts
export const getBlogPosts = (): BlogPost[] => {
  return blogPosts;
};

// Function to get a single blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get all work items
export const getWorkItems = async (): Promise<WorkItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/work`);
    return response.data.works || [];
  } catch (error) {
    console.error('Error fetching work items:', error);
    return [];
  }
};

// Function to get a single work item by id
export const getWorkItemById = (id: string): WorkItem | undefined => {
  return workItems.find(item => item.id === id);
};

// Function to get job postings
export const getJobPostings = (): JobPosting[] => {
  return jobPostings;
};

// Function to get a single job posting by id
export const getJobPostingById = (id: string): JobPosting | undefined => {
  return jobPostings.find(job => job.id === id);
};

// Function to authenticate a user
export const authenticateUser = (username: string, password: string): boolean => {
  return checkAuth(username, password);
};

// Helper function to generate a unique ID
export const generateId = () => Date.now().toString();

// Helper function to create a slug from a title
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Helper function to get current date in ISO format
export const getCurrentDate = () => new Date().toISOString().split('T')[0];

// Function to save a blog post (would connect to API in real app)
export const saveBlogPost = (post: BlogPost): BlogPost => {
  const existingPostIndex = blogPosts.findIndex(p => p.id === post.id);
  
  if (existingPostIndex >= 0) {
    blogPosts[existingPostIndex] = post;
  } else {
    blogPosts.push(post);
  }
  
  return post;
};

// Function to delete a blog post
export const deleteBlogPost = (id: string): boolean => {
  const initialLength = blogPosts.length;
  const newBlogPosts = blogPosts.filter(post => post.id !== id);
  
  if (newBlogPosts.length < initialLength) {
    while (blogPosts.length) {
      blogPosts.pop();
    }
    
    blogPosts.push(...newBlogPosts);
    return true;
  }
  
  return false;
};

// Function to save a work item
export const saveWorkItem = async (item: WorkItem): Promise<WorkItem> => {
  try {
    // If no id, it's a new item - use POST
    // If has id, it's an update - use PUT
    const response = !item.id 
      ? await axios.post(`${API_URL}/work`, item)
      : await axios.put(`${API_URL}/work/${item.id}`, item);
    return response.data;
  } catch (error) {
    console.error('Error saving work item:', error);
    throw error;
  }
};

// Function to delete a work item
export const deleteWorkItem = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/work/${id}`);
  } catch (error) {
    console.error('Error deleting work item:', error);
    throw error;
  }
};

// Function to get career postings
export const getCareerPostings = (): JobPosting[] => {
  return jobPostings;
};

export const saveCareerPosting = (posting: JobPosting): JobPosting => {
  const existingPostingIndex = jobPostings.findIndex(p => p.id === posting.id);
  
  if (existingPostingIndex >= 0) {
    jobPostings[existingPostingIndex] = posting;
  } else {
    jobPostings.push(posting);
  }
  
  return posting;
};

export const deleteCareerPosting = (id: string): boolean => {
  const initialLength = jobPostings.length;
  const newJobPostings = jobPostings.filter(posting => posting.id !== id);
  
  if (newJobPostings.length < initialLength) {
    while (jobPostings.length) {
      jobPostings.pop();
    }
    
    jobPostings.push(...newJobPostings);
    return true;
  }
  
  return false;
};

export const getBlogPost = (id: string): BlogPost | null => {
  const allPosts = getBlogPosts();  // Assuming getBlogPosts() returns all posts
  return allPosts.find(post => post.id === id) || null;
};

// Add this near the top with other interfaces
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  portfolioItems?: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
  }>;
}

// Add these new functions
export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    return response.data.services || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const saveService = async (service: Service): Promise<Service> => {
  try {
    const serviceData = {
      ...service,
      id: service.id || Date.now().toString(),
      icon: service.icon || '/placeholder.svg',
      image: service.image || '/placeholder.svg',
      features: service.features || [],
      portfolioItems: service.portfolioItems || []
    };

    const response = service.id
      ? await axios.put(`${API_URL}/services/${service.id}`, serviceData)
      : await axios.post(`${API_URL}/services`, serviceData);
    
    return response.data;
  } catch (error) {
    console.error('Error saving service:', error);
    throw error;
  }
};

export default {
  getBlogPosts,
  getBlogPostBySlug,
  getWorkItems,
  getWorkItemById,
  getJobPostings,
  getJobPostingById,
  authenticateUser,
  getServices
};

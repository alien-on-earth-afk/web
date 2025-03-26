
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types/admin';
import { getBlogPosts } from '@/lib/admin-service';
import { useRevealOnScroll } from '@/lib/animations';

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load blog posts from admin service
    const blogPosts = getBlogPosts();
    setPosts(blogPosts);
    
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
    setCategories(uniqueCategories);
  }, []);
  
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);
  
  return (
    <>
      <PageBanner
        title="Our Blog"
        subtitle="Insights, news, and expertise from our team"
        backgroundImage="/images/blog/blog-banner.jpg"
      />
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <SectionHeading
                title="Latest Articles"
                align="left"
              />
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No blog posts yet</h3>
                  <p className="text-muted-foreground">
                    {selectedCategory === 'all' 
                      ? 'There are no blog posts available yet.' 
                      : `There are no posts in the "${selectedCategory}" category.`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => {
                    const { ref, isVisible } = useRevealOnScroll();
                    return (
                      <div 
                        key={post.id} 
                        // @ts-ignore - ref is correctly typed in the hook
                        ref={ref}
                        className={`transition-all duration-700 ${
                          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <Link to={`/blog/${post.slug || post.id}`}>
                          <Card className="h-full card-animated overflow-hidden">
                            <div className="h-48 overflow-hidden">
                              <img
                                src={post.image || '/placeholder.svg'}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <CardHeader>
                              <div className="flex items-center text-sm text-muted-foreground mb-2 flex-wrap gap-2">
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  <span>
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <span className="mx-2 hidden md:inline">•</span>
                                <div className="flex items-center">
                                  <User className="mr-1 h-3 w-3" />
                                  <span>{post.author}</span>
                                </div>
                              </div>
                              <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                                {post.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                {post.excerpt}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {post.tags.slice(0, 3).map((tag, index) => (
                                  <div key={index} className="flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    <Tag className="mr-1 h-3 w-3" />
                                    {tag}
                                  </div>
                                ))}
                                {post.tags.length > 3 && (
                                  <div className="text-xs text-muted-foreground">
                                    +{post.tags.length - 3} more
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter className="flex items-center pt-4 text-primary">
                              <span className="text-sm font-medium">Read more</span>
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </CardFooter>
                          </Card>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4 mt-8 md:mt-0">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <Card className="card-animated">
                  <CardHeader>
                    <CardTitle className="text-xl">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <ul className="space-y-2">
                      <li>
                        <button
                          className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-primary/10 transition-colors ${
                            selectedCategory === 'all' ? 'bg-primary/10 text-primary font-medium' : ''
                          }`}
                          onClick={() => setSelectedCategory('all')}
                        >
                          All Categories
                        </button>
                      </li>
                      {categories.map(category => (
                        <li key={category}>
                          <button
                            className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-primary/10 transition-colors ${
                              selectedCategory === category ? 'bg-primary/10 text-primary font-medium' : ''
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Recent Posts */}
                <Card className="card-animated">
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {posts.slice(0, 5).map(post => (
                        <li key={post.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                          <Link to={`/blog/${post.slug || post.id}`} className="hover:text-primary transition-colors">
                            <p className="font-medium mb-1 line-clamp-2">{post.title}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Popular Tags */}
                <Card className="card-animated">
                  <CardHeader>
                    <CardTitle className="text-xl">Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(posts.flatMap(post => post.tags))).slice(0, 10).map((tag, index) => (
                        <div key={index} className="flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;

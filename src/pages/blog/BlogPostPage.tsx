
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BlogPost } from '@/types/admin';
import { getBlogPost, getBlogPosts } from '@/lib/admin-service';
import { useToast } from '@/hooks/use-toast';

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (postId) {
      const blogPost = getBlogPost(postId);
      
      if (blogPost) {
        setPost(blogPost);
        
        // Find related posts in the same category or with shared tags
        const allPosts = getBlogPosts();
        const related = allPosts
          .filter(p => p.id !== blogPost.id)
          .filter(p => 
            p.category === blogPost.category ||
            p.tags.some(tag => blogPost.tags.includes(tag))
          )
          .slice(0, 3);
        setRelatedPosts(related);
      } else {
        // Post not found, redirect to blog listing
        navigate('/blog');
        toast({
          title: "Post not found",
          description: "The requested blog post could not be found.",
          variant: "destructive"
        });
      }
    }
  }, [postId, navigate, toast]);
  
  if (!post) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied",
        description: "The post URL has been copied to your clipboard."
      });
    });
  };
  
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            {/* Post Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center text-sm text-muted-foreground mb-6 flex-wrap gap-y-2">
                <div className="flex items-center mr-4">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center mr-4">
                  <User className="mr-1 h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                  {post.category}
                </div>
              </div>
              
              {/* Featured Image */}
              <div className="rounded-lg overflow-hidden h-80 md:h-[32rem] mb-8">
                <img
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Post Content */}
            <div className="prose dark:prose-invert max-w-none mb-12">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            {/* Tags & Share */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <div key={index} className="flex items-center text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-muted-foreground mr-2">Share:</div>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={copyShareLink}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8" asChild>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8" asChild>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8" asChild>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="bg-primary/5 rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-4 mb-12">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img 
                    src={post.authorImage || '/placeholder.svg'} 
                    alt={post.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{post.author}</h3>
                <p className="text-muted-foreground text-sm">
                  Expert writer and thought leader in the technology industry with over 10 years of experience.
                  Passionate about sharing insights on the latest trends and innovations.
                </p>
              </div>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <Separator className="mb-8" />
                <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map(related => (
                    <Link to={`/blog/${related.slug || related.id}`} key={related.id}>
                      <Card className="h-full card-animated overflow-hidden">
                        <div className="h-40 overflow-hidden">
                          <img
                            src={related.image || '/placeholder.svg'}
                            alt={related.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg line-clamp-2">{related.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {related.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              {/* Recent Posts */}
              <Card className="card-animated">
                <CardHeader>
                  <CardTitle className="text-xl">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {getBlogPosts().slice(0, 5).map(recentPost => (
                      <li key={recentPost.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                        <Link to={`/blog/${recentPost.slug || recentPost.id}`} className="hover:text-primary transition-colors">
                          <p className="font-medium mb-1 line-clamp-2">{recentPost.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>
                              {new Date(recentPost.date).toLocaleDateString('en-US', {
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
              
              {/* Categories */}
              <Card className="card-animated">
                <CardHeader>
                  <CardTitle className="text-xl">Categories</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <ul className="space-y-2">
                    {Array.from(new Set(getBlogPosts().map(p => p.category))).map(category => (
                      <li key={category}>
                        <Link
                          to="/blog"
                          className="block px-2 py-1 rounded text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Tags */}
              <Card className="card-animated">
                <CardHeader>
                  <CardTitle className="text-xl">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(getBlogPosts().flatMap(p => p.tags))).slice(0, 15).map((tag, index) => (
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
    </div>
  );
};

export default BlogPostPage;

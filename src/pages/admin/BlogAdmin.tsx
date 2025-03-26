
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar, Tag, User } from 'lucide-react';
import { BlogPost } from '@/types/admin';
import { 
  getBlogPosts, 
  saveBlogPost, 
  deleteBlogPost, 
  generateId, 
  createSlug, 
  getCurrentDate 
} from '@/lib/admin-service';

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const blogPosts = getBlogPosts();
    setPosts(blogPosts);
  };

  const handleNewPost = () => {
    setCurrentPost({
      id: generateId(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      authorImage: '/placeholder.svg',
      date: getCurrentDate(),
      category: 'General',
      tags: [],
      image: '/placeholder.svg'
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentPost) {
      deleteBlogPost(currentPost.id);
      loadPosts();
      setIsDeleteDialogOpen(false);
      toast({
        title: "Post deleted",
        description: "The blog post has been deleted successfully",
        duration: 3000
      });
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentPost) {
      // If slug is empty, generate from title
      if (!currentPost.slug && currentPost.title) {
        currentPost.slug = createSlug(currentPost.title);
      }
      
      // Set tags from comma-separated string if needed
      if (typeof currentPost.tags === 'string') {
        currentPost.tags = (currentPost.tags as unknown as string)
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);
      }
      
      saveBlogPost(currentPost);
      loadPosts();
      setIsDialogOpen(false);
      
      toast({
        title: isEditing ? "Post updated" : "Post created",
        description: isEditing 
          ? "The blog post has been updated successfully" 
          : "A new blog post has been created",
        duration: 3000
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (currentPost) {
      setCurrentPost({
        ...currentPost,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentPost) {
      setCurrentPost({
        ...currentPost,
        tags: e.target.value.split(',').map(tag => tag.trim())
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <div className="mt-4 md:mt-0">
            <Button onClick={handleNewPost}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>

        {posts.length === 0 ? (
          <Card className="card-animated">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="bg-primary/10 rounded-full p-3 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Create your first blog post to showcase your expertise and engage with your audience.
              </p>
              <Button onClick={handleNewPost}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="card-animated overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <User className="mr-1 h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
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
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteClick(post)}>
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the details of your blog post.' 
                : 'Fill in the details to create a new blog post.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePost}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Blog post title"
                  value={currentPost?.title || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="slug">Slug (URL-friendly identifier)</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="blog-post-slug (leave empty to generate from title)"
                  value={currentPost?.slug || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Author name"
                    value={currentPost?.author || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="Category"
                    value={currentPost?.category || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="URL to post image"
                  value={currentPost?.image || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="tag1, tag2, tag3"
                  value={Array.isArray(currentPost?.tags) ? currentPost?.tags.join(', ') : ''}
                  onChange={handleTagsChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Short description of the post"
                  value={currentPost?.excerpt || ''}
                  onChange={handleInputChange}
                  rows={2}
                  required
                />
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Main content of the blog post"
                  value={currentPost?.content || ''}
                  onChange={handleInputChange}
                  rows={10}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentPost?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default BlogAdmin;

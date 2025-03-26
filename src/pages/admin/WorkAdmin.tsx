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
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar, Link2, ExternalLink } from 'lucide-react';
import { WorkItem } from '@/types/admin';
import { 
  getWorkItems, 
  saveWorkItem, 
  deleteWorkItem, 
  generateId,
  getCurrentDate 
} from '@/lib/admin-service';
import servicesData from '@/data/services.json';

const WorkAdmin = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<WorkItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  // Ensure services is an array
  const services = Array.isArray(servicesData) ? servicesData : servicesData.services || [];

  useEffect(() => {
    loadWorkItems();
  }, []);

  const loadWorkItems = async () => {
    const items = await getWorkItems();
    setWorkItems(items);
  };

  const handleNewItem = () => {
    setCurrentItem({
      id: '',
      title: '',
      description: '',
      serviceId: services.length > 0 ? services[0].id : '',
      link: '',
      image: '/placeholder.svg',
      date: getCurrentDate(),
      featured: false,
      client: '',
      technologies: []
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: WorkItem) => {
    setCurrentItem(item);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (item: WorkItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentItem) {
      try {
        await deleteWorkItem(currentItem.id);
        await loadWorkItems();
        setIsDeleteDialogOpen(false);
        toast({
          title: "Item deleted",
          description: "The portfolio item has been deleted successfully",
          duration: 3000
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete the item",
          duration: 3000
        });
      }
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentItem) {
      try {
        const savedItem = await saveWorkItem(currentItem);
        await loadWorkItems();
        setIsDialogOpen(false);
        
        toast({
          title: isEditing ? "Item updated" : "Item created",
          description: isEditing 
            ? "The portfolio item has been updated successfully" 
            : "A new portfolio item has been created",
          duration: 3000
        });
      } catch (error: any) {
        console.error('Save error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Failed to save the item",
          duration: 3000
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        featured: checked
      });
    }
  };

  const handleServiceChange = (value: string) => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        serviceId: value
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold">Portfolio Works</h1>
          <div className="mt-4 md:mt-0">
            <Button onClick={handleNewItem}>
              <Plus className="mr-2 h-4 w-4" />
              New Work
            </Button>
          </div>
        </div>

        {workItems.length === 0 ? (
          <Card className="card-animated">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="bg-primary/10 rounded-full p-3 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No portfolio items yet</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Add your first portfolio work to showcase your talents and achievements.
              </p>
              <Button onClick={handleNewItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Work
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workItems.map((item) => {
              const service = services.find(s => s.id === item.serviceId);
              
              return (
                <Card key={item.id} className="card-animated overflow-hidden">
                  {item.featured && (
                    <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      {service && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{service.title}</span>
                        </>
                      )}
                    </div>
                    <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {item.description}
                    </p>
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline text-sm mt-4"
                      >
                        <Link2 className="mr-1 h-3 w-3" />
                        View Project
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteClick(item)}>
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Portfolio Work' : 'Add New Portfolio Work'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the details of your portfolio work.' 
                : 'Fill in the details to add a new work to your portfolio.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveItem}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Work title"
                  value={currentItem?.title || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="serviceId">Service Category</Label>
                <Select 
                  value={currentItem?.serviceId || ''} 
                  onValueChange={handleServiceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service category" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="URL to work image"
                  value={currentItem?.image || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="link">Project Link</Label>
                <Input
                  id="link"
                  name="link"
                  placeholder="https://example.com"
                  value={currentItem?.link || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description of the work"
                  value={currentItem?.description || ''}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={currentItem?.featured || false}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="featured">Featured work (shown prominently)</Label>
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
            <DialogTitle>Delete Portfolio Work</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentItem?.title}"? This action cannot be undone.
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

export default WorkAdmin;

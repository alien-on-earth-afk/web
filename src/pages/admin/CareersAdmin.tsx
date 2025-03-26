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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar, MapPin, Clock, Briefcase, Check } from 'lucide-react';
import { JobPosting } from '@/types/admin';
import { 
  getCareerPostings,
  saveCareerPosting,
  deleteCareerPosting,
  generateId,
  getCurrentDate 
} from '@/lib/admin-service';
import { Badge } from '@/components/ui/badge';

const CareersAdmin = () => {
  const [postings, setPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPosting, setCurrentPosting] = useState<JobPosting | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const loadPostings = async () => {
    try {
      console.log('Starting to load postings...');
      setIsLoading(true);
      setError(null);
      const items = getCareerPostings();
      console.log('Loaded postings:', items);
      setPostings(items);
    } catch (err) {
      console.error('Error loading postings:', err);
      setError('Failed to load job postings');
      toast({
        title: 'Error',
        description: 'Failed to load job postings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('CareersAdmin mounted');
    loadPostings();
  }, []);

  const handleNewPosting = () => {
    const today = new Date();
    const deadlineDate = new Date();
    deadlineDate.setDate(today.getDate() + 30); // Default deadline: 30 days from now
    
    setCurrentPosting({
      id: generateId(),
      title: '',
      department: 'Engineering',
      location: 'Remote',
      type: 'full-time',
      description: '',
      requirements: [''],
      responsibilities: [''],
      posted: today.toISOString().split('T')[0],
      deadline: deadlineDate.toISOString().split('T')[0],
      isActive: true
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditPosting = (posting: JobPosting) => {
    setCurrentPosting(posting);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (posting: JobPosting) => {
    setCurrentPosting(posting);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentPosting) {
      try {
        await deleteCareerPosting(currentPosting.id);
        await loadPostings();  // Reload after delete
        setIsDeleteDialogOpen(false);
        toast({
          title: "Posting deleted",
          description: "The career posting has been deleted successfully",
          duration: 3000
        });
      } catch (error) {
        console.error('Error deleting posting:', error);
        toast({
          title: "Error",
          description: "Failed to delete the posting",
          variant: "destructive"
        });
      }
    }
  };

  const handleSavePosting = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentPosting) {
      try {
        await saveCareerPosting(currentPosting);
        await loadPostings();  // Reload after save
        setIsDialogOpen(false);
        
        toast({
          title: isEditing ? "Posting updated" : "Posting created",
          description: isEditing 
            ? "The career posting has been updated successfully" 
            : "A new career posting has been created",
          duration: 3000
        });
      } catch (error) {
        console.error('Error saving posting:', error);
        toast({
          title: "Error",
          description: "Failed to save the posting",
          variant: "destructive"
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (currentPosting) {
      setCurrentPosting({
        ...currentPosting,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    if (currentPosting) {
      setCurrentPosting({
        ...currentPosting,
        isActive: checked
      });
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    if (currentPosting) {
      setCurrentPosting({
        ...currentPosting,
        [field]: value
      });
    }
  };

  const handleListItemChange = (field: 'requirements' | 'responsibilities', index: number, value: string) => {
    if (currentPosting) {
      const newList = [...currentPosting[field]];
      newList[index] = value;
      
      setCurrentPosting({
        ...currentPosting,
        [field]: newList
      });
    }
  };

  const addListItem = (field: 'requirements' | 'responsibilities') => {
    if (currentPosting) {
      setCurrentPosting({
        ...currentPosting,
        [field]: [...currentPosting[field], '']
      });
    }
  };

  const removeListItem = (field: 'requirements' | 'responsibilities', index: number) => {
    if (currentPosting && currentPosting[field].length > 1) {
      const newList = [...currentPosting[field]];
      newList.splice(index, 1);
      
      setCurrentPosting({
        ...currentPosting,
        [field]: newList
      });
    }
  };

  console.log('Rendering with state:', { postings, isLoading, error });

  if (isLoading) {
    console.log('Showing loading state');
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container px-4 mx-auto py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold">Career Postings</h1>
          <div className="mt-4 md:mt-0">
            <Button onClick={handleNewPosting}>
              <Plus className="mr-2 h-4 w-4" />
              New Job Posting
            </Button>
          </div>
        </div>

        {postings.length === 0 ? (
          <Card className="card-animated">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="bg-primary/10 rounded-full p-3 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No job postings yet</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Add your first job posting to start recruiting talented individuals for your team.
              </p>
              <Button onClick={handleNewPosting}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Job Posting
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postings.map((posting) => (
              <Card 
                key={posting.id} 
                className={`card-animated overflow-hidden ${!posting.isActive ? 'opacity-70' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={posting.isActive ? "default" : "outline"}>
                      {posting.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="secondary">
                      {posting.type === 'full-time' ? 'Full-time' : posting.type === 'part-time' ? 'Part-time' : 'Contract'}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-1">{posting.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Briefcase className="mr-1 h-3 w-3" />
                    <span>{posting.department}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{posting.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Posted: {new Date(posting.posted).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Deadline: {new Date(posting.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3 mt-4">
                    {posting.description.substring(0, 150)}...
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="ghost" size="sm" onClick={() => handleEditPosting(posting)}>
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteClick(posting)}>
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
            <DialogTitle>{isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the details of your job posting.' 
                : 'Fill in the details to create a new job posting.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePosting}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="E.g., Senior React Developer"
                  value={currentPosting?.title || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={currentPosting?.department || 'Engineering'} 
                    onValueChange={(value) => handleSelectChange('department', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Customer Support">Customer Support</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Human Resources">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select 
                    value={currentPosting?.type || 'full-time'} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="E.g., Remote, San Francisco, CA"
                  value={currentPosting?.location || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="posted">Posted Date</Label>
                  <Input
                    id="posted"
                    name="posted"
                    type="date"
                    value={currentPosting?.posted || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={currentPosting?.deadline || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of the role"
                  value={currentPosting?.description || ''}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addListItem('requirements')}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                {currentPosting?.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) => handleListItemChange('requirements', index, e.target.value)}
                      placeholder={`Requirement ${index + 1}`}
                    />
                    {currentPosting.requirements.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive p-0 h-8 w-8"
                        onClick={() => removeListItem('requirements', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="responsibilities">Responsibilities</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addListItem('responsibilities')}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                {currentPosting?.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={responsibility}
                      onChange={(e) => handleListItemChange('responsibilities', index, e.target.value)}
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    {currentPosting.responsibilities.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive p-0 h-8 w-8"
                        onClick={() => removeListItem('responsibilities', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch
                  id="isActive"
                  checked={currentPosting?.isActive || false}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isActive">Active job posting (visible on careers page)</Label>
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
            <DialogTitle>Delete Job Posting</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentPosting?.title}"? This action cannot be undone.
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

export default CareersAdmin;

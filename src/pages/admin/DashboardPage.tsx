import { getBlogPosts, getWorkItems, getCareerPostings } from '@/lib/admin-service';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, Briefcase, Users, ExternalLink } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
}

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

const DashboardPage: React.FC = () => {
  // Static data
  const blogPosts = getBlogPosts();
  const workItems = getWorkItems();
  const careerPostings = getCareerPostings();

  // State management
  const [services, setServices] = useState<Service[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [newService, setNewService] = useState({ 
    title: '', 
    shortDescription: '', 
    icon: '' 
  });
  const [newMember, setNewMember] = useState({ 
    name: '', 
    title: '', 
    bio: '', 
    image: '' 
  });

  const fetchData = async () => {
    try {
      const [servicesResponse, teamResponse] = await Promise.all([
        axios.get<{ services: Service[] }>('https://webark-backend.onrender.com/api/services'),
        axios.get<{ team: TeamMember[] }>('https://webark-backend.onrender.com/api/team')
      ]);
      console.log('Services response:', servicesResponse.data); // Debugging
      console.log('Team response:', teamResponse.data); // Debugging
      setServices(servicesResponse.data.services);
      setTeam(teamResponse.data.team);
    } catch (error) {
      console.error('Fetch error:', error); // Log the error for debugging
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch data from server.",
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };

  // CRUD Operations
  const addService = async () => {
    try {
      const response = await axios.post('https://webark-backend.onrender.com/api/services', newService);
      toast({
        title: "Success",
        description: "Service added successfully!",
      });
      setServices(prev => [...prev, response.data]); // Update state with new service
      setNewService({ title: '', shortDescription: '', icon: '' }); // Reset form
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add service.",
      });
    }
  };

  const editService = async (id: string, updatedService: Service) => {
    try {
      const response = await axios.put(`https://webark-backend.onrender.com/api/services/${id}`, updatedService);
      toast({
        title: "Success",
        description: "Service updated successfully!",
      });
      setServices(prev =>
        prev.map(service => (service.id === id ? response.data : service))
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update service.",
      });
    }
  };

  const addMember = async () => {
    try {
      await axios.post('https://webark-backend.onrender.com/api/team', newMember);
      toast({
        title: "Success",
        description: "Team member added successfully!",
      });
      fetchData();
      setNewMember({ name: '', title: '', bio: '', image: '' });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add team member.",
      });
    }
  };

  const deleteService = async (id: string) => {
    try {
      await axios.delete(`https://webark-backend.onrender.com/api/services/${id}`);
      toast({
        title: "Success",
        description: "Service deleted successfully!",
      });
      setServices(prev => prev.filter(service => service.id !== id)); // Update state
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete service.",
      });
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await axios.delete(`https://webark-backend.onrender.com/api/team/${id}`);
      toast({
        title: "Success",
        description: "Team member deleted successfully!",
      });
      fetchData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete team member.",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container px-4 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center">
              Visit Website
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-animated">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Blog Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{blogPosts.length}</p>
              <p className="text-muted-foreground text-sm mt-1">Total posts in the system</p>
              <Link 
                to="/admin/blog" 
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center mt-4"
              >
                Manage Posts
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="card-animated">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-indigo-500" />
                Portfolio Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{workItems.length}</p>
              <p className="text-muted-foreground text-sm mt-1">Projects in portfolio</p>
              <Link 
                to="/admin/work" 
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center mt-4"
              >
                Manage Portfolio
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="card-animated">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-500" />
                Job Postings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{careerPostings.length}</p>
              <p className="text-muted-foreground text-sm mt-1">Active job opportunities</p>
              <Link 
                to="/admin/careers" 
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center mt-4"
              >
                Manage Careers
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Guide Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 card-animated mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Guide</h2>
          <div className="space-y-4">
            <div className="flex">
              <FileText className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Managing Blog Posts</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Create, edit, and delete blog posts. All posts will be displayed on the blog page of the website.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <Briefcase className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Portfolio Management</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Add your work and projects to the portfolio. Select which service category they belong to.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <Users className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Career Postings</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Post and manage job openings. Active positions will be shown on the careers page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Services Management */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Services Management</h2>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Add New Service</h3>
              <div className="space-y-3">
                <div>
                  <Label>Title</Label>
                  <Input name="title" value={newService.title} onChange={handleServiceChange} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea name="shortDescription" value={newService.shortDescription} onChange={handleServiceChange} />
                </div>
                <div>
                  <Label>Icon URL</Label>
                  <Input name="icon" value={newService.icon} onChange={handleServiceChange} />
                </div>
                <Button onClick={addService} className="w-full">Add Service</Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Existing Services ({services.length})</h3>
              <div className="space-y-2">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded">
                    <div>
                      <p className="font-medium">{service.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{service.shortDescription}</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteService(service.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Management */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Team Management</h2>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Add New Member</h3>
              <div className="space-y-3">
                <div>
                  <Label>Name</Label>
                  <Input name="name" value={newMember.name} onChange={handleMemberChange} />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input name="title" value={newMember.title} onChange={handleMemberChange} />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea name="bio" value={newMember.bio} onChange={handleMemberChange} />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input name="image" value={newMember.image} onChange={handleMemberChange} />
                </div>
                <Button onClick={addMember} className="w-full">Add Member</Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Team Members ({team.length})</h3>
              <div className="space-y-2">
                {team.map((member) => (
                  <div key={member.id} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{member.title}</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteMember(member.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
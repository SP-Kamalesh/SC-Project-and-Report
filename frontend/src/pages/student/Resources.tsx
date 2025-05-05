
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Book, Video, FileText, Search } from "lucide-react";

// Mock resource data
const resourcesData = [
  {
    id: "r1",
    title: "Managing Academic Stress",
    description: "Learn effective strategies to handle academic pressure and exam stress.",
    type: "Article",
    category: "Academic",
    author: "Dr. Sarah Johnson",
    date: "2025-01-15",
    featured: true,
  },
  {
    id: "r2",
    title: "Mindfulness Meditation Guide",
    description: "A step-by-step guide to mindfulness meditation for students.",
    type: "PDF",
    category: "Mental Health",
    author: "Dr. Michael Chen",
    date: "2025-02-20",
    featured: true,
  },
  {
    id: "r3",
    title: "Effective Time Management",
    description: "Learn how to balance studies, social life, and self-care effectively.",
    type: "Video",
    category: "Academic",
    author: "Dr. Emily Rodriguez",
    date: "2025-03-05",
    featured: false,
  },
  {
    id: "r4",
    title: "Coping with Anxiety",
    description: "Understanding anxiety triggers and developing coping mechanisms.",
    type: "Article",
    category: "Mental Health",
    author: "Dr. Sarah Johnson",
    date: "2025-03-18",
    featured: false,
  },
  {
    id: "r5",
    title: "Career Planning Workshop",
    description: "A comprehensive guide to planning your career path after graduation.",
    type: "Video",
    category: "Career",
    author: "Dr. Michael Chen",
    date: "2025-04-10",
    featured: true,
  },
  {
    id: "r6",
    title: "Building Healthy Relationships",
    description: "Tips for developing and maintaining healthy relationships in college.",
    type: "Article",
    category: "Relationships",
    author: "Dr. Emily Rodriguez",
    date: "2025-04-15",
    featured: false,
  },
];

// Get resources by category
const getResourcesByCategory = (category: string) => {
  if (category === "All") return resourcesData;
  return resourcesData.filter(resource => resource.category === category);
};

// Get featured resources
const getFeaturedResources = () => {
  return resourcesData.filter(resource => resource.featured);
};

const ResourceCard = ({ resource }: { resource: any }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <Badge variant={resource.type === "Article" ? "default" : resource.type === "Video" ? "secondary" : "outline"}>
            {resource.type}
          </Badge>
        </div>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>By {resource.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(resource.date).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button className="w-full">View Resource</Button>
      </CardFooter>
    </Card>
  );
};

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");

  // Filter resources based on search query
  const filteredResources = React.useMemo(() => {
    if (!searchQuery) return getResourcesByCategory(activeCategory);
    
    return getResourcesByCategory(activeCategory).filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeCategory]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">
          Explore our collection of self-help materials and guides
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search resources..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="featured" onValueChange={(value) => setActiveCategory(value === "featured" ? "All" : value)}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Mental Health">Mental Health</TabsTrigger>
            <TabsTrigger value="Academic">Academic</TabsTrigger>
            <TabsTrigger value="Career">Career</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFeaturedResources().map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="All" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Mental Health" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Academic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Career" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Resource Categories</CardTitle>
          <CardDescription>
            Browse resources by type or category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex gap-3" onClick={() => setActiveCategory("Mental Health")}>
              <Book className="h-5 w-5 text-wellness-600" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Mental Health</span>
                <span className="text-xs text-muted-foreground">Mindfulness, anxiety, stress management</span>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex gap-3" onClick={() => setActiveCategory("Academic")}>
              <FileText className="h-5 w-5 text-thrive-600" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Academic</span>
                <span className="text-xs text-muted-foreground">Study skills, time management</span>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex gap-3" onClick={() => setActiveCategory("Career")}>
              <Video className="h-5 w-5 text-wellness-600" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Career</span>
                <span className="text-xs text-muted-foreground">Planning, development, guidance</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage;

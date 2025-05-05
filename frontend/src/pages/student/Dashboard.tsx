
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
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MessageSquare, Book, PieChart } from "lucide-react";

const StudentDashboard = () => {
  const { toast } = useToast();
  const [userData, setUserData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // In a real app, fetch user data from your API
    const storedUser = localStorage.getItem("thriveUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock upcoming appointments
  const upcomingAppointments = [
    /*{
      id: "apt1",
      counselorName: "Dr. Sarah Johnson",
      date: "2025-04-25",
      time: "14:00",
      type: "Video Session",
    },
    {
      id: "apt2",
      counselorName: "Dr. Michael Chen",
      date: "2025-05-03",
      time: "10:30",
      type: "Chat Session",
    },*/
  ];

  // Mock recommended resources
  const recommendedResources = [
    /*{
      id: "res1",
      title: "Managing Exam Stress",
      type: "Article",
      category: "Academic",
    },
    {
      id: "res2",
      title: "Mindfulness Techniques",
      type: "Video",
      category: "Mental Health",
    },
    {
      id: "res3",
      title: "Career Planning Guide",
      type: "PDF",
      category: "Career",
    },*/
  ];

  // Format date to human-readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {userData?.isAnonymous
              ? "Welcome, Anonymous User"
              : `Welcome, ${userData?.name}`}
          </h1>
          <p className="text-muted-foreground">
            Your personal dashboard for counselling services
          </p>
        </div>
        <Button asChild>
          <Link to="/appointments/new">Schedule Session</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-thrive-500" />
              <span>Upcoming Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-sm text-muted-foreground">
              {upcomingAppointments.length > 0
                ? `${formatDate(upcomingAppointments[0].date)} at ${upcomingAppointments[0].time}`
                : "Create your first appointment!"}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/appointments">Create session</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-wellness-500" />
              <span>Messages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">
              You have no new messages.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/chat">Create chat</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-thrive-500" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-sm text-muted-foreground">
              You have not completed any progress tracking yet.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/progress">Complete your Progress</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Your scheduled counselling sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="rounded-full bg-thrive-100 p-2">
                      <Clock className="h-5 w-5 text-thrive-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{appointment.counselorName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(appointment.date)} • {appointment.time}
                      </p>
                      <p className="text-sm mt-1">{appointment.type}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground mb-4">
                  You don't have any upcoming appointments
                </p>
                <Button asChild>
                  <Link to="/appointments/new">Schedule Now</Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/appointments">View All Appointments</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Recommended Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
            <CardDescription>
              Personalized content for your wellness journey!
              Here are some resources tailored to help you with your academic, mental health, and career goals. Explore articles, videos, and guides to support your journey. Stay informed and empowered with curated content designed just for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedResources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="rounded-full bg-wellness-100 p-2">
                    <Book className="h-5 w-5 text-wellness-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{resource.title}</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                        {resource.type}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/resources">Browse All Resources</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Shortcuts to commonly used features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/appointments/new">
                <Calendar className="h-5 w-5" />
                <span>New Appointment</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/chat">
                <MessageSquare className="h-5 w-5" />
                <span>Start Chat</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/resources">
                <Book className="h-5 w-5" />
                <span>Resources</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/progress">
                <PieChart className="h-5 w-5" />
                <span>Progress</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;


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
import { Calendar, Users, MessageSquare, Clock, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CounselorDashboard = () => {
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

  // Mock today's appointments
  const todayAppointments = [
    /*{
      id: "apt1",
      studentName: "Alex Johnson",
      time: "10:00 AM",
      type: "Video Session",
      status: "Confirmed",
    },
    {
      id: "apt2",
      studentName: "Jamie Smith",
      time: "1:30 PM",
      type: "Chat Session",
      status: "Confirmed",
    },
    {
      id: "apt3",
      studentName: "Anonymous User",
      time: "3:45 PM",
      type: "Chat Session",
      status: "Pending",
    },
  ];

  // Mock unread messages
  const unreadMessages = [
    {
      id: "msg1",
      studentName: "Taylor Wilson",
      preview: "I've been feeling overwhelmed with my classes lately...",
      time: "2 hours ago",
    },
    {
      id: "msg2",
      studentName: "Anonymous User",
      preview: "Thank you for the resources you shared. I wanted to ask...",
      time: "Yesterday",
    },*/
  ];

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
            Good day, {userData?.name}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in your counselor dashboard
          </p>
        </div>
        <Button asChild>
          <Link to="/counselor/appointments/new">Set Availability</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-thrive-500" />
              <span>Today's Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-sm text-muted-foreground">
              Next: {todayAppointments.length > 0
                ? `${todayAppointments[0].studentName} at ${todayAppointments[0].time}`
                : "No sessions today"}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/counselor/appointments">View schedule</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-wellness-500" />
              <span>Students</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">
              3 new this week
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/counselor/students">View all</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-thrive-500" />
              <span>Unread Messages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages.length}</div>
            <p className="text-sm text-muted-foreground">
              From {unreadMessages.length} students
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/counselor/chat">Open chat</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>
              Your scheduled sessions for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="rounded-full bg-thrive-100 p-2">
                      <Clock className="h-5 w-5 text-thrive-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{appointment.studentName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {appointment.time} • {appointment.type}
                      </p>
                      <div className="mt-1">
                        <Badge variant={appointment.status === "Confirmed" ? "default" : "outline"}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground mb-4">
                  You don't have any appointments today
                </p>
                <Button asChild>
                  <Link to="/counselor/appointments">View Schedule</Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/counselor/appointments">View Full Schedule</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Unread Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Unread Messages</CardTitle>
            <CardDescription>
              Recent messages from students
            </CardDescription>
          </CardHeader>
          <CardContent>
            {unreadMessages.length > 0 ? (
              <div className="space-y-4">
                {unreadMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="rounded-full bg-wellness-100 p-2">
                      <MessageSquare className="h-5 w-5 text-wellness-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{message.studentName}</h4>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm mt-1 text-muted-foreground line-clamp-1">
                        {message.preview}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/counselor/chat">Reply</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">
                  You don't have any unread messages
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/counselor/chat">View All Messages</Link>
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
              <Link to="/counselor/appointments/new">
                <Calendar className="h-5 w-5" />
                <span>Set Availability</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/counselor/chat">
                <MessageSquare className="h-5 w-5" />
                <span>View Messages</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/counselor/students">
                <Users className="h-5 w-5" />
                <span>Student List</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/counselor/resources">
                <Book className="h-5 w-5" />
                <span>Add Resources</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounselorDashboard;

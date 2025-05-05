
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
import { Calendar, Clock, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock appointment data
const upcomingAppointments = [
  /*{
    id: "apt1",
    counselorName: "Dr. Sarah Johnson",
    date: "2025-04-25",
    time: "14:00",
    type: "Video Session",
    status: "Confirmed",
  },
  {
    id: "apt2",
    counselorName: "Dr. Michael Chen",
    date: "2025-05-03",
    time: "10:30",
    type: "Chat Session",
    status: "Confirmed",
  },*/
];

const pastAppointments = [
  /*{
    id: "apt3",
    counselorName: "Dr. Sarah Johnson",
    date: "2025-04-10",
    time: "15:30",
    type: "Video Session",
    status: "Completed",
    notes: "Discussed academic stress management techniques and resources."
  },
  {
    id: "apt4",
    counselorName: "Dr. Emily Rodriguez",
    date: "2025-03-28",
    time: "11:00",
    type: "Chat Session",
    status: "Completed",
    notes: "Reviewed progress on personal goals and well-being strategies."
  },
  {
    id: "apt5",
    counselorName: "Dr. Michael Chen",
    date: "2025-03-15",
    time: "13:45",
    type: "Video Session",
    status: "Completed",
    notes: "Discussed career planning resources and next steps."
  },*/
];

// Format date for display
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const StudentAppointments = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your counselling sessions
          </p>
        </div>
        <Button asChild>
          <Link to="/appointments/new">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New Session
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingAppointments.length > 0 ? (
            <div className="grid gap-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="rounded-full bg-thrive-100 p-3 h-fit">
                          {appointment.type.includes("Video") ? (
                            <Video className="h-5 w-5 text-thrive-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-thrive-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{appointment.counselorName}</h3>
                          <p className="text-muted-foreground">
                            {formatDate(appointment.date)} at {appointment.time}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{appointment.type}</Badge>
                            <Badge>{appointment.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/appointments/${appointment.id}`}>
                            Details
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to={`/appointments/${appointment.id}/join`}>
                            Join Session
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  You don't have any scheduled counselling sessions. Book a session with one of our counselors.
                </p>
                <Button asChild>
                  <Link to="/appointments/new">Schedule Session</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastAppointments.length > 0 ? (
            <div className="grid gap-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="rounded-full bg-gray-100 p-3 h-fit">
                          {appointment.type.includes("Video") ? (
                            <Video className="h-5 w-5 text-gray-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{appointment.counselorName}</h3>
                          <p className="text-muted-foreground">
                            {formatDate(appointment.date)} at {appointment.time}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{appointment.type}</Badge>
                            <Badge variant="secondary">{appointment.status}</Badge>
                          </div>
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="mt-2 bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium mb-1">Session Notes</p>
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/appointments/${appointment.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No past sessions</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't had any counselling sessions yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAppointments;

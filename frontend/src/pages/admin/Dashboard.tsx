
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
import { 
  Users, 
  Calendar, 
  PieChart, 
  BarChart, 
  UserPlus, 
  FileText,
  Book,
  Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Import charts
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  Legend
} from "recharts";

const sessionData = [
  { name: "Jan", sessions: 65 },
  { name: "Feb", sessions: 59 },
  { name: "Mar", sessions: 80 },
  { name: "Apr", sessions: 81 },
  { name: "May", sessions: 56 },
  { name: "Jun", sessions: 55 },
  { name: "Jul", sessions: 40 },
];

const userTypeData = [
  { name: "Students", count: 120, color: "#4090FF" },
  { name: "Counselors", count: 15, color: "#7B55FB" },
  { name: "Admins", count: 5, color: "#6E59A5" },
];

const AdminDashboard = () => {
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

  // Mock recent activity
  const recentActivity = [
    {
      id: "act1",
      action: "New student registration",
      name: "Olivia Parker",
      time: "10 minutes ago",
      type: "registration",
    },
    {
      id: "act2",
      action: "New resource uploaded",
      name: "Dr. James Wilson",
      time: "2 hours ago",
      type: "resource",
    },
    {
      id: "act3",
      action: "Counseling session completed",
      name: "Dr. Sarah Lee with Jordan Taylor",
      time: "Yesterday at 3:45 PM",
      type: "session",
    },
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
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Platform overview and management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/users/new">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-thrive-500" />
              <span>Total Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">140</div>
            <p className="text-sm text-muted-foreground">
              +12 this month
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/users">View all</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-wellness-500" />
              <span>Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
            <p className="text-sm text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/sessions">Details</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Book className="h-5 w-5 text-thrive-500" />
              <span>Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-sm text-muted-foreground">
              +5 new resources
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/resources">Manage</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart className="h-5 w-5 text-wellness-500" />
              <span>Satisfaction</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-sm text-muted-foreground">
              Based on 180 reviews
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/feedback">View feedback</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Analytics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Session Activity</CardTitle>
            <CardDescription>
              Monthly counseling sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sessionData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#4090FF"
                  fill="#4090FF"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/admin/analytics">View Detailed Analytics</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* User Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>
              Breakdown of user types on the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={userTypeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="User Count" fill="#4090FF" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/admin/users">Manage Users</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest platform events and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="rounded-full bg-thrive-100 p-2">
                  {activity.type === "registration" && (
                    <UserPlus className="h-5 w-5 text-thrive-600" />
                  )}
                  {activity.type === "resource" && (
                    <Book className="h-5 w-5 text-wellness-600" />
                  )}
                  {activity.type === "session" && (
                    <Calendar className="h-5 w-5 text-thrive-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{activity.action}</h4>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">
                    {activity.name}
                  </p>
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
            <Link to="/admin/activity">View All Activity</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
          <CardDescription>
            Quick access to administrative functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/admin/users/new">
                <UserPlus className="h-5 w-5" />
                <span>Add User</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/admin/resources/new">
                <Book className="h-5 w-5" />
                <span>Add Resource</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/admin/announcements">
                <Bell className="h-5 w-5" />
                <span>Announcements</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
              <Link to="/admin/reports">
                <FileText className="h-5 w-5" />
                <span>Generate Reports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

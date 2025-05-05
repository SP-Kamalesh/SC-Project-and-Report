
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Home,
  Calendar,
  FileText,
  MessageSquare,
  Book,
  Settings,
  Users,
  PieChart
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const studentNavItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: Book, label: "Resources", href: "/resources" },
  { icon: FileText, label: "Progress", href: "/progress" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const counselorNavItems = [
  { icon: Home, label: "Dashboard", href: "/counselor" },
  { icon: Calendar, label: "Appointments", href: "/counselor/appointments" },
  { icon: Users, label: "Students", href: "/counselor/students" },
  { icon: MessageSquare, label: "Chat", href: "/counselor/chat" },
  { icon: Book, label: "Resources", href: "/counselor/resources" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const adminNavItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: PieChart, label: "Analytics", href: "/admin/analytics" },
  { icon: Book, label: "Resources", href: "/admin/resources" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  const location = useLocation();
  const [userRole, setUserRole] = React.useState<"student" | "counselor" | "admin">("student");

  // Determine user role based on route or stored data
  React.useEffect(() => {
    // This is a simplified version - in a real app, you'd get this from your auth context
    const userData = localStorage.getItem("thriveUser");
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role || "student");
    } else if (location.pathname.startsWith("/counselor")) {
      setUserRole("counselor");
    } else if (location.pathname.startsWith("/admin")) {
      setUserRole("admin");
    } else {
      setUserRole("student");
    }
  }, [location.pathname]);

  // Choose nav items based on role
  const navItems = React.useMemo(() => {
    switch (userRole) {
      case "counselor":
        return counselorNavItems;
      case "admin":
        return adminNavItems;
      default:
        return studentNavItems;
    }
  }, [userRole]);

  return (
    <aside
      className={cn(
        "border-r bg-sidebar transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 md:w-16",
        "fixed h-screen z-30 md:relative"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="mt-16 flex-1 overflow-y-auto">
          <ScrollArea className="h-full">
            {children || (
              <nav className="px-2 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => onClose()}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-sidebar-accent group transition-all",
                      location.pathname === item.href && "bg-sidebar-accent font-medium",
                      !isOpen && "justify-center"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className={cn("transition-opacity", !isOpen && "md:hidden")}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
            )}
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

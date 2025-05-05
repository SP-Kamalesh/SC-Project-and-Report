
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  sidebarContent?: React.ReactNode;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  sidebarContent, 
  showSidebar = true 
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  return (
    <div className="h-screen flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => isMobile && setSidebarOpen(false)}
          >
            {sidebarContent}
          </Sidebar>
        )}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="container animate-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

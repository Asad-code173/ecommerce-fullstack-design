import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./SideMenu";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-200 min-h-screen">
      
      {/* HEADER */}
      <Header toggleSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex">
        
        {/* SIDEBAR */}
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        {/* MAIN CONTENT */}
        <div className="w-full md:ml-64 mt-10 pb-20 px-4">
          <Outlet />
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;

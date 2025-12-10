import { ChartNoAxesColumn, SquareLibrary, Menu } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex pt-16"> {/* pt-16 offsets fixed Navbar height */}
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 sticky top-16 p-5 h-[calc(100vh-4rem)]">
        <div className="mt-4 space-y-4">
          <Link to="dashboard" className="flex items-center gap-2 hover:text-blue-500">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2 hover:text-blue-500">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
<div className="lg:hidden fixed bottom-4 left-4 z-50 bg-rounded">
  <button onClick={() => setIsOpen(!isOpen)}>
    <Menu size={28} />
  </button>
</div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-[#141414] border-r border-gray-300 dark:border-gray-700 p-5 space-y-8 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mt-4 space-y-4">
          <Link onClick={() => setIsOpen(false)} to="dashboard" className="flex items-center gap-2 hover:text-blue-500">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link onClick={() => setIsOpen(false)} to="course" className="flex items-center gap-2 hover:text-blue-500">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-[#141414]">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;

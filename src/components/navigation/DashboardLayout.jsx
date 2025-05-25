import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [subMenus, setSubMenus] = useState({
    calendar: false,
    support: false,
    tables: false,
    analytics: false,
    inbox: false,
    settings: false,
  });

  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({
      ...prev, [menu]: !prev[menu],
    }));
  };

  return (
    <div className="w-full flex">
      <Sidebar open={open} setOpen={setOpen} subMenus={subMenus} toggleSubMenu={toggleSubMenu} />
      <div className="h-screen flex-1 bg-zinc-100 space-y-6">
        <Navbar />
        <div className="w-full px-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 
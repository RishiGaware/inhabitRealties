import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [subMenus, setSubMenus] = useState({
    admin: false,
    leads: false,
    customers: false,
    bookings: false,
    payments: false,
    postSale: false,
    client: false,
    settings: false,
    property: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({
      ...prev, [menu]: !prev[menu],
    }));
  };

  return (
    <div className="w-full flex">
      <Sidebar open={open} setOpen={setOpen} subMenus={subMenus} toggleSubMenu={toggleSubMenu} isMobile={isMobile} />
      <div
        className={`flex-1 min-h-screen bg-light-background relative transition-all duration-300 ${
          isMobile
            ? 'w-full ml-0'
            : open
            ? 'ml-72'
            : 'ml-20'
        }`}
      >
        <div className="fixed top-0 left-0 w-full z-10" style={{ marginLeft: isMobile ? 0 : open ? '18rem' : '5rem' }}>
        <Navbar open={open} setOpen={setOpen} isMobile={isMobile} />
        </div>
        <div
          className="w-full px-4 md:px-12 pt-[8ch] pb-4 overflow-y-auto"
          style={{ minHeight: '100vh' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 
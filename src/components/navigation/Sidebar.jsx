import React from "react";
import { BiChat, BiUser, BiUserPlus } from "react-icons/bi";
import { FaChevronDown, FaChevronRight, FaCog, FaUsers, FaChartLine, FaFileAlt, FaCalendarAlt, FaMoneyBillWave, FaHandshake } from "react-icons/fa";
import { FiTable } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { MdOutlineHeadsetMic, MdSpaceDashboard, MdAssignment, MdInventory, MdPayment, MdPerson } from "react-icons/md";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { TiCalendar } from "react-icons/ti";
import logown from '../../assets/images/logown.png'
import PropertyMaster from '../../pages/property/PropertyMaster';
import PropertyTypes from '../../pages/property/PropertyTypes';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, setOpen, subMenus, toggleSubMenu, isMobile }) => {
  const Menus = [
    // Admin Module
    { title: "Dashboard", icon: <MdSpaceDashboard />, key: "dashboard" },
    { 
      title: "Admin", 
      icon: <FaUsers />, 
      gap: true,
      subMenu: [
        "User Management",
        "Role Management",
        "Reports"
      ],
      key: "admin"
    },
    
    // Executive Module
    { 
      title: "Lead Management", 
      icon: <BiUserPlus />,
      subMenu: [
        "Add Lead",
        "View Leads",
        "Lead Qualification"
      ],
      key: "leads"
    },
    { 
      title: "Customer Management", 
      icon: <BiUser />,
      subMenu: [
        "Customer Profiles",
        "Documents",
        "Site Visits"
      ],
      key: "customers"
    },
    
    // Sales Module
    { 
      title: "Bookings", 
      icon: <MdInventory />,
      subMenu: [
        "Inventory",
        "Booked Units",
        "Payment Status"
      ],
      key: "bookings"
    },
    { 
      title: "Payments", 
      icon: <FaMoneyBillWave />,
      subMenu: [
        "Installments",
        "Payment History",
        "Due Payments"
      ],
      key: "payments"
    },
    { 
      title: "Post-Sale", 
      icon: <FaHandshake />,
      subMenu: [
        "Referrals",
        "Rewards",
        "Points"
      ],
      key: "postSale"
    },
    
    // Client Module
    { 
      title: "Client Portal", 
      icon: <MdPerson />,
      subMenu: [
        "My Bookings",
        "Documents",
        "Payments",
        "Referrals"
      ],
      key: "client"
    },
    
    // Settings
    { title: "Settings", icon: <FaCog />, gap: true, key: "settings" },

    // Property
    { 
      title: "Property", 
      icon: <MdOutlineHeadsetMic />,
      gap: true,
      subMenu: [
        "Property Master",
        "Property Types"
      ],
      key: "property"
    },
  ];

  const navigate = useNavigate();

  // Helper to convert to kebab-case
  const toKebab = str => str && str.toLowerCase().replace(/ /g, '-');

  const handleMenuClick = (menu) => {
    if (!menu.subMenu) {
      navigate(`/${toKebab(menu.key)}`);
    } else {
      toggleSubMenu(menu.key);
    }
  };

  const handleSubMenuClick = (menu, subMenu) => {
    navigate(`/${toKebab(menu.key)}/${toKebab(subMenu)}`);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setOpen(false)}
        />
      )}
      <div 
        className={`${open ? "w-72" : "w-20"} ${isMobile ? "fixed" : "fixed"} bg-light-card shadow-lg h-screen pt-8 z-30 transition-all duration-300 ease-in-out ${
          isMobile && !open ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Fixed header section */}
        <div className="px-4 fixed top-0 left-0 w-full bg-light-background pt-8 pb-4 z-10">
          {/* Toggle button */}
          {!isMobile && (
            <div 
              className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-light-card border-light-card border-2 rounded-full text-xl flex items-center justify-center ${!open && "rotate-180"} transition-all ease-in-out duration-300`}
              onClick={() => setOpen(!open)}
            >
              {open ? <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapse />}
            </div>
          )}
          {/* Logo and title */}
          <div className="flex gap-x-4 items-center h-10">
            <img 
              src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_640.png" 
              alt="logo" 
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full object-cover object-center cursor-pointer ease-in-out duration-300 ${open && "rotate-[360deg]"}`} 
            />
            {open && (
              <img 
                src={logown} 
                alt="Inhabit Realties Logo" 
                className="w-40 h-10 object-contain cursor-pointer ease-in-out duration-300" 
              />
            )}
          </div>
        </div>

        {/* Scrollable menu items */}
        <div className="mt-24 h-[calc(100vh-8rem)] overflow-y-auto">
          <ul className="space-y-0.5 px-4">
            {Menus.map((Menu, index) => (
              <li 
                key={index} 
                className={`flex flex-col rounded-md py-3 px-4 cursor-pointer text-light-darkText transition-all ease-in-out duration-300 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-card"} hover:bg-light-secondary hover:text-light-primary`}
                onClick={() => handleMenuClick(Menu)}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {Menu.icon}
                    </span>
                    <span className={`${!open && "hidden"} origin-left ease-in-out duration-300 text-sm md:text-base truncate`}>
                      {Menu.title}
                    </span>
                  </div>
                  {Menu.subMenu && (
                    <span className={`ml-auto cursor-pointer text-sm ${subMenus[Menu.key] ? "rotate-360" : ""} transition-transform ease-in-out duration-300 ${!open ? "hidden" : ""}`}>
                      {subMenus[Menu.key] ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                  )}
                </div>
                {/* Sidebar submenus */}
                {Menu.subMenu && subMenus[Menu.key] && (
                  <ul className="pl-3 pt-4 text-light-darkText">
                    {Menu.subMenu.map((subMenu, subIndex) => (
                      <li key={subIndex} className="text-sm flex items-center gap-x-2 py-3 px-2 rounded-lg hover:bg-light-secondary hover:text-light-primary" onClick={e => { e.stopPropagation(); handleSubMenuClick(Menu, subMenu); }}>
                        <span className="text-light-primary">
                          <FaChevronRight className="text-xs" />
                        </span>
                        <span className="truncate">{subMenu}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 
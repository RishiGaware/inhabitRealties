import React from "react";
import { BiChat } from "react-icons/bi";
import { FaChevronDown, FaChevronRight, FaCog } from "react-icons/fa";
import { FiTable } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { MdOutlineHeadsetMic, MdSpaceDashboard } from "react-icons/md";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { TiCalendar } from "react-icons/ti";

const Sidebar = ({ open, setOpen, subMenus, toggleSubMenu }) => {
  const Menus = [
    { title: "Dashboard", icon: <MdSpaceDashboard /> },
    { title: "Inbox", icon: <BiChat />, gap: true, subMenu: ["Requested Messages", "Unread Messages", "All Messages"], key: "inbox" },
    { title: "Calendar", icon: <TiCalendar /> },
    { title: "Tables", icon: <FiTable /> },
    { title: "Analytics", icon: <GoGraph /> },
    { title: "Support", icon: <MdOutlineHeadsetMic /> },
    { title: "Setting", icon: <FaCog />, subMenu: ["General", "Security", "Notifications"], key: "settings" },
  ];

  return (
    <div className={`${open ? "w-72 p-5" : "w-20 p-4"} bg-zinc-900 h-screen pt-8 relative duration-300 ease-in-out`}>
      {/* Toggle button */}
      <div className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${!open && "rotate-180"} transition-all ease-in-out duration-300`}
        onClick={() => setOpen(!open)}
      >
        {open ?
          <TbLayoutSidebarLeftExpand /> :
          <TbLayoutSidebarLeftCollapse />}
      </div>
      {/* Logo and title */}
      <div className="flex gap-x-4 items-center">
        <img src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_640.png" alt="logo" className={`w-10 h-10 rounded-full object-cover object-center cursor-pointer ease-in-out duration-3 ${open && "rotate-[360deg]"}`} />
        <h1 className={`text-zinc-50 origin-left font-semibold text-xl duration-200 ease-in-out ${!open && "scale-0"}`}>
          Admin Dashboard
        </h1>
      </div>
      {/* Sidebar Navbar Items */}
      <ul className="pt-6 space-y-0.5">
        {Menus.map((Menu, index) => (
          <li key={index} className={`flex flex-col rounded-md py-3 px-4 cursor-pointer hover:text-white text-zinc-50 hover:bg-zinc-800/50 transition-all ease-in-out duration-300 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-zinc-800/40"}`}>
            <div className="flex items-center justify-between gap-x-4" onClick={() => toggleSubMenu(Menu.key)}>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {Menu.icon}
                </span>
                <span className={`${!open && "hidden"} origin-left ease-in-out duration-300`}>
                  {Menu.title}
                </span>
              </div>
              {Menu.subMenu && (
                <span
                  className={`ml-auto cursor-pointer text-sm ${subMenus[Menu.key] ? "rotate-360" : ""} transition-transform ease-in-out duration-300 ${!open ? "hidden" : ""}`}>
                  {subMenus[Menu.key] ?
                    <FaChevronDown /> : <FaChevronRight />}
                </span>
              )}
            </div>
            {/* Sidebar submenus */}
            {Menu.subMenu && subMenus[Menu.key] && (
              <ul className="pl-3 pt-4 text-zinc-300">
                {Menu.subMenu.map((subMenu, subIndex) => (
                  <li key={subIndex} className="text-sm flex items-center gap-x-2 py-3 px-2 hover:bg-zinc-800 rounded-lg">
                    <span className="text-zinc-4">
                      <FaChevronRight className="text-xs" />
                    </span>
                    {subMenu}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar; 
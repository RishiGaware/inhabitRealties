import React from "react";
import { FaBell, FaSearch, FaBars } from "react-icons/fa";

const Navbar = ({ open, setOpen, isMobile }) => (
  <div
    className={`h-[8ch] px-4 md:px-12 bg-light-card shadow-md flex items-center justify-between z-10 transition-all duration-300 fixed top-0`}
    style={{
      left: isMobile ? 0 : open ? '18rem' : '5rem',
      width: isMobile ? '100vw' : `calc(100vw - ${open ? '18rem' : '5rem'})`,
    }}
  >
    <div className="flex items-center gap-4">
      {isMobile && (
        <button onClick={() => setOpen(!open)} className="text-xl text-light-darkText">
          <FaBars />
        </button>
      )}
      <div className="w-48 md:w-96 border border-light-primary rounded-full h-11 flex items-center justify-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="flex-1 h-full rounded-full outline-none border-none bg-light-card px-4 text-sm md:text-base text-light-darkText" 
        />
        <button className="px-4 h-full flex items-center justify-center text-base text-light-darkText border-l border-light-primary">
          <FaSearch />
        </button>
      </div>
    </div>
    <div className="flex items-center gap-x-4 md:gap-x-8">
      {/* Notification */}
      <button className="relative">
        <div className="w-5 h-5 bg-light-card flex items-center justify-center absolute -top-1.5 -right-2.5 rounded-full p-0.5">
          <span className="bg-light-danger text-white rounded-full w-full h-full flex items-center justify-center text-xs">3</span>
        </div>
        <FaBell className="text-xl text-light-darkText" />
      </button>
      {/* Profile img */}
      <img 
        src="https://cdn.pixabay.com/photo/2016/11/21/11/17/model-1844729_640.jpg" 
        alt="profile img" 
        className="w-8 h-8 md:w-11 md:h-11 rounded-full object-cover object-center cursor-pointer" 
      />
    </div>
  </div>
);

export default Navbar; 
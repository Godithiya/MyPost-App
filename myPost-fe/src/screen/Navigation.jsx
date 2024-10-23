import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import { MdLocalPostOffice } from 'react-icons/md';

const Navigation = () => {
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white drop-shadow-xl rounded-full flex justify-between py-3 px-5">
      
      {/* Home Link */}
      <NavLink 
        to={'/'}
        className="flex flex-col items-center flex-1 text-[#7a9dbd] hover:text-sky-500 transition-colors"
        activeClassName="font-bold"
      >
        <div className="group flex flex-col items-center">
          <FaHome className="text-xl group-hover:scale-125 transition-transform duration-300 ease-in-out" />
          <span className="text-xs mt-1">Home</span>
        </div>
      </NavLink>

      {/* Mainpage Link */}
      <NavLink 
        to={'my_post'}
        className="flex flex-col items-center flex-1 text-[#7a9dbd] hover:text-sky-500 transition-colors"
        activeClassName="font-bold"
      >
        <div className="group flex flex-col items-center">
          <MdLocalPostOffice className="text-xl group-hover:scale-125 transition-transform duration-300 ease-in-out"/>
          <span className="text-xs mt-1">My Post</span>
        </div>
      </NavLink>

      {/* Profile Link */}
      <NavLink 
        to={'/profile'}
        className="flex flex-col items-center flex-1 text-[#7a9dbd] hover:text-sky-500 transition-colors"
        activeClassName="font-bold"
      >
        <div className="group flex flex-col items-center">
          <FaUser className="text-lg group-hover:scale-125 transition-transform duration-300 ease-in-out" />
          <span className="text-xs mt-[5.5px]">Profile</span>
        </div>
      </NavLink>
    </div>
  );
};

export default Navigation;

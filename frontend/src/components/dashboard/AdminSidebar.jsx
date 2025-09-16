import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUserAlt, FaCog, FaCalendarAlt } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";


const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // sidebar expanded by default

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin-dashboard" },
    { name: "Employees", icon: <FaUserAlt />, path: "/admin-dashboard/employees" },
     { name: "Departements", icon: <FaBuilding />, path: "/admin-dashboard/departments" },
       { name: "Leave", icon: <FaCalendarAlt  />, path: "/Leave" },   
         { name: "Salary", icon: <FaMoneyBillWave  />, path: "/Salary" },
    
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div
      className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 ${
        isOpen ? "w-52" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        {isOpen && <h3 className="text-lg font-bold">Employee MS</h3>}

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-between w-6 h-6 focus:outline-none"
        >
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "rotate-0 translate-y-0" : "rotate-45 translate-y-2"
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "rotate-0 -translate-y-0" : "-rotate-45 -translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;

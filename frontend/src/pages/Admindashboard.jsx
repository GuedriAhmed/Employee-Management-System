import React from "react";
import { useAuth } from "../context/authcontext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";


const Admindashboard = () => {
    const {user,} = useAuth();
    
    return (
<div className="flex h-screen"> 
<AdminSidebar />
<div className='flex-1 flex flex-col'>
    <Navbar />
    <Outlet />
    
    </div>

  

</div>
      

    )
}

export default Admindashboard;
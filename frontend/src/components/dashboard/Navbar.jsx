import React from "react";
import { useAuth } from "../../context/authcontext";


const Navbar = ({ onLogout }) => {
    const {user} = useAuth();
    return (
         <nav className="bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
      {/* Left side: Logo / Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ">Guden tag! {user.name}</h1>
      </div>

      {/* Right side: Logout Button */}
      <div>
        <button
          onClick={onLogout}
          className="bg-white-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        >
          Log me out !
        </button>
      </div>
    </nav>
    )
}
export default Navbar;
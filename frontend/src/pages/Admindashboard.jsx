import React from "react";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";


const Admindashboard = () => {
    const {user,loading} = useAuth();
    const navigate = useNavigate();
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        navigate("/login");
    }
    return <div>Admindashboard {user && user.name}</div>;
}

export default Admindashboard;
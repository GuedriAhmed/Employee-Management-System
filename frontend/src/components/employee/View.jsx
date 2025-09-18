import axios from 'axios';
import React ,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Hash,
  Building2,
  Heart,
  UserCircle,
} from "lucide-react";

const View = () => {
  const{id}= useParams()
  const[employee,setEmployee] = useState(null)
   useEffect(() => {
    const fetchEmployee = async () => {
     try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
          setEmployee(response.data.employee)
        }

     } catch (error) {
        if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
      }
    }
    fetchEmployee();
  }, []);
    return (
       <>
  {employee ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl flex flex-col md:flex-row gap-8 hover:shadow-2xl transition"
      >
        {/* Left Side - Big Profile Image */}
        <div className="flex justify-center items-center md:w-1/3">
          <motion.img
            src={`http://localhost:5000/${employee.userId.profileImage}`}
            className="w-40 h-40 md:w-56 md:h-56 rounded-xl object-cover border-4 border-blue-100 shadow-md"
            whileHover={{ scale: 1.05 }}
          />
        </div>

        {/* Right Side - Details */}
        <div className="flex-1">
          {/* Name + ID */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-blue-500" />{" "}
              {employee.userId.name}
            </h2>
            <p className="text-gray-500 flex items-center gap-1">
              <Hash className="w-4 h-4" /> {employee.employeeId}
            </p>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>
                <strong>Date of Birth:</strong>{" "}
                {employee.dob
                  ? new Date(employee.dob).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-5 h-5 text-pink-500" />
              <span>
                <strong>Gender:</strong> {employee.gender || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Building2 className="w-5 h-5 text-green-500" />
              <span>
                <strong>Department:</strong>{" "}
                {employee.department?.dep_name || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Heart className="w-5 h-5 text-red-500" />
              <span>
                <strong>Marital Status:</strong>{" "}
                {employee.maritalStatus || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  )}
</>
    );
};

export default View;
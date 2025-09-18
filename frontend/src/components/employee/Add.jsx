import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const navigate = useNavigate()
    const [departments,setDepartments] =useState([])
    useEffect(()=>{
        const getDepartments= async () => {
 const departments= await fetchDepartments()
        setDepartments(departments)
        }
       getDepartments(departments)
    },[])


     const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "image"){
        setFormData ((prevData)=> ({...prevData,[name] : files[0] }))
    } else {
        setFormData((prevData)=> ({...prevData,[name] : value }))
    }
  };

     const handleSubmit = async (e) =>{
        e.preventDefault();
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key,formData[key])
        } )


        // Submit form logic here
        console.log("Form submitted:", formDataObj);
        try {
          const response = await axios.post('http://localhost:5000/api/employee/add',formDataObj,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
          });
          if(response.data.success){
            alert("employee added successfully");
            navigate("/admin-dashboard/employees");
          }
        }
        catch (error) {
            if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
    }
  }
    return(
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Employee
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              value={formData.employeeId}
              placeholder="Enter employee ID"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              value={formData.dob}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={formData.maritalStatus}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="Test1">Single</option>
              <option value="Test2">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              value={formData.designation}
              placeholder="Enter designation"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              onChange={handleChange}
              value={formData.department}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Department</option>
                {departments.map(dep => (<option key={dep._id} value = {dep._id }>{dep.dep_name}</option>))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              value={formData.salary}
              placeholder="Enter salary"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
             </select>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none white:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex justify-between gap-4 pt-4">
            <button
              type="button"
              className="w-1/2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
    )
}

export default Add
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";

const Edit = () => {
    const navigate = useNavigate()
    const [employee,setEmployee] =useState({
      name: '',
      maritalStatus:'',
      designation:'',
      salary:0,
      department:''
    })
     const [departments,setDepartments] =useState(null)
        useEffect(()=>{
            const getDepartments= async () => {
     const departments= await fetchDepartments()
            setDepartments(departments)
            }
           getDepartments(departments)
        },[])
    
    const {id} = useParams()
    useEffect(()=>{
          const fetchEmployee = async () => {
     try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
          const employee = response.data.employee
          setEmployee((prev) => ({...prev,name: employee.userId.name,
            maritalStatus:employee.maritalStatus,
            designation:employee.designation,
            salary:employee.salary,
            department:employee.department}))
        }

     } catch (error) {
        if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
      }
    }
    fetchEmployee();
    },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
        setEmployee((prevData)=> ({...prevData,[name] : value }))
  };

     const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try {
          const response = await axios.put(`http://localhost:5000/api/employee/${id}`,employee,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
          });
          if(response.data.success){
            alert("employee Updated successfully");
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
      <>{departments && employee ? (
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Employee
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={employee.name}
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
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
              value={employee.designation}
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
              value={employee.department}
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
              value={employee.salary}
              placeholder="Enter salary"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
    ): <div>Loading...</div>}</>
    )
}

export default Edit
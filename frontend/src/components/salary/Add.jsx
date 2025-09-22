import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

const Add = () => {
    const navigate = useNavigate()
    const [salary,setSalary] =useState({
      employeeId:null,
      basicSalary:0,
      allowances:0,
      deductions:0,
      payDate:null
    })
    const [employees,setEmployees] =useState([])
     const [departments,setDepartments] =useState(null)
        useEffect(()=>{
            const getDepartments= async () => {
     const departments= await fetchDepartments()
            setDepartments(departments)
            }
           getDepartments()
        },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
        setSalary((prevData)=> ({...prevData,[name] : value }))
  };

     const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try {
          const response = await axios.post(`http://localhost:5000/api/salary/add`,salary,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
          });
          if(response.data.success){
            alert("Salary Added successfully");
            navigate("/admin-dashboard/employees");
          }
        }
        catch (error) {
            if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
    }
  }
  const handleDepartment = async (e)=>{
    const emps = await getEmployees(e.target.value)
    setEmployees(emps)
  }
    return(
      <>{departments  ? (
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
         Add salary
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              onChange={handleDepartment}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Department</option>
                {departments.map((dep) => (<option key={dep._id} value = {dep._id }>{dep.dep_name}</option>))}
            </select>
          </div>
          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <select
              name="employeeId"
              onChange={handleChange}
              
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Employee</option>
                {employees.map((emp) => (<option key={emp._id} value = {emp._id }>{emp.employeeId}</option>))}
            </select>
          </div>

         

          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              onChange={handleChange}
              placeholder="Enter Basic Salary"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

      

          {/* Allowances */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
            <input
              type="number"
              name="allowances"
              onChange={handleChange}
              placeholder="Enter Allowances"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

 {/* Deductions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
            <input
              type="number"
              name="deductions"
              onChange={handleChange}
              placeholder="Enter Deductions"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

           {/* Pay Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pay Date</label>
            <input
              type="date"
              name="payDate"
              onChange={handleChange}
              placeholder="Enter Pay Date"
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

export default Add
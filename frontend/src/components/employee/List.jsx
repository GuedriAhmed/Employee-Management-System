import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import {EmployeeButtons} from "../../utils/EmployeeHelper"
import { columns } from "../../utils/EmployeeHelper";

const List = () => {
  const[employees,setEmployees] = useState([])
  const [empLoading, setEmploading] = useState(false)
  const[filteredEmployee,setfilteredEmployees]=useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmploading(true)
      
     try {
        const response = await axios.get("http://localhost:5000/api/employee",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
          let sno = 1;
          const data =await response.data.employees.map((emp)=> (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name : emp.userId.name,
              dob : new Date(emp.dob).toLocaleDateString(),
              profileImage: <img  className="w-15 h-15 rounded-full object-cover" src={`http://localhost:5000/${emp.userId.profileImage}`} />,
              action : (<EmployeeButtons  Id={emp._id} />)
            }
          )
        )
        setEmployees(data);
      setfilteredEmployees(data)
        }

     } catch (error) {
        if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
      } finally {
        setEmploading(false)
      }
    }
    fetchEmployees();
  }, []);

    const handleFilter = (e) =>{
      const records = employees.filter((emp)=>(
        emp.name.toLowerCase().includes(e.target.value.toLowerCase())
      ))
      setfilteredEmployees(records)
    }
 

  


    return(
           <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search employee..."
              className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
              onChange={handleFilter}
            />
            <Link to="/admin-dashboard/add-employee" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-center">
              + Add Employee
            </Link>
          </div>
        </div>
        {/* Table */}
         <DataTable className="min-w-full border border-gray-200 rounded-lg" columns={columns} data={filteredEmployee} pagination/>
      </motion.div>
    </div>
    )
}

export default List
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import { columns } from "../../../utils/DepartmentHelper";

import { DepartmentButtons } from "../../../utils/DepartmentHelper";
import axios from "axios";




const DepartmentList = () => {

  const [departments,setDepartments] = useState([]);
  const [depLoading, setDeploading] = useState(false)
  const[filteredDepartments,setFilterDepartment] = useState([]);
  const onDepartmentDelete = async (id) => {
    const data =  departments.filter(dep => dep._id !== id)
    setDepartments(data)
   }
  
  useEffect(() => {
    const fetchDepartments = async () => {
      setDeploading(true)
      
     try {
        const response = await axios.get("http://localhost:5000/api/department",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
          let sno = 1;
          const data =await response.data.departments.map((dep)=> (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action : (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
            }
          )
        )
        setDepartments(data);
        setFilterDepartment(data);
        }

     } catch (error) {
        if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
      } finally {
        setDeploading(false)
      }
    }
    fetchDepartments();
  }, []);



  // Framer Motion variants for rows
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const filterDepartments = (e) =>{
    const records= departments.filter((dep)=> dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDepartment(records)
  }

  return (
<>{depLoading ? <div>Loading ... </div> : 
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Centered Search Input */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Department..."
            onChange={filterDepartments}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Departments</h2>

        <Link
          to="/admin-dashboard/add-department"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <PlusIcon className="h-5 w-5" />
          Add Department
        </Link>
      </div>

      {/* Table */}
      <DataTable 
      columns={columns} data={filteredDepartments} pagination
      />

    </div>
    }</>
  );
};

export default DepartmentList;

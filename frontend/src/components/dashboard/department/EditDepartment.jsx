import React,{useEffect,useState}  from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const EditDepartment = () =>{
    const{id} = useParams ()
    const[department,setDepartment] = useState([])
    const[depLoading,setDeploading] = useState(false)
       const navigate = useNavigate();
   
  useEffect(() => {
    const fetchDepartments = async () => {
      setDeploading(true)
      
     try {
        const response = await axios.get(`http://localhost:5000/api/department/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
          setDepartment(response.data.department)
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

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setDepartment({...department,[name]:value})
       
    }

     const handleSubmit = async (e) =>{
        e.preventDefault();
        // Submit form logic here
        console.log("Form submitted:", department);
        try {
          const response = await axios.put(`http://localhost:5000/api/department/${id}`,department,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
          });
          if(response.data.success){
            alert("Department added successfully");
            navigate("/admin-dashboard/departments");
          }
        }
        catch (error) {
            if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
    }
  }
    
    return(
        <>{depLoading ? <div>Loading ... </div> : 
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Department
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Department Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              onChange= {handleChange}
              value={department.dep_name}
              placeholder="Enter department name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Write a short description..."
              rows="4"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                name="description"
                onChange={handleChange}
                value={department.description}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
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
     }</>
    )
}

export default EditDepartment
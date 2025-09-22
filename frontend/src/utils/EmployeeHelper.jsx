import axios from "axios";

import { useNavigate } from "react-router-dom";

export const columns = [
    { name: 'S No', selector: (row) => row.sno, sortable: true ,width:"70px"},
    { name: 'Name ', selector: (row) => row.name, sortable: true ,width:"100px"},
     { name: 'Image ', selector: (row) => row.profileImage, sortable: true,width:"90px" },
      { name: 'Department ', selector: (row) => row.dep_name, sortable: true,width:"120px" },
       { name: 'DOB ', selector: (row) => row.dob, sortable: true ,width:"130px"},
    {
  name: "Action",
  selector: (row) => row.action,
  sortable: false,
  cell: (row) => (
    <div className="flex justify-center w-full">
      {row.action}
    </div>
  ),
}

]

 
 export const fetchDepartments = async () => {
   
      let departments
     try {
        const response = await axios.get("http://localhost:5000/api/department",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
            departments = response.data.departments
        }

     } catch (error) {
        if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
      } 
      return departments
    }
  //fech employees for salary 
  export const getEmployees = async (id) => {
   
      let employees;
     try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
            employees = response.data.employees
        }

     } catch (error) {
        if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
      } 
      return employees
    }

   export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-wrap gap-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition"       onClick={() => navigate(`/admin-dashboard/employees/${Id}`)} >
                          View
                        </button>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition" onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)} >
                          Edit
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition">
                          Salary
                        </button>
                        <button className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-600 transition">
                          Leave
                        </button>
                      </div>
  );
};


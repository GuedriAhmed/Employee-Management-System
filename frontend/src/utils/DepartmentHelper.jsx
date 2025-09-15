import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const DepartmentButtons = ({ _id,onDepartmentDelete }) => {
  const navigate = useNavigate();
  const  handleDelete = async (id)=> {
    const confirm = window.confirm("Do you want to  delete")
    if (confirm){
    try {
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
        onDepartmentDelete(id)
         
        }

     } catch (error) {
        if(error.response && !error.response.data.success){
              alert(error.response.data.error);
        }    
      }
    }
  }
  return (
    <div className="flex space-x-2">
      <button
        className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        onClick={() => navigate(`/admin-dashboard/departments/${_id}`)}
      >
        <PencilSquareIcon className="h-4 w-4" />
        Edit
      </button>
      <button
        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        onClick={()=> handleDelete(_id,)}
      >
        <TrashIcon className="h-4 w-4" />
        Delete
      </button>
    </div>
  );
};

 const columns = [
    { name: 'S No', selector: (row) => row.sno, sortable: true },
    { name: 'Department Name', selector: (row) => row.dep_name, sortable: true },
    { name: 'Action', selector: (row) => row.action, sortable: true },

]


export {columns, DepartmentButtons};

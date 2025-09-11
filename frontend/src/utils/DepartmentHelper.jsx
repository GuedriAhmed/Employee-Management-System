import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


const DepartmentButtons = ({ _id }) => {
  const navigate = useNavigate();
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

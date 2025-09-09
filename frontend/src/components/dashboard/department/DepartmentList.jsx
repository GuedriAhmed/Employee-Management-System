import React, { useState }  from "react";

import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";


const DepartmentList = () => {
       const [searchTerm, setSearchTerm] = useState("");


    const departments = [
    { id: 1, name: "IT" },
    { id: 2, name: "Database" },
    { id: 3, name: "Logistic" },
  ];
    // Filter departments by search term
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
     // Framer Motion variants for rows
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
      {/* Centered Search Input */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Departments</h2>

        <Link
          to="/admin-dashboard/departments/add-department"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <PlusIcon className="h-5 w-5" />
          Add Department
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">S No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Department</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDepartments.map((dept, idx) => (
              <motion.tr
                key={dept.id}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
                className={idx % 2 === 0 ? "bg-gray-50 hover:bg-gray-100 transition" : "hover:bg-gray-100 transition"}
              >
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{dept.name}</td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                    <PencilSquareIcon className="h-4 w-4" />
                    Edit
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Rows per page: 10</span>
        <span>1–{filteredDepartments.length} of {departments.length}</span>
      </div>
    </div>
    );
}

export default DepartmentList;
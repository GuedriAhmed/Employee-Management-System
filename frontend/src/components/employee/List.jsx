import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const List = () => {
     const [search, setSearch] = useState("");

  // Static employee data
  const employees = [
    {
      _id: "1",
      name: "John Doe",
      dob: "1990-05-14",
      department: "HR",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      _id: "2",
      name: "Jane Smith",
      dob: "1993-11-20",
      department: "Finance",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      _id: "3",
      name: "Ali Hassan",
      dob: "1988-03-10",
      department: "IT",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
  ];

  // Filter employees by search
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );


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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
            />
            <Link to="/admin-dashboard/add-employee" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-center">
              + Add Employee
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No employees found
            </div>
          ) : (
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">S.No</th>
                  <th className="px-4 py-2 border text-left">Image</th>
                  <th className="px-4 py-2 border text-left">Name</th>
                  <th className="px-4 py-2 border text-left">DOB</th>
                  <th className="px-4 py-2 border text-left">Department</th>
                  <th className="px-4 py-2 border text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr
                    key={emp._id}
                    className="hover:bg-gray-50 transition text-gray-700"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={emp.image}
                        alt={emp.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 border">{emp.name}</td>
                    <td className="px-4 py-2 border">{emp.dob}</td>
                    <td className="px-4 py-2 border">{emp.department}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex flex-wrap gap-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition">
                          View
                        </button>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition">
                          Edit
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition">
                          Salary
                        </button>
                        <button className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-600 transition">
                          Leave
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
    )
}

export default List
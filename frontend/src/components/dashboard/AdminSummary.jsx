import React from "react";
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa";

const AdminSummary = () => {
    return (
        <div className="p-6">
            <h3 className="text-2x1 font bold">Dashboard Overview </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SummaryCard icon={FaUsers} text="Total employees" number={13} color ="text-blue-500"/>
            <SummaryCard icon={FaBuilding} text="Total Departements" number={5} color ="text-red-500" />
            <SummaryCard icon={FaMoneyBillWave} text="Total Departements" number="$1000" color ="text-green-500" />
           </div>
        <div className="mt-12">
<h4 className="text-center text-2xl font-bold ">Leave Details</h4>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
<SummaryCard icon={FaFileAlt} text="Leave Applied" number={3} color ="text-green-500"/>
<SummaryCard icon={FaCheckCircle} text="Leave Approved" number={1} color ="text-blue-500"/>
<SummaryCard icon={FaHourglassHalf} text="Leave Rejected" number={1} color ="text-red-500"/>
<SummaryCard icon={FaTimesCircle} text="Leave Pending" number={1} color ="text-yellow-500"/>

</div>

        </div>


        </div>
    );
};

export default AdminSummary;
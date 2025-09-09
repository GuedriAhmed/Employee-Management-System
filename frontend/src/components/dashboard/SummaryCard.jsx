import React from "react";
import {motion} from "framer-motion";


const SummaryCard = ({ icon,text,number,color}) => {
    return (

        <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >

        
        <div className="rounded shadow p-4 flex items-center bg-white">
            <div className={`text-4xl ${color} mr-4`}>
                {React.createElement(icon)}
            </div>
            <div>
                <h4 className="text-lg font-semibold">{text}</h4>
                <p className="text-2xl font-bold">{number}</p>
            </div>
        </div>
           </motion.div>
        
    );
};
export default SummaryCard;
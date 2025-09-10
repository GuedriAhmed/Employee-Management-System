import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    dep_name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
});

const Department = mongoose.model('Department', DepartmentSchema);
export default Department;
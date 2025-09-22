import mongoose from 'mongoose';
import { Schema } from 'mongoose';



const SalarySchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    payDate: {
        type: Date,
        required: true
    },
    allowances: {
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number
    },
    createAt:{type:Date,default:Date.now},
     updateAt:{type:Date,default:Date.now}
}, {
    timestamps: true
});

const Salary = mongoose.model('Salary', SalarySchema);
export default Salary
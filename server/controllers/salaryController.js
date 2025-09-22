import Salary from '../models/Salary.js'


const addSalary=async (req,res) =>{
try{
    const{employeeId,basicSalary,allowances,deductions,payDate}= req.body
    const totalSalary =parseInt(basicSalary)+parseInt(allowances)-parseInt(deductions)
    const newsalary = await Salary({
        employeeId,
        basicSalary,
        allowances,
        deductions,
        netSalary:totalSalary,
        payDate
    })

    await newsalary.save()
    return res.status(200).json({success:true})
}catch(error){
    return res.status(500).json({success:false,error:"Salary add server error"})
}

}

export {addSalary}
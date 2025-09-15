import Department from '../models/Department.js';

const getDepartments = async (req ,res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  }
  catch (error) {
    console.error('Error fetching departments:', error);
    return res.status(500).json({ success: false, error: 'Server error fetching departments' });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({
      dep_name,
      description
    });
    await newDep.save();
    return res.status(201).json({ success: true, message: 'Department added successfully', department: newDep });

  } catch (error) {
    console.error('Error adding department:', error);
   return res.status(500).json({ success: false, error: ' add Department server error' });
  }
}

const getDepartment = async (req, res) => {
  try {
    const{id} = req.params;
    const department = await Department.findById({_id : id})
    
    
    return res.status(200).json({ success: true, department });

  } catch (error) {
    console.error('Error Editing department:', error);
   return res.status(500).json({ success: false, error: ' edit Department server error' });
  }
}

const editDepartment = async (req, res) => {
  try {
    const{id} = req.params;
     const { dep_name, description } = req.body;
    const editDep = await Department.findByIdAndUpdate({_id : id} ,{dep_name: dep_name,description

    })
    
    
    return res.status(200).json({ success: true, editDep });

  } catch (error) {
    console.error('Error Editing department:', error);
   return res.status(500).json({ success: false, error: ' edit Department server error' });
  }
}
const deleteDepartment = async (req,res) =>{
  try {
    const{id} = req.params;
 
    const deletedep = await Department.findByIdAndDelete({_id : id})
    
    return res.status(200).json({ success: true, deletedep });

  } catch (error) {
    console.error('Error Editing department:', error);
   return res.status(500).json({ success: false, error: 'Delete Department server error' });
  }
}
export {addDepartment,getDepartments,getDepartment, editDepartment,deleteDepartment} ;
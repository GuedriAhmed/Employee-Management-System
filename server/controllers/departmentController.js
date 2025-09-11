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
export {addDepartment,getDepartments} ;
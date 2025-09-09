import {BrowserRouter as Router, Route, Routes, BrowserRouter,Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Admindashboard from './pages/Admindashboard';
import Employeedashboard from './pages/Employeedashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/dashboard/department/DepartmentList';
import AddDepartment from './components/dashboard/department/AddDepartment';

function App() {
  

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route> 
        <Route path="/login" element={<Login />}></Route> 
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={['admin']}>
          <Admindashboard />
          </RoleBaseRoutes>
          </PrivateRoutes>
          }>
          <Route index element={<AdminSummary />}></Route>
          <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
            
          </Route> 
        <Route path="/employee-dashboard" element={<Employeedashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

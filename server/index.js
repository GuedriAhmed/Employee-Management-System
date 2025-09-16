import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';

dotenv.config();


connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
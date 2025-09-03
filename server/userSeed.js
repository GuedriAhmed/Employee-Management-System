import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectDB from './db/db.js';

const userRegister = async () => {
    await connectDB();
    try {
        const hashedPassword = await bcrypt.hash('admin', 10);
        const newUser = new User({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin',
        })
        await newUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error seeding user data:', error);
    }
}

userRegister();
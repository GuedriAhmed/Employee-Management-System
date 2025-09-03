import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        enum: ['employee', 'admin'],
        require: true,
        default: 'employee'
    },
    profileImage: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema);


export default User;
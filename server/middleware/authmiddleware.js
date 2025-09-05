import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verfiyUser = async (req,res,next) => {

    try {
const token = req.header.authorization.split('')[1];

    if (!token) {
        return res.status(404).json({ success: false, error: 'No token, authorization denied' });
    }
const decoded = jwt.verify(token, process.env.JWT_SECRET);
if (!decoded) {
    return res.status(404).json({ success: false, error: 'Token is not valid' });
}
const user = await User.findById({_id: decoded._id}).select('-password');
if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
}
req.user = user;
next();
    } catch (error) {

        return res.status(500).json({ success: false, error: 'Server Error' });
    }

}

export default verfiyUser;
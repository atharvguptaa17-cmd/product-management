
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
    try{
         const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10d' });
        res.status(200).json({ token , user: { _id: user._id, name: user.name, role: user.role } });

    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export {loginUser};
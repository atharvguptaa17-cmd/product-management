import User from './models/user.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js';


const userRegister = async () => {
    await connectToDatabase();
    try{
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const newUser = new User({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin'
        });
        await newUser.save();
        console.log("Admin user created");
    }catch(err){
        console.log(err)
    }

}

userRegister();
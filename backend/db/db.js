import 'dotenv/config';
import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

export default connectToDatabase;
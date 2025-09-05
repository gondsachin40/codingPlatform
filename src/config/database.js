import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

async function connectDB() {
    await mongoose.connect(process.env.URL);
}
export default connectDB;
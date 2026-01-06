import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connection succesfully');
    } catch (error) {
        console.log("Error On Connection ", error);
    }
}
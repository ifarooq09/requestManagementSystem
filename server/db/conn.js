import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log('Databse connected successfully');
    } catch (error) {
        console.log(error)
    }
}
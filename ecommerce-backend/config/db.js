import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to mongoDb 👍");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    console.log(error.message);
    process.exit(1)
  }
};

export default connectDB;


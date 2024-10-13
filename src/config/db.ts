import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT0 || "");
    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
  }
};

export default connectDB;
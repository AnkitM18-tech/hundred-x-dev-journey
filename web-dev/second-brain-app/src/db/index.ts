import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_DB_URI as string
    );
    console.log(
      `Database Connection Successful! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Database Connection failed! error: ${error}`);
  }
};

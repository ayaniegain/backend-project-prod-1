import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
  try {
    const connectonInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n Mongodb connected !! DB HOST : ${connectonInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb conencttion error".error);
    process.exit(1);
  }
};

export default connectDb;

import mongoose from "mongoose";
import { MONGO_URI }  from '../../config.js'

const connectDB = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  const url = `${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`;
  console.log(`MongoDB Connected: ${url}`)
  }catch (err) {
    console.error(`Error : ${err.message}`);
    process.exit(1);
  }

}

export default connectDB;
import mongoose from "mongoose";

const connectDB = (url) => {
  // useful when working with search functionality
  mongoose.set("strictQuery", true);

  //connect database
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB created"))
    .catch((err) => console.log(err));
};

export default connectDB;

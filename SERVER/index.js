import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// allows to pull a zero-dependency module that loads environment variables from a .env file into process.env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// added routes
// get post
app.use("/api/v1/post", postRoutes);
// generate data from api
app.use("/api/v1/dalle", dalleRoutes);

// route to verify the app is working
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

// to run it - start server and connect to db
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();

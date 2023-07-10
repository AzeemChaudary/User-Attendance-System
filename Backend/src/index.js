import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import allRoutes from "./Routes/index.js";

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

//Route
app.use("/api", allRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/AttendenceSystem"
    );
    console.log("MONGODB CONNECTED");
  } catch (err) {
    console.log("You are having an error while connecting MongoDB " + err);
    process.exit(1);
  }
};

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at port ${port}`);
});

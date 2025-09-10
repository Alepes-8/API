import express from "express";
import mongoose from "mongoose";        
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js"

// Load environment variables from .env file
dotenv.config();
const app = express(); // create an express application

app.use(cors());
app.use(express.json()); // parse JSON body

// Root route
app.get("/", (req, res) => {   
  res.send("Task Tracker API is running...");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB connection, database connection.
console.log("🔗 Trying to connect to:", process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

//Hook up task routes into server from the routes/taskRoutes.js file
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
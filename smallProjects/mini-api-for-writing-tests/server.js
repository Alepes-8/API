import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// Only connect to Mongo if not in test
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost:27017/mini_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  });
}

export default app; // so Supertest can use it

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes.js";

// ------------ Installation and setup ------------
// 1. open power shell or terminal as admin
// 2. Run mongod to start MongoDB server
// 3. in a new terminal, run "node server.js" to start the server
// 4. In Postman, test the API endpoints

// ------------ How to test the endpoint ------------
// 1. open postman 
// 2. Set the request type to POST
// 3. Enter the URL http://localhost:5000/api/recipes
// 4. In the body tab, select raw and set the type to JSON
/** 5. Enter a JSON object like: {
  "title": "Spaghetti Carbonara",
  "ingredients": ["Pasta", "Eggs", "Bacon"],
  "instructions": "Boil pasta, fry bacon, mix with eggs.",
  "category": "Italian"
}*/

// If the entry point is in server.js we can start it with `node server.js`, otherwise if you added "dev": "nodemon server.js" to package.json: 'npm run dev'
//How to test after running
//Open Postman or browser.
// Try http://localhost:5000/ → should return "Recipe Manager API is running...".
// Try http://localhost:5000/api/recipes with a POST request and a JSON body → should create a recipe in MongoDB.

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // parse JSON body

// Root route
app.get("/", (req, res) => {
  res.send("Recipe Manager API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
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



//Hook up recipe routes into server
app.use("/api/recipes", recipeRoutes);
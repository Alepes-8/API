import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js"
import jwt from "jsonwebtoken";

const router = express.Router();

router.get('/health', async(req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get("/get", async(req, res) => { // get all users TODO: remove in production
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(400).json({error: err.message});
    }
})

router.delete("/delete/:id", async(req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted"});
    }catch(err){
        res.status(400).json({error: err.message});
    }
})

router.post("/register", async(req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "User registered" });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body
        
        // 1. Find the user in MongoDB
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ error: "Invalid credentials" });
        }
        
        // 2. Check the password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({error: "Invalid credentials"});
        
        // 3. Create a JWT
        const token = jwt.sign(
            { id: user._id },            // payload
            process.env.JWT_SECRET,      // secret from .env
            { expiresIn: "1h" }          // optional expiration
        );
        
        // 4. Send back token
        res.json({token});
    }catch(err){
        res.status(500).json({error: "Server error" });
    }
})

export default router;
import express from 'express';
import Task from "../models/Task.js";
import auth from '../middleware/authMiddleware.js'

const router = express.Router();

// these routes define what can be called when in the backend. However these are procedures that are done in the database.
// So we call the database through the api, with possibly a req. That req is from the client
// When the task is finished and some data is to be returned, that data is sent back through res(response to client)

// Health check route - no auth required
router.post('/', auth,  async (req, res) => {
    try{
        const task = new Task(req.body);
        await task.save()
        res.status(201).json(task)
    }catch (err){
        res.status(400).json({error: err.message})
    }
});

router.get('/', auth, async (req, res) => { 
    const tasks = await Task.find();    //look through the db to find all tasks.
    res.json(tasks);    // Sends back a json response with tasks as the message.
});

router.get('/:id', auth, async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message: "Not found"})
        res.json(task)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}); 

router.put('/:id', auth, async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(task)
    } catch(err){
        res.status(400).json({error: err.message})
    }
});

router.delete('/:id', auth, async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: "Task deleted"})
    } catch(err){
        res.status(400).json({error: err.message})
    }
});

export default router;

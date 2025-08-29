import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// these routes define what can be called when in the backend. However these are procedures that are done in the database.
// So we call the database through the api, with possibly a req. That req is from the client
// When the task is finished and some data is to be returned, that data is sent back through res(response to client)

router.post('/',  async (req, res) => {
    try{
        const task = new Task(req.body);
        await task.save()
        res.status(201).json(task)
    }catch (err){
        res.status(400).json({error: err.message})
    }
});

router.get('/',  async (req, res) => { 
    const tasks = await Task.find();    //look through the db to find all tasks.
    res.json(tasks);    // Sends back a json response with tasks as the message.
});

router.get('/:id',  async (req, res) => {});

router.put('/:id',  async (req, res) => {});

router.delete('/:id',  async (req, res) => {});

export default router;

const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

// create a new list

router.post('/', async (req, res) => {
    try {
        const { title } = res.body
        const newTodo = new Todo({ title }) // Create a new Todo document
        const savedTodo = await newTodo.save(); // Save the document to the database
        res.json(savedTodo) // Send the saved document as the response
        
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 }); // Fetch all Todos, sorted by creation time (newest first)
        res.json(todos);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body; // Extract `title` and `completed` fields from the request body
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id, // The ID of the Todo to update, extracted from the route parameter
            { title, compeleted },
            { new: true } // ensures the response contains the proper updated document 

        )
        if (!updatedTodo) return res.status(404).json({ msg: 'todo not found' }) 
        res.json(updatedTodo); // Send the updated document as the response

    } catch (err) {
        res.status(500).json({ error: err.message }); // handles errors and sends 500 status code
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(
            req.params.id

        )
        if (!deletedTodo) return res.status(404).json({ msg: 'todo to delete not found' })
        res.json(deletedTodo);
        

    } catch (err) {
        res.status(500).json({error: err.message})
        
    }
})

module.exports = router
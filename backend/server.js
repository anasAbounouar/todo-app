const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors =require('cors')

// Load environment variables
dotenv.config({ path: './backend/.env' });

// Middleware
app.use(express.json());
app.use(cors());

//routes
const todosRoute = require('./routes/todos')
app.use('/api/todos', todosRoute);

//port 
// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

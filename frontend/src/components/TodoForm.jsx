import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import { TextField, Button, Box } from '@mui/material';

// TodoForm component is used to add new todo items
const TodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    if (!title.trim()) return; // Exit if the input is empty or contains only whitespace

    try {
      // Make a POST request to add the new to-do item
      await axios.post('/api/todos', { title });
      setTitle(''); // Clear the input field after successful submission
      fetchTodos(); // Refresh the to-do list by calling the `fetchTodos` function
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box // Material-UI Box component for layout and spacing
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2, // Margin bottom
      }}
    >
      {/* TextField for the input */}
      <TextField
        label="Add a new todo"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      {/* Button for submission */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ height: '56px' }} // Match the TextField height for better alignment
      >
        Add
      </Button>
    </Box>
  );
};

export default TodoForm;

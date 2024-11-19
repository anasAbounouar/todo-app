import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import {
  ListItem,
  Checkbox,
  IconButton,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  // Toggle the completed status
  const toggleComplete = async () => {
    try {
      await axios.put(`/api/todos/${todo._id}`, {
        completed: !todo?.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle the deletion of a to-do
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/todos/${todo._id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle the title update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await axios.put(`/api/todos/${todo._id}`, {
        title: newTitle,
        completed: todo?.completed,
      });
      setIsEditing(false);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ddd',
        paddingY: 1,
      }}
    >
      {/* Checkbox to toggle completed status */}
      <Checkbox
        checked={todo?.completed}
        onChange={toggleComplete}
        color="primary"
        inputProps={{ 'aria-label': 'Toggle complete' }}
      />

      {/* Editable or static title */}
      {isEditing ? (
        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <TextField
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            size="small"
            variant="outlined"
            placeholder="Update title"
          />
          <IconButton type="submit" color="success">
            <SaveIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setIsEditing(false);
              setNewTitle(todo?.title); // Reset title if canceled
            }}
            color="error"
          >
            <CancelIcon />
          </IconButton>
        </Box>
      ) : (
        <Typography
          sx={{
            flex: 1,
            textDecoration: todo?.completed ? 'line-through' : 'none',
            color: todo?.completed ? 'gray' : 'inherit',
          }}
        >
          {todo?.title}
        </Typography>
      )}

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => setIsEditing(!isEditing)}
          color={isEditing ? 'error' : 'primary'}
        >
          {isEditing ? <CancelIcon /> : <EditIcon />}
        </IconButton>
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default TodoItem;

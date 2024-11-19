
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Typography, Box, List } from "@mui/material";
import { useEffect, useState } from "react";

// TodoList component manages the list of todos and interactions with the backend
const TodoList = () => {
  const [todos, setTodos] = useState([]); // State to hold the list of todos

  // Function to fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get("/api/todos"); // Fetch todos from the API
      setTodos(res.data); // Update state with the fetched todos
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: 2,
        textAlign: "center",
      }}
    >
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      {/* Form to add new todos */}
      <TodoForm fetchTodos={fetchTodos} />

      {/* List of todos */}
      <List
        sx={{
          marginTop: 2,
          padding: 0,
          border: "1px solid #ddd",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo._id} fetchTodos={fetchTodos} />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;

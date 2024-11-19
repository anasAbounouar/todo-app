import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      {/* Header */}
      <h1>Todo List</h1>

      {/* Form to add new todos */}
      <TodoForm fetchTodos={fetchTodos} />

      {/* List of todos */}
      <ul style={{ marginTop: "20px", padding: 0, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo._id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              <TodoItem todo={todo} fetchTodos={fetchTodos} />
            </li>
          ))
        ) : (
          <p style={{ padding: "20px", color: "#888" }}>No todos available. Start by adding one!</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;

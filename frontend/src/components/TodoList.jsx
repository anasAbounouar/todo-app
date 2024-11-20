// src/components/TodoList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('/api/todos');

      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>Todo List</h1>
      <TodoForm fetchTodos={fetchTodos} />
      <ul style={{ marginTop: '20px', padding: 0, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            
              <TodoItem key={todo._id}  todo={todo} fetchTodos={fetchTodos} />
           
          ))
        ) : (
          <li> <p style={{ padding: '20px', color: '#888' }}>No todos available. Start by adding one!</p></li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;

import React, { useState } from 'react';

const ToDosCard = () => {
  // State to manage the current input value, all to-dos, and selected category
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<{ category: string; text: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Function to handle adding a new to-do
  const handleAddTodo = () => {
    if (todo.trim()) {
      setTodos([...todos, { category: selectedCategory, text: todo }].sort((a, b) => a.text.localeCompare(b.text)));
      setTodo('');
    }
  };

  // Function to handle category change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // Filtered to-dos based on selected category
  const filteredTodos = selectedCategory === 'All'
    ? todos
    : todos.filter(todo => todo.category === selectedCategory);

  return (
    <div className="card to-dos-card">
      <h2>To-Do List</h2>

      {/* Dropdown for selecting category */}
      <div className="category-select">
        <label htmlFor="category">Select Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Counselor Creation">Counselor Creation</option>
          <option value="Student Creation">Student Creation</option>
          <option value="Admin/IT Personnel Creation">Admin/IT Personnel Creation</option>
          <option value="Class Creation">Class Creation</option>
        </select>
      </div>

      {/* Input field and button for adding a new to-do */}
      <div className="todo-input-container">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add new to-do"
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-button">Add To-Do</button>
      </div>

      {/* Display filtered to-dos */}
      <div className="todo-list">
        {filteredTodos.map((item, index) => (
          <div key={index} className="todo-item">
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDosCard;

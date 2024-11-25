import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = ({ addTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setTaskData((prev) => ({ ...prev, completed: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(taskData);
      addTask(newTask); // Update task list in parent component
      setTaskData({ title: '', description: '', completed: false });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add a New Task</h2>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={taskData.completed}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

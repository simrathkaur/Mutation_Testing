import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(taskData);
      setTaskData({
        title: '',
        description: '',
        completed: false,
      });
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input
        type="text"
        name="title"
        value={taskData.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="task-input"
      />
      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
        placeholder="Task Description"
        className="task-input"
      ></textarea>
      <button type="submit" className="submit-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;

import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, deleteTaskById } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from the backend when the app loads
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task by calling the API and updating the state
  const addTask = async (task) => {
    setError(null);
    try {
      const newTask = await createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
    }
  };

  // Delete a task by calling the API and updating the state
  const deleteTask = async (taskId) => {
    setError(null);
    try {
      await deleteTaskById(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {error && <div className="error">{error}</div>}
      <TaskForm addTask={addTask} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      )}
    </div>
  );
}

export default App;

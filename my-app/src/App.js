import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, deleteTaskById, updateTaskById } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const toggleTaskStatus = async (taskId, currentStatus) => {
    setError(null);
    try {
      const updatedTask = await updateTaskById(taskId, { completed: !currentStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <main className="app-container">
        {error && <div className="error-message">{error}</div>}
        <TaskForm addTask={addTask} />
        {loading ? (
          <p className="loading-message">Loading tasks...</p>
        ) : (
          <TaskList tasks={tasks} deleteTask={deleteTask} toggleTaskStatus={toggleTaskStatus} />
        )}
      </main>
    </div>
  );
}

export default App;

import axios from 'axios';

const API_URL = 'http://localhost:8085/api/tasks';

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTaskById = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

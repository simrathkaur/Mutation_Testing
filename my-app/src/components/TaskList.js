import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask, toggleTaskStatus }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks available. Add some!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                {task.title}
              </h3>
              <p className="task-description">{task.description}</p>
              <p className="task-status">
                <span>Status:</span> {task.completed ? '✅ Completed' : '⏳ Pending'}
              </p>
              <div className="task-actions">
                <button
                  className={`toggle-btn ${task.completed ? 'mark-pending' : 'mark-completed'}`}
                  onClick={() => toggleTaskStatus(task.id, task.completed)}
                >
                  {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

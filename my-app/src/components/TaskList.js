import React from 'react';

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Add some!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '15px' }}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
              <button onClick={() => deleteTask(task.id)}>Delete Task</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

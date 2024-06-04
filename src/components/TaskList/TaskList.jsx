// components/TaskList.js
import React from 'react';
import Task from '../Task/Task';


const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;

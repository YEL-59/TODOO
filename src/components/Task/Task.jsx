// components/Task.js
import React, { useState } from 'react';
import EditTaskForm from '../EditTaskForm/EditTaskForm';


const Task = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedTask) => {
    onEdit(updatedTask);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditTaskForm task={task} onSave={handleSave} onCancel={handleCancelEdit} />
    );
  }

  const priorityColor = task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="flex items-center justify-between bg-white p-4 mb-2 shadow">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mr-2"
        />
        <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
      </div>
      <div>
        <button onClick={handleEdit} className="mr-2">Edit</button>
        <button onClick={() => onDelete(task.id)} className="text-red-600">Delete</button>
      </div>
      <div className={`w-6 h-6 rounded-full ${priorityColor}`}></div>
    </div>
  );
};

export default Task;

// components/EditTaskForm.js
import React, { useState, useEffect } from 'react';

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  useEffect(() => {
    setTitle(task.title);
    setPriority(task.priority);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ ...task, title, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mr-2 p-2 border border-gray-300"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 border border-gray-300"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      <button type="button" onClick={onCancel} className="ml-2 px-4 py-2 bg-gray-300 text-gray-600 rounded">Cancel</button>
    </form>
  );
};

export default EditTaskForm;

// components/App.js
import React, { useState } from 'react';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';


const MainTodo = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'low', 'medium', 'high'

  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') {
      return true;
    } else {
      return task.priority === filter;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <button onClick={() => setFilter('all')} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">All</button>
        <button onClick={() => setFilter('low')} className="mr-2 px-4 py-2 bg-green-500 text-gray-900 rounded">Low</button>
        <button onClick={() => setFilter('medium')} className="mr-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded">Medium</button>
        <button onClick={() => setFilter('high')} className="px-4 py-2 bg-red-500 text-white rounded">High</button>
      </div>
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
    </div>
  );
};

export default MainTodo;

import  { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';



const MainTodo = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); 
  const API_URL = 'http://localhost:8080/tasks';
  // useEffect(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  //   if (storedTasks) {
  //     setTasks(storedTasks);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);


  // Fetch all tasks from the API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };
  // const addTask = (newTask) => {
  //   setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
  // };

  const addTask = async (task) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
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
    } else if (filter === 'incomplete') {
      return !task.completed;
    } else if (filter === 'complete') {
      return task.completed;
    } else {
      return task.priority === filter;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex flex-wrap mb-4">
        <button onClick={() => setFilter('all')} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">All</button>
        <button onClick={() => setFilter('low')} className="mr-2 px-4 py-2 bg-green-500 text-gray-900 rounded">Low</button>
        <button onClick={() => setFilter('medium')} className="mr-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded">Medium</button>
        <button onClick={() => setFilter('high')} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">High</button>
        <button onClick={() => setFilter('incomplete')} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">Incomplete</button>
        <button onClick={() => setFilter('complete')} className="px-4 py-2 bg-black text-white rounded">Complete</button>
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

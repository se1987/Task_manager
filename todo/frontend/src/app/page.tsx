'use client'

import React, { useState } from 'react';
import TaskBoard from '../../components/TaskBoard';
import './styles.css';

type Task = {
  id: number;
  title: string;
  status: string;
};

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, status: 'not started' }]);
      setNewTask('');
    }
  };

  const moveTask = (id: number, newStatus: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h2>TeamB: Task Manager</h2>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      <TaskBoard tasks={tasks} onMove={moveTask} onDelete={deleteTask} />
    </div>
  );
};

export default HomePage;
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TaskBoard from '../components/TaskBoard';
import { Task } from '../types/task';
import './styles.css';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/task');
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask: Omit<Task, 'task_id'>) => {
    try {
      const response = await fetch('http://localhost:8000/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data = await response.json();
      setTasks(prevTasks => [...prevTasks, data]);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const moveTask = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8000/task/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const updatedTask = await response.json();
      setTasks(prevTasks => prevTasks.map(task => task.task_id === id ? updatedTask : task));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/task/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      setTasks(prevTasks => prevTasks.filter(task => task.task_id !== id));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const viewTaskDetail = (id: number) => {
    router.push(`/task/${id}`);
  };

  return (
    <div>
      <h1>TeamB: タスク管理dayone</h1>
      <button onClick={() => router.push('/add-task')}>Add Task</button>
      <TaskBoard tasks={tasks} onMove={moveTask} onDelete={deleteTask} onViewDetail={viewTaskDetail} />
    </div>
  );
};

export default HomePage;
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TaskBoard from '../../components/TaskBoard';
import './styles.css';

type Task = {
  task_id: number;
  user_name: string;
  task_name: string;
  category: string;
  status: string;
  deadline: string;
  memo: string;
};

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  //componentがmountされたときにDBからタスクを読み込む
  useEffect(() => {
    fetch('http://localhost:8000/task')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  //新しいタスクを追加する関数
  const addTask = (newTask: Omit<Task, 'task_id'>) => {
    fetch('http://localhost:8000/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => setTasks(prevTasks => [...prevTasks, data]));
  };

  //タスクのステータスを更新する関数
  const moveTask = (id: number, newStatus: string) => {
    fetch(`http://localhost:8000/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(updatedTask => setTasks(prevTasks => prevTasks.map(task => task.task_id === id ? updatedTask : task)));
  };

  //タスクを削除する関数
  const deleteTask = (id: number) => {
    fetch(`http://localhost:8000/task/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTasks(prevTasks => prevTasks.filter(task => task.task_id !== id)));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={() => router.push('/add-task')}>Add Task</button>
      <TaskBoard tasks={tasks} onMove={moveTask} onDelete={deleteTask} />
    </div>
  );
};

export default HomePage;

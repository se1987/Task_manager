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

//HOmePage component を定義
const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  //componentがmountされたときにローカルストレージからタスクを読み込む
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  //新しいタスクを追加する関数
  const addTask = (newTask: Omit<Task, 'task_id'>) => {
    const updatedTasks = [...tasks, { ...newTask, task_id: tasks.length + 1 }];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  //タスクのステータスを更新する関数
  const moveTask = (id: number, newStatus: string) => {
    const updatedTasks = tasks.map(task => (task.task_id === id ? { ...task, status: newStatus } : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  //タスクを削除する関数
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.task_id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
